import { Model, Document } from 'mongoose'
import Responseable from '../../Util/Ports/Responseable'

export default interface ExistableUserWithThatUser {

	existUserWithThatUser(
		user: string,
		model: Model<Document, {}>,
	): Promise<Responseable>

}