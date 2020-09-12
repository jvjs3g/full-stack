import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderMonthAvailabilityService from './LIstProviderMothAvailabilityService';


let listProviderMOnthAvailability: ListProviderMonthAvailabilityService;
let fakeAppointmentsRepository: FakeAppointmentRepository;
describe('ListMonthProviderAvailability', () => {

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();
    listProviderMOnthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository
    );
  });

it('should be able to list the month availability from a provider', async () => {
    jest
    .spyOn(Date, 'now')
    .mockImplementationOnce(() => new Date(2020, 4, 9, 8, 0, 0).getTime());

  await fakeAppointmentsRepository.create({
    provider_id: 'provider_id',
    user_id: 'user',
    date: new Date(2020, 4, 10, 12, 0, 0),
  });

  await fakeAppointmentsRepository.create({
    provider_id: 'provider_id',
    user_id: 'user',
    date: new Date(2020, 4, 13, 15, 0, 0),
  });

  await fakeAppointmentsRepository.create({
    provider_id: 'provider_id',
    user_id: 'user',
    date: new Date(2020, 4, 15, 8, 0, 0),
  });

  await fakeAppointmentsRepository.create({
    provider_id: 'provider_id',
    user_id: 'user',
    date: new Date(2020, 4, 15, 9, 0, 0),
  });

  await fakeAppointmentsRepository.create({
    provider_id: 'provider_id',
    user_id: 'user',
    date: new Date(2020, 4, 15, 10, 0, 0),
  });

  await fakeAppointmentsRepository.create({
    provider_id: 'provider_id',
    user_id: 'user',
    date: new Date(2020, 4, 15, 11, 0, 0),
  });

  await fakeAppointmentsRepository.create({
    provider_id: 'provider_id',
    user_id: 'user',
    date: new Date(2020, 4, 15, 12, 0, 0),
  });

  await fakeAppointmentsRepository.create({
    provider_id: 'provider_id',
    user_id: 'user',
    date: new Date(2020, 4, 15, 13, 0, 0),
  });

  await fakeAppointmentsRepository.create({
    provider_id: 'provider_id',
    user_id: 'user',
    date: new Date(2020, 4, 15, 14, 0, 0),
  });

  await fakeAppointmentsRepository.create({
    provider_id: 'provider_id',
    user_id: 'user',
    date: new Date(2020, 4, 15, 15, 0, 0),
  });

  await fakeAppointmentsRepository.create({
    provider_id: 'provider_id',
    user_id: 'user',
    date: new Date(2020, 4, 15, 16, 0, 0),
  });

  await fakeAppointmentsRepository.create({
    provider_id: 'provider_id',
    user_id: 'user',
    date: new Date(2020, 4, 15, 17, 0, 0),
  });

  const availability = await listProviderMOnthAvailability.execute({
    provider_id: 'provider_id',
    month: 5,
    year: 2020,
  });

  expect(availability).toEqual(
    expect.arrayContaining([
      { day: 12, available: true },
      { day: 13, available: true },
      { day: 14, available: true },
      { day: 15, available: false },
      { day: 16, available: true },
    ]),
  );
});

});
