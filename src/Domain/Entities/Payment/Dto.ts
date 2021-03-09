import { IsDefined, IsString } from 'class-validator'
import { Schema } from 'mongoose'
import { injectable } from 'inversify'

import DtoUtil from '../Util/Dto'
import Interface from './Interface'

@injectable()
export default class EntityDto extends DtoUtil implements Interface {

	public collectorMeli: Schema.Types.ObjectId
	public payerMeli: Schema.Types.ObjectId
	public amountMeli: string
	public discountMeli: string
	public totalMeli: string 
	public operationNumberMeli: string
	public statusMeli: string
	public ejectMeli: Date
	public paymentMethodMeli: string
	public barcodeMeli: string
	public transactionNumbreMeli: string
	public finalCollectorMeli: string

	public idMeli: number
	// public date_created: Date
	// public date_approved: Date
	// public date_last_updated: Date
	// public date_of_expiration: string | null
	// public money_release_date: Date
	// public operation_type: string
	// public issuer_id: string
	// public payment_method_id: string
	// public payment_type_id: string
	// public status: string
	// public status_detail: string
	// public currency_id: string
	// public live_mode: false
	// public sponsor_id: string | null
	// public authorization_code: string | null
	// public money_release_schema: string | null
	// public taxes_amount: number
	// public counter_currency: string | null
	// public brand_id: string | null
	// public shipping_amount: number
	// public pos_id: string | null
	// public store_id: string | null
	// public integrator_id: string | null
	// public platform_id: string | null
	// public corporation_id: string | null
	// public collector_id: number
	// public payer: any
	// public marketplace_owner: string | null
	// public metadata: any
	// public additional_info: any
	// public order: any
	// public external_reference: string | null
	// public transaction_amount: number
	// public transaction_amount_refunded: number
	// public coupon_amount: number
	// public differential_pricing_id: string | null
	// public deduction_schema: string | null
	// public installments: number
	// public transaction_details: any
	// public fee_details: any[]
	// public charges_details: any[]
	// public captured: boolean
	// public binary_mode: boolean
	// public call_for_authorize_id: string | null
	// public statement_descriptor: string
	// public card: any
	// public notification_url: string | null
	// public refunds: any[]
	// public processing_mode: string
	// public merchant_account_id: string | null
	// public merchant_number: string | null
	// public acquirer_reconciliation: any[]

}