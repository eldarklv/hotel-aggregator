import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/api/auth/login')
  @UseGuards(AuthGuard('local'))
  login(@Request() req) {
    return req.user.role;
  }

  @Get('/api/auth/test')
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  test(@Request() req) {
    return req.user;
  }
}
