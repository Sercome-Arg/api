import { Model, Document } from 'mongoose'
import { injectable, inject } from 'inversify'
import TYPES from './../../TYPES'

import Authenticable from './Ports/Authenticable'
import Registrable from '../../Domain/Entities/User/Ports/Registrable'
import RegistrableWithUser from '../../Domain/Entities/User/Ports/RegistrableWithUser'
import UserServiceable from '../../Domain/Entities/User/Ports/Serviceable'
import SubscriptionServiceable from '../../Domain/Entities/Subscription/Ports/Serviceable'
import Subscription from '../../Domain/Entities/Subscription/Interface'
import CompanyServiceable from '../../Domain/Entities/Company/Ports/Serviceable'
import CreateableToken from './Ports/CreateableToken'
import Logueable from '../../Domain/Entities/User/Ports/Logueable'
import LogueableWithUser from '../../Domain/Entities/User/Ports/LogueableWithUser'
import LogueableVerified from '../../Domain/Entities/User/Ports/LogueableVerified'
import Controlleable from '../../Domain/Entities/Util/Ports/Controlleable'
import SendeableMail from './../UC/Ports/SendeableMail'

import UserTokenable from './Ports/UserTokenable'
import UserToken from './UserToken'
import Responseable from '../../Domain/Entities/Util/Ports/Responseable'
import Responser from '../../Domain/Entities/Util/Responser'
import { connect } from 'mercadopago'

@injectable()
export default class Authentication implements Authenticable {

	@inject(TYPES.UserServiceableDomain) private userService: UserServiceable
	@inject(TYPES.SubscriptionServiceableDomain) private subscriptionService: SubscriptionServiceable
	@inject(TYPES.CompanyServiceableDomain) private companyService: CompanyServiceable
	@inject(TYPES.CreateableToken) private tokenProvider: CreateableToken
	@inject(TYPES.Controlleable) private controllerService: Controlleable
	@inject(TYPES.SendeableMail) private sendMailController: SendeableMail

	public async getPass(
		user: string,
		pass: string,
		userModel: Model<Document, {}>,
	): Promise<Responseable> {

		return new Promise<Responseable>( async (resolve, reject) => {

			var responserService: Responseable = new Responser()

			await this.userService.existUserWithThatUser(user, userModel)
				.then(async (res: Responseable) => {
					if (res && (res.result !== undefined)) {
						if (res.result) {
							
							await this.userService.hashPassword(pass)
								.then(async (res: Responseable) => {
									if (res !== undefined && res.result !== undefined) {
										let hash: string = res.result
										await this.controllerService.getAll(userModel, {}, { operationType: { $ne: 'D' }, user: user }, {}, {}, 1, 0)
											.then(async (res: Responseable) => {
												if (res !== undefined && res.result !== undefined) {
													let _id: string = res.result._id
														await this.controllerService.update(_id, { password: hash }, userModel, userModel, _id)
															.then(async (res: Responseable) => {
																if (res !== undefined && res.result !== undefined) {
																	responserService = {
																		result: 'Gestión exitosa',
																		message: 'Muy bien! Has recuperado tu contraseña! Continúa con tu experiencia Wingcamp!',
																		error: '',
																		status: 200
																	}
																	resolve(responserService)
																} else {
																	responserService = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
																}
															}).catch((e: any) => {
																responserService = { result: e.result, message: e.message, error: e.error, status: e.status }
															})
												} else {
													responserService = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
												}
											}).catch((e: any) => {
												responserService = { result: e.result, message: e.message, error: e.error, status: e.status }
											})
									} else {
										responserService = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
									}
								}).catch((e: any) => {
									responserService = { result: e.result, message: e.message, error: e.error, status: e.status }
								})
						} else {
							responserService = {
								result: 'Nop',
								message: 'El usuario: ' + user + ', no se encuentra en nuestra base de datos.',
								error: 'No se encontraron los datos',
								status: 404
							}
						}
					} else {
						responserService = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
					}
				}).catch((err: Responseable) => {
					responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
				})
			reject(responserService)
		})
	}

