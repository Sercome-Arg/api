import GeteableAll from './GeteableAll'
import Saveable from './Saveable'
import GeteableById from './GeteableById'
import Updateable from './Updateable'
import Searcheable from './Searcheable'

export default interface Controlleable extends 
  GeteableAll, 
  Saveable, 
  GeteableById, 
  Updateable,
  Searcheable {}