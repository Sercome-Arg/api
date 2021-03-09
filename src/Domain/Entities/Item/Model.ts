import { Schema } from 'mongoose'
import { injectable } from 'inversify';

import Schemable from '../Util/Model'
import Nameable from '../Util/Ports/Nameable'

@injectable()
export default class ENTITY_SCHEMA extends Schemable implements Nameable {
	
	public name: string

	constructor() {

		let entity: string = 'item'

		super({
			name: {
				type: String,
				typed: 'string'
			},
			subcategory: [{
				subcategory: {
					ref: 'subcategory',
					type: Schema.Types.ObjectId,
					typed: 'string'
				}
			}],
			tag: [{
				name: {
					type: String,
					typed: 'string'
				}
			}],
			description: {
				type: String,
				typed: 'string'
			},
			price: {
				type: Number,
				typed: 'number'
			},
			tyc: {
				type: Boolean,
				typed: 'boolean',
				default: false
			},
			urls: [{
				type: String,
				typed: 'string'
			}],
			shortDescription: {
				type: String,
				typed: 'string'
			},
			state: {
				type: Boolean,
				typed: 'boolean',
				default: false
			},
			display: {
				type: Boolean,
				typed: 'boolean',
				default: true
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