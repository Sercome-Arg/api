import { Schema } from 'mongoose'
import { injectable } from 'inversify';

import Schemable from '../Util/Model'
import Nameable from '../Util/Ports/Nameable'

@injectable()
export default class ENTITY_SCHEMA extends Schemable implements Nameable {
	
	public name: string

	constructor() {

		let entity: string = 'exam'

		super({

			name: {
				type: String,
				typed: 'string'
			},
			duration: {
				type: Number,
				typed: 'number'
			},
			description: {
				type: String,
				typed: 'string'
			},
			course: {
				ref: 'course',
				type: Schema.Types.ObjectId,
				typed: 'id',
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