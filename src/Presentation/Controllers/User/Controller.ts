import { Router, Response, NextFunction } from 'express'
import { Model, Document } from 'mongoose'
import { injectable, inject, named } from 'inversify';
import * as XLSX from 'xlsx'

import TYPES from './../../../TYPES';
import container from './../../../inversify.config';
import * as multer from 'multer'

import Routeable from '../Ports/Routeable'
import Patheable from '../Ports/Patheable'
import Responseable from '../Responseable'
import DomainResponseable from '../../../Domain/Entities/Util/Ports/Responseable'

import RequestWithUser from '../../Ports/RequestWithUser'
import GeteableCompanyStorage from '../Ports/GeteableCompanyStorage'

import Authenticateable from '../../Middlewares/Ports/Authenticateable'

import ConnectionableProvider from '../../../Infrastructure/Persistence/Ports/ConnectionableProvider'

import Authenticable from '../../../Aplication/Services/Ports/Authenticable'
import CreateableToken from '../../../Aplication/Services/Ports/CreateableToken'

import Validateable from '../../../Domain/Middleware/Ports/Validateable'
import Schemable from '../../../Domain/Entities/Util/Ports/Schemable'
import Controlleable from '../../../Domain/Entities/Util/Ports/Controlleable'
import Validable from '../../../Domain/Entities/Util/Ports/Validable'

import ObjInterface from '../../../Domain/Entities/User/Interface'
import Serviceable from '../../../Domain/Entities/User/Ports/Serviceable'
import CompanyServiceable from '../../../Domain/Entities/Company/Ports/Serviceable'

const path = require('path');

@injectable()
export default class Controller implements Routeable, Patheable {

	public router: Router = container.get<Router>(TYPES.Router)
	public path: string = '/user'
	private validationProvider: Validateable = container.get<Validateable>(TYPES.Validateable)
	private authMid: Authenticateable = container.get<Authenticateable>(TYPES.Authenticateable)
	@inject(TYPES.ConnectionableProvider) private connectionProvider: ConnectionableProvider
	@inject(TYPES.Responseable) private responserService: Responseable

	@inject(TYPES.Validable) @named(TYPES.User) private dto: Validable
	@inject(TYPES.Schemable) @named(TYPES.User) private schema: Schemable
	@inject(TYPES.UserServiceableDomain) private service: Serviceable

	@inject(TYPES.Schemable) @named(TYPES.Company) private companySchema: Schemable
	@inject(TYPES.Schemable) @named(TYPES.Mail) private mailSchema: Schemable
	@inject(TYPES.Schemable) @named(TYPES.Subscription) private subscriptionSchema: Schemable
	@inject(TYPES.CompanyServiceableDomain) private companyService: CompanyServiceable
	@inject(TYPES.Authenticable) private authenticationService: Authenticable
	@inject(TYPES.Authenticable) private tokenProvider: CreateableToken

	//TODO quitar esta dependencia
	@inject(TYPES.Controlleable) private controllerService: Controlleable

	private storage: GeteableCompanyStorage = container.get<GeteableCompanyStorage>(TYPES.GeteableCompanyStorage)

	constructor() {
		this.initializeRoutes(this.validationProvider, this.storage);
	}
	
	initializeRoutes(validationProvider: Validateable, storage: GeteableCompanyStorage) {

		var upload = multer({ storage: storage.getCompanyStorage() })

		this.router
			.get(this.path, [this.authMid.authenticate], this.getAllObjs)
			.get(`${this.path}/bulk/:users/:rol`, [this.authMid.authenticate], this.bulk)
			.get(`${this.path}/schema`, [this.authMid.authenticate], this.getSchema)
			.get(`${this.path}/:id`, [this.authMid.authenticate], this.getObjById)
			.post('/image', [upload.single('image')], this.upload)
			.post(this.path, [this.authMid.authenticate, validationProvider.validate(this.dto)], this.saveObj)
			.put(`${this.path}/:id`, [this.authMid.authenticate, validationProvider.validate(this.dto, true)], this.updateObj)
			.delete(`${this.path}/:id`, [this.authMid.authenticate], this.deleteObj);
	}

