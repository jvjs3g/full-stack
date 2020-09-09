import { Router } from 'express';
import appointmentRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import providerRouter from '@modules/appointments/infra/http/routes/providers.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import password from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/Profile.routes';

const routes = Router();

routes.use('/appointments',appointmentRouter);
routes.use('/providers', providerRouter);
routes.use('/users',usersRouter);
routes.use('/sessions',sessionRouter);
routes.use('/password', password);
routes.use('/profile',profileRouter);

export default routes;
