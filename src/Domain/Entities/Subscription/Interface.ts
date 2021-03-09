import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	user: Schema.Types.ObjectId | string
	end: number
	start: number
	
}