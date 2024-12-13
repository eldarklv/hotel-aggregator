import {
  Controller,
  Query,
  Get,
  UsePipes,
  ValidationPipe,
  Post,
  Body,
  UseGuards,
  Put,
  UseInterceptors,
  UploadedFiles,
  Param,
} from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelRoomService } from './hotel-room.service';
import { HotelDto } from './dto/hotel.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { HotelRoomDto } from './dto/hotel-room.dto';
import { HotelRoomPostDto } from './dto/hotel-room-post.dto';
import { HotelRoomPutDto } from './dto/hotel-room-put.dto';
import { ApiOkResponse, ApiResponse } from '@nestjs/swagger';
import { HotelRoom } from './schemas/hotel-room.schema';
import { Hotel } from './schemas/hotel.schema';

@Controller()
export class HotelsController {
  constructor(
    private readonly hotelsService: HotelsService,
    private readonly hotelRoomService: HotelRoomService,
  ) {}

  // Основной API для поиска номеров
  @Get('/api/common/hotel-rooms')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({ type: [HotelRoom] })
  searchRooms(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('hotelId') hotelId?: string,
  ) {
    return this.hotelRoomService.search({ limit, offset, hotelId });
  }

  // Получение подробной информации о номере
  @Get('/api/common/hotel-rooms/:id')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({ type: HotelRoom })
  searchRoomById(@Param('id') id: string) {
    return this.hotelRoomService.findById(id);
  }

  // Добавление гостиницы администратором.
  @Post('/api/admin/hotels')
  @UsePipes(ValidationPipe)
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @ApiOkResponse({ type: Hotel })
  createHotel(@Body() hotel: HotelDto) {
    return this.hotelsService.create(hotel);
  }

  // Получение списка гостиниц администратором.
  @Get('/api/admin/hotels')
  @UsePipes(ValidationPipe)
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @ApiOkResponse({ type: [Hotel] })
  getHotelsList(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('title') title?: string,
  ) {
    return this.hotelsService.search({ limit, offset, title });
  }

  // Изменение описания гостиницы администратором.
  @Put('/api/admin/hotels/:id')
  @UsePipes(ValidationPipe)
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @ApiOkResponse({ type: Hotel })
  updateHotel(@Query('id') id: string, @Body() hotel: HotelDto) {
    return this.hotelsService.update(id, hotel);
  }

  // Добавление номера гостиницы администратором.
  @Post('/api/admin/hotel-rooms')
  @UsePipes(ValidationPipe)
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @UseInterceptors(FilesInterceptor('images'))
  @ApiOkResponse({ type: HotelRoom })
  createHotelRoom(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() body: HotelRoomPostDto,
  ) {
    const imagePaths = images.map((image) => {
      return image.path;
    });
    const hotelRoomObject = {
      images: imagePaths,
      hotel: body.hotelId,
      description: body.description,
    };
    return this.hotelRoomService.create(hotelRoomObject);
  }

  // Изменение описания номера гостиницы администратором.
  @Put('/api/admin/hotel-rooms/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(FilesInterceptor('images'))
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @ApiOkResponse({type: HotelRoom})
  editHotelRoom(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Body() body: HotelRoomPutDto,
    @Param('id') id: string,
  ) {
    const imagePaths = images.map((image) => {
      return image.path;
    });
    const hotelRoomObject = {
      images: imagePaths,
      hotel: body.hotelId,
      description: body.description,
      isEnabled: body.isEnabled,
    };
    return this.hotelRoomService.update(id, hotelRoomObject);
  }
}
