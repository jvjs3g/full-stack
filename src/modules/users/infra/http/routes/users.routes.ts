import { Router,
} from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import updateUserAvatarService from '@modules/users/services/updateUserAvatarService';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const upload = multer(uploadConfig);


usersRouter.post('/', async  (request,response) => {

  const userRepository = new UserRepository();

  const createUser = new CreateUserService(userRepository);

    const { name, email, password }  = request.body;
    const user = await createUser.execute({
      name,
      email,
      password
    });

    delete user.password;
    response.json(user);
});

usersRouter.patch('/avatar',ensureAuthenticated,upload.single('avatar'),  async (request,response ) => {

  const userRepository = new UserRepository();

  const updateUserAvatar = new updateUserAvatarService(userRepository);

   const user = await updateUserAvatar.execute({
    avatar_id:request.user.id,
    avatarFilename:request.file.filename
  });

  delete user.password;

  return response.json(user);
})
export default usersRouter;


// apartir do momento que tenho regra de negocio na rota preciso criar um service
