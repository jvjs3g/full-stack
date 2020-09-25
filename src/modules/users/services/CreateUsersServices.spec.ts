import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserServices from './CreateUserService';
import FakehashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';


import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakehashProvider: FakehashProvider;
let createUser: CreateUserServices;
let fakeCacheProvider: FakeCacheProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakehashProvider = new FakehashProvider();
    fakeCacheProvider = new  FakeCacheProvider();
    createUser = new CreateUserServices(fakeUsersRepository, fakehashProvider,fakeCacheProvider);
  });
  it('should be able to create a new user', async () => {


    const user =  await createUser.execute({
     name: 'john doe',
     email: 'johnDoe@hotmail.com',
     password: '123456'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakehashProvider = new FakehashProvider();
    const createUser = new CreateUserServices(fakeUsersRepository, fakehashProvider, fakeCacheProvider);

    const user =  await createUser.execute({
     name: 'john doe',
     email: 'johnDoe@hotmail.com',
     password: '123456'
    });

    await expect( createUser.execute({
      name: 'john doe',
      email: 'johnDoe@hotmail.com',
      password: '123456'
     }),).rejects.toBeInstanceOf(AppError);
  });



});
