import { Schema } from 'mongoose'
import { injectable } from 'inversify';

import Schemable from '../Util/Model'
import Nameable from '../Util/Ports/Nameable'

@injectable()
export default class ENTITY_SCHEMA extends Schemable implements Nameable {
	
	public name: string

	constructor() {

		let entity: string = 'mail'

		super({

			from: {
				type: String,
				typed: 'string'
			},
			pass: {
				type: String,
				typed: 'string'
			},
			enabled: {
				type: Boolean,
				typed: 'boolean'
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