import { UserEntity } from '../../../modules/main/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, RelationId, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AuthUserEntity } from './auth-user.entity';

@Entity()
export class PhoneIdentityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  phone: string;

  @Column('boolean', { default: false })
  phoneValidated: boolean;

  @OneToOne(() => AuthUserEntity, (o) => o.phoneIdentity, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: AuthUserEntity;

  @RelationId('user')
  readonly userId?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
