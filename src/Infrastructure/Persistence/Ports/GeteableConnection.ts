import { Model, Document, Schema } from 'mongoose'
import DBConnection from './../DBConnection'

export default interface GeteableConnection {
	getConnection(
		database?: string,
	): DBConnection
}