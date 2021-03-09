import { Schema } from 'mongoose'
import { injectable } from 'inversify';

import Schemable from '../Util/Model'
import Nameable from '../Util/Ports/Nameable'

@injectable()
export default class ENTITY_SCHEMA extends Schemable implements Nameable {
	
	public name: string

	constructor() {

		let entity: string = 'transaction'

		super({

			item: {
				ref: 'item',
				typed: 'id',
				type: Schema.Types.ObjectId,
			},
			amount: {
				type: Number,
				typed: 'number'
			},
			totalPrice: {
				type: Number,
				typed: 'number'
			},
			seller: {
				ref: 'user',
				typed: 'id',
				type: Schema.Types.ObjectId,
			},
			buyer: {
				ref: 'user',
				typed: 'id',
				type: Schema.Types.ObjectId,
			},
			start: {
				type: Date,
				typed: 'date'
			},
			end: {
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