	public async resetPass(
		user: string,
		userModel: Model<Document, {}>,
		mailModel: Model<Document, {}>,
	): Promise<Responseable> {

		return new Promise<Responseable>( async (resolve, reject) => {

			var responserService: Responseable = new Responser()

			await this.userService.existUserWithThatUser(user, userModel)
				.then(async (res: Responseable) => {
					if (res && (res.result !== undefined)) {
						if (res.result) {

							this.controllerService.getAll(userModel, { }, { operationType: { $ne: 'D' }, user: user }, {}, {}, 1, 0)
								.then((res: Responseable) => {

									let api: string = process.env.API
									let front: string = process.env.FRONT

									let to: string = res?.result?.email || ''
									let url: string = front + '/newpass/' + res?.result?.user || '' 
									url = url + '/' + res?.result?.password || ''

									let logo: string = api + '/image/logo.png'
									let header: string = api + '/image/header.png'

									this.controllerService.getAll(mailModel, {}, { operationType: { $ne: 'D' }, enabled: true }, {}, {}, 1, 0)
										.then((res: Responseable) => {
											if(res.result !== undefined) {

												let from: string = res?.result?.from || ''
												let pass: string = res?.result?.pass || ''
		
												if(from !== '' && pass !== '') {
													this.sendMailController.sendMail(
														to,
														`<!DOCTYPE html>
															<html lang="en">
															<head>
																	<meta charset="UTF-8">
																	<meta name="viewport" content="width=device-width, initial-scale=1.0">
																	<title>¡Bienvenido/a a tu experiencia WingCamp!</title>
																<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
																<link rel="preconnect" href="https://fonts.gstatic.com">
																<!-- Font Awesome JS -->
																<script defer src="https://use.fontawesome.com/releases/v5.0.13/js/solid.js" integrity="sha384-tzzSw1/Vo+0N5UhStP3bvwWPq+uvzCMfrN1fEFe+xBmv1C/AtVX5K0uZtmcHitFZ" crossorigin="anonymous"></script>
																<script defer src="https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js" integrity="sha384-6OIrr52G08NpOFSZdxxz1xdNSndlD4vdcf/q2myIUVO0VsqaGHJsB0RaBE01VTOY" crossorigin="anonymous"></script>
															</head>
															<body style="font-family: 'Quicksand', 'Arial', sans-serif !important; background-color:white; margin: 0;">
																	<header class="mail-header" style="background-image: url(${ header }); background-size: cover; background-repeat: no-repeat; color: white; min-height: 120px; display: flex; align-items: center; justify-content: center;">
																					<div>           
																							<h1>¡Hola, ${ user }!</h1>                   
																	</div>
															</header>
																	<section style="padding: 0px 30px; color: #383838;">
		
																					<div>
																						
																							<h4 class="font-weight-bold mb-3">¡Bienvenido/a a tu experiencia WingCamp!</h4>
																							<!-- <p>Queremos ayudarte con la recuperación de tu contraseña. Te compartimos el siguiente Check list a completar para facilitarnos la creaciñon de tu primer curso: <a href="#">Formulario inicial</a></p> -->
																							<p>Para finalizar nuestro proceso de recuperación de contraseña, hacé click <a href="${ url }">aquí</a>.</p>
		
																							<!-- <div class="text-center mt-5">
																									<p>También podés contactarte con nosotros mediante nuestros canales de atención:</p>
																									<span><a href="tel:0810-220-0127">0810-220-0127 //</a></span>  <span><a href="tel:0810-220-0127">+54 011 1522354332 //</a></span>     <span><a href="mailto:info@wingcamp.com" target="blank">info@wingcamp.com</a></span>
																							</div> -->
		
																							<div style="display: flex; justify-content: center; margin: 50px 0px;">
																									<img src=${ logo }  alt="">
		
																											<div style="margin: 0px 20px;">
																												
																													<a style="transition: .4s;" href="https://www.instagram.com/wingcamp/" target="blank">
																															<img src="instagram.svg" alt="" style="width: 20px;">
																													</a>
																													
																													<a style="transition: .4s;" href="https://www.facebook.com/WingCamp/" target="blank">
																															<img src="facebook-f-brands.svg" alt="" style="width: 15px; margin: 0px 5px;">
																													</a>
																													
																													<a style="transition: .4s;" href="https://www.youtube.com/channel/UC7v6eKmTcYz-RUWBnDd0nFA/videos?view_as=subscriber" target="blank">
																															<img src="youtube-brands.svg" alt="" style="width: 25px;   fill: #5600c2 !important;">
																													</a>
																											</div>             
																							</div>
																										
																		
																	</div>
																	</section>
		
															<script src="https://kit.fontawesome.com/5cae25724c.js" crossorigin="anonymous"></script>
															</body>
															</html>`,
														from,
														pass,
														'Wingcamp - Recuperación de contraseña'
													).then(res => { console.log(res) }).catch(err => { console.log(err) })
												} else {
													console.log('from or pass is undefined. Not send mail, send meil to reset pass')
												}
		
		
											}
										}).catch(err => {
											console.log(err)
										})

									
								}).catch((err: any) => {
									console.log(err)
								})
							
								

							responserService = {
								result: 'Gestión exitosa',
								message: 'Revisa tu casilla de correo. Te enviamos un link para que puedas resetear tu contraseña.',
								error: '',
								status: 200
							}
							resolve(responserService)
						} else {
							responserService = {
								result: 'Nop',
								message: 'El usuario: ' + user + ', no se encuentra en nuestra base de datos.',
								error: 'No se encontraron los datos',
								status: 404
							}
						}
					} else {
						responserService = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
					}
				}).catch((err: Responseable) => {
					responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
				})
			reject(responserService)
		})
	}

