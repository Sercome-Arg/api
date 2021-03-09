const TYPES = {

  SendeableMail: Symbol.for('SendeableMail'),

  Routeable: Symbol.for('Routeable'),
  Responseable: Symbol.for('Responseable'),
  Appeable: Symbol.for('Appeable'),
  Schemable: Symbol.for('Schemable'),
  ConnectionableProvider: Symbol.for('ConnectionableProvider'),
  GeteableModel: Symbol.for('GeteableModel'),
  Authenticateable: Symbol.for('Authenticateable'),
  Validateable: Symbol.for('Validateable'),
  Router: Symbol.for('Router'),
  Validable: Symbol.for('Validable'),
  ResponseableDomain: Symbol.for('ResponseableDomain'),
  Authenticable: Symbol.for('Authenticable'),
  CreateableToken: Symbol.for('CreateableToken'),
  Modelable: Symbol.for('Modelable'),

  Controlleable: Symbol.for('Controlleable'),
  Updateable: Symbol.for('Updateable'),
  GeteableById: Symbol.for('GeteableById'),
  Saveable: Symbol.for('Saveable'),
  GeteableAll: Symbol.for('GeteableAll'),
  Searcheable: Symbol.for('Searcheable'),
  
  GeteableCompanyStorage: Symbol.for('GeteableCompanyStorage'),
  
  Login: Symbol.for('Login'),
  User: Symbol.for('User'),
  Session: Symbol.for('Session'),
  Company: Symbol.for('Company'),
  Bank: Symbol.for('Bank'),
  Item: Symbol.for('Item'),
  Category: Symbol.for('Category'),
  Transaction: Symbol.for('Transaction'),
  Subcategory: Symbol.for('Subcategory'),
  Message: Symbol.for('Message'),

  UserInterface: Symbol.for('UserInterface'),
  SessionInterface: Symbol.for('SessionInterface'),
  CompanyInterface: Symbol.for('CompanyInterface'),
  BankInterface: Symbol.for('BankInterface'),
  ItemInterface: Symbol.for('ItemInterface'),
  CategoryInterface: Symbol.for('CategoryInterface'),
  TransactionInterface: Symbol.for('TransactionInterface'),
  SubcategoryInterface: Symbol.for('SubcategoryInterface'),
  MessageInterface: Symbol.for('MessageInterface'),

  SessionBuilderable: Symbol.for('SessionBuilderable'),

  UserServiceableDomain: Symbol.for('UserServiceableDomain'),
  SessionServiceableDomain: Symbol.for('SessionServiceableDomain'),
  CompanyServiceableDomain: Symbol.for('CompanyServiceableDomain'),
  BankServiceableDomain: Symbol.for('BankServiceableDomain'),
  ItemServiceableDomain: Symbol.for('ItemServiceableDomain'),
  CategoryServiceableDomain: Symbol.for('CategoryServiceableDomain'),
  TransactionServiceableDomain: Symbol.for('TransactionServiceableDomain'),
  SubcategoryServiceableDomain: Symbol.for('SubcategoryServiceableDomain'),
  MessageServiceableDomain: Symbol.for('MessageServiceableDomain'),

  Post: Symbol.for('Post'),
  PostInterface: Symbol.for('PostInterface'),
  PostServiceableDomain: Symbol.for('PostServiceableDomain'),

  Proposal: Symbol.for('Proposal'),
  ProposalInterface: Symbol.for('ProposalInterface'),
  ProposalServiceableDomain: Symbol.for('ProposalServiceableDomain'),

  ProposalState: Symbol.for('ProposalState'),
  ProposalStateInterface: Symbol.for('ProposalStateInterface'),
  ProposalStateServiceableDomain: Symbol.for('ProposalStateServiceableDomain'),

  Permission: Symbol.for('Permission'),
  PermissionInterface: Symbol.for('PermissionInterface'),
  PermissionServiceableDomain: Symbol.for('PermissionServiceableDomain'),

  Rol: Symbol.for('Rol'),
  RolInterface: Symbol.for('RolInterface'),
  RolServiceableDomain: Symbol.for('RolServiceableDomain'),

  Mail: Symbol.for('Mail'),
  MailInterface: Symbol.for('MailInterface'),
  MailServiceableDomain: Symbol.for('MailServiceableDomain'),

  Payment: Symbol.for('Payment'),
  PaymentInterface: Symbol.for('PaymentInterface'),
  PaymentServiceableDomain: Symbol.for('PaymentServiceableDomain'),

  Subscription: Symbol.for('Subscription'),
  SubscriptionInterface: Symbol.for('SubscriptionInterface'),
  SubscriptionServiceableDomain: Symbol.for('SubscriptionServiceableDomain'),

	Hernan: Symbol.for('Hernan'),
	HernanInterface: Symbol.for('HernanInterface'),
	HernanServiceableDomain: Symbol.for('HernanServiceableDomain'),

	Course: Symbol.for('Course'),
  CourseInterface: Symbol.for('CourseInterface'),
  CourseServiceableDomain: Symbol.for('CourseServiceableDomain'),
  
  Student: Symbol.for('Student'),
  
  StudentInterface: Symbol.for('StudentInterface'),
  StudentServiceableDomain: Symbol.for('StudentServiceableDomain'),

  LinkInterface: Symbol.for('LinkInterface'),
  LinkServiceableDomain: Symbol.for('LinkServiceableDomain'),
  Link: Symbol.for('Link'),

  FileInterface: Symbol.for('FileInterface'),
  FileServiceableDomain: Symbol.for('FileServiceableDomain'),
  File: Symbol.for('File'),

  ExamInterface: Symbol.for('ExamInterface'),
  ExamServiceableDomain: Symbol.for('ExamServiceableDomain'),
  Exam: Symbol.for('Exam'),

  QuestionInterface: Symbol.for('QuestionInterface'),
  QuestionServiceableDomain: Symbol.for('QuestionServiceableDomain'),
  Question: Symbol.for('Question'),

  QuestionTypeInterface: Symbol.for('QuestionTypeInterface'),
  QuestionTypeServiceableDomain: Symbol.for('QuestionTypeServiceableDomain'),
  QuestionType: Symbol.for('QuestionType'),

  QuizInterface: Symbol.for('QuizInterface'),
  QuizServiceableDomain: Symbol.for('QuizServiceableDomain'),
  Quiz: Symbol.for('Quiz'),

  QuestionQuizInterface: Symbol.for('QuestionQuizInterface'),
  QuestionQuizServiceableDomain: Symbol.for('QuestionQuizServiceableDomain'),
	QuestionQuiz: Symbol.for('QuestionQuiz'),
	

	InstrumentInterface: Symbol.for('InstrumentInterface'),
  InstrumentServiceableDomain: Symbol.for('InstrumentServiceableDomain'),
	Instrument: Symbol.for('Instrument'),
	
	AlertInterface: Symbol.for('AlertInterface'),
  AlertServiceableDomain: Symbol.for('AlertServiceableDomain'),
	Alert: Symbol.for('Alert'),
	
	CalibrationInterface: Symbol.for('CalibrationInterface'),
  CalibrationServiceableDomain: Symbol.for('CalibrationServiceableDomain'),
	Calibration: Symbol.for('Calibration'),
	
	CompanyasdInterface: Symbol.for('CompanyasdInterface'),
  CompanyasdServiceableDomain: Symbol.for('CompanyasdServiceableDomain'),
  Companyasd: Symbol.for('Companyasd'),
};

export default TYPES;