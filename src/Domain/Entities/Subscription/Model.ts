import { Schema } from 'mongoose'
import { injectable } from 'inversify';

import Schemable from '../Util/Model'
import Nameable from '../Util/Ports/Nameable'

@injectable()
export default class ENTITY_SCHEMA extends Schemable implements Nameable {
	
	public name: string

	constructor() {

		let entity: string = 'subscription'

		super({

			user: {
				ref: 'user',
				type: Schema.Types.ObjectId,
				typed: 'string'
			},
			end: {
				type: Number,
				typed: 'number'
			},
			start: {
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