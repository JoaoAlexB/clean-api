import { EmailSender } from '../../data/protocols'

import nodemailer from 'nodemailer'

export class NodemailerAdapter implements EmailSender {
	private transporter
  constructor () {
		this.transporter = nodemailer.createTransport({
			service: process.env.EMAIL_SERVICE,
			auth:{
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS
			}
		})
	}

	async send(to: string, subject: string, html: string): Promise<boolean> {
		const mailOptions = {
			to,
			subject,
			html
		}

		this.transporter.sendMail(mailOptions, (err, _)=>{
			if(err){
				console.log(err)
				return false;
			}
		});
		return true
	}
}
