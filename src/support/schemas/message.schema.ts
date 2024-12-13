import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { ApiProperty } from '@nestjs/swagger';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  @ApiProperty({type: () => User})
  author: User;

  @Prop({ required: true })
  @ApiProperty()
  sentAt: Date;

  @Prop({ required: true })
  @ApiProperty()
  text: string;

  @Prop()
  @ApiProperty()
  readAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
