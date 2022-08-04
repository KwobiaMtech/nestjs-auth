import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, RelationId, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { EmailIdentityInterface } from '../interfaces/email-identity.inteface';
import { AuthUserEntity } from './auth-user.entity';

@Entity()
export class EmailIdentityEntity implements EmailIdentityInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('boolean', { default: false })
  emailValidated?: boolean;

  @OneToOne(() => AuthUserEntity, (o) => o.emailIdentity)
  @JoinColumn({ name: 'userId' })
  user: AuthUserEntity;

  @RelationId('user')
  readonly userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
