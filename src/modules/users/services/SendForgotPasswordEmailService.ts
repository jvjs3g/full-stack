import { injectable, inject } from 'tsyringe';
import path from 'path';
import IUserRepository from '../repositories/IUsersRepository';
import IMailProvider from 'shared/container/providers/MailProvider/model/IMailProvider';
import IUserTokenRepository from '../repositories/IUserTokenReposory';
import AppError from '@shared/errors/AppError';

interface Request{
  email:string;
}

@injectable()
class SendForgotPasswordEmailService{
  constructor(
    @inject('UsersRepository')
    private usersRepository:IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private usersTokenRepository: IUserTokenRepository,

    ){

  }
  public async execute({ email }: Request):Promise<void>{

    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new AppError('User does not exists.')
    }

    const { token }  = await this.usersTokenRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(__dirname, '..','views','forgot_password.hbs');

    await this.mailProvider.sendEmail({
      to:{
        name:user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      template:{
        file: forgotPasswordTemplate,
        variables:{
          name: user.name,
          link:`${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        }
      }
    });
  }
}

export default SendForgotPasswordEmailService;
