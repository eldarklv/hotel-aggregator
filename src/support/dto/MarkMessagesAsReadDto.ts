import { IsDate, IsMongoId } from 'class-validator';
import { ID } from 'src/types/CommonTypes';

export class MarkMessagesAsReadDto {
  @IsMongoId()
  user: ID;

  @IsMongoId()
  supportRequest: ID;

  @IsDate()
  createdBefore: Date;
}
