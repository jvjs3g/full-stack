import { Router} from 'express';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

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
export default usersRouter;


// apartir do momento que tenho regra de negocio na rota preciso criar um service
