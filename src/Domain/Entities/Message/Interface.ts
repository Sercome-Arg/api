import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	text: string
	receiver: Schema.Types.ObjectId
	item: Schema.Types.ObjectId
	
}