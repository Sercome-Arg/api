import { Model, Document } from 'mongoose'
import Responseable from '../../Util/Ports/Responseable'

export default interface GeteableAll {
	search(
    model: Model<Document, {}>,
    search: string
	): Promise<Responseable>
}