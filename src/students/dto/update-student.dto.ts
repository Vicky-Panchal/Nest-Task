import { IsEmail, IsString, IsOptional, IsNumber } from "class-validator";

export class UpdateStudentDto {
    @IsString()
    @IsOptional()
    studentName: string;

    @IsString()
    @IsOptional()
    schoolName: string;

    @IsString()
    @IsOptional()
    aadharID: string;

    @IsEmail()
    @IsOptional()
    email: string;
}