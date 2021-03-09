import { Model, Document } from 'mongoose'

import Logueable from '../../../Domain/Entities/User/Ports/Logueable'
import LogueableWithUser from '../../../Domain/Entities/User/Ports/LogueableWithUser'
import LogueableVerified from '../../../Domain/Entities/User/Ports/LogueableVerified'
import Registrable from '../../../Domain/Entities/User/Ports/Registrable'
import RegistrableWithUser from '../../../Domain/Entities/User/Ports/RegistrableWithUser'

import Responseable from '../../../Domain/Entities/Util/Ports/Responseable'

export default interface Authenticable {

	register(
		userData: Registrable,
		database: string,
		model: Model<Document, {}>,
		companyModel: Model<Document, {}>,
		mailModel: Model<Document, {}>,
		subscriptionModel: Model<Document, {}>,
	): Promise<Responseable>

	registerWithUser(
		userData: RegistrableWithUser,
		database: string,
		model: Model<Document, {}>,
		companyModel: Model<Document, {}>,
		mailModel: Model<Document, {}>,
		subscriptionModel: Model<Document, {}>,
	): Promise<Responseable>

	login(
		loginData: Logueable,
		database: string,
		model: Model<Document, {}>,
		permissionModel: Model<Document, {}>
	): Promise<Responseable>

	loginWithUser(
		loginData: LogueableWithUser,
		database: string,
		model: Model<Document, {}>
	): Promise<Responseable>

	loginVerified(
		loginData: LogueableVerified,
		database: string,
		model: Model<Document, {}>
	): Promise<Responseable>

	resetPass(
		user: string,
		userModel: Model<Document, {}>,
		mailModel: Model<Document, {}>,
	): Promise<Responseable>

	getPass(
		user: string,
		pass: string,
		userModel: Model<Document, {}>,
	): Promise<Responseable>

}