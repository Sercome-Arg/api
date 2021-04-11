import { Model, Document } from 'mongoose'
import { injectable, inject } from 'inversify';
import TYPES from './../../../TYPES'

import Responseable from '../Util/Ports/Responseable'

import Serviceable from './Ports/Serviceable'
import Registrable from './Ports/Registrable'

import GeteableAll from '../Util/Ports/GeteableAll'
import Saveable from '../Util/Ports/Saveable';
import GeteableById from '../Util/Ports/GeteableById'
import Updateable from '../Util/Ports/Updateable'

import ConfigurationInterface from './../Configuration/Interface'
import InstrumentInterface from './../Instrument/Interface'

@injectable()
export default class Controller implements Serviceable {

	@inject(TYPES.ResponseableDomain) private responserService: Responseable
	@inject(TYPES.Updateable) private updateableService: Updateable
	@inject(TYPES.GeteableAll) private geteableAllService: GeteableAll
	@inject(TYPES.GeteableById) private geteableByIdService: GeteableById
	@inject(TYPES.Saveable) private saveableService: Saveable

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
		calibrationModel: Model<Document, {}>,
		configurationModel: Model<Document, {}>,
		instrumentModel: Model<Document, {}>,
		idUser: string
	): Promise<Responseable> {

		return new Promise<Responseable>( async (resolve, reject) => {

			await this.geteableAllService.getAll(instrumentModel, {}, { _id: { $oid: data.instrument } }, {}, {}, 0, 0)
				.then(async (res: Responseable) => {
					if(res && res.result !== undefined) {
						if(
							Array.isArray(res.result) &&
							res.result.length > 0
						) {
							let instrument: InstrumentInterface = res.result[0]

							if(instrument.validateYear === undefined || instrument.validateYear === null) instrument.validateYear = 0
							if(instrument.validateMonth === undefined || instrument.validateMonth === null) instrument.validateMonth = 0
							if(instrument.validateDay === undefined || instrument.validateDay === null) instrument.validateDay = 0

							await this.geteableAllService.getAll(configurationModel, {}, {}, {}, {}, 0, 0)
								.then(async (res: Responseable) => {
									if(res && res.result !== undefined) {
										if(
											Array.isArray(res.result) &&
											res.result.length > 0
										) {
											let configuration: ConfigurationInterface = res.result[0]

											if(configuration.beforeYear === undefined || configuration.beforeYear === null) configuration.beforeYear = 0
											if(configuration.beforeMonth === undefined || configuration.beforeMonth === null) configuration.beforeMonth = 0
											if(configuration.beforeDay === undefined || configuration.beforeDay === null) configuration.beforeDay = 0

											let now: Date = new Date()
											data.nextAlert = new Date(
												(now.getFullYear() + instrument.validateYear - configuration.beforeYear), 
												(now.getMonth() + instrument.validateMonth - configuration.beforeMonth), 
												(now.getDate() + instrument.validateDay - configuration.beforeDay)
											)
											
											await this.saveableService.save(data, calibrationModel, calibrationModel, idUser)
												.then((res: Responseable) => {
													if(res && res.result !== undefined) {
														this.responserService = { result: res.result, message: res.message, error: res.error, status: res.status }
														resolve(this.responserService)
													} else {
														this.responserService = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
														reject(this.responserService)
													}
												}).catch((err: Responseable) => {
													this.responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
													reject(this.responserService)
												})
										}
									} else {
										this.responserService = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
										reject(this.responserService)
									}
								}).catch((err: Responseable) => {
									this.responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
									reject(this.responserService)
								})

						}
					} else {
						this.responserService = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
						reject(this.responserService)
					}
				}).catch((err: Responseable) => {
					this.responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
					reject(this.responserService)
				})
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
					.then((result: Responseable) => {
						if(result) {
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

}