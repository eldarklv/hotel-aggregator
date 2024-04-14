import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SupportRequestService } from './support-request.service';
import { SupportRequestClientService } from './SupportRequestClientService';
import { SupportRequestEmployeeService } from './SupportRequestEmployeeService';
import { CreateSupportRequestDto } from './dto/CreateSupportRequestDto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller()
export class SupportController {
  constructor(
    private readonly supportRequestService: SupportRequestService,
    private readonly supportRequestClientService: SupportRequestClientService,
    private readonly supportRequestEmployeeService: SupportRequestEmployeeService,
  ) {}

  // Позволяет пользователю с ролью client создать обращение в техподдержку
  @Post('/api/client/support-requests')
  @UsePipes(ValidationPipe)
  // @Roles(['client'])
  // @UseGuards(RolesGuard)
  createSupportRequest(@Body() data: CreateSupportRequestDto) {
    return this.supportRequestClientService.createSupportRequest(data);
  }

  // Позволяет пользователю с ролью client получить список обращений для текущего пользователя.
  @Get('/api/client/support-requests')
  @UsePipes(ValidationPipe)
  // @Roles(['client'])
  // @UseGuards(RolesGuard)
  getSupportRequestsForClient(
    @Query('user') user?: string,
    @Query('isActive') isActive?: boolean,
  ) {
    return this.supportRequestService.findSupportRequests({ user, isActive });
  }

  @Get('/api/manager/support-requests')
  @UsePipes(ValidationPipe)
  // @Roles(['client'])
  // @UseGuards(RolesGuard)
  getSupportRequestsForManager(
    @Query('user') user?: string,
    @Query('isActive') isActive?: boolean,
  ) {
    return this.supportRequestService.findSupportRequests({ user, isActive });
  }
}
