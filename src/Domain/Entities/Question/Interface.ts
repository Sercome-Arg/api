import { Schema } from 'mongoose'
import InterfaceUtil from './../Util/Ports/Dtoable'

export default interface Interface extends InterfaceUtil {

  question: string
  type: string
  answerList: [{
		answer: string,
		calification: number,
	}]
  exam: Schema.Types.ObjectId
}