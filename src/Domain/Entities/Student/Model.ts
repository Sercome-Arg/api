import { Schema } from 'mongoose'
import { injectable } from 'inversify';

import Schemable from '../Util/Model'
import Nameable from '../Util/Ports/Nameable'

@injectable()
export default class ENTITY_SCHEMA extends Schemable implements Nameable {
	
	public name: string

	constructor() {

		let entity: string = 'student'

		super({

			name: {
				type: String,
				typed: 'string'
			},
			user: {
				type: String,
				typed: 'string'
			},
			mail: {
				type: String,
				typed: 'string'
			},
			pass: {
				type: String,
				typed: 'string'
			},
			course: {
				ref: 'course',
				typed: 'id',
				type: Schema.Types.ObjectId,
			},
			userId: {
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