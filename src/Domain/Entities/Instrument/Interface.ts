import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	name: string
	date:  Schema.Types.ObjectId
	calibration:  Schema.Types.ObjectId
	
}