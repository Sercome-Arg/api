import { Router, Response, NextFunction } from 'express'
import { Model, Document } from 'mongoose'
import { injectable, inject, named } from 'inversify';
import * as mercadopago from 'mercadopago'

import TYPES from './../../../TYPES';
import container from './../../../inversify.config';

import Routeable from '../Ports/Routeable'
import Patheable from '../Ports/Patheable'
import Responseable from '../Responseable'
import DomainResponseable from '../../../Domain/Entities/Util/Ports/Responseable'

import RequestWithUser from '../../Ports/RequestWithUser'

import Authenticateable from '../../Middlewares/Ports/Authenticateable'

import ConnectionableProvider from '../../../Infrastructure/Persistence/Ports/ConnectionableProvider'

import Validateable from '../../../Domain/Middleware/Ports/Validateable'
import Schemable from '../../../Domain/Entities/Util/Ports/Schemable'
import Validable from '../../../Domain/Entities/Util/Ports/Validable'

import ObjInterface from '../../../Domain/Entities/Payment/Interface'
import Serviceable from '../../../Domain/Entities/Payment/Ports/Serviceable'

@injectable()
export default class Controller implements Routeable, Patheable {

	public router: Router = container.get<Router>(TYPES.Router)
	public path: string = '/payment'
	private validationProvider: Validateable = container.get<Validateable>(TYPES.Validateable)
	private authMid: Authenticateable = container.get<Authenticateable>(TYPES.Authenticateable)
	@inject(TYPES.ConnectionableProvider) private connectionProvider: ConnectionableProvider
	@inject(TYPES.Responseable) private responserService: Responseable
	
	@inject(TYPES.Validable) @named(TYPES.Payment) private dto: Validable
	@inject(TYPES.Schemable) @named(TYPES.Payment) private schema: Schemable
	@inject(TYPES.Schemable) @named(TYPES.Subscription) private subscriptionSchema: Schemable
	@inject(TYPES.PaymentServiceableDomain) private service: Serviceable

	constructor() {
		this.initializeRoutes(this.validationProvider);
	}

	initializeRoutes(validationProvider: Validateable) {

		this.router
			.get(this.path, [this.authMid.authenticate], this.getAllObjs)
			.get(`${this.path}/schema`, [this.authMid.authenticate], this.getSchema)
			.post('/validate-afip/:id', [], this.validate)
			.get(`${this.path}/:id`, [this.authMid.authenticate], this.getObjById)
			.post(`${this.path}/process`, [this.authMid.authenticate], this.process_payment)
			.post(this.path, [this.authMid.authenticate, validationProvider.validate(this.dto)], this.saveObj)
			.put(`${this.path}/:id`, [this.authMid.authenticate, validationProvider.validate(this.dto, true)], this.updateObj)
			.delete(`${this.path}/:id`, [this.authMid.authenticate], this.deleteObj);
	}

	private validate = async (request: RequestWithUser, response: Response, next: NextFunction) => {
		// var model: Model<Document, {}> = await this.connectionProvider.getModel('inmo', this.transactionSchema.name, this.transactionSchema)
		// var transactionTypeModel: Model<Document, {}> = await this.connectionProvider.getModel('inmo', this.transactionTypeSchema.name, this.transactionTypeSchema)
		// var personModel: Model<Document, {}> = await this.connectionProvider.getModel('inmo', this.personSchema.name, this.personSchema)
		// var vatConditionModel: Model<Document, {}> = await this.connectionProvider.getModel('inmo', this.vatConditionSchema.name, this.vatConditionSchema)
		// var originModel: Model<Document, {}> = await this.connectionProvider.getModel('inmo', this.originSchema.name, this.originSchema)
		// var companyModel: Model<Document, {}> = await this.connectionProvider.getModel('inmo', this.companySchema.name, this.companySchema)

		// const id = request.user._id
		// const id = '5e9ea6595c942a45a4c3bdde'
		// const idTransaction: string = request.params.id

		// await this.service.validate()
		// 	.then((res: DomainResponseable) => {
		// 		if(res && res.result !== undefined) {
		// 			this.responserService.res = {
		// 				result: res.result,
		// 				message: res.message,
		// 				status: res.status,
		// 				error: res.error
		// 			}
		// 		} else {
		// 			this.responserService.res = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
		// 		}
		// 	})
		// 	.catch((err: any) => {
		// 		this.responserService.res = { result: err.result, message: err.message, error: err.error, status: err.status }
		// 	})

		if(this.responserService.res.status) {
			response.status(this.responserService.res.status).send(this.responserService.res)
		} else {
			response.status(500).send(this.responserService.res)
		}
	}

