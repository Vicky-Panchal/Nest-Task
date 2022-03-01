import { IsEmail, IsString, IsNumber, Length} from 'class-validator';

export class CreateStudentDto {
    @IsString()
    studentName: string;

    @Length(12,12)
    @IsString()
    aadharID: string;

    @IsEmail()
    email: string;
} 