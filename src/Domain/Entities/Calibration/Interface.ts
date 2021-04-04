import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	instrument: Schema.Types.ObjectId
	business: Schema.Types.ObjectId
	
}