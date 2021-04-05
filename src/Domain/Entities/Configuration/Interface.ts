import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	nextAlertYear: number
	nextAlertMonth: number
	nextAlertDay: number
	
}