import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ID } from 'src/types/CommonTypes';

export class CreateSupportRequestDto {
  @IsMongoId()
  @ApiProperty({type: String})
  user: ID;

  @IsNotEmpty()
  @ApiProperty()
  text: string;
}
