import { Schema } from 'mongoose'
import { injectable } from 'inversify';

import Schemable from '../Util/Model'
import Nameable from '../Util/Ports/Nameable'

@injectable()
export default class ENTITY_SCHEMA extends Schemable implements Nameable {
	
	public name: string

	constructor() {

		let entity: string = 'calibration'

		super({

			name: {
				type: String,
				typed: 'string'
			},
			business: {
				ref: 'business',
				typed: 'id',
				type: Schema.Types.ObjectId,
			},
			instrument: {
				ref: 'instrument',
				typed: 'id',
				type: Schema.Types.ObjectId,
			},
			lastAlert: {
				type: Date,
				typed: 'date'
			},
			nextAlert: {
				type: Date,
				typed: 'date'
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