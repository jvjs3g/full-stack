import IMailProvider from  '../model/IMailProvider';
import ISendMailDto  from '../dtos/ISendMailDTO';



export default class FakeMailProvider implements IMailProvider {
  private message: ISendMailDto[] = [];
  public async sendEmail(message: ISendMailDto): Promise<void>{
    this.message.push(message);
  }
}
