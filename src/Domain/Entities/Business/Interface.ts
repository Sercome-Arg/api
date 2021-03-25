import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	name: string
	adress: string
	phone: number
	email: string
	area: string
	agent: string
	process: string
	cuit: string

}