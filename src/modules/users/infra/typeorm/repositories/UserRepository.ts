import { getRepository, Repository } from 'typeorm';

import IUserRepository from "@modules/users/repositories/IUsersRepository";

import User from '../entities/User';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import usersRouter from '../../http/routes/users.routes';

// Data transfer object

class UserRepository implements IUserRepository {
  private ormRepository: Repository<Appointment>;

  constructor(){
    this.ormRepository = getRepository(Appointment);
  }

  public async findById(id: string): Promise<User | undefined>{
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined>{
    const user = await this.ormRepository.findOne({
      where: { email}
    });

    return user;
  }

  public async create({name,email,password }: ICreateUserDTO): Promise<User>{
    const appointment = this.ormRepository.create({
      name,
      email,
      password
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async save(user: User): Promise<User>{
    return this.ormRepository.save(user);
  }
}

export default UserRepository;
