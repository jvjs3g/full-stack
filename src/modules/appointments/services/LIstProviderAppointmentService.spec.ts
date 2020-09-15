import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderAppointmentService from './LIstProviderAppointmentService';


let ListProviderAppointments: ListProviderAppointmentService;
let fakeAppointmentsRepository: FakeAppointmentRepository;
describe('ListProviderAppointments', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();
    ListProviderAppointments = new ListProviderAppointmentService(
      fakeAppointmentsRepository
    );
  });

it('should be able to list the appointment on a specific day.', async () => {


  const appointment1  = await fakeAppointmentsRepository.create({
    provider_id: 'provider',
    user_id: 'user',
    date: new Date(2020, 4, 20, 14, 0, 0),
  });

  const appointment2 = await fakeAppointmentsRepository.create({
    provider_id: 'provider',
    user_id: 'user',
    date: new Date(2020, 4, 20, 15, 0, 0),
  });

  jest.spyOn(Date, 'now').mockImplementationOnce(() => {
    return new Date(2020, 4, 15, 10, 0, 0 ).getTime();
  });

  const appointments = await ListProviderAppointments.execute({
    provider_id: 'provider',
    month: 5,
    year: 2020,
    day: 20,
  });

  expect(appointments).toEqual([
    appointment1,
    appointment2,
  ]);
});

});
