import TYPES from './../../../TYPES'
import { Container } from "inversify";
import "reflect-metadata";

import Schemable from './../../../Domain/Entities/Util/Ports/Schemable'
import Validable from './../../../Domain/Entities/Util/Ports/Validable'
import Routeable from './../../../Presentation/Controllers/Ports/Routeable'

import CalibrationServiceableDomain from './../../../Domain/Entities/Calibration/Ports/Serviceable'
import CalibrationInterface from './../../../Domain/Entities/Calibration/Interface'
import CalibrationModel from './../../../Domain/Entities/Calibration/Model'
import CalibrationServiceDomain from './../../../Domain/Entities/Calibration/Controller'
import CalibrationDto from './../../../Domain/Entities/Calibration/Dto'
import CalibrationServicePresentation from './../../../Presentation/Controllers/Calibration/Controller'

var container = new Container()
container.bind<Schemable>(TYPES.Schemable).toConstantValue(new CalibrationModel).whenTargetNamed(TYPES.Calibration)
container.bind<Validable>(TYPES.Validable).to(CalibrationDto).whenTargetNamed(TYPES.Calibration)
container.bind<CalibrationInterface>(TYPES.CalibrationInterface).toConstantValue(new CalibrationDto)
container.bind<CalibrationServiceableDomain>(TYPES.CalibrationServiceableDomain).to(CalibrationServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(CalibrationServicePresentation)

export default container