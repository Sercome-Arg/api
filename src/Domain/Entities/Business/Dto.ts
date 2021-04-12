import { IsDefined, IsString } from 'class-validator'
import { Schema } from 'mongoose'
import { injectable } from 'inversify'

import DtoUtil from '../Util/Dto'
import Interface from './Interface'

@injectable()
export default class EntityDto extends DtoUtil implements Interface {

	public name: string
	public area: Schema.Types.ObjectId
	public address: string
	public phone: string
	public CUIT: number
	public agent: Schema.Types.ObjectId

}