import { IsEmail, IsString, IsNumber} from 'class-validator';

export class CreateStudentDto {
    @IsString()
    studentName: string;
    
    @IsString()
    schoolName: string;

    @IsNumber()
    aadharID: number;

    @IsEmail()
    email: string;
} 