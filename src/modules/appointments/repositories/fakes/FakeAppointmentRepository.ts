import { uuid } from 'uuidv4'
import { isEqual,getMonth, getYear, getDate } from 'date-fns';
import IAppointmentRepository from "@modules/appointments/repositories/IAppintmentRepository";
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllMonthFromProviderDTO';
import IFindAllDayFromProviderDTO from '@modules/appointments/dtos/IFindAllDayFromProviderDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';


class AppointmentsRepository  implements IAppointmentRepository {

   private appointments: Appointment[] = [];

   public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
     const findByDate = this.appointments.find(appointment =>
       isEqual(appointment.date ,date) && appointment.provider_id == provider_id,
     );

    return findByDate;
   }



   public async findAllInMonthFromProvider({provider_id,  month, year  }:IFindAllMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment =>
      appointment.provider_id == provider_id &&
      getMonth(appointment.date) + 1 == month &&
      getYear(appointment.date) == year
    );

   return appointments;
  }



  public async findAllDayFromProvider({provider_id, day,  month, year  }:IFindAllDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(appointment =>
      appointment.provider_id == provider_id &&
      getDate(appointment.date) == day &&
      getMonth(appointment.date) + 1 == month &&
      getYear(appointment.date) == year
    );

   return appointments;
  }



  public async create({ provider_id, date, user_id }: ICreateAppointmentDTO): Promise<Appointment>{
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
