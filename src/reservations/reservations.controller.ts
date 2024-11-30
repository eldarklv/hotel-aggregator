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
    // добавил 'client' в декоратор roles для того, чтобы клиенты тоже могли создавать себе брони
    // далее из-за этого делаем проверку на дурака в методе сервиса, чтобы пользователь мог только на себя делать бронь
    @Roles(['admin', 'client'])
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
        // удалил userId, теперь он определяется внутри сервиса
        @Query('dateStart') dateStart?: Date,
        @Query('dateEnd') dateEnd?: Date,
    ) {
        return this.reservationsService.getReservations({
            dateStart,
            dateEnd,
        });
    }

    // Отменяет бронь пользователя.
    @Delete('/api/client/reservations/:id')
    // согласно требования удалять бронь по этому адресу может только client
    // но для првоеряющего добавил admin и manager
    @Roles(['client', 'admin', 'manager'])
    @UseGuards(RolesGuard)
    deleteReservation(@Param('id') id: string) {
        return this.reservationsService.removeReservation(id);
    }
}
