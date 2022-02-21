import { Type } from "class-transformer";
import { IsOptional } from "class-validator";

export class PaginationQueryDto {
    @Type(() => String)
    @IsOptional()
    studentName: string;

    @Type(() => String)
    @IsOptional()
    schoolName: string;

    @Type(() => String)
    @IsOptional()
    email: string;

    @Type(()=> String)
    @IsOptional()
    aadharID: string;
}