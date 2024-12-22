import { applyDecorators, SetMetadata } from '@nestjs/common';
import { Roles } from './roles.decorator';

export function Auth(...roles: string[]) {
  return applyDecorators(
    SetMetadata('users', { user: 'admin' }),
    Roles(...roles),
  );
}
