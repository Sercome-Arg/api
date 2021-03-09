import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	name: string
	description: string
	price: number
	start: Date 
	end: Date 
	color: string
	caratula: string
	logo: string
	
}