	private bulk = async (request: RequestWithUser, response: Response, next: NextFunction) => {

		const users: string = request.params.users
		const rol: string = request.params.rol
		const database: any = request.database

		var subscriptionModel: Model<Document, {}> = await this.connectionProvider.getModel(database, this.subscriptionSchema.name, this.subscriptionSchema)
		var mailModel: Model<Document, {}> = await this.connectionProvider.getModel(database, this.mailSchema.name, this.mailSchema)
		var companyModel: Model<Document, {}> = await this.connectionProvider.getModel(database, this.companySchema.name, this.companySchema)
		var model: Model<Document, {}> = await this.connectionProvider.getModel(database, this.schema.name, this.schema)

		try {

			let workbook = XLSX.readFile(path.join(__dirname, './../../../../uploads/', users))
			let sheet_name_list = workbook.SheetNames;
			let wbJson = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]])

			if(wbJson.length > 0) {
				wbJson.map((row: any) => {

					let email: string = row.mail.toLowerCase()

					let user: any = {
						email: email,
						password: 'infosanofi',
						rol: rol
					}

					this.service.getAll(model, {} , { email: email, operationType: { $ne: 'D' } }, {}, {}, 0, 0)
						.then((res: DomainResponseable) => {
							if(res !== undefined && res.result !== undefined) {
								if(Array.isArray(res.result)) {
									if(res.result.length === 0) {
										this.authenticationService.register(user, database, model, companyModel, mailModel, subscriptionModel)
											.then((res: DomainResponseable) => {
												console.log('El mail ' + email + ' fue registrado con exito');
												
											}).catch((err: DomainResponseable) => {
												console.log(err)
											})
									} else {
										console.log('El mail ' + email + ' ya existe')
									}
								}
							}
							
						}).catch((err: DomainResponseable) => {
							console.log(err)
						})
					
				})
			}

			this.responserService.res = {
				result: null,
				message: 'asd',
				status: 200,
				error: 'asd'
			}
			 
		} catch (e) {
			this.responserService.res = {
				result: null,
				message: 'Error en la lectura del archivo. Realizar un nuevo upload',
				status: 428,
				error: e.toString()
			}
		}

		if(this.responserService.res.status) {
			response.status(this.responserService.res.status).send(this.responserService.res)
		} else {
			response.status(500).send(this.responserService.res)
		}
	}

	private getSchema = async (request: RequestWithUser, response: Response, next: NextFunction) => {
		
		this.responserService.res = {
			result: this.schema.obj,
			message: 'Consulta exitosa',
			status: 200,
			error: ''
		}

		if(this.responserService.res.status) {
			response.status(this.responserService.res.status).send(this.responserService.res)
		} else {
			response.status(500).send(this.responserService.res)
		}
	}

	private getObjById = async (request: RequestWithUser, response: Response, next: NextFunction) => {
		
		var model: Model<Document, {}> = await this.connectionProvider.getModel(request.database, this.schema.name, this.schema)

		const id: string = request.params.id;
		const idUser: string = request.user._id;

		await this.service.getById(id, model)
			.then( async (res: DomainResponseable) => {
				if(res && res.result !== undefined) {
					this.responserService.res = {
						result: res.result,
						message: res.message,
						status: res.status,
						error: res.error
					}
				} else {
					this.responserService.res = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
				}
			}).catch((err: DomainResponseable) => {
				this.responserService.res = { result: err.result, message: err.message, error: err.error, status: err.status }
			})
		if(this.responserService.res.status) {
			response.status(this.responserService.res.status).send(this.responserService.res)
		} else {
			response.status(500).send(this.responserService.res)
		}
	}

	private upload = async (request: RequestWithUser, response: Response, next: NextFunction) => {

		if (request.file && request.file.filename) {
			this.responserService.res = {
				result: request.file.filename,
				message: 'Upload exitoso',
				status: 200,
				error: ''
			}
		} else {
			this.responserService.res = {
				result: 'Nop',
				message: 'Algo sapó',
				status: 500,
				error: 'ni idea'
			}
		}
		if(this.responserService.res.status) {
			response.status(this.responserService.res.status).send(this.responserService.res)
		} else {
			response.status(500).send(this.responserService.res)
		}
	}

	private getAllObjs = async (request: RequestWithUser, response: Response, next: NextFunction) => {

		const model: Model<Document, {}> = await this.connectionProvider.getModel(
			request.database,
			this.schema.name,
			this.schema
		)

		let error;
		let project = {};
		let match = {};
		let sort = {};
		let group = {};
		let limit = 0;
		let skip = 0;

		let recivedProject: any = request.query.project
		let recivedMatch: any = request.query.match
		let recivedSort: any = request.query.sort
		let recivedGroup: any = request.query.group
		let recivedLimit: any = request.query.limit
		let recivedSkip: any = request.query.skip

		if (request.query && request.query !== {}) {
			if (request.query.project) { try { project = JSON.parse(recivedProject); } catch (err) { error = err; } }
			if (request.query.match) { try { match = JSON.parse(recivedMatch); } catch (err) { error = err; } }
			if (request.query.sort) { try { sort = JSON.parse(recivedSort); } catch (err) { error = err; } }
			if (request.query.group) { try { group = JSON.parse(recivedGroup); } catch (err) { error = err; } }
			if (request.query.limit) { try { limit = parseInt(recivedLimit, 10); } catch (err) { error = err; } }
			if (request.query.skip) { try { skip = parseInt(recivedSkip, 10); } catch (err) { error = err; } }
		}

		if (!error) {
			await this.service.getAll(model, project, match, sort, group, limit, skip)
				.then((res: DomainResponseable) => {
					if(res && res.result !== undefined) {
						this.responserService.res = {
							result: res.result,
							message: res.message,
							status: res.status,
							error: res.error
						}
					} else {
						this.responserService.res = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
					}
				}).catch((err: DomainResponseable) => {
					this.responserService.res = { result: err.result, message: err.message, error: err.error, status: err.status }
				})
		} else {
			this.responserService.res = {
				result: [],
				message: 'No se puede realizar la consulta',
				status: 428,
				error: 'Error en los parametros enviados'
			}
		}
		if(this.responserService.res.status) {
			response.status(this.responserService.res.status).send(this.responserService.res)
		} else {
			response.status(500).send(this.responserService.res)
		}
	}

	private saveObj = async (request: RequestWithUser, response: Response, next: NextFunction) => {
		
		var model: Model<Document, {}> = await this.connectionProvider.getModel( request.database, this.schema.name, this.schema )
		var companyModel: Model<Document, {}> = await this.connectionProvider.getModel(request.database, this.companySchema.name, this.companySchema)
		var mailModel: Model<Document, {}> = await this.connectionProvider.getModel(request.database, this.mailSchema.name, this.mailSchema)
		var subscriptionModel: Model<Document, {}> = await this.connectionProvider.getModel(request.database, this.subscriptionSchema.name, this.subscriptionSchema)

		var objData: ObjInterface = request.body;
		var database: string = request.database;

		objData.password = 'infosercome'

		//TODO esto va mas abajo (revisar el register tmb, en el caso de que se baje)
		await this.service.getAll(model, {}, { email: objData.email, operationType: { $ne: 'D' } }, {}, {}, 0, 0)
			.then( async (res: DomainResponseable) => {
				if(res && res.result !== undefined) {
					if(res.result.length === 0) {
						await this.authenticationService.register(objData, database, model, companyModel, mailModel, subscriptionModel)
							.then((res: DomainResponseable) => {
								if (res && res.result !== undefined) {
									this.responserService.res = {
										result: res.result,
										message: res.message,
										status: res.status,
										error: res.error
									}
								} else {
									this.responserService.res = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
								}
							}).catch((err: DomainResponseable) => {
								this.responserService.res = { result: err.result, message: err.message, status: err.status, error: err.error }
							})
					} else {
						this.responserService.res = {
							result: 'Nop',
							message: 'No se pudo realizar el alta',
							status: 428,
							error: 'La entidad con los parametros solicitados, ya existe'
						}
					}
				} else {
					this.responserService.res = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
				}
			}).catch((err: DomainResponseable) => {
				this.responserService.res = { result: err.result, message: err.message, error: err.error, status: err.status }
			})
		if(this.responserService.res.status) {
			response.status(this.responserService.res.status).send(this.responserService.res)
		} else {
			response.status(500).send(this.responserService.res)
		}
	}

	private updateObj = async (request: RequestWithUser, response: Response, next: NextFunction) => {
		
		var model: Model<Document, {}> = await this.connectionProvider.getModel(
			request.database,
			this.schema.name,
			this.schema
		)

		const id: string = request.params.id;
		const objData: ObjInterface = request.body;
		const idUser: string = request.user._id;
		delete objData.password
		
		await this.service.getById(id, model)
			.then( async (res: DomainResponseable) => {
				if(res && res.result !== undefined) {
					
					await this.service.update(id, objData, model, idUser)
						.then((update: DomainResponseable) => {
							if(update) {
								this.responserService.res = {
									result: update.result,
									message: update.message,
									error: update.error,
									status: update.status
								}
							} else {
								this.responserService.res = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
							}
						}).catch((err: DomainResponseable) => {
							this.responserService.res = { result: err.result, message: err.message, error: err.error, status: err.status }
						})
				} else {
					this.responserService.res = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
				}
			}).catch((err: DomainResponseable) => {
				this.responserService.res = {
					result: err.result,
					message: err.message,
					error: err.error,
					status: err.status
				}
			})
			if (this.responserService.res) {
				if(this.responserService.res.status) {
					response.status(this.responserService.res.status).send(this.responserService.res)
				} else {
					response.send(this.responserService.res)
				}
			} else {
				this.responserService.res = { result: 'Nop', message: 'No existe res', error: '', status: 500 }
				response.send(this.responserService.res)
			}
	}

	private deleteObj = async (request: RequestWithUser, response: Response, next: NextFunction) => {

		var model: Model<Document, {}> = await this.connectionProvider.getModel(
			request.database,
			this.schema.name,
			this.schema
		)

		const id: string = request.params.id;
		const idUser: string = request.user._id

		await this.service.getById(id, model)
			.then( async (getObjById: DomainResponseable) => {
				if(getObjById) {
					let obj = getObjById.result
					obj.operationType = 'D'
					await this.service.update(id, obj, model, idUser)
						.then((update: DomainResponseable) => {
							if(update) {
								this.responserService.res = {
									result: update.result,
									message: update.message,
									error: update.error,
									status: update.status
								}
							} else {
								this.responserService.res = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
							}
						}).catch((err: DomainResponseable) => {
							this.responserService.res = { result: err.result, message: err.message, error: err.error, status: err.status }
						})
				} else {
					this.responserService.res = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
				}
			}).catch((err: DomainResponseable) => {
				this.responserService.res = { result: err.result, message: err.message, error: err.error, status: err.status }
			})
		if(this.responserService.res.status) {
			response.status(this.responserService.res.status).send(this.responserService.res)
		} else {
			response.status(500).send(this.responserService.res)
		}
	}
}