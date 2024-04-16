import { ObjectId } from 'mongoose';

export interface IUpdateHotelRoomParams {
  hotel: ObjectId;

  desctiprion: string;

  images: string[];

  isEnabled: boolean;
}
