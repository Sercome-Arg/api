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

			name: {
				type: String,
				typed: 'string'
			},
			date: {
				ref:'date',
				type: Schema.Types.ObjectId,
				typed: 'string'
			},
			calibration:{
				ref:'calibration',
				type: Schema.Types.ObjectId,
				typed: 'string'
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