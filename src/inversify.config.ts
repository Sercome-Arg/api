import { Container } from "inversify";
import "reflect-metadata";
import { Router } from 'express'
import TYPES from "./TYPES";

// Containers
import EntityContainer from './Presentation/Controllers/Entity/inversify'
import MagnitudeContainer from './Presentation/Controllers/Magnitude/inversify'
import InstrumentContainer from './Presentation/Controllers/Instrument/inversify'
// containerimport

// Interfaces
// Single
import Appeable from './utils/Appeable'

import Authenticable from './Aplication/Services/Ports/Authenticable'
import CreateableToken from './Aplication/Services/Ports/CreateableToken'

import Responseable from './Presentation/Controllers/Responseable'
import Routeable from './Presentation/Controllers/Ports/Routeable'
import Authenticateable from './Presentation/Middlewares/Ports/Authenticateable'

import ConnectionableProvider from './Infrastructure/Persistence/Ports/ConnectionableProvider'
import GeteableModel from './Infrastructure/Persistence/Ports/GeteableModel'

import Validateable from './Domain/Middleware/Ports/Validateable'
import Validable from './Domain/Entities/Util/Ports/Validable'
import Schemable from './Domain/Entities/Util/Ports/Schemable'
import ResponseableDomain from './Domain/Entities/Util/Ports/Responseable'

import Controlleable from './Domain/Entities/Util/Ports/Controlleable'
import GeteableAll from './Domain/Entities/Util/Ports/GeteableAll'
import GeteableById from './Domain/Entities/Util/Ports/GeteableById'
import Updateable from './Domain/Entities/Util/Ports/Updateable'
import Saveable from './Domain/Entities/Util/Ports/Saveable'
import Searcheable from './Domain/Entities/Util/Ports/Searcheable'
import SendeableMail from './Aplication/UC/Ports/SendeableMail'

// Repeat
import GeteableCompanyStorage from './Presentation/Controllers/Ports/GeteableCompanyStorage'

import UserServiceableDomain from './Domain/Entities/User/Ports/Serviceable'
import SessionServiceableDomain from './Domain/Entities/Session/Ports/Serviceable'
import CompanyServiceableDomain from './Domain/Entities/Company/Ports/Serviceable'
import BankServiceableDomain from './Domain/Entities/Bank/Ports/Serviceable'
import ItemServiceableDomain from './Domain/Entities/Item/Ports/Serviceable'
import CategoryServiceableDomain from './Domain/Entities/Category/Ports/Serviceable'
import TransactionServiceableDomain from './Domain/Entities/Transaction/Ports/Serviceable'
import SubcategoryServiceableDomain from './Domain/Entities/Subcategory/Ports/Serviceable'
import MessageServiceableDomain from './Domain/Entities/Message/Ports/Serviceable'

import UserInterface from './Domain/Entities/User/Interface'
import SessionInterface from './Domain/Entities/Session/Interface'
import CompanyInterface from './Domain/Entities/Company/Interface'
import BankInterface from './Domain/Entities/Bank/Interface'
import ItemInterface from './Domain/Entities/Session/Interface'
import CategoryInterface from './Domain/Entities/Category/Interface'
import TransactionInterface from './Domain/Entities/Transaction/Interface'
import SubcategoryInterface from './Domain/Entities/Subcategory/Interface'
import MessageInterface from './Domain/Entities/Message/Interface'

import SessionBuilderable from './Domain/Entities/Session/Ports/Builderable'

// Implementations
// Single
import App from './app'

import AuthenticationAplication from './Aplication/Services/Authentication'
import TokenProvider from './Aplication/Services/TokenProvider'

import Responser from './Presentation/Controllers/Util/Responser'
import Authentication from './Presentation/Middlewares/Authentication'
import Storage from './Presentation/Controllers/Util/AgreementStorage'

import ConnectionProvider from './Infrastructure/Persistence/ConnectionProvider'

import Validation from './Domain/Middleware/Validation'
import Controller from './Domain/Entities/Util/Controller'
import ResponserDomain from './Domain/Entities/Util/Responser'
import SendMail from './Aplication/UC/SendMail'

