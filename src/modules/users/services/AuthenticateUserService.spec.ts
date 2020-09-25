import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUser: AuthenticateUserService;
let fakeCacheProvider: FakeCacheProvider;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUserService = new CreateUserService(fakeUsersRepository,fakeHashProvider, fakeCacheProvider);
    authenticateUser = new AuthenticateUserService(fakeUsersRepository,fakeHashProvider);

  });
  it('should be able to  authenticate ', async () => {


    await createUserService.execute({
      name: 'John Doe',
      email: 'johnDoe@hotmail.com',
      password: '123456'
    });

    const teste =  await authenticateUser.execute({
     email: 'johnDoe@hotmail.com',
     password: '123456'
    });

    expect(teste).toHaveProperty('user');
  });

  it('should not be able to  authenticate with non existing user ', async () => {

    await expect( authenticateUser.execute({
      email: 'johnDoe@hotmail.com',
      password: '123456'
     })).rejects.toBeInstanceOf(AppError);
  });


  it('should be able to  authenticate with wrong password ', async () => {

    await createUserService.execute({
      name: 'John Doe',
      email: 'johnDoe@hotmail.com',
      password: '123456'
    });



    await expect(authenticateUser.execute({
      email: 'johnDoe@hotmail.com',
      password: 'wrong-password'
     })).rejects.toBeInstanceOf(AppError);
  });
});
