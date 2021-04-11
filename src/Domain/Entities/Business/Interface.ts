import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	name: string
	area: Schema.Types.ObjectId
	address: string
	phone: string
	CUIT: number
	agent: Schema.Types.ObjectId
	
}