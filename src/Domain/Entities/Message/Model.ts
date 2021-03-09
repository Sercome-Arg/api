import { Schema } from 'mongoose'
import { injectable } from 'inversify';

import Schemable from '../Util/Model'
import Nameable from '../Util/Ports/Nameable'

@injectable()
export default class ENTITY_SCHEMA extends Schemable implements Nameable {
	
	public name: string

	constructor() {

		let entity: string = 'message'

		super({

			receiver: {
				ref: 'user',
				typed: 'id',
				type: Schema.Types.ObjectId,
			},
			item: {
				ref: 'item',
				typed: 'id',
				default: null,
				type: Schema.Types.ObjectId,
			},
			text: {
				type: String,
				default: '',
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