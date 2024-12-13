import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ID } from 'src/types/CommonTypes';

export class SendMessageDto {
  @IsMongoId()
  @ApiProperty()
  author: ID;

  @IsMongoId()
  @ApiProperty()
  supportRequest: string;

  @IsNotEmpty()
  @ApiProperty()
  text: string;
}
