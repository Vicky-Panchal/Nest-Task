import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class SearchQueryDto {

    @Type(() => String)
    @IsOptional()
    studentName: string;

    @Type(() => String)
    @IsOptional()
    email: string;

    @Type(()=> String)
    @IsOptional()
    aadharID: string;

    @Type(()=> Number)
    @IsOptional()
    userId: number;
}