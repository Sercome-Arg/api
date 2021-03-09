import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	collectorMeli: Schema.Types.ObjectId
	payerMeli: Schema.Types.ObjectId
	amountMeli: string
	discountMeli: string
	totalMeli: string 
	operationNumberMeli: string
	statusMeli: string
	ejectMeli: Date
	paymentMethodMeli: string
	barcodeMeli: string
	transactionNumbreMeli: string
	finalCollectorMeli: string

	idMeli: number
	// date_created: Date
	// date_approved: Date
	// date_last_updated: Date
	// date_of_expiration: string | null
	// money_release_date: Date
	// operation_type: string
	// issuer_id: string
	// payment_method_id: string
	// payment_type_id: string
	// status: string
	// status_detail: string
	// currency_id: string
	// live_mode: boolean
	// sponsor_id: string | null
	// authorization_code: string | null
	// money_release_schema: string | null
	// taxes_amount: number
	// counter_currency: string | null
	// brand_id: string | null
	// shipping_amount: number
	// pos_id: string | null
	// store_id: string | null
	// integrator_id: string | null
	// platform_id: string | null
	// corporation_id: string | null
	// collector_id: number
	// payer: any
	// marketplace_owner: string | null
	// metadata: any
	// additional_info: any
	// order: any
	// external_reference: string | null
	// transaction_amount: number
	// transaction_amount_refunded: number
	// coupon_amount: number
	// differential_pricing_id: string | null
	// deduction_schema: string | null
	// installments: number
	// transaction_details: any
	// fee_details: any[]
	// charges_details: any[]
	// captured: boolean
	// binary_mode: boolean
	// call_for_authorize_id: string | null
	// statement_descriptor: string
	// card: any
	// notification_url: string | null
	// refunds: any[]
	// processing_mode: string
	// merchant_account_id: string | null
	// merchant_number: string | null
	// acquirer_reconciliation: any[]
	
}