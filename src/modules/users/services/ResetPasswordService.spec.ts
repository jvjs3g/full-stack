import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';


let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokenRepository;
let resetPassword: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
     fakeUserTokensRepository = new  FakeUserTokenRepository();

      resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository
  );

  })

  it('should be able to reset the password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

     await resetPassword.execute({
      password: '123123' ,
      token
    });

    const upDatedUser = await fakeUsersRepository.findById(user.id);

    expect(upDatedUser?.password).toBe('123123');
  });

});
