apliimport { injectable, inject } from'tsyringe';
//import AppError from '@shared/errors/AppError';
//import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';
import ImailProvider from 'shared/container/providers/MailProvider/model/IMailProvider';
import IMailProvider from 'shared/container/providers/MailProvider/model/IMailProvider';

interface Request{
  email:string;
}

@injectable()
class SendForgotPasswordEmailService{
  constructor(
    @inject('UsersRepository')
    private usersRepository:IUserRepository,
    @inject('MailProvider')
    private MailProvider: IMailProvider,
    ){

  }
  public async execute({ email }: Request):Promise<void>{
    this.MailProvider.sendEmail(email, 'Pedido de recuperação de senha recibido com sucesso')
  }
}

export default SendForgotPasswordEmailService;
