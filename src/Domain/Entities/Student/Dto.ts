import { IsDefined, IsString } from 'class-validator'
import { Schema } from 'mongoose'
import { injectable } from 'inversify'

import DtoUtil from '../Util/Dto'
import Interface from './Interface'

@injectable()
export default class EntityDto extends DtoUtil implements Interface {

	public name: string
	public user: string
	public mail: string
	public pass: string
	public course: Schema.Types.ObjectId
	public userId: Schema.Types.ObjectId
	
}