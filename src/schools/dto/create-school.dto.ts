import { IsEmail, IsString} from 'class-validator';

export class CreateSchoolDto {
    @IsString()
    schoolName: string;
    
    @IsString()
    schoolBoard: string;

    @IsString()
    city: string;

} 