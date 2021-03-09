import * as nodemailer from 'nodemailer'
import { injectable, inject } from 'inversify';
import TYPES from './../../TYPES'

import SendeableMail from "./Ports/SendeableMail"
import Responseable from './../../Domain/Entities/Util/Ports/Responseable'

@injectable()
export default class SendMail implements SendeableMail {

  @inject(TYPES.ResponseableDomain) private responserService: Responseable

  public async sendMail(
    to: string,
    text: string,
    from: string,
    pass: string,
    subject: string
  ): Promise<Responseable> {
		return new Promise<Responseable>( async (resolve, reject) => {

      let existError: boolean = false
      let errorMsj: string = ''

      if (!existError) {
        this.send(from, pass, to, subject, text).then((idMsg) => {
    
            // console.log(idMsg)
            // console.log(to)
    
            let msj = 'Se envió un mail de verificación a: ' + to + '. Si no lo encuentras, revisa tu bandeja de spam.'

            this.responserService = { result: msj, message: 'Consulta exitosa', error: '', status: 200 }
            resolve(this.responserService);
          }).catch((errors) => {
            this.responserService = { result: 'No se envio el mail 1', message: errors.toString(), error: errors, status: 500 }
            reject(this.responserService); return;
          });
      } else {
        this.responserService = { result: 'No se envio el mail 2', message: 'Existen errores', error: errorMsj, status: 500 }
        reject(this.responserService); return;
      }
    })
  }

  public async send(from, pass, to, subject, text) {
    return new Promise<Responseable>( async (resolve, reject) => {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: { user: from, pass: pass }
      });
  
      try {
        transporter.verify(async function(error, success) {
          if (success) {
            await transporter.sendMail({
                from: from,
                to: to,
                subject: subject,
                text: text,
                html: text
              }).then((info) => {

                if (info !== undefined) {
                  // console.log("Message %s send", info.messageId);
                  resolve(info.messageId);
                }

              }).catch((err) => {
                // console.log(err.toString())
                reject(err);
              });
          } else {
            // console.log(error.toString())
            reject(error);
          }
        });
      } catch (err) {
        // console.log(err.toString())
        reject(err);
      }
    });
  }
}