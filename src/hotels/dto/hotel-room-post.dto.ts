import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";
import { ObjectId } from "mongoose";

export class HotelRoomPostDto {
    @IsNotEmpty()
    @IsMongoId()
    @ApiProperty({type: String})
    hotelId: ObjectId;

    @IsNotEmpty()
    @ApiProperty()
    description: string;
}