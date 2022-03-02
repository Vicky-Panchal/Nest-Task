import { Expose } from "class-transformer";

export class StudentDto {
    @Expose()
    roll_no: number;

    @Expose()
    aadhar_id: string;

    @Expose()
    student_name: string;

    @Expose()
    email: string;

    @Expose()
    user_id: number;

    @Expose()
    school_id: number;
}