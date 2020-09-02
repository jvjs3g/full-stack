import { Entity, Generated , Column, PrimaryGeneratedColumn,CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('user_Tokens')
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at:Date;


  @UpdateDateColumn()
  updated_at: Date;

/*  constructor({ provider, date}: Omit<UserToken, 'id'>){
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }

  */
}

export default UserToken;
