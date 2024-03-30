import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/registerUser.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/api/admin/users')
  @UsePipes(ValidationPipe)
  register(@Body() user: RegisterUserDto) {
    return this.usersService.create(user);
  }
}
