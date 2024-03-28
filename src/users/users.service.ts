import { Injectable } from '@nestjs/common';
import IUserService from './interfaces/IUserService';
import { Schema } from 'mongoose';
import SearchUserParams from './interfaces/SearchUserParams';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersService implements IUserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
  findById(id: Schema.Types.ObjectId): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
  findAll(params: SearchUserParams): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
}
