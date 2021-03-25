import { IsDefined, IsString } from 'class-validator'
import { Schema } from 'mongoose'
import { injectable } from 'inversify'

import DtoUtil from '../Util/Dto'
import Interface from './Interface'

@injectable()
export default class EntityDto extends DtoUtil implements Interface {

	public name: string
	public adress: string
	public phone: number
	public email: string
	public area: string
	public agent: string
	public process: string
	public cuit: string


}