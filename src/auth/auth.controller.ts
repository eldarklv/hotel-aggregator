import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/api/auth/login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req) {
    return req.user;
  }
}
