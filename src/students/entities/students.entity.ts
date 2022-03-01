import { User } from 'src/auth/entities/user.entity';
import { Schools } from 'src/schools/entities/schools.entity';
import { Entity,
         Column,
         PrimaryGeneratedColumn,
         ManyToOne,
         JoinColumn} from 'typeorm';

@Entity('students')
export class Students {
    @PrimaryGeneratedColumn()
    rollNo: number;

    @Column({ unique: true})
    aadharID: string;

    @Column()
    studentName: string;

    @Column()
    email: string;

    @ManyToOne(() => User,{cascade:true, eager:true})
    @JoinColumn()
    user: User;

    @Column({unique:false})
    userId: number;
    
    @ManyToOne(() =>  Schools, (schools) => schools.students,{cascade:true,eager: true})
    @JoinColumn({name: "schoolID", referencedColumnName: "schoolID"})
    schoolID: Schools;

}