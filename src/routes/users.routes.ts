import { Router,
} from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const upload = multer(uploadConfig);


const createUser = new CreateUserService();

usersRouter.post('/', async  (request,response) => {
  try{
    const { name, email, password }  = request.body;
    const user = await createUser.execute({
      name,
      email,
      password
    });

    delete user.password;
    response.json(user);
  }catch(err){
    return response.status(400).json({ error: err.message });
  }

});

usersRouter.patch('/avatar',ensureAuthenticated,upload.single('avatar'),  async (request,response ) => {

  return response.json({ok:true});
})
export default usersRouter;


// apartir do momento que tenho regra de negocio na rota preciso criar um service
