import { IsEmail, IsString, IsOptional, IsNumber, Length } from "class-validator";

export class UpdateStudentDto {
    @IsString()
    @IsOptional()
    studentName: string;

    @IsString()
    @IsOptional()
    @Length(12,12)
    aadharID: string;

    @IsEmail()
    @IsOptional()
    email: string;
}