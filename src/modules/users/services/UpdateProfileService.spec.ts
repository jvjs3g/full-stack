import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpadateProfile from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpadateProfile;
describe('UpdateProfile', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpadateProfile(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able update the profile.', async () => {

    const user = await fakeUsersRepository.create({
      name:'John Doe',
      email:'teste@teste.com',
      password:'123456',
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John trê',
      email:'johntre@exemplo.com',
    });

    expect(updatedUser.name).toBe('John trê');
    expect(updatedUser.email).toBe('johntre@exemplo.com');
  });

  it('should not be able update the profile from non-existing user.', async () => {
    await expect(updateProfile .execute({
     user_id: 'non-existing user-id',
     name:'Test',
     email: 'test@exemplo.com.br'
   }),
   ).rejects.toBeInstanceOf(AppError);
 });



  it('should not be able to change to another user email.', async () => {

      await fakeUsersRepository.create({
      name:'John Doe',
      email:'teste@teste.com',
      password:'123456',
    })

    const user =  await fakeUsersRepository.create({
      name:'Test',
      email:'teste@example.com',
      password:'123456',
    })

    await expect(updateProfile.execute({
      user_id: user.id,
      name:'John Doe',
      email:'teste@teste.com',
    }),
    ).rejects.toBeInstanceOf(AppError);
  });


  it('should be able to update the password.', async () => {

    const user = await fakeUsersRepository.create({
      name:'John Doe',
      email:'teste@teste.com',
      password:'123456',
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John trê',
      email:'johntre@exemplo.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password.', async () => {

    const user = await fakeUsersRepository.create({
      name:'John Doe',
      email:'teste@teste.com',
      password:'123456',
    })

     await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John trê',
      email:'johntre@exemplo.com',
      password: '123123',
    }),
    ).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to update the password with wrong old password.', async () => {

    const user = await fakeUsersRepository.create({
      name:'John Doe',
      email:'teste@teste.com',
      password:'123456',
    })

     await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John trê',
      email:'johntre@exemplo.com',
      old_password: 'wrong old-password',
      password: '123123',
    }),
    ).rejects.toBeInstanceOf(AppError);

  });

});