	public async register(
		userData: Registrable,
		database: string,
		model: Model<Document, {}>,
		companyModel: Model<Document, {}>,
		mailModel: Model<Document, {}>,
		subscriptionModel: Model<Document, {}>,
	): Promise<Responseable> {

		return new Promise<Responseable>( async (resolve, reject) => {

			var responserService: Responseable = new Responser()
			var register: UserTokenable = new UserToken()
			var companyId: string = ''

			await this.userService.existUserWithThatEmail(userData.email, model)
				.then( async (res: Responseable) => {
					if (res && (res.result !== undefined)) {
						if (!res.result) {
							await this.userService.hashPassword(userData.password)
								.then( async (res: Responseable) => {
									if (res && res.result !== undefined) {
										userData.password = res.result
										await this.companyService.getAll(companyModel, {}, { name: database, operationType: { $ne: 'D' } }, {}, {}, 0, 0)
											.then( async (res: Responseable) => {
												if(res && res.result !== undefined) {
													if(res.result.length === 0) {
														await this.companyService.save({name: database}, companyModel)
															.then( async (res: Responseable) => {
																if (res && res.result !== undefined) {
																	responserService = {
																		result: res.result,
																		message: res.message,
																		error: res.error,
																		status: res.status
																	}
																	
																	if (res.status === 200) {
																		companyId = res.result._id
																		
																	}
																} else {
																	responserService = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
																}
															})
													} 
												} else {
													responserService = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
												}
											}).catch((err: Responseable) => {
												responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
											})
										
										await this.userService.save(userData, model)
											.then((res: Responseable) => {
												if (res && res.result !== undefined) {
													register.user = res.result
													register.user.password = undefined
													register.token = this.tokenProvider.createToken(register.user, database);
													responserService = {
														result: {
															user: register.user,
															token: register.token,	
															company: companyId
														},
														message: 'Registro exitoso',
														error: '',
														status: 200
													}

													let to: string = register?.user?.email || ''

													this.controllerService.getAll(mailModel, {}, { operationType: { $ne: 'D' }, enabled: true }, {}, {}, 1, 0)
														.then((res: Responseable) => {
															if(res.result !== undefined) {
																let from: string = res.result.from
																let pass: string = res.result.pass

																if(from !== undefined && pass !== undefined) {
																	this.sendMailController.sendMail(
																		to,
																		'para validar este registro, ingrese a esta direccion',
																		from,
																		pass,
																		'subject'
																	).then(res => { console.log(res) }).catch(err => { console.log(err) })
																} else {
																	console.log('from or pass is undefined. Not send mail')
																}


															}
														}).catch(err => {
															console.log(err)
														})

														let now: number = Date.parse(new Date().toString())

														let subscription: any =  {
															start: now,
															end: now + 2592000000,
															creationUser: register.user._id,
															creationDate: new Date(),
															user: register.user._id,
															operationType: 'C',
														}

														this.subscriptionService.save(subscription, subscriptionModel, register.user._id)

													resolve(responserService)
												} else {
													responserService = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
												}
											}).catch((err: Responseable) => {
												responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
											})
										
									} else {
										responserService = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
									}
								}).catch((err: Responseable) => {
									responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
								})
						} else {
							responserService = {
								result: 'Nop',
								message: 'El email ' + userData.email + ' ya se encuentra registrado',
								error: 'Duplicaion de datos',
								status: 428
							}
						}
					} else {
						responserService = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
					}
				}).catch((err: Responseable) => {
					responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
				})
			reject(responserService)
		})
	}