// Repeat
import UserModel from './Domain/Entities/User/Model'
import SessionModel from './Domain/Entities/Session/Model'
import CompanyModel from './Domain/Entities/Company/Model'
import BankModel from './Domain/Entities/Bank/Model'
import ItemModel from './Domain/Entities/Item/Model'
import CategoryModel from './Domain/Entities/Category/Model'
import TransactionModel from './Domain/Entities/Transaction/Model'
import SubcategoryModel from './Domain/Entities/Subcategory/Model'
import MessageModel from './Domain/Entities/Message/Model'

import UserServiceDomain from './Domain/Entities/User/Controller'
import SessionServiceDomain from './Domain/Entities/Session/Controller'
import CompanyServiceDomain from './Domain/Entities/Company/Controller'
import BankServiceDomain from './Domain/Entities/Bank/Controller'
import ItemServiceDomain from './Domain/Entities/Item/Controller'
import CategoryServiceDomain from './Domain/Entities/Category/Controller'
import TransactionServiceDomain from './Domain/Entities/Transaction/Controller'
import SubcategoryServiceDomain from './Domain/Entities/Subcategory/Controller'
import MessageServiceDomain from './Domain/Entities/Message/Controller'

import LoginDto from './Presentation/Controllers/Authentication/Dto'
import UserDto from './Domain/Entities/User/Dto'
import SessionDto from './Domain/Entities/Session/Dto'
import CompanyDto from './Domain/Entities/Company/Dto'
import BankDto from './Domain/Entities/Bank/Dto'
import ItemDto from './Domain/Entities/Item/Dto'
import CategoryDto from './Domain/Entities/Category/Dto'
import TransactionDto from './Domain/Entities/Transaction/Dto'
import SubcategoryDto from './Domain/Entities/Subcategory/Dto'
import MessageDto from './Domain/Entities/Message/Dto'

import SessionBuilder from './Domain/Entities/Session/Builder'

import AuthenticationServicePresentation from './Presentation/Controllers/Authentication/Controller'
import UserServicePresentation from './Presentation/Controllers/User/Controller'
import SessionServicePresentation from './Presentation/Controllers/Session/Controller'
import CompanyServicePresentation from './Presentation/Controllers/Company/Controller'
import BankServicePresentation from './Presentation/Controllers/Bank/Controller'
import ItemServicePresentation from './Presentation/Controllers/Item/Controller'
import CategoryServicePresentation from './Presentation/Controllers/Category/Controller'
import TransactionServicePresentation from './Presentation/Controllers/Transaction/Controller'
import SubcategoryServicePresentation from './Presentation/Controllers/Subcategory/Controller'
import MessageServicePresentation from './Presentation/Controllers/Message/Controller'

import PostServiceableDomain from './Domain/Entities/Post/Ports/Serviceable'
import PostInterface from './Domain/Entities/Post/Interface'
import PostModel from './Domain/Entities/Post/Model'
import PostServiceDomain from './Domain/Entities/Post/Controller'
import PostDto from './Domain/Entities/Post/Dto'
import PostServicePresentation from './Presentation/Controllers/Post/Controller'

import ProposalServiceableDomain from './Domain/Entities/Proposal/Ports/Serviceable'
import ProposalInterface from './Domain/Entities/Proposal/Interface'
import ProposalModel from './Domain/Entities/Proposal/Model'
import ProposalServiceDomain from './Domain/Entities/Proposal/Controller'
import ProposalDto from './Domain/Entities/Proposal/Dto'
import ProposalServicePresentation from './Presentation/Controllers/Proposal/Controller'

import ProposalStateServiceableDomain from './Domain/Entities/ProposalState/Ports/Serviceable'
import ProposalStateInterface from './Domain/Entities/ProposalState/Interface'
import ProposalStateModel from './Domain/Entities/ProposalState/Model'
import ProposalStateServiceDomain from './Domain/Entities/ProposalState/Controller'
import ProposalStateDto from './Domain/Entities/ProposalState/Dto'
import ProposalStateServicePresentation from './Presentation/Controllers/ProposalState/Controller'

import PermissionServiceableDomain from './Domain/Entities/Permission/Ports/Serviceable'
import PermissionInterface from './Domain/Entities/Permission/Interface'
import PermissionModel from './Domain/Entities/Permission/Model'
import PermissionServiceDomain from './Domain/Entities/Permission/Controller'
import PermissionDto from './Domain/Entities/Permission/Dto'
import PermissionServicePresentation from './Presentation/Controllers/Permission/Controller'

