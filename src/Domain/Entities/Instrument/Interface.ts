import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

	name: string
	ID: string
	brand: string
	version: string
	numberOfSerie: string
	business: Schema.Types.ObjectId
	magnitude: Schema.Types.ObjectId
	unit: Schema.Types.ObjectId
	minimumWorkingRange: string
	maximumWorkingRange: string
	minimumMeasurementRange: string
	maximumMeasurementRange: string
	validateYear: number
	validateMonth: number
	validateDay: number
	
}