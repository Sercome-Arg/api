import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	name: string
	subcategory: Schema.Types.ObjectId[]
	tag: {
		name: string
	}[]
	description: string
	price: number
	tyc: boolean
	urls: {
		name: string
	}[]
	shortDescription: string
	state: boolean
	display: boolean
	
	
}