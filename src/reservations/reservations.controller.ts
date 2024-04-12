import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationDto } from './dto/reservation.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ObjectId } from 'mongoose';

@Controller()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  // Создаёт бронь на номер на выбранную дату для текущего пользователя.
  @Post('/api/client/reservations')
  @UsePipes(ValidationPipe)
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  createReservation(
    @Body()
    reservation: ReservationDto,
  ) {
    return this.reservationsService.addReservation(reservation);
  }

  // Список броней текущего пользователя.
  @Get('/api/client/reservations')
  @Roles(['client'])
  @UseGuards(RolesGuard)
  @UsePipes(ValidationPipe)
  getUserReservations(
    @Query('userId') userId?: ObjectId,
    @Query('dateStart') dateStart?: Date,
    @Query('dateEnd') dateEnd?: Date,
  ) {
    return this.reservationsService.getReservations({
      userId,
      dateStart,
      dateEnd,
    });
  }

  // Отменяет бронь пользователя.
  @Delete('/api/client/reservations/:id')
  @Roles(['client'])
  @UseGuards(RolesGuard)
  deleteReservation(@Param('id') id: string) {
    return this.reservationsService.removeReservation(id);
  }
}
