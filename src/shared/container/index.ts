 import { container } from 'tsyringe';

import '@modules/users/providers';

 import IAppointmentRepository from '@modules/appointments/repositories/IAppintmentRepository';
 import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

 import IUserRepository from '@modules/users/repositories/IUsersRepository';
 import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';


 container.registerSingleton<IAppointmentRepository>('AppointmentRepository', AppointmentRepository);
 container.registerSingleton<IUserRepository>('UsersRepository', UsersRepository);
