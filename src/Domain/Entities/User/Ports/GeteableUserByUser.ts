import { Model, Document } from 'mongoose'
import Responseable from 'Domain/Entities/Util/Ports/Responseable'

export default interface GeteableUserByUser {
	getUserByUser(
		user: string,
		model: Model<Document, {}>
	): Promise<Responseable>
}