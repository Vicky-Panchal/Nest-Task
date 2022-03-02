import { Expose } from "class-transformer";

export class StudentDto {
    @Expose()
    rollNo: number;

    @Expose()
    aadharID: string;

    @Expose()
    studentName: string;

    @Expose()
    email: string;

    @Expose()
    user_id: number;

    @Expose()
    school_id: number;
}