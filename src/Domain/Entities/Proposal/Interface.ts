import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	description: string
	aceptTC: boolean
	price: number
	proposalState: Schema.Types.ObjectId
	resource: {
		url: string
	}[]
	
}