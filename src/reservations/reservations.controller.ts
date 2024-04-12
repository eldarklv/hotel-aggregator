import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationDto } from './dto/reservation.dto';

@Controller()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post('/api/client/reservations')
  @UsePipes(ValidationPipe)
  createReservation(
    @Body()
    reservation: ReservationDto,
  ) {
    return this.reservationsService.addReservation(reservation);
  }
}
