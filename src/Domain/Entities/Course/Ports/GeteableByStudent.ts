import { Model, Document } from 'mongoose'

import Responseable from '../../Util/Ports/Responseable'

export default interface GeteableByStudent {
	getByStudent(
		model: Model<Document, {}>,
		studentModel: Model<Document, {}>,
		userModel: Model<Document, {}>,
		idUser: string
	): Promise<Responseable>
}