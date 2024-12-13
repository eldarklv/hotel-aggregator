import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type HotelDocument = HydratedDocument<Hotel>;

@Schema({ timestamps: true })
export class Hotel {
  @Prop({ required: true, unique: true })
  @ApiProperty()
  title: string;

  @Prop()
  @ApiProperty()
  description: string;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
