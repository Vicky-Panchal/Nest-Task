import { IsEmail, IsString, IsOptional, IsNumber, Length } from "class-validator";

export class UpdateStudentDto {
    @IsString()
    @IsOptional()
    student_name: string;

    @IsString()
    @IsOptional()
    @Length(12,12)
    aadhar_id: string;

    @IsEmail()
    @IsOptional()
    email: string;
}