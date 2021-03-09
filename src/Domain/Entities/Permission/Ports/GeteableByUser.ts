import { Model, Document } from 'mongoose'

import Responseable from '../../Util/Ports/Responseable'

export default interface GeteableByUser {
	getByUser(
		model: Model<Document, {}>,
	  userModel: Model<Document, {}>,
		userId: string,
	): Promise<Responseable>
}