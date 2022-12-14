import { AuthUserEntity } from '../../../../src/modules/auth/entities/auth-user.entity';
import { UserEntity } from '../entities/user.entity';

export function tabulateAuthUsers(authUsers: AuthUserEntity[]) {
  const mapped = authUsers.map((a) => ({
    firstName: a?.user?.firstName ?? 'admin',
    email: a?.emailIdentity?.email,
  }));
  console.table(mapped);
}

export function tabulateUsers(entities: UserEntity[]) {
  const mapped = entities.map((a) => ({
    name: a?.firstName ?? 'user',
    email: a?.authUser?.emailIdentity?.email,
    apiKey: a?.authUser?.apiKeyIdentity?.apiKey,
  }));
  console.table(mapped);
}