import { Schema } from 'mongoose'
import { injectable } from 'inversify';

import Schemable from '../Util/Model'
import Nameable from '../Util/Ports/Nameable'

@injectable()
export default class ENTITY_SCHEMA extends Schemable implements Nameable {
	
	public name: string

	constructor() {

		let entity: string = 'business'

		super({

			name: {
				type: String,
				typed: 'string'
			},
			area: {
				ref: 'area',
				typed: 'id',
				type: Schema.Types.ObjectId,
			},
			address: {
				type: String,
				typed: 'string'
			},
			phone: {
				type: String,
				typed: 'string'
			},
			CUIT: {
				type: Number,
				typed: 'number'
			},
			agent: {
				ref: 'user',
				typed: 'id',
				type: Schema.Types.ObjectId,
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