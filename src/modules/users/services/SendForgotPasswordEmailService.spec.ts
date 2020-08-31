import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeEmailProvider';
import AppError from '@shared/errors/AppError';

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider,'sendEmail');

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider);


    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johnDoe@hotmail.com',
      password: '123456'
    });

     await sendForgotPasswordEmailService.execute({
     email: 'johnDoe@hotmail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

});