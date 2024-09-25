import { registerEnumType } from '@nestjs/graphql';

export enum userRoleTypeEnum {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super admin',
}

registerEnumType(userRoleTypeEnum, {
  name: 'userRoleTypeEnum',
});
