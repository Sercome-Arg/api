import { Model, Document } from 'mongoose'

import RegistrableWithUser from './RegistrableWithUser'
import Responseable from '../../Util/Ports/Responseable'

export default interface SaveableWithUser {

	saveWithUser(
		obj: RegistrableWithUser,
		model: Model<Document, {}>,
		idUser?: string
	): Promise<Responseable>

}