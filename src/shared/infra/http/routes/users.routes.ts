import { Router,
} from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';
import updateUserAvatarService from '../services/updateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const upload = multer(uploadConfig);


const createUser = new CreateUserService();

usersRouter.post('/', async  (request,response) => {

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


  const updateUserAvatar = new updateUserAvatarService();

   const user = await updateUserAvatar.execute({
    avatar_id:request.user.id,
    avatarFilename:request.file.filename
  });

  delete user.password;

  return response.json(user);
})
export default usersRouter;


// apartir do momento que tenho regra de negocio na rota preciso criar um service