	private process_payment = async (request: RequestWithUser, response: Response, next: NextFunction) => {

		var model: Model<Document, {}> = await this.connectionProvider.getModel(request.database, this.schema.name, this.schema)
		var subscriptionModel: Model<Document, {}> = await this.connectionProvider.getModel(request.database, this.subscriptionSchema.name, this.subscriptionSchema)

		const id = request.user._id

		mercadopago.configurations.setAccessToken('TEST-220114329053901-022819-cc552419bc16f70b6c052a47dd7054e3-312985533');

		var payment_data = {
			transaction_amount: Number(request.body.transactionAmount),
			token: request.body.token,
			description: request.body.description,
			installments: Number(request.body.installments),
			payment_method_id: request.body.paymentMethodId,
			issuer_id: request.body.issuer,
			payer: {
				email: request.body.email,
				identification: {
					type: request.body.docType,
					number: request.body.docNumber
				}
			}
		};
	
		await mercadopago.payment.save(payment_data)
			.then(async (resReturn) => {

				let data: any = resReturn.response

				data.idMeli = data.id
				delete data.id

				await this.service.save(resReturn.response, model, subscriptionModel, id)
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
					})
					.catch((err: any) => {
						this.responserService.res = { result: err.result, message: err.message, error: err.error, status: err.status }
					})

				// response.status(resReturn.status).json({
				//   status: resReturn.body.status,
				//   status_detail: resReturn.body.status_detail,
				//   id: resReturn.body.id
				// });
			})
			.catch(function(error) {
				console.log(error)
				// this.responserService.res = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
				// response.status(error.status).send(error);
			});
		
		
			
		if(this.responserService && this.responserService.res && this.responserService.res.status) {
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

	private getAllObjs = async (request: RequestWithUser, response: Response, next: NextFunction) => {

		const model: Model<Document, {}> = await this.connectionProvider.getModel(request.database, this.schema.name, this.schema)

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
						if(res.result) {
							this.responserService.res = {
								result: res.result,
								message: res.message,
								status: res.status,
								error: res.error
							}
						} else {
							this.responserService.res = {
								result: [],
								message: 'No existe el res.result',
								status: 500,
								error: 'obj.getAllObjs()'
							}
						}
					} else {
						this.responserService.res = {
							result: [],
							message: 'No existe el res',
							status: 500,
							error: 'obj.getAllObjs()'
						}
					}
				}).catch((err: DomainResponseable) => {
					this.responserService.res = {
						result: err.result,
						message: err.message,
						status: err.status,
						error: err.error
					}
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
		
		var model: Model<Document, {}> = await this.connectionProvider.getModel(request.database, this.schema.name, this.schema)
		var subscriptionModel: Model<Document, {}> = await this.connectionProvider.getModel(request.database, this.subscriptionSchema.name, this.subscriptionSchema)

		var objData: ObjInterface = request.body;
		const id = request.user._id

		await this.service.save(objData, model, subscriptionModel, id)
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
			})
			.catch((err: any) => {
				this.responserService.res = { result: err.result, message: err.message, error: err.error, status: err.status }
			})
			
		if(this.responserService.res.status) {
			response.status(this.responserService.res.status).send(this.responserService.res)
		} else {
			response.status(500).send(this.responserService.res)
		}
	}

	private updateObj = async (request: RequestWithUser, response: Response, next: NextFunction) => {
		
		var model: Model<Document, {}> = await this.connectionProvider.getModel(request.database, this.schema.name, this.schema)

		const id: string = request.params.id;
		const objData: ObjInterface = request.body;
		const idUser: string = request.user._id;

		await this.service.getById(id, model)
			.then( async (res: DomainResponseable) => {
				if(res && res.result !== undefined) {
					if(res.status === 200) {
						await this.service.update(id, objData, model, idUser)
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
							result: res.result,
							message: res.message,
							status: res.status,
							error: res.error
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

	private deleteObj = async (request: RequestWithUser, response: Response, next: NextFunction) => {

		var model: Model<Document, {}> = await this.connectionProvider.getModel(request.database, this.schema.name, this.schema)

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