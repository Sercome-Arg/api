import Schema from '../Util/Model'
import Nameable from '../Util/Ports/Nameable'
import { injectable } from 'inversify';

@injectable()
export default class ENTITY_SCHEMA extends Schema implements Nameable {
	
	public name: string

	constructor() {
		super({
			name: {
				type: String,
				typed: 'string'
			},
			surname: {
				type: String,
				typed: 'string'
			},
			dni: {
				type: Number,
				typed: 'number'
			},
			email: {
				type: String,
				typed: 'string',
				lowercase: true,
			},
			password: {
				type: String,
				typed: 'string'
			},
			enabled: {
				type: Boolean,
				typed: 'string',
				default: false,
			},
			token: {
				type: String,
				typed: 'string'
			},
			tokenExpiration: {
				type: Number,
				typed: 'string',
				default: 1440
			},
			aceptTC: {
				type: Boolean,
				typed: 'boolean',
				default: false
			},
			wingcoins: {
				type: Number,
				typed: 'number',
				default: 0
			},
			phone: {
				type: Number,
				typed: 'number',
				default: 0
			},
			image: {
				type: String,
				typed: 'string'
			},
			googleId: {
				type: String,
				typed: 'string'
			},
			verified: {
				type: Boolean,
				typed: 'boolean'
			},
			facebookId: {
				type: String,
				typed: 'string'
			},
			country: {
				type: String,
				typed: 'string'
			},
			city: {
				type: String,
				typed: 'string'
			},
			profession: {
				type: String,
				typed: 'string'
			},
			user: {
				type: String,
				typed: 'string'
			},
			rol: {
				ref: 'rol',
				typed: 'id',
				type: Schema.Types.ObjectId,
			},
			mailVerified: {
				type: Boolean,
				typed: 'boolean',
				default: false
			},
			idMail: {
				type: String,
				typed: 'string',
			},
			survey: {
				type: String,
				typed: 'string',
			},
		}, {
			collection: 'user'
		})

		this.name = 'user'

	}
}