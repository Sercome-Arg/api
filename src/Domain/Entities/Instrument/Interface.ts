import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	name: string
	business: Schema.Types.ObjectId
	magnitude: Schema.Types.ObjectId
	
}