	public async registerWithUser(
		userData: RegistrableWithUser,
		database: string,
		model: Model<Document, {}>,
		companyModel: Model<Document, {}>,
		mailModel: Model<Document, {}>,
		subscriptionModel: Model<Document, {}>,
	): Promise<Responseable> {

		return new Promise<Responseable>( async (resolve, reject) => {

			var responserService: Responseable = new Responser()
			var register: UserTokenable = new UserToken()
			var companyId: string = ''

			await this.userService.existUserWithThatUser(userData.user, model)
				.then( async (res: Responseable) => {
					if (res && (res.result !== undefined)) {
						if (!res.result) {
							await this.userService.hashPassword(userData.password)
								.then( async (res: Responseable) => {
									if (res && res.result !== undefined) {
										userData.password = res.result
										await this.companyService.getAll(companyModel, {}, { name: database, operationType: { $ne: 'D' } }, {}, {}, 0, 0)
											.then( async (res: Responseable) => {
												if(res && res.result !== undefined) {
													if(res.result.length === 0) {
														await this.companyService.save({name: database}, companyModel)
															.then( async (res: Responseable) => {
																if (res && res.result !== undefined) {
																	responserService = {
																		result: res.result,
																		message: res.message,
																		error: res.error,
																		status: res.status
																	}
																	if (res.status === 200) {
																		companyId = res.result._id
																		
																	}
																} else {
																	responserService = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
																}
															})
													} 
												} else {
													responserService = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
												}
											}).catch((err: Responseable) => {
												responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
											})

										userData['idMail'] = userData.password
										
										await this.userService.saveWithUser(userData, model)
											.then((res: Responseable) => {
												if (res && res.result !== undefined) {
													register.user = res.result
													register.user.password = undefined
													register.token = this.tokenProvider.createToken(register.user, database);
													responserService = {
														result: {
															user: register.user,
															token: register.token,
															company: companyId
														},
														message: 'Registro exitoso',
														error: '',
														status: 200
													}

													let path: string = process.env.API

													let to: string = register?.user?.email || ''
													let url: string = path + '/verified/' + userData.user + '/' + userData.password
													let logo: string = path + '/image/logo.png'
													let header: string = path + '/image/header.png'

													this.controllerService.getAll(mailModel, {}, { operationType: { $ne: 'D' }, enabled: true }, {}, {}, 1, 0)
														.then((res: Responseable) => {
															if(res.result !== undefined) {
																let from: string = res.result.from
																let pass: string = res.result.pass

																

																if(from !== undefined && pass !== undefined) {
																	this.sendMailController.sendMail(
																		to,
																		`<!DOCTYPE html>
																			<html lang="en">
																			<head>
																					<meta charset="UTF-8">
																					<meta name="viewport" content="width=device-width, initial-scale=1.0">
																					<title>¡Bienvenido/a a tu experiencia WingCamp!</title>
																				<link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet">
																				<link rel="preconnect" href="https://fonts.gstatic.com">
																				<!-- Font Awesome JS -->
																				<script defer src="https://use.fontawesome.com/releases/v5.0.13/js/solid.js" integrity="sha384-tzzSw1/Vo+0N5UhStP3bvwWPq+uvzCMfrN1fEFe+xBmv1C/AtVX5K0uZtmcHitFZ" crossorigin="anonymous"></script>
																				<script defer src="https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js" integrity="sha384-6OIrr52G08NpOFSZdxxz1xdNSndlD4vdcf/q2myIUVO0VsqaGHJsB0RaBE01VTOY" crossorigin="anonymous"></script>
																			</head>
																			<body style="font-family: 'Quicksand', 'Arial', sans-serif !important; background-color:white; margin: 0;">
																					<header class="mail-header" style="background-image: url(${ header }); background-size: cover; background-repeat: no-repeat; color: white; min-height: 120px; display: flex; align-items: center; justify-content: center;">
																									<div>           
																											<h1>¡Hola, ${ userData.user }!</h1>                   
																					</div>
																			</header>
																					<section style="padding: 0px 30px; color: #383838;">

																									<div>
																										
																											<h4 class="font-weight-bold mb-3">¡Bienvenido/a a tu experiencia WingCamp!</h4>
																											<!-- <p>Queremos ayudarte con la configuración inicial de tu cuenta. Te compartimos el siguiente Check list a completar para facilitarnos la creaciñon de tu primer curso: <a href="#">Formulario inicial</a></p> -->
																											<p>Para finalizar nuestro proceso de Alta de cuenta, hacé click <a href="${ url }">aquí</a>.</p>

																											<div style="font-weight: bold; text-align: center; margin: 40px 0px;">
																													<p>Dentro de las próximas 24 hs. un ejecutivo de atención a usuarios se comunicará con vos.</p>
																											</div>
																											<!-- <div class="text-center mt-5">
																													<p>También podés contactarte con nosotros mediante nuestros canales de atención:</p>
																													<span><a href="tel:0810-220-0127">0810-220-0127 //</a></span>  <span><a href="tel:0810-220-0127">+54 011 1522354332 //</a></span>     <span><a href="mailto:info@wingcamp.com" target="blank">info@wingcamp.com</a></span>
																											</div> -->

																											<div style="display: flex; justify-content: center; margin: 50px 0px;">
																													<img src=${ logo }  alt="">

																															<div style="margin: 0px 20px;">
																																
																																	<a style="transition: .4s;" href="https://www.instagram.com/wingcamp/" target="blank">
																																			<img src="instagram.svg" alt="" style="width: 20px;">
																																	</a>
																																	
																																	<a style="transition: .4s;" href="https://www.facebook.com/WingCamp/" target="blank">
																																			<img src="facebook-f-brands.svg" alt="" style="width: 15px; margin: 0px 5px;">
																																	</a>
																																	
																																	<a style="transition: .4s;" href="https://www.youtube.com/channel/UC7v6eKmTcYz-RUWBnDd0nFA/videos?view_as=subscriber" target="blank">
																																			<img src="youtube-brands.svg" alt="" style="width: 25px;   fill: #5600c2 !important;">
																																	</a>
																															</div>             
																											</div>
																														
																						
																					</div>
																					</section>

																			<script src="https://kit.fontawesome.com/5cae25724c.js" crossorigin="anonymous"></script>
																			</body>
																			</html>`,
																		from,
																		pass,
																		'subject'
																	).then(res => { console.log(res) }).catch(err => { console.log(err) })
																} else {
																	console.log('from or pass is undefined. Not send mail')
																}


															}
														}).catch(err => {
															console.log(err)
														})

													let now: number = Date.parse(new Date().toString())

													let subscription: any =  {
														start: now,
														// end: now + 2592000000,
														end: now + 120000,
														// end: now,
														creationUser: register.user._id,
														creationDate: new Date(),
														user: register.user._id,
														operationType: 'C',
													}

													this.subscriptionService.save(subscription, subscriptionModel, register.user._id)
													
													resolve(responserService)
												} else {
													responserService = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
												}
											}).catch((err: Responseable) => {
												responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
											})
										
									} else {
										responserService = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
									}
								}).catch((err: Responseable) => {
									responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
								})
						} else {
							responserService = {
								result: 'Nop',
								message: 'El usuario ' + userData.user + ' ya se encuentra registrado',
								error: 'Duplicaion de datos',
								status: 428
							}
						}
					} else {
						responserService = { result: 'Nop', message: 'La capa superior contesto undefined', error: '', status: 500 }
					}
				}).catch((err: Responseable) => {
					responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
				})
			reject(responserService)
		})
	}
	
