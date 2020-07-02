import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

import User from './User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: String;

  @Column()
  provider_id:String;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id'})
  provider: User;

  @Column('timestamp with time zone')
  date:Date


  @CreateDateColumn()
  created_at:Date;


  @UpdateDateColumn()
  updated_at: Date;
/*  constructor({ provider, date}: Omit<Appointment, 'id'>){
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }

  */
}

export default Appointment;
