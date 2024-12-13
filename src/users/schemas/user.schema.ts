import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  CLIENT = 'client',
  ADMIN = 'admin',
  MANAGER = 'manager',
}

@Schema()
export class User {
  @Prop({ required: true })
  @ApiProperty()
  name: string;

  @Prop({ required: true, unique: true })
  @ApiProperty()
  email: string;

  @Prop({
    type: String,
    enum: UserRole,
    default: UserRole.CLIENT,
    required: true,
  })
  @ApiProperty()
  role: string;

  @Prop()
  @ApiProperty()
  contactPhone: string;

  @Prop()
  @ApiProperty()
  passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
