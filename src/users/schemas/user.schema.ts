import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum UserRole {
  CLIENT = 'client',
  ADMIN = 'admin',
  MANAGER = 'manager',
}

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop({ type: String, enum: UserRole })
  role: string;

  @Prop()
  contactPhone: string;

  @Prop()
  passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
