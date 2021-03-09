import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	date: Schema.Types.ObjectId
	companyName: Schema.Types.ObjectId
	message: string
	
}