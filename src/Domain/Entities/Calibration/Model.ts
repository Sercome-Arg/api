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

			date: {
				type: String,
				typed: 'string'
			},
			file: {
				type: String,
				typed: 'string'
			},
			instrument: {
				ref:'instrument',
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