import { IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {

    @IsNumber()
    id: number;


    @IsString()
    @MinLength(4)
    @MaxLength(15)
    @IsOptional()
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: "Passwod is too weak"})
    password: string;

    @IsString()
    // @Matches(/(student) | (admin)/)
    role: string;
}