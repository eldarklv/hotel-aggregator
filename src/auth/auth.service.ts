import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  matchRoles(availableRoles: string[], userRole: string) {
    if (!availableRoles.includes(userRole)) {
      return false;
    } else {
      return true;
    }
  }
}
