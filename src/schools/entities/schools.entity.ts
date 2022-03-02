import { User } from 'src/auth/entities/user.entity';
import { Students } from 'src/students/entities/students.entity';
import { Entity,
         Column,
         PrimaryGeneratedColumn,
         OneToMany,
         OneToOne,
         JoinColumn,
         Unique} from 'typeorm';

@Entity('school')
@Unique(["user"])
export class Schools {
    @PrimaryGeneratedColumn()
    school_id: number;
    
    @Column()
    schoolName: string;

    @Column()
    schoolBoard: string;

    @Column()
    city: string;

    @OneToOne(() => User,{cascade:true, eager:true})
    @JoinColumn({name:"user_id"})
    user: User;

    @Column()
    user_id: number;

    @OneToMany(()=> Students, (students) => students.school_id)
    students: Students[];

}