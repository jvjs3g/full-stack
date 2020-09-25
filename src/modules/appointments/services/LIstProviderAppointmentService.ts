import { injectable, inject } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentRepository from '../repositories/IAppintmentRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface Request{
 provider_id: string;
 day:number;
 month: number;
 year: number;
}


@injectable()
class LIstProviderAppointmentService{
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository:IAppointmentRepository,

    @inject('CacheProvider')
    private cacheProvider:ICacheProvider,
    ){}

    public async execute({
      provider_id,
      month,
      year,
      day,
    }: Request): Promise<Appointment[]> {

      const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;

      let appointments = await this.cacheProvider.recover<Appointment[]> (cacheKey);

      if(!appointments){
         appointments = await this.appointmentRepository.findAllDayFromProvider({
          provider_id,
          month,
          year,
          day,
        });

        await this.cacheProvider.save(cacheKey, appointments);
      }

      return appointments;
    }
}

export default LIstProviderAppointmentService;
