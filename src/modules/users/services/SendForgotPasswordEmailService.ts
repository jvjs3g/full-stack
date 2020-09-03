import { injectable, inject } from 'tsyringe';
//import AppError from '@shared/errors/AppError';
//import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';
import IMailProvider from 'shared/container/providers/MailProvider/model/IMailProvider';
import IUserTokensRepository from '../repositories/IUserTokenReposory';
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
    private userTokensRepository: IUserTokensRepository,

    ){

  }
  public async execute({ email }: Request):Promise<void>{

    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new AppError('User does not exists.')
    }

    await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendEmail(email, 'Pedido de recuperação de senha recibido com sucesso');
  }
}

export default SendForgotPasswordEmailService;
