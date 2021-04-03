import TYPES from './../../../TYPES'
import { Container } from "inversify";
import "reflect-metadata";

import Schemable from './../../../Domain/Entities/Util/Ports/Schemable'
import Validable from './../../../Domain/Entities/Util/Ports/Validable'
import Routeable from './../../../Presentation/Controllers/Ports/Routeable'

import BusinessServiceableDomain from './../../../Domain/Entities/Business/Ports/Serviceable'
import BusinessInterface from './../../../Domain/Entities/Business/Interface'
import BusinessModel from './../../../Domain/Entities/Business/Model'
import BusinessServiceDomain from './../../../Domain/Entities/Business/Controller'
import BusinessDto from './../../../Domain/Entities/Business/Dto'
import BusinessServicePresentation from './../../../Presentation/Controllers/Business/Controller'

var container = new Container()
container.bind<Schemable>(TYPES.Schemable).toConstantValue(new BusinessModel).whenTargetNamed(TYPES.Business)
container.bind<Validable>(TYPES.Validable).to(BusinessDto).whenTargetNamed(TYPES.Business)
container.bind<BusinessInterface>(TYPES.BusinessInterface).toConstantValue(new BusinessDto)
container.bind<BusinessServiceableDomain>(TYPES.BusinessServiceableDomain).to(BusinessServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(BusinessServicePresentation)

export default container