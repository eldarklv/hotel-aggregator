import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/api/admin/users')
  @UsePipes(ValidationPipe)
  register(@Body() user: RegisterUserDto) {
    return this.usersService.create(user);
  }

  @Get('/api/admin/users')
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  getUsersListByAdmin(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('contactPhone') contactPhone?: string,
  ) {
    return this.usersService.findAll({
      limit,
      offset,
      name,
      email,
      contactPhone,
    });
  }

  @Get('/api/manager/users')
  getUsersListByManager(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('contactPhone') contactPhone?: string,
  ) {
    return this.usersService.findAll({
      limit,
      offset,
      name,
      email,
      contactPhone,
    });
  }

  @Get('/api/admin/user-by-id/:id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Get('/api/admin/user-by-email')
  getUserByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }
}
