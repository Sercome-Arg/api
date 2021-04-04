import TYPES from './../../../TYPES'
import { Container } from "inversify";
import "reflect-metadata";

import Schemable from './../../../Domain/Entities/Util/Ports/Schemable'
import Validable from './../../../Domain/Entities/Util/Ports/Validable'
import Routeable from './../../../Presentation/Controllers/Ports/Routeable'

import AlertServiceableDomain from './../../../Domain/Entities/Alert/Ports/Serviceable'
import AlertInterface from './../../../Domain/Entities/Alert/Interface'
import AlertModel from './../../../Domain/Entities/Alert/Model'
import AlertServiceDomain from './../../../Domain/Entities/Alert/Controller'
import AlertDto from './../../../Domain/Entities/Alert/Dto'
import AlertServicePresentation from './../../../Presentation/Controllers/Alert/Controller'

var container = new Container()
container.bind<Schemable>(TYPES.Schemable).toConstantValue(new AlertModel).whenTargetNamed(TYPES.Alert)
container.bind<Validable>(TYPES.Validable).to(AlertDto).whenTargetNamed(TYPES.Alert)
container.bind<AlertInterface>(TYPES.AlertInterface).toConstantValue(new AlertDto)
container.bind<AlertServiceableDomain>(TYPES.AlertServiceableDomain).to(AlertServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(AlertServicePresentation)

export default container