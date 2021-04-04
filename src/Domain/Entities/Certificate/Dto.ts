import { IsDefined, IsString } from 'class-validator'
import { Schema } from 'mongoose'
import { injectable } from 'inversify'

import DtoUtil from '../Util/Dto'
import Interface from './Interface'

@injectable()
export default class EntityDto extends DtoUtil implements Interface {

	public calibration: Schema.Types.ObjectId
	public instrument: Schema.Types.ObjectId
	public business: Schema.Types.ObjectId
	public lastAlert: Date
	public nextAlert: Date

}