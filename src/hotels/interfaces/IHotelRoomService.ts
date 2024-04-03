import { HotelRoom } from '../schemas/hotel-room.schema';
import { ID } from 'src/types/CommonTypes';
import { SearchRoomsParams } from './SearchRoomsParams';

export interface HotelRoomService {
  create(data: Partial<HotelRoom>): Promise<HotelRoom>;
  findById(id: ID): Promise<HotelRoom>;
  search(params: SearchRoomsParams): Promise<HotelRoom[]>;
  update(id: ID, data: Partial<HotelRoom>): Promise<HotelRoom>;
}
