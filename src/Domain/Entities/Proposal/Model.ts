import { Schema } from 'mongoose'
import { injectable } from 'inversify';

import Schemable from '../Util/Model'
import Nameable from '../Util/Ports/Nameable'

@injectable()
export default class ENTITY_SCHEMA extends Schemable implements Nameable {
	
	public name: string

	constructor() {

		let entity: string = 'proposal'

		super({

			description: {
				type: String,
				typed: 'string'
			},
			aceptTC: {
				type: Boolean,
				typed: 'boolean'
			},
			price: {
				type: Number,
				typed: 'number'
			},
			proposalState: {
				ref: 'proposalState',
				typed: 'id',
				type: Schema.Types.ObjectId,
			},
			resource: [{
				url: {
					type: String,
					typed: 'string'
				}
			}],
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