import RolServiceableDomain from './Domain/Entities/Rol/Ports/Serviceable'
import RolInterface from './Domain/Entities/Rol/Interface'
import RolModel from './Domain/Entities/Rol/Model'
import RolServiceDomain from './Domain/Entities/Rol/Controller'
import RolDto from './Domain/Entities/Rol/Dto'
import RolServicePresentation from './Presentation/Controllers/Rol/Controller'

import MailServiceableDomain from './Domain/Entities/Mail/Ports/Serviceable'
import MailInterface from './Domain/Entities/Mail/Interface'
import MailModel from './Domain/Entities/Mail/Model'
import MailServiceDomain from './Domain/Entities/Mail/Controller'
import MailDto from './Domain/Entities/Mail/Dto'
import MailServicePresentation from './Presentation/Controllers/Mail/Controller'

import PaymentServiceableDomain from './Domain/Entities/Payment/Ports/Serviceable'
import PaymentInterface from './Domain/Entities/Payment/Interface'
import PaymentModel from './Domain/Entities/Payment/Model'
import PaymentServiceDomain from './Domain/Entities/Payment/Controller'
import PaymentDto from './Domain/Entities/Payment/Dto'
import PaymentServicePresentation from './Presentation/Controllers/Payment/Controller'

import SubscriptionServiceableDomain from './Domain/Entities/Subscription/Ports/Serviceable'
import SubscriptionInterface from './Domain/Entities/Subscription/Interface'
import SubscriptionModel from './Domain/Entities/Subscription/Model'
import SubscriptionServiceDomain from './Domain/Entities/Subscription/Controller'
import SubscriptionDto from './Domain/Entities/Subscription/Dto'
import SubscriptionServicePresentation from './Presentation/Controllers/Subscription/Controller'

import CourseServiceableDomain from './Domain/Entities/Course/Ports/Serviceable'
import CourseInterface from './Domain/Entities/Course/Interface'
import CourseModel from './Domain/Entities/Course/Model'
import CourseServiceDomain from './Domain/Entities/Course/Controller'
import CourseDto from './Domain/Entities/Course/Dto'
import CourseServicePresentation from './Presentation/Controllers/Course/Controller'

import StudentServiceableDomain from './Domain/Entities/Student/Ports/Serviceable'
import StudentInterface from './Domain/Entities/Student/Interface'
import StudentModel from './Domain/Entities/Student/Model'
import StudentServiceDomain from './Domain/Entities/Student/Controller'
import StudentDto from './Domain/Entities/Student/Dto'
import StudentServicePresentation from './Presentation/Controllers/Student/Controller'

import LinkServiceableDomain from './Domain/Entities/Link/Ports/Serviceable'
import LinkInterface from './Domain/Entities/Link/Interface'
import LinkModel from './Domain/Entities/Link/Model'
import LinkServiceDomain from './Domain/Entities/Link/Controller'
import LinkDto from './Domain/Entities/Link/Dto'
import LinkServicePresentation from './Presentation/Controllers/Link/Controller'

import FileServiceableDomain from './Domain/Entities/File/Ports/Serviceable'
import FileInterface from './Domain/Entities/File/Interface'
import FileModel from './Domain/Entities/File/Model'
import FileServiceDomain from './Domain/Entities/File/Controller'
import FileDto from './Domain/Entities/File/Dto'
import FileServicePresentation from './Presentation/Controllers/File/Controller'

import ExamServiceableDomain from './Domain/Entities/Exam/Ports/Serviceable'
import ExamInterface from './Domain/Entities/Exam/Interface'
import ExamModel from './Domain/Entities/Exam/Model'
import ExamServiceDomain from './Domain/Entities/Exam/Controller'
import ExamDto from './Domain/Entities/Exam/Dto'
import ExamServicePresentation from './Presentation/Controllers/Exam/Controller'

import QuestionServiceableDomain from './Domain/Entities/Question/Ports/Serviceable'
import QuestionInterface from './Domain/Entities/Question/Interface'
import QuestionModel from './Domain/Entities/Question/Model'
import QuestionServiceDomain from './Domain/Entities/Question/Controller'
import QuestionDto from './Domain/Entities/Question/Dto'
import QuestionServicePresentation from './Presentation/Controllers/Question/Controller'

