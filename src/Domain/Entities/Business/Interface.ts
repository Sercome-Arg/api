import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	name: string
	area: Schema.Types.ObjectId
	address: string
	email: string
	phone: string
	CUIT: number
	
}