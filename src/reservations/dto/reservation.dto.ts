import { IsISO8601, IsMongoId, IsNotEmpty } from 'class-validator';
import { ID } from '../../types/CommonTypes';
import { ApiProperty } from '@nestjs/swagger';

export class ReservationDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ type: String })
  userId: ID;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ type: String })
  hotelId: ID;

  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({ type: String })
  roomId: ID;

  @IsNotEmpty()
  @IsISO8601()
  @ApiProperty()
  dateStart: Date;

  @IsNotEmpty()
  @IsISO8601()
  @ApiProperty()
  dateEnd: Date;
}
