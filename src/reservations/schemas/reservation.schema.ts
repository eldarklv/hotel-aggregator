import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Hotel } from '../../hotels/schemas/hotel.schema';
import { User } from '../../users/schemas/user.schema';
import { HotelRoom } from '../../hotels/schemas/hotel-room.schema';
import { ApiProperty } from '@nestjs/swagger';

export type ReservationDocument = HydratedDocument<Hotel>;

@Schema({ timestamps: true })
export class Reservation {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  @ApiProperty({type: () => User})
  userId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true })
  @ApiProperty({type: () => Hotel})
  hotelId: Hotel;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HotelRoom',
    required: true,
  })
  @ApiProperty({type: () => HotelRoom})
  roomId: HotelRoom;

  @Prop({ required: true })
  @ApiProperty()
  dateStart: Date;

  @Prop({ required: true })
  @ApiProperty()
  dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
