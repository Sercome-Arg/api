import Saveable from './Saveable'
import GeteableAll from './GeteableAll'
import GeteableById from './GeteableById'
import Updateable from './Updateable'
import GeteableByStudent from './GeteableByStudent'

export default interface Serviceable extends
	Saveable,
	GeteableAll,
	GeteableById,
	Updateable,
	GeteableByStudent {}