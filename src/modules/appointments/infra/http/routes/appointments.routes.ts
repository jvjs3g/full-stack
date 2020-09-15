import { Router} from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentController from '../controllers/ProviderAppointmetController';

const appointmentsController = new AppointmentsController();
const providerAppointmentController = new ProviderAppointmentController();
const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.post('/', appointmentsController.create);
appointmentRouter.get('/me', providerAppointmentController.index);

export default appointmentRouter;
