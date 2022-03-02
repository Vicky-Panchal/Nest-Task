import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class SearchQueryDto {

    @Type(() => String)
    @IsOptional()
    school_name: string;

    @Type(() => String)
    @IsOptional()
    school_board: string;

    @Type(()=> String)
    @IsOptional()
    city: string;
}