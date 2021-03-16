import { Model, Document } from 'mongoose'
import { injectable, inject } from 'inversify';
import TYPES from './../../../TYPES'
import axios from 'axios'

import * as moment from 'moment';
import 'moment/locale/es';

import Responseable from '../Util/Ports/Responseable'

import Serviceable from './Ports/Serviceable'
import Registrable from './Ports/Registrable'

import GeteableAll from '../Util/Ports/GeteableAll'
import Saveable from '../Util/Ports/Saveable';
import GeteableById from '../Util/Ports/GeteableById'
import Updateable from '../Util/Ports/Updateable'
import Payment from './Interface'

const Afip = require('@afipsdk/afip.js');
const path = require('path');

@injectable()
export default class Controller implements Serviceable {

	@inject(TYPES.ResponseableDomain) private responserService: Responseable
	@inject(TYPES.Updateable) private updateableService: Updateable
	@inject(TYPES.GeteableAll) private geteableAllService: GeteableAll
	@inject(TYPES.GeteableById) private geteableByIdService: GeteableById
	@inject(TYPES.Saveable) private saveableService: Saveable

	public async validate(
		data: {
			origin: number,
			CUIT: number,
			price: number
		},
		paymentModel: Model<Document, {}>,
	): Promise<Responseable> {

		return new Promise<Responseable>(async (resolve, reject) => {

			let electronicBilling: {
				origin: number,
				comprobanteTipo: number,
				CUIT: number,
				totalPrice: number,
				identificationType: number,
				identificationValue: number
			} = {
				origin: data.origin,
				comprobanteTipo: 6,
				CUIT: data.CUIT,
				totalPrice: data.price,
				identificationType: 99,
				identificationValue: 0
			}

			let folder: string = path.join(__dirname, './../../../../')

			let config: any = {
				CUIT: electronicBilling.CUIT,
				production: false,
				cert: '20356687567.crt',
				key: '20356687567.key',
				res_folder: folder,
				ta_folder: folder
			}

			let afip: any = new Afip(config)

			await afip.ElectronicBilling.getLastVoucher(electronicBilling.origin, electronicBilling.comprobanteTipo)
				.then(async (res: number) => {

					const date = new Date(Date.now() - ((new Date()).getTimezoneOffset() * 60000)).toISOString().split('T')[0];

					let FchVtoPago: any = moment(new Date)
					let FchServDesde: any = moment(new Date)
					let FchServHasta: any = moment(new Date)

					let data = {
						'CantReg': 1,  // Cantidad de comprobantes a registrar
						'PtoVta': electronicBilling.origin,  // Punto de venta
						'CbteTipo': electronicBilling.comprobanteTipo,  // Tipo de comprobante (ver tipos disponibles) 
						'Concepto': 2,  // Concepto del Comprobante: (1)Productos, (2)Servicios, (3)Productos y Servicios
						'DocTipo': electronicBilling.identificationType, // Tipo de documento del comprador (99 consumidor final, ver tipos disponibles)
						'DocNro': electronicBilling.identificationValue,  // Número de documento del comprador (0 consumidor final)
						'CbteDesde': res + 1,  // Número de comprobante o numero del primer comprobante en caso de ser mas de uno
						'CbteHasta': res + 1,  // Número de comprobante o numero del último comprobante en caso de ser mas de uno
						'CbteFch': FchVtoPago.format('YYYYMMDD'), // (Opcional) Fecha del comprobante (yyyymmdd) o fecha actual si es nulo
						'ImpTotal': electronicBilling.totalPrice, // Importe total del comprobante
						'ImpTotConc': 0,   // Importe neto no gravado
						'ImpNeto': this.roundTo(((electronicBilling.totalPrice * 100) / 121), 2), // Importe neto gravado
						'ImpOpEx': 0,   // Importe exento de IVA
						'ImpIVA': this.roundTo(((electronicBilling.totalPrice * 21) / 121), 2),  //Importe total de IVA
						'ImpTrib': 0,   //Importe total de tributos
						'MonId': 'PES', //Tipo de moneda usada en el comprobante (ver tipos disponibles)('PES' para pesos argentinos) 
						'MonCotiz': 1,     // Cotización de la moneda usada (1 para pesos argentinos)  
						'Iva': [ // (Opcional) Alícuotas asociadas al comprobante
							{
								'Id': 5, // Id del tipo de IVA (5 para 21%)(ver tipos disponibles) 
								'BaseImp': this.roundTo(((electronicBilling.totalPrice * 100) / 121), 2), // Base imponible
								'Importe': this.roundTo(((electronicBilling.totalPrice * 21) / 121), 2) // Importe 
							}
						],
						'FchVtoPago': FchVtoPago.format('YYYYMMDD'),
						'FchServDesde': FchServDesde.format('YYYYMMDD'),
						'FchServHasta': FchServHasta.format('YYYYMMDD')
					}

					await afip.ElectronicBilling.createNextVoucher(data)
						.then(async (res: any) => {
							console.log(res);
							this.responserService = {
								result: res,
								message: 'Successfully validate FE',
								error: '',
								status: 200
							}
							resolve(this.responserService)
						}).catch((err: any) => {
							this.responserService = { result: res, message: 'Respuesta de Afip', status: 500, error: err.toString() }
							reject(this.responserService)
						})

				}).catch((err: any) => {
					this.responserService = { result: 'res', message: 'Respuesta de Afip', status: 500, error: err.toString() }
					reject(this.responserService)
				})
		})
	}

