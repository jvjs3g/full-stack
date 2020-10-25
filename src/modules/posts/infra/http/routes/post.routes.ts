import { Router} from 'express';

import PostController from '../controllers/PostController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const postController = new PostController();

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.post('/', postController.create);


export default appointmentRouter;
