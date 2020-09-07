import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import updateUserAvatarService from './updateUserAvatarService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import AppError from '@shared/errors/AppError';
let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let UpdateUserAvatar: updateUserAvatarService;
describe('UpdateUserAvatar', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    UpdateUserAvatar = new updateUserAvatarService(fakeUsersRepository, fakeStorageProvider);
  });

  it('should be able to create a new user', async () => {

    const user = await fakeUsersRepository.create({
      name:'John Doe',
      email:'teste@teste.com',
      password:'123456',
    })

    await UpdateUserAvatar.execute({
      avatar_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user ', async () => {


    await expect( UpdateUserAvatar.execute({
      avatar_id: 'non-existing-user',
      avatarFilename: 'avatar.jpg',
    })).rejects.toBeInstanceOf(AppError);
  });


  it('should delete old avatar when updating new one ', async () => {

    const deleteFile = jest.spyOn(fakeStorageProvider,'deleteFile');

    const UpdateUserAvatar = new updateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({
      name:'John Doe',
      email:'teste@teste.com',
      password:'123456',
    })

    await UpdateUserAvatar.execute({
      avatar_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await UpdateUserAvatar.execute({
      avatar_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
