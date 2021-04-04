import TYPES from './../../../TYPES'
import { Container } from "inversify";
import "reflect-metadata";

import Schemable from './../../../Domain/Entities/Util/Ports/Schemable'
import Validable from './../../../Domain/Entities/Util/Ports/Validable'
import Routeable from './../../../Presentation/Controllers/Ports/Routeable'

import AreaServiceableDomain from './../../../Domain/Entities/Area/Ports/Serviceable'
import AreaInterface from './../../../Domain/Entities/Area/Interface'
import AreaModel from './../../../Domain/Entities/Area/Model'
import AreaServiceDomain from './../../../Domain/Entities/Area/Controller'
import AreaDto from './../../../Domain/Entities/Area/Dto'
import AreaServicePresentation from './../../../Presentation/Controllers/Area/Controller'

var container = new Container()
container.bind<Schemable>(TYPES.Schemable).toConstantValue(new AreaModel).whenTargetNamed(TYPES.Area)
container.bind<Validable>(TYPES.Validable).to(AreaDto).whenTargetNamed(TYPES.Area)
container.bind<AreaInterface>(TYPES.AreaInterface).toConstantValue(new AreaDto)
container.bind<AreaServiceableDomain>(TYPES.AreaServiceableDomain).to(AreaServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(AreaServicePresentation)

export default container