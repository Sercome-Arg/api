import ExistableUserWithThatUser from './ExistableUserWithThatUser'
import ExistableUserWithThatEmail from './ExistableUserWithThatEmail'
import Saveable from './Saveable'
import SaveableWithUser from './SaveableWithUser'
import GeteableAll from './GeteableAll'
import GeteableById from './GeteableById'
import HashablePassword from './HashablePassword'
import Updateable from './Updateable'
import IsableEnable from './IsableEnable'
import IsableMatch from './IsableMatch'
import GeteableUserByEmail from './GeteableUserByEmail'
import GeteableUserByUser from './GeteableUserByUser'

export default interface Serviceable extends
	ExistableUserWithThatUser,
	ExistableUserWithThatEmail,
	Saveable,
	SaveableWithUser,
	GeteableAll,
	GeteableById,
	HashablePassword,
	Updateable,
	IsableEnable,
	IsableMatch,
	GeteableUserByEmail,
	GeteableUserByUser {}