	public async update(
		id: string,
		data: {},
		model: Model<Document, {}>,
		idUser: string,
	): Promise<Responseable> {

		return new Promise<Responseable>( async (resolve, reject) => {
			await this.updateableService.update(id, data, model, model, idUser)
				.then((res: Responseable) => {
					if(res && res.result !== undefined) {
						this.responserService = {
							result: res.result,
							message: res.message,
							error: res.error,
							status: res.status
						}
						resolve(this.responserService)
					} else {
						this.responserService = {
							result: 'Nop',
							message: 'La capa superior contesto undefined',
							error: '',
							status: 500
						}
					}
				}).catch((err: Responseable) => {
					this.responserService = {
						result: err.result,
						message: err.message,
						error: err.error,
						status: err.status
					}
				})
			reject(this.responserService)
		})
	}

	public async getById(
		id: string,
		model: Model<Document, {}>,
	): Promise<Responseable> {

		return new Promise<Responseable>( async (resolve, reject) => {

			await this.geteableByIdService.getById(id, model, model)
				.then((res: Responseable) => {
					if(res && res.result !== undefined) {
						this.responserService = {
							result: res,
							message: res.message,
							error: res.error,
							status: res.status
						}
						resolve(this.responserService)
					} else {
						this.responserService = {
							result: 'Nop',
							message: 'La capa superior contesto undefined',
							error: '',
							status: 500
						}
					}
				}).catch((err: Responseable) => {
					this.responserService = {
						result: err.result,
						message: err.message,
						error: err.error,
						status: err.status
					}
				})
			reject(this.responserService)
		})
	}
		
	public async save(
		data: Registrable,
		model: Model<Document, {}>,
		subscriptionModel: Model<Document, {}>,
		idUser: string
	): Promise<Responseable> {

		return new Promise<Responseable>( async (resolve, reject) => {

			let subscription: any = {
				start: Date.parse(new Date().toString()),
				end: Date.parse(new Date().toString()) + 31104000000,
				user: idUser
			}

			this.saveableService.save(subscription, subscriptionModel, subscriptionModel, idUser)

			await this.saveableService.save(data, model, model, idUser)
				.then((res: Responseable) => {
					if(res && res.result !== undefined) {
						this.responserService = {
							result: res.result,
							message: res.message,
							error: res.error,
							status: res.status
						}
						resolve(this.responserService)
					} else {
						this.responserService = {
							result: 'Nop',
							message: 'La capa superior contesto undefined',
							error: '',
							status: 500
						}
					}
				}).catch((err: Responseable) => {
					this.responserService = {
						result: err.result,
						message: err.message,
						error: err.error,
						status: err.status
					}
				})
			reject(this.responserService)
		})
	}

	public async getAll(
		model: Model<Document, {}>,
		project: {},
		match: {},
		sort: {},
		group: {},
		limit: number,
		skip: number
	): Promise<Responseable> {

			return new Promise<Responseable>( async (resolve, reject) => {

				await this.geteableAllService.getAll(model, project, match, sort, group, limit, skip)
					.then(async (result: Responseable) => {
						if(result) {

							if(limit !== 1) {
								await Promise.all(
									result.result.map(async (payment: any) => {
										await axios.get('https://api.mercadopago.com/v1/payments/' + payment.idMeli, {
											headers: {
												'Content-Type': 'application/json',
												'Authorization': 'Bearer TEST-220114329053901-022819-cc552419bc16f70b6c052a47dd7054e3-312985533'
											}
										}).then((paymentRes) => {
											payment.meli = paymentRes.data
										})
									})
								)
							}

							this.responserService = {
								result: result.result,
								message: result.message,
								error: result.error,
								status: result.status
							}
							resolve(this.responserService)
						} else {
							this.responserService = {
								result: 'Nop',
								message: 'No existe result',
								error: 'obj.getAll()',
								status: 500
							}
						}
					}).catch((err: Responseable) => {
						this.responserService = {
							result: err.result,
							message: err.message,
							error: err.error,
							status: err.status
						}
					})
				reject(this.responserService)
			})
	}

	private roundTo(value: number, places: number) {
		var power = Math.pow(10, places);
		return Math.round(value * power) / power;
	}

}