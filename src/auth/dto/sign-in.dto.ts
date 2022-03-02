import { IsNumber, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class SignInDto {

    @IsNumber()
    id: number;

    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: "Passwod is too weak"})
    password: string;

    @IsString()
    // @Matches(/(student) | (admin)/)
    role: string;
}