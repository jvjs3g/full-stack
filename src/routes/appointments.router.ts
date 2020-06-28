import { Router, request} from 'express';
import { startOfHour, parseISO, parse } from 'date-fns'
import AppointmentRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
const appointmentRouter = Router();

const appointmentRepository = new AppointmentRepository();

appointmentRouter.get('/', (request,response) => {
  const appointments = appointmentRepository.all();

  return response.json(appointments);
})


appointmentRouter.post('/', (request,response) => {
  try{

  const { provider , date } = request.body;

  const parseDate = parseISO(date);
  const createAppointment = new CreateAppointmentService(appointmentRepository);

  const appointment= createAppointment.execute({ provider,date:parseDate});

  return response.json(appointment);

  }catch(err){
    return response.status(400).json({ error: err.message });
  }

});
export default appointmentRouter;
