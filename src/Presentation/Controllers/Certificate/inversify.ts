import TYPES from './../../../TYPES'
import { Container } from "inversify";
import "reflect-metadata";

import Schemable from './../../../Domain/Entities/Util/Ports/Schemable'
import Validable from './../../../Domain/Entities/Util/Ports/Validable'
import Routeable from './../../../Presentation/Controllers/Ports/Routeable'

import CertificateServiceableDomain from './../../../Domain/Entities/Certificate/Ports/Serviceable'
import CertificateInterface from './../../../Domain/Entities/Certificate/Interface'
import CertificateModel from './../../../Domain/Entities/Certificate/Model'
import CertificateServiceDomain from './../../../Domain/Entities/Certificate/Controller'
import CertificateDto from './../../../Domain/Entities/Certificate/Dto'
import CertificateServicePresentation from './../../../Presentation/Controllers/Certificate/Controller'

var container = new Container()
container.bind<Schemable>(TYPES.Schemable).toConstantValue(new CertificateModel).whenTargetNamed(TYPES.Certificate)
container.bind<Validable>(TYPES.Validable).to(CertificateDto).whenTargetNamed(TYPES.Certificate)
container.bind<CertificateInterface>(TYPES.CertificateInterface).toConstantValue(new CertificateDto)
container.bind<CertificateServiceableDomain>(TYPES.CertificateServiceableDomain).to(CertificateServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(CertificateServicePresentation)

export default container