import QuestionTypeServiceableDomain from './Domain/Entities/QuestionType/Ports/Serviceable'
import QuestionTypeInterface from './Domain/Entities/QuestionType/Interface'
import QuestionTypeModel from './Domain/Entities/QuestionType/Model'
import QuestionTypeServiceDomain from './Domain/Entities/QuestionType/Controller'
import QuestionTypeDto from './Domain/Entities/QuestionType/Dto'
import QuestionTypeServicePresentation from './Presentation/Controllers/QuestionType/Controller'

import QuizServiceableDomain from './Domain/Entities/Quiz/Ports/Serviceable'
import QuizInterface from './Domain/Entities/Quiz/Interface'
import QuizModel from './Domain/Entities/Quiz/Model'
import QuizServiceDomain from './Domain/Entities/Quiz/Controller'
import QuizDto from './Domain/Entities/Quiz/Dto'
import QuizServicePresentation from './Presentation/Controllers/Quiz/Controller'

import QuestionQuizServiceableDomain from './Domain/Entities/QuestionQuiz/Ports/Serviceable'
import QuestionQuizInterface from './Domain/Entities/QuestionQuiz/Interface'
import QuestionQuizModel from './Domain/Entities/QuestionQuiz/Model'
import QuestionQuizServiceDomain from './Domain/Entities/QuestionQuiz/Controller'
import QuestionQuizDto from './Domain/Entities/QuestionQuiz/Dto'
import QuestionQuizServicePresentation from './Presentation/Controllers/QuestionQuiz/Controller'

import MagnitudeServiceableDomain from './Domain/Entities/Magnitude/Ports/Serviceable'
import MagnitudeInterface from './Domain/Entities/Magnitude/Interface'
import MagnitudeModel from './Domain/Entities/Magnitude/Model'
import MagnitudeServiceDomain from './Domain/Entities/Magnitude/Controller'
import MagnitudeDto from './Domain/Entities/Magnitude/Dto'
import MagnitudeServicePresentation from './Presentation/Controllers/Magnitude/Controller'

var container = new Container()

container.bind<SendeableMail>(TYPES.SendeableMail).to(SendMail)
container.bind<Appeable>(TYPES.Appeable).to(App)
container.bind<Responseable>(TYPES.Responseable).to(Responser)
container.bind<Authenticateable>(TYPES.Authenticateable).to(Authentication)
container.bind<ConnectionableProvider>(TYPES.ConnectionableProvider).to(ConnectionProvider)
container.bind<GeteableModel>(TYPES.GeteableModel).to(ConnectionProvider)
container.bind<Validateable>(TYPES.Validateable).to(Validation)
container.bind<Router>(TYPES.Router).toConstantValue(Router())
container.bind<ResponseableDomain>(TYPES.ResponseableDomain).to(ResponserDomain)
container.bind<Authenticable>(TYPES.Authenticable).to(AuthenticationAplication)
container.bind<CreateableToken>(TYPES.CreateableToken).to(TokenProvider)

container.bind<Controlleable>(TYPES.Controlleable).to(Controller)
container.bind<Updateable>(TYPES.Updateable).to(Controller)
container.bind<GeteableAll>(TYPES.GeteableAll).to(Controller)
container.bind<GeteableById>(TYPES.GeteableById).to(Controller)
container.bind<Saveable>(TYPES.Saveable).to(Controller)
container.bind<Searcheable>(TYPES.Searcheable).to(Controller)

container.bind<GeteableCompanyStorage>(TYPES.GeteableCompanyStorage).to(Storage)

container.bind<Schemable>(TYPES.Schemable).toConstantValue(new UserModel).whenTargetNamed(TYPES.User)
container.bind<Schemable>(TYPES.Schemable).toConstantValue(new SessionModel).whenTargetNamed(TYPES.Session)
container.bind<Schemable>(TYPES.Schemable).toConstantValue(new CompanyModel).whenTargetNamed(TYPES.Company)
container.bind<Schemable>(TYPES.Schemable).toConstantValue(new BankModel).whenTargetNamed(TYPES.Bank)
container.bind<Schemable>(TYPES.Schemable).toConstantValue(new ItemModel).whenTargetNamed(TYPES.Item)
container.bind<Schemable>(TYPES.Schemable).toConstantValue(new CategoryModel).whenTargetNamed(TYPES.Category)
container.bind<Schemable>(TYPES.Schemable).toConstantValue(new TransactionModel).whenTargetNamed(TYPES.Transaction)
container.bind<Schemable>(TYPES.Schemable).toConstantValue(new SubcategoryModel).whenTargetNamed(TYPES.Subcategory)
container.bind<Schemable>(TYPES.Schemable).toConstantValue(new MessageModel).whenTargetNamed(TYPES.Message)

