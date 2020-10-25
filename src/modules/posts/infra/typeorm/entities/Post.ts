import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('post')
class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('')
  message: string;

  @Column()
  user_id: string;

  @OneToMany(() => User, position => position.name, { cascade: true })
  @JoinColumn({ name: 'user_id' },)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Post;
