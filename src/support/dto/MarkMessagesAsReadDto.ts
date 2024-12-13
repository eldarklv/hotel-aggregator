import { ApiProperty } from '@nestjs/swagger';
import { IsISO8601, IsMongoId } from 'class-validator';

export class MarkMessagesAsReadDto {
  @IsMongoId()
  @ApiProperty()
  user: string;

  @IsMongoId()
  @ApiProperty()
  supportRequest: string;

  @IsISO8601()
  @ApiProperty()
  createdBefore: Date;
}
