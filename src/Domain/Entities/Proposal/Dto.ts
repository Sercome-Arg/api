import { IsDefined, IsString } from 'class-validator'
import { Schema } from 'mongoose'
import { injectable } from 'inversify'

import DtoUtil from '../Util/Dto'
import Interface from './Interface'

@injectable()
export default class EntityDto extends DtoUtil implements Interface {

	public description: string
	public aceptTC: boolean
	public price: number
	public approved: boolean
	public proposalState: Schema.Types.ObjectId
	public resource: {
		url: string
	}[]

}