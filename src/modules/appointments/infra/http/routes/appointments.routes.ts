import { Router} from 'express';
import {  parseISO } from 'date-fns'
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', async  (request,response) => {


  return response.json(appointments);
})


appointmentRouter.post('/', async  (request,response) => {


  const { provider_id, date } = request.body;

  const parseDate = parseISO(date);
  const createAppointment =  container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({provider_id, date:parseDate});

  return response.json(appointment);


});
export default appointmentRouter;
