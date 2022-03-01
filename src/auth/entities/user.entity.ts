import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Column()
    salt: string;

    @OneToMany(()=> Students, (students) => students.userId)
    students: Students[];

    async validatePassowrd(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password,this.salt);
        return hash === this.password;
    }
}