import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class SearchQueryDto {

    @Type(() => String)
    @IsOptional()
    student_name: string;

    @Type(() => String)
    @IsOptional()
    email: string;

    @Type(()=> String)
    @IsOptional()
    aadhar_id: string;

    @Type(()=> Number)
    @IsOptional()
    user_id: number;
}