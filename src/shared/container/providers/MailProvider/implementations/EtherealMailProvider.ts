import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import IMailProvider from  '../model/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client:Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplatePovider: IMailTemplateProvider,
  ){
    nodemailer.createTestAccount().then(account => {
      const transporter =  nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass, // generated ethereal password
        },
      });
      this.client = transporter;
    });
  }
  public async sendEmail({to,from, subject, template}: ISendMailDTO): Promise<void>{
    const message = await this.client.sendMail({
      from:{
        name:from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com.br',
      },
      to:{
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplatePovider.parse(template),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('PreView URl %s', nodemailer.getTestMessageUrl(message));
  }
}
