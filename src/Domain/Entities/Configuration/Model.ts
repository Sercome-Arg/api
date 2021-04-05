import { Schema } from 'mongoose'
import { injectable } from 'inversify';

import Schemable from '../Util/Model'
import Nameable from '../Util/Ports/Nameable'

@injectable()
export default class ENTITY_SCHEMA extends Schemable implements Nameable {
	
	public name: string

	constructor() {

		let entity: string = 'configuration'

		super({

			nextAlertYear: {
				type: Number,
				typed: 'number'
			},
			nextAlertMonth: {
				type: Number,
				typed: 'number'
			},
			nextAlertDay: {
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