container.bind<Validable>(TYPES.Validable).to(LoginDto).whenTargetNamed(TYPES.Login)
container.bind<Validable>(TYPES.Validable).to(UserDto).whenTargetNamed(TYPES.User)
container.bind<Validable>(TYPES.Validable).to(SessionDto).whenTargetNamed(TYPES.Session)
container.bind<Validable>(TYPES.Validable).to(CompanyDto).whenTargetNamed(TYPES.Company)
container.bind<Validable>(TYPES.Validable).to(BankDto).whenTargetNamed(TYPES.Bank)
container.bind<Validable>(TYPES.Validable).to(ItemDto).whenTargetNamed(TYPES.Item)
container.bind<Validable>(TYPES.Validable).to(CategoryDto).whenTargetNamed(TYPES.Category)
container.bind<Validable>(TYPES.Validable).to(TransactionDto).whenTargetNamed(TYPES.Transaction)
container.bind<Validable>(TYPES.Validable).to(SubcategoryDto).whenTargetNamed(TYPES.Subcategory)
container.bind<Validable>(TYPES.Validable).to(MessageDto).whenTargetNamed(TYPES.Message)

container.bind<UserInterface>(TYPES.UserInterface).toConstantValue(new UserDto)
container.bind<SessionInterface>(TYPES.SessionInterface).toConstantValue(new SessionDto)
container.bind<CompanyInterface>(TYPES.CompanyInterface).toConstantValue(new CompanyDto)
container.bind<BankInterface>(TYPES.BankInterface).toConstantValue(new BankDto)
container.bind<ItemInterface>(TYPES.ItemInterface).toConstantValue(new ItemDto)
container.bind<CategoryInterface>(TYPES.CategoryInterface).toConstantValue(new CategoryDto)
container.bind<TransactionInterface>(TYPES.TransactionInterface).toConstantValue(new TransactionDto)
container.bind<SubcategoryInterface>(TYPES.SubcategoryInterface).toConstantValue(new SubcategoryDto)
container.bind<MessageInterface>(TYPES.MessageInterface).toConstantValue(new MessageDto)

container .bind<SessionBuilderable>(TYPES.SessionBuilderable).to(SessionBuilder)

container.bind<UserServiceableDomain>(TYPES.UserServiceableDomain).to(UserServiceDomain)
container.bind<SessionServiceableDomain>(TYPES.SessionServiceableDomain).to(SessionServiceDomain)
container.bind<CompanyServiceableDomain>(TYPES.CompanyServiceableDomain).to(CompanyServiceDomain)
container.bind<BankServiceableDomain>(TYPES.BankServiceableDomain).to(BankServiceDomain)
container.bind<ItemServiceableDomain>(TYPES.ItemServiceableDomain).to(ItemServiceDomain)
container.bind<CategoryServiceableDomain>(TYPES.CategoryServiceableDomain).to(CategoryServiceDomain)
container.bind<TransactionServiceableDomain>(TYPES.TransactionServiceableDomain).to(TransactionServiceDomain)
container.bind<SubcategoryServiceableDomain>(TYPES.SubcategoryServiceableDomain).to(SubcategoryServiceDomain)
container.bind<MessageServiceableDomain>(TYPES.MessageServiceableDomain).to(MessageServiceDomain)

container.bind<Routeable>(TYPES.Routeable).to(AuthenticationServicePresentation)
container.bind<Routeable>(TYPES.Routeable).to(UserServicePresentation)
container.bind<Routeable>(TYPES.Routeable).to(SessionServicePresentation)
container.bind<Routeable>(TYPES.Routeable).to(CompanyServicePresentation)
container.bind<Routeable>(TYPES.Routeable).to(BankServicePresentation)
container.bind<Routeable>(TYPES.Routeable).to(ItemServicePresentation)
container.bind<Routeable>(TYPES.Routeable).to(CategoryServicePresentation)
container.bind<Routeable>(TYPES.Routeable).to(TransactionServicePresentation)
container.bind<Routeable>(TYPES.Routeable).to(SubcategoryServicePresentation)
container.bind<Routeable>(TYPES.Routeable).to(MessageServicePresentation)

