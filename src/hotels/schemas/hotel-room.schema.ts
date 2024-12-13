import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Hotel } from './hotel.schema';
import { ApiProperty } from '@nestjs/swagger';

export type HotelRoomDocument = HydratedDocument<HotelRoom>;

@Schema({ timestamps: true })
export class HotelRoom {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true })
  @ApiProperty({type: () => Hotel})
  hotel: Hotel;

  @Prop()
  @ApiProperty()
  description: string;

  @Prop({ default: [] })
  @ApiProperty()
  images: string[];

  @Prop({ required: true, default: true })
  @ApiProperty()
  isEnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
