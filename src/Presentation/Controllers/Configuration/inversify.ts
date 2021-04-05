import TYPES from './../../../TYPES'
import { Container } from "inversify";
import "reflect-metadata";

import Schemable from './../../../Domain/Entities/Util/Ports/Schemable'
import Validable from './../../../Domain/Entities/Util/Ports/Validable'
import Routeable from './../../../Presentation/Controllers/Ports/Routeable'

import ConfigurationServiceableDomain from './../../../Domain/Entities/Configuration/Ports/Serviceable'
import ConfigurationInterface from './../../../Domain/Entities/Configuration/Interface'
import ConfigurationModel from './../../../Domain/Entities/Configuration/Model'
import ConfigurationServiceDomain from './../../../Domain/Entities/Configuration/Controller'
import ConfigurationDto from './../../../Domain/Entities/Configuration/Dto'
import ConfigurationServicePresentation from './../../../Presentation/Controllers/Configuration/Controller'

var container = new Container()
container.bind<Schemable>(TYPES.Schemable).toConstantValue(new ConfigurationModel).whenTargetNamed(TYPES.Configuration)
container.bind<Validable>(TYPES.Validable).to(ConfigurationDto).whenTargetNamed(TYPES.Configuration)
container.bind<ConfigurationInterface>(TYPES.ConfigurationInterface).toConstantValue(new ConfigurationDto)
container.bind<ConfigurationServiceableDomain>(TYPES.ConfigurationServiceableDomain).to(ConfigurationServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(ConfigurationServicePresentation)

export default container