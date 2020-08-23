 import { container } from 'tsyringe';

 import IAppointmentRepository from '@modules/appointments/repositories/IAppintmentRepository';
 import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

 import IUserRepository from '@modules/users/repositories/IUsersRepository';
 import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';


 container.registerSingleton<IAppointmentRepository>('AppointmentRepository', AppointmentRepository);
 container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