	public async login(
		loginData: Logueable,
		database: string,
		model: Model<Document, {}>,
		permissionModel: Model<Document, {}>
	): Promise<Responseable> {

		return new Promise<Responseable>( async (resolve, reject) => {

			var responserService: Responseable = new Responser()
			var login: UserTokenable = new UserToken()

			await this.userService.existUserWithThatEmail(loginData.email, model)
				.then( async (res: Responseable) => {
					if (res && (res.result !== undefined)) {
						if (res.result) {
							await this.userService.getUserByEmail(loginData.email, model, permissionModel)
								.then( async (res: Responseable) => {
									if (res && res.result !== undefined) {
										login.user = res.result
										await this.userService.isMatch(loginData.password, login.user.password)
											.then( async (res: Responseable) => {
												if (res && res.result !== undefined) {
													if (res.result) {
														await this.userService.isEnable(login.user._id, model)
															.then((res: Responseable) => {
																if (res && res.result !== undefined) {
																	if (res.result) {
																		login.user.password = undefined
																		login.token = this.tokenProvider.createToken(login.user, database)
																		responserService = {
																			result: {
																				user: login.user,
																				token: login.token
																			},
																			message: 'Bienvenido ' + login.user.email,
																			error: '',
																			status: 200
																		}
																		resolve(responserService)
																	} else {
																		responserService = {
																			result: 'Nop',
																			message: 'El usuario no ha sido autorizado',
																			error: 'El usuario no ha sido autorizado',
																			status: 423
																		}
																	}
																} else {
																	responserService = { result: 'Nop', message: 'La capa superior contesto undefined3', error: '', status: 500 }
																}
															}).catch((err: Responseable) => {
																responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
															})
													} else {
														responserService = {
															result: 'Nop',
															message: 'Password incorrecta',
															error: 'La contraseña ingresada es incorrecta',
															status: 403
														}
													}
												} else {
													responserService = { result: 'Nop', message: 'La capa superior contesto undefined1', error: '', status: 500 }
												}
											}).catch((err: Responseable) => {
												responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
											})
									} else {
										responserService = {
											result: 'Nop',
											message: 'No existe usuario con el email: ' + loginData.email,
											error: 'No existe usuario con el email: ' +  loginData.email,
											status: 404
										}
									}
								}).catch((err: Responseable) => {
									responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
								})
						} else {
							responserService = {
								result: 'Nop',
								message: 'No existe usuario con el email: ' + loginData.email,
								error: 'No existe usuario con el email: ' +  loginData.email,
								status: 404
							}
						}
					} else {
						responserService = { result: 'Nop', message: 'La capa superior contesto undefined2', error: '', status: 500 }
					}
				}).catch((err: Responseable) => {
					responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
				})
			reject(responserService)
		})
	}

