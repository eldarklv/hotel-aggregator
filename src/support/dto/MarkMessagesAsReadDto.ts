import { IsISO8601, IsMongoId } from 'class-validator';
import { ID } from 'src/types/CommonTypes';

export class MarkMessagesAsReadDto {
  @IsMongoId()
  user: string;

  @IsMongoId()
  supportRequest: string;

  @IsISO8601()
  createdBefore: Date;
}
