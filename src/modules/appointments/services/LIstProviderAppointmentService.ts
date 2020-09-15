import { injectable, inject } from 'tsyringe';
import Appointments from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppintmentRepository';

interface Request{
 provider_id: string;
 day: number;
 month: number;
 year: number;
}


@injectable()
class LIstProviderAppointmentService{
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository:IAppointmentRepository,
    ){}

    public async execute({
      provider_id,
      day,
      month,
      year,
    }: Request): Promise<Appointments[]> {

      const appointments = await this.appointmentRepository.findAllDayFromProvider({
       provider_id,
       month,
       day,
       year
      });

      return appointments;
    }
}

export default LIstProviderAppointmentService;
