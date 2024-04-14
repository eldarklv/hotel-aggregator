import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ID } from 'src/types/CommonTypes';

export class SendMessageDto {
  @IsMongoId()
  author: ID;

  @IsMongoId()
  supportRequest: ID;

  @IsNotEmpty()
  text: string;
}
