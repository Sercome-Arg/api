import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	item: Schema.Types.ObjectId
	amount: number
	totalPrice: number
	seller: Schema.Types.ObjectId
	buyer: Schema.Types.ObjectId
	start: Date
	end: Date
	
}