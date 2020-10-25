import { Router,
} from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';


import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const upload = multer(uploadConfig.multer);

const userController = new UsersController();

usersRouter.post('/',celebrate({
  [Segments.BODY]:{
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }
}), userController.create);

export default usersRouter;


// apartir do momento que tenho regra de negocio na rota preciso criar um service
