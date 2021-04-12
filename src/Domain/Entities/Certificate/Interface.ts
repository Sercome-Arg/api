import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	calibration: Schema.Types.ObjectId
	instrument: Schema.Types.ObjectId
	business: Schema.Types.ObjectId

	
}