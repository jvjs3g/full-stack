import { injectable, inject } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUsersRepository';

interface Request{
 user_id: string;
}
@injectable()
class LIstProviderService{
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    ){

  }
  public async execute({ user_id  } :Request ): Promise<User[]> {
    const  users = await this.usersRepository.findAllProviders({
      excep_user_id:user_id,
    });

    return  users;
  }
}

export default LIstProviderService;
