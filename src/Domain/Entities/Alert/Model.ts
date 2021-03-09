import { Schema } from 'mongoose'
import { injectable } from 'inversify';

import Schemable from '../Util/Model'
import Nameable from '../Util/Ports/Nameable'

@injectable()
export default class ENTITY_SCHEMA extends Schemable implements Nameable {
	
	
	public name: string

	constructor() {

		let entity: string = 'alert'

		super({

			date: {
				ref: 'date',
				type: Schema.Types.ObjectId,
				typed: 'string'
			},
			company: {
				ref:'company',
				type: Schema.Types.ObjectId,
				typed: 'string'
			},
			message: {
				type: String,
				typed: 'String'
			},
			entity: {
				type: String,
				typed: entity
			},
	
		}, { 
			collection: entity
		})


		this.name = entity
	}
}