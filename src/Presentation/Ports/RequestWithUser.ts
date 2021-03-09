import { Request } from 'express'
import User from '../../Domain/Entities/User/Interface'

interface RequestWithUser extends Request {
	user: User
	database: string
	file: any
}

export default RequestWithUser;
