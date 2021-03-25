import { Schema } from 'mongoose'
import { injectable } from 'inversify';

import Schemable from '../Util/Model'
import Nameable from '../Util/Ports/Nameable'

@injectable()
export default class ENTITY_SCHEMA extends Schemable implements Nameable {
	
	public name: string

	constructor() {

		let entity: string = 'bank'

		super({

			name: {
				type: String,
				typed: 'string'
			},
			adress: {
				type: String,
				typed: entity
			},
			phone: {
				type: Number,
				typed: entity
			},
			email: {
				type: String,
				typed: entity
			},
			area: {
				type: String,
				typed: entity
			},
			agent: {
				type: String,
				typed: entity
			},
			process: {
				type: String,
				typed: entity
			},
			cuit: {
				type: String,
				typed: entity
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