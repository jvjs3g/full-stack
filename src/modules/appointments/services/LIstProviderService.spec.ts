import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './LIstProviderService';
import AppError from '@shared/errors/AppError';


let fakeUsersRepository: FakeUsersRepository;
let listProviderService: ListProvidersService;

describe('ListProviders', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviderService = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers.', async () => {

    const user1 = await fakeUsersRepository.create({
      name:'John Doe',
      email:'testedoe@teste.com',
      password:'123456',
    })

    const user2= await fakeUsersRepository.create({
      name:'John tre',
      email:'teste@teste.com',
      password:'123456',
    })

    const loggedUser =  await fakeUsersRepository.create({
      name:'John Qua',
      email:'testequa@teste.com',
      password:'123456',
    })


    const providers = await listProviderService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([
      user1,
      user2
    ]);

  });


});
