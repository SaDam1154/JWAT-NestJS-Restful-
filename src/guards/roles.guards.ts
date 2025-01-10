import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  private validRoles = ['admin', 'principal', 'teacher'];

  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    let request: Request;

    if (context.getType() === 'http') {
      request = context.switchToHttp().getRequest<Request>();
    } else {
      const gqlContext = GqlExecutionContext.create(context);
      request = gqlContext.getContext().req; // Truyền context request trong GraphQL
    }

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const token = authHeader.split(' ')[1];

    const userRole = this.decodeToken(token);

    if (!this.validRoles.includes(userRole)) {
      throw new ForbiddenException('You do not have access to this API');
    }

    if (roles && !roles.includes(userRole)) {
      throw new ForbiddenException(
        `Access denied: You need one of these roles: ${roles.join(', ')}`,
      );
    }

    return true;
  }

  private decodeToken(token: string): string {
    if (token === 'adminToken') return 'admin';
    if (token === 'teacherToken') return 'teacher';
    if (token === 'principalToken') return 'principal';

    return 'guest';
  }
}
