import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsMongoId, IsNotEmpty } from "class-validator";
import { ObjectId } from "mongoose";

export class HotelRoomPutDto {
    @IsNotEmpty()
    @IsMongoId()
    @ApiProperty({type: String})
    hotelId: ObjectId;

    @IsNotEmpty()
    @ApiProperty()
    description: string;

    @ApiProperty()
    @IsBoolean()
    isEnabled: boolean;
}