import { HotelRoom } from '../schemas/hotel-room.schema';
import { ID } from 'src/types/CommonTypes';
import { SearchRoomsParams } from './SearchRoomsParams';
import { UpdateHotelParams } from './UpdateHotelParams';

export interface IHotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: ID): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: ID, hotel: UpdateHotelParams): Promise<HotelRoom>;
}
