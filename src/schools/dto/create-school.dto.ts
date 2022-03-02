import { IsEmail, IsString} from 'class-validator';

export class CreateSchoolDto {
    @IsString()
    school_name: string;
    
    @IsString()
    school_board: string;

    @IsString()
    city: string;

} 