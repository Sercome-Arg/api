import { Schema } from 'mongoose'
import { injectable } from 'inversify';

import Schemable from '../Util/Model'
import Nameable from '../Util/Ports/Nameable'

@injectable()
export default class ENTITY_SCHEMA extends Schemable implements Nameable {
	
	public name: string

	constructor() {

		let entity: string = 'course'

		super({

			name: {
				type: String,
				typed: 'string'
			},
			description: {
				type: String,
				typed: 'string'
			},
			price: {
				type: Number,
				typed: 'number'
			},
			start: {
				type: Date,
				typed: 'date'
			},
			end: {
				type: Date,
				typed: 'date'
			},
			color: {
				type: String,
				typed: 'string'
			},
			caratula: {
				type: String,
				typed: 'string'
			},
			logo: {
				type: String,
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