	public async loginWithUser(
		loginData: LogueableWithUser,
		database: string,
		model: Model<Document, {}>
	): Promise<Responseable> {

		return new Promise<Responseable>( async (resolve, reject) => {

			var responserService: Responseable = new Responser()
			var login: UserTokenable = new UserToken()

			await this.userService.existUserWithThatUser(loginData.user, model)
				.then( async (res: Responseable) => {
					if (res && (res.result !== undefined)) {
						if (res.result) {
							await this.userService.getUserByUser(loginData.user, model)
								.then( async (res: Responseable) => {
									if (res && res.result !== undefined) {
										login.user = res.result
										await this.userService.isMatch(loginData.password, login.user.password)
											.then( async (res: Responseable) => {
												if (res && res.result !== undefined) {
													if (res.result) {
														await this.userService.isEnable(login.user._id, model)
															.then((res: Responseable) => {
																if (res && res.result !== undefined) {
																	if (res.result) {
																		login.user.password = undefined
																		login.token = this.tokenProvider.createToken(login.user, database)
																		responserService = {
																			result: {
																				user: login.user,
																				token: login.token
																			},
																			message: 'Bienvenido ' + login.user.user,
																			error: '',
																			status: 200
																		}
																		resolve(responserService)
																	} else {
																		responserService = {
																			result: 'Nop',
																			message: 'El usuario no ha sido autorizado',
																			error: 'El usuario no ha sido autorizado',
																			status: 423
																		}
																	}
																} else {
																	responserService = { result: 'Nop', message: 'La capa superior contesto undefined3', error: '', status: 500 }
																}
															}).catch((err: Responseable) => {
																responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
															})
													} else {
														responserService = {
															result: 'Nop',
															message: 'Password incorrecta',
															error: 'La contraseña ingresada es incorrecta',
															status: 403
														}
													}
												} else {
													responserService = { result: 'Nop', message: 'La capa superior contesto undefined1', error: '', status: 500 }
												}
											}).catch((err: Responseable) => {
												responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
											})
									} else {
										responserService = {
											result: 'Nop',
											message: 'No existe usuario: ' + loginData.user,
											error: 'No existe usuario con el email: ' +  loginData.user,
											status: 404
										}
									}
								}).catch((err: Responseable) => {
									responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
								})
						} else {
							responserService = {
								result: 'Nop',
								message: 'No existe usuario: ' + loginData.user,
								error: 'No existe usuario: ' +  loginData.user,
								status: 404
							}
						}
					} else {
						responserService = { result: 'Nop', message: 'La capa superior contesto undefined2', error: '', status: 500 }
					}
				}).catch((err: Responseable) => {
					responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
				})
			reject(responserService)
		})
	}

