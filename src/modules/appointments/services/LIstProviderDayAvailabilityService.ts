import { injectable, inject } from 'tsyringe';
import { isAfter, getHours } from 'date-fns';
import IAppointmentRepository from '../repositories/IAppintmentRepository';

interface Request{
 provider_id: string;
 day: number;
 month: number;
 year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class LIstProviderDayAvailabilityService{
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository:IAppointmentRepository,
    ){}

    public async execute({
      provider_id,
      day,
      month,
      year,
    }: Request): Promise<IResponse> {
      const appointments = await this.appointmentRepository.findAllDayFromProvider({
        provider_id,
        day,
        month,
        year,
      });

      const hourStart = 8;

      const eachHoursArray = Array.from(
        { length: 10 },
        (_, index) => index + hourStart,
      );

      const currentDate = new Date(Date.now());


      const availability = eachHoursArray.map(hour => {
        const hasAppointmentInHour = appointments.find(
          appointment => getHours(appointment.date) == hour,
        );


        const compareDate  = new Date(year, month - 1, day,  hour);

        return {
          hour,
          available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
        };
      });

      return availability;
    }
}

export default LIstProviderDayAvailabilityService;
