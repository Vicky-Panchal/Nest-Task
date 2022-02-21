import { IsEmail, IsString, IsNumber} from 'class-validator';

export class CreateStudentDto {
    @IsString()
    studentName: string;
    
    @IsString()
    schoolName: string;

    @IsString()
    aadharID: string;

    @IsEmail()
    email: string;
} 