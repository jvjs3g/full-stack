import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';
import IAppointmentRepository from '../repositories/IAppintmentRepository';

interface Request{
 provider_id: string;
 month: number;
 year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class LIstProviderMothAvailabilityService{
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository:IAppointmentRepository,
    ){}

    public async execute({
      provider_id,
      month,
      year,
    }: Request): Promise<IResponse> {
      const providerMonthAvailability = await this.appointmentRepository.findAllInMonthFromProvider(
        {
          provider_id,
          month,
          year,
        },
      );

      const today = new Date(Date.now());
      const daysInMonth = getDaysInMonth(new Date(year, month - 1));
      const daysInMonthArray = Array.from(
        { length: daysInMonth },
        (_, index) => index + 1,
      );

      const appointmentsAvailability = daysInMonthArray.map(day => {
        const providerDayAvailability = providerMonthAvailability.filter(
          availability => getDate(availability.date) === day,
        );
        const dateAvailable = isAfter(new Date(year, month - 1, day), today);

        return {
          day,
          available: dateAvailable && providerDayAvailability.length < 10,
        };
      });


      return appointmentsAvailability;
    }
}

export default LIstProviderMothAvailabilityService;
