import TYPES from './../../../TYPES'
import { Container } from "inversify";
import "reflect-metadata";

import Schemable from './../../../Domain/Entities/Util/Ports/Schemable'
import Validable from './../../../Domain/Entities/Util/Ports/Validable'
import Routeable from './../../../Presentation/Controllers/Ports/Routeable'

import InstrumentServiceableDomain from './../../../Domain/Entities/Instrument/Ports/Serviceable'
import InstrumentInterface from './../../../Domain/Entities/Instrument/Interface'
import InstrumentModel from './../../../Domain/Entities/Instrument/Model'
import InstrumentServiceDomain from './../../../Domain/Entities/Instrument/Controller'
import InstrumentDto from './../../../Domain/Entities/Instrument/Dto'
import InstrumentServicePresentation from './../../../Presentation/Controllers/Instrument/Controller'

var container = new Container()
container.bind<Schemable>(TYPES.Schemable).toConstantValue(new InstrumentModel).whenTargetNamed(TYPES.Instrument)
container.bind<Validable>(TYPES.Validable).to(InstrumentDto).whenTargetNamed(TYPES.Instrument)
container.bind<InstrumentInterface>(TYPES.InstrumentInterface).toConstantValue(new InstrumentDto)
container.bind<InstrumentServiceableDomain>(TYPES.InstrumentServiceableDomain).to(InstrumentServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(InstrumentServicePresentation)

export default container