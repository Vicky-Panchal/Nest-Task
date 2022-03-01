import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class SearchQueryDto {

    @Type(() => String)
    @IsOptional()
    schoolName: string;

    @Type(() => String)
    @IsOptional()
    schoolBoard: string;

    @Type(()=> String)
    @IsOptional()
    city: string;
}