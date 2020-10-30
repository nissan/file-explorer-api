import { IsNumber, IsNumberString, IsString } from "class-validator";

export class CreateFileDto {
    @IsString()
    readonly originalName: string;
    @IsNumberString()
    readonly parentFolderId: number;
}
