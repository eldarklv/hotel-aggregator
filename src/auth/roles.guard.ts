import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { AuthService } from './auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    // записываем в ролз допустимые роли из декоратора @Roles(['role'])
    const availableRoles = this.reflector.get(Roles, context.getHandler());
    if (!availableRoles) {
      return false;
    }
    const request = context.switchToHttp().getRequest();

    console.log(request.user.role);
    const userRole = request.user.role;

    const isAuthenticated = request.isAuthenticated();
    const isRoleAvailable = this.authService.matchRoles(
      availableRoles,
      userRole,
    );
    console.log(isRoleAvailable);

    return isAuthenticated && isRoleAvailable; // если авторизован и есть роль то возвращаем true
  }
}
// далее нужно сделать аутентификацию с сессией. из сесси получать роль для авторизации
