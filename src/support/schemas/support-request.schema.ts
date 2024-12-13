import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { Message } from './message.schema';
import { getMskDate } from 'src/helpers/dateHelper';
import { ApiProperty } from '@nestjs/swagger';

export type SupportRequestDocument = HydratedDocument<SupportRequest>;

@Schema({ timestamps: true })
export class SupportRequest {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  @ApiProperty({type: () => User})
  user: User;

  @Prop({ required: true, default: getMskDate() })
  @ApiProperty()
  sentAt: Date;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    default: [],
  })
  @ApiProperty({type: () => [Message]})
  messages: Message[];

  @Prop({ default: true })
  @ApiProperty()
  isActive: boolean;
}

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
