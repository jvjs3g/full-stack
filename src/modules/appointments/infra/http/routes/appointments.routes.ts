import { Router} from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentController from '../controllers/ProviderAppointmetController';

const appointmentsController = new AppointmentsController();
const providerAppointmentController = new ProviderAppointmentController();
const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.post('/', celebrate({
  [Segments.BODY]: {
    provider_id: Joi.string().uuid().required(),
    date: Joi.date(),
  }
}), appointmentsController.create);
appointmentRouter.get('/me', providerAppointmentController.index);

export default appointmentRouter;
