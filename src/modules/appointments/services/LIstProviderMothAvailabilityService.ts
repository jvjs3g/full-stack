import { injectable, inject } from 'tsyringe';
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

  public async execute({ provider_id, month, year  } :Request ): Promise<IResponse> {

    const appointments = await this.appointmentRepository.findAllInMonthFromProvider({
      provider_id,
      month,
      year
    });

    console.log(appointments);
    return [{day: 1, available: false}];
  }
}

export default LIstProviderMothAvailabilityService;
