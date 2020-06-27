import { Router, request} from 'express';
import { startOfHour, parseISO } from 'date-fns'
import AppointmentRepository from '../repositories/AppointmentsRepository';

const appointmentRouter = Router();

const appointmentRepository = new AppointmentRepository();

appointmentRouter.get('/', (request,response) => {
  const appointments = appointmentRepository.all();

  return response.json(appointments);
})


appointmentRouter.post('/', (request,response) => {

  const { provider , date } = request.body;

  const parseDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentRepository.findByDate(parseDate);

  if(findAppointmentInSameDate){
    return response.status(400).json({error: 'This appointment is already booked'})
  }


  const appointment = appointmentRepository.create({
    provider,
    date:parseDate,
  });
  return response.json(appointment);
});
export default appointmentRouter;
