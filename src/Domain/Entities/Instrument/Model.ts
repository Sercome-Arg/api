import { Schema } from 'mongoose'
import { injectable } from 'inversify';

import Schemable from '../Util/Model'
import Nameable from '../Util/Ports/Nameable'

@injectable()
export default class ENTITY_SCHEMA extends Schemable implements Nameable {
	
	public name: string

	constructor() {

		let entity: string = 'instrument'

		super({

			// public name: string
			// public ID: string
			// public brand: string
			// public version: string
			// public numberOfSerie: string
			// public business: Schema.Types.ObjectId
			// public magnitude: Schema.Types.ObjectId
			// public unit: Schema.Types.ObjectId
			// public minimumWorkingRange: number
			// public maximumWorkingRange: number
			// public minimumMeasurementRange: number
			// public maximumMeasurementRange: number

			name: {
				type: String,
				typed: 'string'
			},
			ID: {
				type: String,
				typed: 'string'
			},
			brand: {
				type: String,
				typed: 'string'
			},
			version: {
				type: String,
				typed: 'string'
			},
			numberOfSerie: {
				type: String,
				typed: 'string'
			},
			business: {
				ref: 'business',
				typed: 'id',
				type: Schema.Types.ObjectId,
			},
			magnitude: {
				ref: 'magnitude',
				typed: 'id',
				type: Schema.Types.ObjectId,
			},
			unit: {
				ref: 'unit',
				typed: 'id',
				type: Schema.Types.ObjectId,
			},
			minimumWorkingRange: {
				type: String,
				typed: 'string'
			},
			maximumWorkingRange: {
				type: String,
				typed: 'string'
			},
			minimumMeasurementRange: {
				type: String,
				typed: 'string'
			},
			maximumMeasurementRange: {
				type: String,
				typed: 'string'
			},
			validateYear: {
				type: Number,
				typed: 'number'
			},
			validateMonth: {
				type: Number,
				typed: 'number'
			},
			validateDay: {
				type: Number,
				typed: 'number'
			},
			entity: {
				type: String,
				typed: entity
			}
	
		}, { 
			collection: entity
		})

		this.name = entity

	}
}