import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import updateUserAvatarService from '@modules/users/services/updateUserAvatarService';



export default class UserAvatarController {
  public async update(request: Request ,response: Response ): Promise<Response>{
    const updateUserAvatar = container.resolve(updateUserAvatarService);

    const user = await updateUserAvatar.execute({
     avatar_id:request.user.id,
     avatarFilename:request.file.filename
   });



   return response.json(classToClass(user));
  }
}

