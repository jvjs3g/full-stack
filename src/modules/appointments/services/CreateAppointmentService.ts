import { startOfHour, isBefore , getHours} from 'date-fns';
import Appointment from "../infra/typeorm/entities/Appointment";
import AppError from '@shared/errors/AppError';

import IAppointmentRepository from '../repositories/IAppintmentRepository';

import { injectable, inject } from 'tsyringe';

interface IRequest{
  user_id: string;
  provider_id:string;
  date:Date;
}

@injectable()
class CreateAppointmentService{
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository:IAppointmentRepository,
    ){

  }

  public async  execute({date, provider_id, user_id }: IRequest): Promise<Appointment>{

  const appointmentDate = startOfHour(date);

  if(isBefore(appointmentDate, Date.now())){
      throw new AppError("You can't create an appointment on a past date.");
  }

  if(user_id == provider_id ){
    throw new AppError("You can't create appointment with yourself");
  }

  if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17){
    throw new AppError('You can only create appointments between 8am and 5pm.');
  }

  const findAppointmentInSameDate = await this.appointmentRepository.findByDate(appointmentDate);

  if(findAppointmentInSameDate){
    throw new AppError('This appointment is already booked');

  }//

   const appointment = await this.appointmentRepository.create({
    date:appointmentDate,
    provider_id,
    user_id
  });


  return appointment;
  }
}


export default CreateAppointmentService;
