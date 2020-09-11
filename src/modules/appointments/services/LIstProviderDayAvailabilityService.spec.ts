import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderDayAvailabilityService from './LIstProviderDayAvailabilityService';


let listProviderDayAvailability: ListProviderDayAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentRepository;
describe('ListMonthProviderAvailability', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository
    );
  });

it('should be able to list the day availability from a provider', async () => {


  await fakeAppointmentsRepository.create({
    provider_id: 'provider_id',
    date: new Date(2020, 4, 15, 8, 0, 0),
  });

  await fakeAppointmentsRepository.create({
    provider_id: 'provider_id',
    date: new Date(2020, 4, 15, 10, 0, 0),
  });

  const availability = await listProviderDayAvailability.execute({
    provider_id: 'provider_id',
    month: 5,
    year: 2020,
    day: 15,
  });

  expect(availability).toEqual(
    expect.arrayContaining([
      { hour : 8, available: false },
      { hour : 9, available: true },
      { hour : 10, available: false },
      { hour : 11, available: true },
    ]),
  );
});

});
