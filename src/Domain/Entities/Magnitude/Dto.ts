import { IsDefined, IsString } from 'class-validator'
import { Schema } from 'mongoose'
import { injectable } from 'inversify'

import DtoUtil from '../Util/Dto'
import Interface from './Interface'

@injectable()
export default class EntityDto extends DtoUtil implements Interface {

	public name: string
<<<<<<< HEAD
	public unitMeasure: string
	public instrument: Schema.Types.ObjectId
=======
	public unit: string

>>>>>>> f4479a5d22f72996eca7ffb2726f351a3310c9f1
}