import TYPES from './../../../TYPES'
import { Container } from "inversify";
import "reflect-metadata";

import Schemable from './../../../Domain/Entities/Util/Ports/Schemable'
import Validable from './../../../Domain/Entities/Util/Ports/Validable'
import Routeable from './../../../Presentation/Controllers/Ports/Routeable'

import MagnitudeServiceableDomain from './../../../Domain/Entities/Magnitude/Ports/Serviceable'
import MagnitudeInterface from './../../../Domain/Entities/Magnitude/Interface'
import MagnitudeModel from './../../../Domain/Entities/Magnitude/Model'
import MagnitudeServiceDomain from './../../../Domain/Entities/Magnitude/Controller'
import MagnitudeDto from './../../../Domain/Entities/Magnitude/Dto'
import MagnitudeServicePresentation from './../../../Presentation/Controllers/Magnitude/Controller'

var container = new Container()
container.bind<Schemable>(TYPES.Schemable).toConstantValue(new MagnitudeModel).whenTargetNamed(TYPES.Magnitude)
container.bind<Validable>(TYPES.Validable).to(MagnitudeDto).whenTargetNamed(TYPES.Magnitude)
container.bind<MagnitudeInterface>(TYPES.MagnitudeInterface).toConstantValue(new MagnitudeDto)
container.bind<MagnitudeServiceableDomain>(TYPES.MagnitudeServiceableDomain).to(MagnitudeServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(MagnitudeServicePresentation)

export default container