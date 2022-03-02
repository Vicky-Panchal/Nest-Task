import { IsEmail, IsString, IsNumber, Length} from 'class-validator';

export class CreateStudentDto {
    @IsString()
    student_name: string;

    @Length(12,12)
    @IsString()
    aadhar_id: string;

    @IsEmail()
    email: string;
} 