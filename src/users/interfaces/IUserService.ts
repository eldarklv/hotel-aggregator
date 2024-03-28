import { ObjectId } from 'mongoose';
import { User } from '../schemas/user.schema';
import SearchUserParams from './SearchUserParams';

export default interface IUserService {
  create(data: Partial<User>): Promise<User>;
  findById(id: ObjectId): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(params: SearchUserParams): Promise<User[]>;
}
