import { Model, Document } from 'mongoose'
import Responseable from '../../Util/Ports/Responseable'

export default interface ExistableUserWithThatEmail {

	existUserWithThatEmail(
		email: string,
		model: Model<Document, {}>,
	): Promise<Responseable>

}