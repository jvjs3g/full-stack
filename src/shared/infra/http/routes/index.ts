import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import postRouter from '@modules/posts/infra/http/routes/post.routes';

const routes = Router();

routes.use('/users',usersRouter);
routes.use('/sessions',sessionRouter);
routes.use('/post',postRouter);
export default routes;
//
