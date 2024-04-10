import { Injectable } from '@nestjs/common';
import { ID } from 'src/types/CommonTypes';
import { IHotelRoomService } from './interfaces/IHotelRoomService';
import { SearchRoomsParams } from './interfaces/SearchRoomsParams';
import { HotelRoom } from './schemas/hotel-room.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HotelRoomDto } from './dto/hotel-room.dto';

@Injectable()
export class HotelRoomService implements IHotelRoomService {
  constructor(
    @InjectModel(HotelRoom.name)
    private hotelRoomModel: Model<HotelRoom>,
  ) {}

  create(hotel: HotelRoomDto): Promise<HotelRoom> {
    const newHotelRoom = this.hotelRoomModel.create(hotel);

    return newHotelRoom;
  }

  findById(id: ID): Promise<HotelRoom> {
    const hotelRoom = this.hotelRoomModel.findById(id);

    return hotelRoom;
  }

  search(params: SearchRoomsParams): Promise<HotelRoom[]> {
    // eslint-disable-next-line prefer-const
    let { limit, offset, hotelId, isEnabled } = params;

    limit = limit || 5;
    offset = offset || 0;
    hotelId = hotelId || '';

    const query: any = {};

    if (isEnabled) query.isEnabled = isEnabled;
    if (hotelId) query.hotelId = hotelId;

    const hotelRooms = this.hotelRoomModel
      .find(query)
      .skip(offset)
      .limit(limit);

    return hotelRooms;
  }

  update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom> {
    const updatedHotelRoom = this.hotelRoomModel.findByIdAndUpdate(id, data);

    return updatedHotelRoom;
  }
}
