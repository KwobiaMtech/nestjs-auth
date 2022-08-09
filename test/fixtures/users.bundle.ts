import { AuthUserEntity } from '../../src/modules/auth/entities/auth-user.entity';
import { PhoneIdentityEntity } from '../../src/modules/auth/entities/phone-identity.entity';
import { AuthUserRole } from '../../src/modules/auth/types/auth-user.roles';

import { fixture } from 'typeorm-fixture-builder';
import * as bcrypt from 'bcrypt';
import { EmailIdentityEntity } from '../../src/modules/auth/entities/email-identity.entity';
import { AdminEntity } from '../../src/modules/main/entities/admin.entity';
import { UserEntity } from '../../src/modules/main/entities/user.entity';

export const userData: AuthUserEntity[] = [];

const users = [
  {
    id: 'b14c5bb5-384f-4b57-b87f-e4b6e24279a3',
    user: {
      firstName: 'Patrick',
      lastName: 'Ato',
      phone: '23354297363',
      email: 'patrick@gmail.com',
    },
    password: encodePassword('patrick'),
    roles: [AuthUserRole.Admin],
  },
  {
    id: '8e0ef4dc-c7f9-4823-9413-324a37eade6f',
    user: {
      firstName: 'Kwabena',
      lastName: 'James',
      phone: '23354134463',
      email: 'kwabena@gmail.com',
    },
    password: encodePassword('kwabena'),
    roles: [AuthUserRole.User],
  },
];

for (const user of users) {
  userData.push(createUser(user));
}

function createUser(data: any) {
  const user = new UserEntity();
  user.firstName = data.user.firstName;
  user.lastName = data.user.lastName;


  const phoneIdentity = new PhoneIdentityEntity();
  phoneIdentity.phone = data.user.phone;

  const emailIdentity = new EmailIdentityEntity();
  emailIdentity.email = data.user.email;
  emailIdentity.emailValidated = true;

  const auth = new AuthUserEntity();
  auth.password = data.password;
  auth.roles = data.roles;
  auth.emailIdentity = emailIdentity;
  auth.phoneIdentity = phoneIdentity;

  if (data.roles.includes(AuthUserRole.Admin)) {
    const admin = new AdminEntity();
    auth.admin = admin;
  }

  auth.user = user;
  return fixture(AuthUserEntity, auth);
}

function encodePassword(password: string) {
  const rounds = process.env.NODE_ENV === 'test' ? 1 : 10;
  return bcrypt.hashSync(password, rounds);
}
