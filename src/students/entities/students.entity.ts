import { MaxLength, MinLength } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Students {
    @PrimaryGeneratedColumn()
    rollNo: number;
    
    @Column({ nullable: true})
    schoolName: string;

    @Column({ unique: true})
    @MinLength(12)
    @MaxLength(12)
    aadharID: string;

    @Column()
    studentName: string;

    @Column()
    email: string;

}