container.bind<Schemable>(TYPES.Schemable).toConstantValue(new PostModel).whenTargetNamed(TYPES.Post)
container.bind<Validable>(TYPES.Validable).to(PostDto).whenTargetNamed(TYPES.Post)
container.bind<PostInterface>(TYPES.PostInterface).toConstantValue(new PostDto)
container.bind<PostServiceableDomain>(TYPES.PostServiceableDomain).to(PostServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(PostServicePresentation)

container.bind<Schemable>(TYPES.Schemable).toConstantValue(new ProposalModel).whenTargetNamed(TYPES.Proposal)
container.bind<Validable>(TYPES.Validable).to(ProposalDto).whenTargetNamed(TYPES.Proposal)
container.bind<ProposalInterface>(TYPES.ProposalInterface).toConstantValue(new ProposalDto)
container.bind<ProposalServiceableDomain>(TYPES.ProposalServiceableDomain).to(ProposalServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(ProposalServicePresentation)

container.bind<Schemable>(TYPES.Schemable).toConstantValue(new ProposalStateModel).whenTargetNamed(TYPES.ProposalState)
container.bind<Validable>(TYPES.Validable).to(ProposalStateDto).whenTargetNamed(TYPES.ProposalState)
container.bind<ProposalStateInterface>(TYPES.ProposalStateInterface).toConstantValue(new ProposalStateDto)
container.bind<ProposalStateServiceableDomain>(TYPES.ProposalStateServiceableDomain).to(ProposalStateServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(ProposalStateServicePresentation)

container.bind<Schemable>(TYPES.Schemable).toConstantValue(new PermissionModel).whenTargetNamed(TYPES.Permission)
container.bind<Validable>(TYPES.Validable).to(PermissionDto).whenTargetNamed(TYPES.Permission)
container.bind<PermissionInterface>(TYPES.PermissionInterface).toConstantValue(new PermissionDto)
container.bind<PermissionServiceableDomain>(TYPES.PermissionServiceableDomain).to(PermissionServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(PermissionServicePresentation)

container.bind<Schemable>(TYPES.Schemable).toConstantValue(new RolModel).whenTargetNamed(TYPES.Rol)
container.bind<Validable>(TYPES.Validable).to(RolDto).whenTargetNamed(TYPES.Rol)
container.bind<RolInterface>(TYPES.RolInterface).toConstantValue(new RolDto)
container.bind<RolServiceableDomain>(TYPES.RolServiceableDomain).to(RolServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(RolServicePresentation)

container.bind<Schemable>(TYPES.Schemable).toConstantValue(new MailModel).whenTargetNamed(TYPES.Mail)
container.bind<Validable>(TYPES.Validable).to(MailDto).whenTargetNamed(TYPES.Mail)
container.bind<MailInterface>(TYPES.MailInterface).toConstantValue(new MailDto)
container.bind<MailServiceableDomain>(TYPES.MailServiceableDomain).to(MailServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(MailServicePresentation)

container.bind<Schemable>(TYPES.Schemable).toConstantValue(new PaymentModel).whenTargetNamed(TYPES.Payment)
container.bind<Validable>(TYPES.Validable).to(PaymentDto).whenTargetNamed(TYPES.Payment)
container.bind<PaymentInterface>(TYPES.PaymentInterface).toConstantValue(new PaymentDto)
container.bind<PaymentServiceableDomain>(TYPES.PaymentServiceableDomain).to(PaymentServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(PaymentServicePresentation)

container.bind<Schemable>(TYPES.Schemable).toConstantValue(new SubscriptionModel).whenTargetNamed(TYPES.Subscription)
container.bind<Validable>(TYPES.Validable).to(SubscriptionDto).whenTargetNamed(TYPES.Subscription)
container.bind<SubscriptionInterface>(TYPES.SubscriptionInterface).toConstantValue(new SubscriptionDto)
container.bind<SubscriptionServiceableDomain>(TYPES.SubscriptionServiceableDomain).to(SubscriptionServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(SubscriptionServicePresentation)

container.bind<Schemable>(TYPES.Schemable).toConstantValue(new CourseModel).whenTargetNamed(TYPES.Course)
container.bind<Validable>(TYPES.Validable).to(CourseDto).whenTargetNamed(TYPES.Course)
container.bind<CourseInterface>(TYPES.CourseInterface).toConstantValue(new CourseDto)
container.bind<CourseServiceableDomain>(TYPES.CourseServiceableDomain).to(CourseServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(CourseServicePresentation)

container.bind<Schemable>(TYPES.Schemable).toConstantValue(new StudentModel).whenTargetNamed(TYPES.Student)
container.bind<Validable>(TYPES.Validable).to(StudentDto).whenTargetNamed(TYPES.Student)
container.bind<StudentInterface>(TYPES.StudentInterface).toConstantValue(new StudentDto)
container.bind<StudentServiceableDomain>(TYPES.StudentServiceableDomain).to(StudentServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(StudentServicePresentation)

container.bind<Schemable>(TYPES.Schemable).toConstantValue(new LinkModel).whenTargetNamed(TYPES.Link)
container.bind<Validable>(TYPES.Validable).to(LinkDto).whenTargetNamed(TYPES.Link)
container.bind<LinkInterface>(TYPES.LinkInterface).toConstantValue(new LinkDto)
container.bind<LinkServiceableDomain>(TYPES.LinkServiceableDomain).to(LinkServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(LinkServicePresentation)

container.bind<Schemable>(TYPES.Schemable).toConstantValue(new FileModel).whenTargetNamed(TYPES.File)
container.bind<Validable>(TYPES.Validable).to(FileDto).whenTargetNamed(TYPES.File)
container.bind<FileInterface>(TYPES.FileInterface).toConstantValue(new FileDto)
container.bind<FileServiceableDomain>(TYPES.FileServiceableDomain).to(FileServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(FileServicePresentation)

container.bind<Schemable>(TYPES.Schemable).toConstantValue(new ExamModel).whenTargetNamed(TYPES.Exam)
container.bind<Validable>(TYPES.Validable).to(ExamDto).whenTargetNamed(TYPES.Exam)
container.bind<ExamInterface>(TYPES.ExamInterface).toConstantValue(new ExamDto)
container.bind<ExamServiceableDomain>(TYPES.ExamServiceableDomain).to(ExamServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(ExamServicePresentation)

container.bind<Schemable>(TYPES.Schemable).toConstantValue(new QuestionModel).whenTargetNamed(TYPES.Question)
container.bind<Validable>(TYPES.Validable).to(QuestionDto).whenTargetNamed(TYPES.Question)
container.bind<QuestionInterface>(TYPES.QuestionInterface).toConstantValue(new QuestionDto)
container.bind<QuestionServiceableDomain>(TYPES.QuestionServiceableDomain).to(QuestionServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(QuestionServicePresentation)

container.bind<Schemable>(TYPES.Schemable).toConstantValue(new QuestionTypeModel).whenTargetNamed(TYPES.QuestionType)
container.bind<Validable>(TYPES.Validable).to(QuestionTypeDto).whenTargetNamed(TYPES.QuestionType)
container.bind<QuestionTypeInterface>(TYPES.QuestionTypeInterface).toConstantValue(new QuestionTypeDto)
container.bind<QuestionTypeServiceableDomain>(TYPES.QuestionTypeServiceableDomain).to(QuestionTypeServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(QuestionTypeServicePresentation)

container.bind<Schemable>(TYPES.Schemable).toConstantValue(new QuizModel).whenTargetNamed(TYPES.Quiz)
container.bind<Validable>(TYPES.Validable).to(QuizDto).whenTargetNamed(TYPES.Quiz)
container.bind<QuizInterface>(TYPES.QuizInterface).toConstantValue(new QuizDto)
container.bind<QuizServiceableDomain>(TYPES.QuizServiceableDomain).to(QuizServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(QuizServicePresentation)

container.bind<Schemable>(TYPES.Schemable).toConstantValue(new QuestionQuizModel).whenTargetNamed(TYPES.QuestionQuiz)
container.bind<Validable>(TYPES.Validable).to(QuestionQuizDto).whenTargetNamed(TYPES.QuestionQuiz)
container.bind<QuestionQuizInterface>(TYPES.QuestionQuizInterface).toConstantValue(new QuestionQuizDto)
container.bind<QuestionQuizServiceableDomain>(TYPES.QuestionQuizServiceableDomain).to(QuestionQuizServiceDomain)
container.bind<Routeable>(TYPES.Routeable).to(QuestionQuizServicePresentation)

let containerReturn = Container.merge(container, EntityContainer)
containerReturn = Container.merge(container, MagnitudeContainer)
containerReturn = Container.merge(container, InstrumentContainer)
// push

export default containerReturn
