import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	date: number
	file: string
	instrument: Schema.Types.ObjectId
	
}