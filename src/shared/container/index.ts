 import { container } from 'tsyringe';

 import '@modules/users/providers';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IPostRepository from '@modules/posts/repositories/IPostRepository';
import PostRepository from '@modules/posts/infra/typeorm/repositories/PostRepository';


 container.registerSingleton<IUserRepository>('UsersRepository', UsersRepository);
 container.registerSingleton<IPostRepository>('PostRepository',PostRepository);
