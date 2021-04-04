import TYPES from './../../../TYPES'
import { Container } from "inversify";
import "reflect-metadata";

import Schemable from './../../../Domain/Entities/Util/Ports/Schemable'
import Validable from './../../../Domain/Entities/Util/Ports/Validable'
import Routeable from './../../../Presentation/Controllers/Ports/Routeable'

import UnitServiceableDomain from './../../../Domain/Entities/Unit/Ports/Serviceable'
import UnitInterface from './../../../Domain/Entities/Unit/Interface'
import UnitModel from './../../../Domain/Entities/Unit/Model'
import UnitServiceDomain from './../../../Domain/Entities/Unit/Controller'
import UnitDto from './../../../Domain/Entities/Unit/Dto'
import UnitServicePresentation from './../../../Presentation/Controllers/Unit/Controller'

var container = new Container()
container.bind<Schemable>(TYPES.Schemable).toConstantValue(new UnitModel).whenTargetNamed(TYPES.Unit)
container.bind<Validable>(TYPES.Validable).to(UnitDto).whenTargetNamed(TYPES.Unit)
container.bind<UnitInterface>(TYPES.UnitInterface).toConstantValue(new UnitDto)
container.bind<UnitServiceableDomain>(TYPES.UnitServiceableDomain).to(UnitServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(UnitServicePresentation)

export default container