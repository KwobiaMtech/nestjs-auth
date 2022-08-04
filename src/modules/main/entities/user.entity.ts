import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';

import { AuthUserEntity } from '../../auth/entities/auth-user.entity';
import { AbstractEntity } from './abstract-entity';



@Entity()
export class UserEntity extends AbstractEntity {
  @Column('text', { nullable: true })
  firstName?: string;

  @Column('text', { nullable: true })
  lastName?: string;


  @Column('text', { nullable: true })
  address?: string;

  @OneToOne(() => AuthUserEntity, (auth) => auth.user)
  authUser: AuthUserEntity;

}
