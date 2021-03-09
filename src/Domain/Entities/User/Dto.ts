import { IsArray, IsDefined, IsEmail, IsNumber, IsString, MinLength, ValidateIf, IsBoolean } from 'class-validator'
import { Schema } from 'mongoose'
import { injectable } from 'inversify'

import DtoUtil from '../Util/Dto'
import Interface from './Interface'

@injectable()
export default class EntityDto extends DtoUtil implements Interface {

	@ValidateIf(o => o.name !== undefined)
	@IsString()
	public name: string

	@ValidateIf(o => o.surname !== undefined)
	@IsString()
	public surname: string

	@ValidateIf(o => o.dni !== undefined)
	@IsNumber({}, {
		message: "El dni debe ser un número"
	})
	public dni: number

	@IsDefined()
	@IsEmail({}, {
		message: "Se debe ingresar un email válido."
	})
	public email: string

	@ValidateIf(o => o.password !== undefined)
	@MinLength(6,{
		message: "La contraseña debe tener minimo 6 carácteres."
	})
	@IsString()
	public password: string

	@ValidateIf(o => o.password !== undefined)
	public enabled: boolean

	@ValidateIf(o => o.token !== undefined)
	@IsString()
	public token: string

	@ValidateIf(o => o.tokenExpiration !== undefined)
	@IsNumber()
	public tokenExpiration: number

	@ValidateIf(o => o.aceptTC !== undefined)
	@IsBoolean()
	public aceptTC: boolean

	public wingcoins: number
	public phone: number
	public image: string
	public googleId: string
	public verified: boolean
	public facebookId: string
	public country: string
	public city: string
	public profession: string
	public user: string
	public rol: Schema.Types.ObjectId
	public mailVerified: boolean
	public idMail: string
	public survey: string

}