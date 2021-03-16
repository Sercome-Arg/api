import { Model, Document } from 'mongoose'

import Controlleable from '../../Util/Ports/Controlleable'
import Responseable from '../../Util/Ports/Responseable'

export default interface Validateable {

	validate(
		data: {
			origin: number,
			CUIT: number,
			price: number
		},
		paymentModel: Model<Document, {}>,
	): Promise<Responseable>

}