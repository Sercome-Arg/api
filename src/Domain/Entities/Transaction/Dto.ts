import { IsDefined, IsString } from 'class-validator'
import { Schema } from 'mongoose'
import { injectable } from 'inversify'

import DtoUtil from '../Util/Dto'
import Interface from './Interface'

@injectable()
export default class EntityDto extends DtoUtil implements Interface {

	public item: Schema.Types.ObjectId
	public amount: number
	public totalPrice: number
	public seller: Schema.Types.ObjectId
	public buyer: Schema.Types.ObjectId
	public start: Date
	public end: Date

}