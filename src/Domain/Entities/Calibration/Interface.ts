import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	name: String
	instrument: Schema.Types.ObjectId
	business: Schema.Types.ObjectId
	lastAlert: Date
	nextAlert: Date
	
}