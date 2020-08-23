import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import User from '../infra/typeorm/entities/User';

import IUserRepository from '../repositories/IUsersRepository';

interface Request{
  avatar_id:string;
  avatarFilename:string;
}
@injectable()
class updateUserAvatarService{
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository
    ){

  }
  public async execute({ avatar_id, avatarFilename } :Request ): Promise<User> {

    const user = await this.usersRepository.findById(avatar_id);

    if(!user){
      throw new AppError('Only authenticated users can change avatar .', 401);
    }
    if(user.avatar){
      //deletar avatar anterior

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if(userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default updateUserAvatarService;
