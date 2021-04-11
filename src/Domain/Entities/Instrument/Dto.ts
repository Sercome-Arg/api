import { IsDefined, IsString } from 'class-validator'
import { Schema } from 'mongoose'
import { injectable } from 'inversify'

import DtoUtil from '../Util/Dto'
import Interface from './Interface'

@injectable()
export default class EntityDto extends DtoUtil implements Interface {

	public name: string
	public ID: string
	public brand: string
	public version: string
	public numberOfSerie: string
	public business: Schema.Types.ObjectId
	public magnitude: Schema.Types.ObjectId
	public unit: Schema.Types.ObjectId
	public minimumWorkingRange: number
	public maximumWorkingRange: number
	public minimumMeasurementRange: number
	public maximumMeasurementRange: number
	public validateYear: number
	public validateMonth: number
	public validateDay: number

}