	public async loginVerified(
		loginData: LogueableVerified,
		database: string,
		model: Model<Document, {}>
	): Promise<Responseable> {

		return new Promise<Responseable>( async (resolve, reject) => {

			var responserService: Responseable = new Responser()
			var login: UserTokenable = new UserToken()

			console.log(loginData)

			await this.controllerService.getAll(model, {}, { user: loginData.password }, {}, {}, 1, 0)
				.then( async (res: Responseable) => {
					console.log(res)
					if (res && res.result !== undefined) {
						login.user = res.result
						await this.userService.isEnable(login.user._id, model)
							.then((res: Responseable) => {
								if (res && res.result !== undefined) {
									if (res.result) {
										login.user.password = undefined
										login.token = this.tokenProvider.createToken(login.user, database)
										responserService = {
											result: {
												user: login.user,
												token: login.token
											},
											message: 'Bienvenido ' + login.user.user,
											error: '',
											status: 200
										}
										resolve(responserService)
									} else {
										responserService = {
											result: 'Nop',
											message: 'El usuario no ha sido autorizado',
											error: 'El usuario no ha sido autorizado',
											status: 423
										}
									}
								} else {
									responserService = { result: 'Nop', message: 'La capa superior contesto undefined3', error: '', status: 500 }
								}
							}).catch((err: Responseable) => {
								responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
							})
					} else {
						responserService = {
							result: 'Nop',
							message: 'No existe usuario.',
							error: 'No existe usuario.',
							status: 404
						}
					}
				}).catch((err: Responseable) => {
					responserService = { result: err.result, message: err.message, error: err.error, status: err.status }
				})
			reject(responserService)
		})
	}
}