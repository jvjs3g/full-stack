import { Router} from 'express';
import { getCustomRepository } from 'typeorm';
import {  parseISO } from 'date-fns'
import AppointmentRepository from '@modules/appointments/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', async  (request,response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const appointments = await appointmentRepository.find();

  return response.json(appointments);
})


appointmentRouter.post('/', async  (request,response) => {


  const { provider_id, date } = request.body;

  const parseDate = parseISO(date);
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({provider_id, date:parseDate});

  return response.json(appointment);


});
export default appointmentRouter;
