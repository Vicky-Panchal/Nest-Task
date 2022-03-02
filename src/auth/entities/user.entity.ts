import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { Students } from "src/students/entities/students.entity";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    username: string;

    @Column()
    role: string;

    @Column()
    password: string;

    @OneToMany(()=> Students, (students) => students.user_id)
    students: Students[];

    async validatePassowrd(password: string): Promise<boolean> {

        const match = await bcrypt.compare(password, this.password);
        return match;
    }
}