import { Schema } from 'mongoose'
import { injectable } from 'inversify';

import Schemable from '../Util/Model'
import Nameable from '../Util/Ports/Nameable'

@injectable()
export default class ENTITY_SCHEMA extends Schemable implements Nameable {
	
	public name: string

	constructor() {

		let entity: string = 'question'

		super({

			question: {
				type: String,
				typed: 'string'
			},
			type: {
				ref: 'questionType',
				type: Schema.Types.ObjectId,
				typed: 'id',
			},
			answerList: [{
				answer: { type: String, default: '' },
				calification: { type: Number, default: 0 }
			}],
			exam: {
				ref: 'exam',
				type: Schema.Types.ObjectId,
				typed: 'id',
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