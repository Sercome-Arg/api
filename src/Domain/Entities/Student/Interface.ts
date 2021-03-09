import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	name: string
	user: string
	mail: string
	pass: string
	course: Schema.Types.ObjectId
	userId: Schema.Types.ObjectId
	
}