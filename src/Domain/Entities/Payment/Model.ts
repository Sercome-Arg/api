import { Schema } from 'mongoose'
import { injectable } from 'inversify';

import Schemable from '../Util/Model'
import Nameable from '../Util/Ports/Nameable'

@injectable()
export default class ENTITY_SCHEMA extends Schemable implements Nameable {
	
	public name: string

	constructor() {

		let entity: string = 'payment'

		super({

			collectorWingcamp: {
				ref: 'user',
				typed: 'id',
				type: Schema.Types.ObjectId,
			},
			payerWingascamp: {
				ref: 'user',
				typed: 'id',
				type: Schema.Types.ObjectId,
			},
			amountMeli: {
				type: String,
				typed: 'string'
			},
			discountMeli: {
				type: String,
				typed: 'string'
			},
			totalMeli: {
				type: String,
				typed: 'string'
			},
			operationNumberMeli: {
				type: String,
				typed: 'string'
			},
			statusMeli: {
				type: String,
				typed: 'string'
			},
			ejectMeli: {
				type: Date,
				typed: 'date'
			},
			paymentMethodMeli: {
				type: String,
				typed: 'string'
			},
			barcodeMeli: {
				type: String,
				typed: 'string'
			},
			transactionNumbreMeli: {
				type: String,
				typed: 'string'
			},
			finalCollectorMeli: {
				type: String,
				typed: 'string'
			},

			idMeli: {
				type: Number,
				typed: 'number'
			},
			// date_created: {
			// 	type: Date,
			// 	typed: 'date'
			// },
			// date_approved: {
			// 	type: Date,
			// 	typed: 'date'
			// },
			// date_last_updated: {
			// 	type: Date,
			// 	typed: 'date'
			// },
			// date_of_expiration: {
			// 	type: String,
			// 	typed: 'string',
			// 	default: null
			// },
			// money_release_date: {
			// 	type: Date,
			// 	typed: 'date'
			// },
			// operation_type: {
			// 	type: String,
			// 	typed: 'string'
			// },
			// issuer_id: {
			// 	type: String,
			// 	typed: 'string'
			// },
			// payment_method_id: {
			// 	type: String,
			// 	typed: 'string'
			// },
			// payment_type_id: {
			// 	type: String,
			// 	typed: 'string'
			// },
			// status: {
			// 	type: String,
			// 	typed: 'string'
			// },
			// status_detail: {
			// 	type: String,
			// 	typed: 'string'
			// },
			// currency_id: {
			// 	type: String,
			// 	typed: 'string'
			// },
			// live_mode: {
			// 	type: Boolean,
			// 	typed: 'boolean'
			// },
			// sponsor_id: {
			// 	type: String,
			// 	typed: 'string',
			// 	default: null
			// },
			// authorization_code: {
			// 	type: String,
			// 	typed: 'string',
			// 	default: null
			// },
			// money_release_schema: {
			// 	type: String,
			// 	typed: 'string',
			// 	default: null
			// },
			// taxes_amount: {
			// 	type: Number,
			// 	typed: 'number'
			// },
			// counter_currency: {
			// 	type: String,
			// 	typed: 'string',
			// 	default: null
			// },
			// brand_id: {
			// 	type: String,
			// 	typed: 'string',
			// 	default: null
			// },
			// shipping_amount: {
			// 	type: Number,
			// 	typed: 'number'
			// },
			// pos_id: {
			// 	type: String,
			// 	typed: 'string',
			// 	default: null
			// },
			// store_id: {
			// 	type: String,
			// 	typed: 'string',
			// 	default: null
			// },
			// integrator_id: {
			// 	type: String,
			// 	typed: 'string',
			// 	default: null
			// },
			// platform_id: {
			// 	type: String,
			// 	typed: 'string',
			// 	default: null
			// },
			// corporation_id: {
			// 	type: String,
			// 	typed: 'string',
			// 	default: null
			// },
			// collector_id: {
			// 	type: Number,
			// 	typed: 'number'
			// },
			// payer: {
			// 	type: Schema.Types.Mixed,
			// 	typed: 'object'
			// },
			// marketplace_owner: {
			// 	type: String,
			// 	typed: 'string',
			// 	default: null
			// },
			// metadata: {
			// 	type: Schema.Types.Mixed,
			// 	typed: 'object'
			// },
			// additional_info: {
			// 	type: Schema.Types.Mixed,
			// 	typed: 'object'
			// },
			// order: {
			// 	type: Schema.Types.Mixed,
			// 	typed: 'object'
			// },
			// external_reference: {
			// 	type: String,
			// 	typed: 'string',
			// 	default: null
			// },
			// transaction_amount: {
			// 	type: Number,
			// 	typed: 'number'
			// },
			// transaction_amount_refunded: {
			// 	type: Number,
			// 	typed: 'number'
			// },
			// coupon_amount: {
			// 	type: Number,
			// 	typed: 'number'
			// },
			// differential_pricing_id: {
			// 	type: String,
			// 	typed: 'string',
			// 	default: null
			// },
			// deduction_schema: {
			// 	type: String,
			// 	typed: 'string',
			// 	default: null
			// },
			// installments: {
			// 	type: Number,
			// 	typed: 'number'
			// },
			// transaction_details: {
			// 	type: Schema.Types.Mixed,
			// 	typed: 'object'
			// },
			// fee_details: [{
			// 	type: Schema.Types.Mixed,
			// 	typed: 'object'
			// }],
			// charges_details: [{
			// 	type: Schema.Types.Mixed,
			// 	typed: 'object'
			// }],
			// captured: {
			// 	type: Boolean,
			// 	typed: 'boolean'
			// },
			// binary_mode: {
			// 	type: Boolean,
			// 	typed: 'boolean'
			// },
			// call_for_authorize_id: {
			// 	type: String,
			// 	typed: 'string',
			// 	default: null
			// },
			// statement_descriptor: {
			// 	type: String,
			// 	typed: 'string'
			// },
			// card: {
			// 	type: Schema.Types.Mixed,
			// 	typed: 'object'
			// },
			// notification_url: {
			// 	type: String,
			// 	typed: 'string',
			// 	default: null
			// },
			// refunds: [{
			// 	type: Schema.Types.Mixed,
			// 	typed: 'object'
			// }],
			// processing_mode: {
			// 	type: String,
			// 	typed: 'string'
			// },
			// merchant_account_id: {
			// 	type: String,
			// 	typed: 'string',
			// 	default: null
			// },
			// merchant_number: {
			// 	type: String,
			// 	typed: 'string',
			// 	default: null
			// },
			// acquirer_reconciliation: [{
			// 	type: Schema.Types.Mixed,
			// 	typed: 'object'
			// }],

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