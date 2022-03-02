import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Students } from './entities/students.entity';
import { SearchQueryDto } from './dto/search-query.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { Schools } from 'src/schools/entities/schools.entity';
import { User } from 'src/auth/entities/user.entity';


@Injectable()
export class StudentsService {
    constructor(@InjectRepository(Students) private repo: Repository<Students>){}

    // Create a new student
    async create(body: CreateStudentDto, school: Schools, user: User) {
       
        const aadhar_id = body.aadhar_id;
        const aadhar = await this.repo.find({aadhar_id});

        // If the student with aadharID already exist then throw error
        if(aadhar[0])
        {
            throw new BadRequestException(`Student is already enrolled.`);
        }

        const student = this.repo.create(body);
        console.log(((await this.repo.find({user_id:user.id})).length));
        console.log([].length == 0);
        if(user.role == "student" && ((await this.repo.find({user_id:user.id})).length))
        {
            throw new BadRequestException("You are already enrolled");
        }

        student.user = user;
        try {
            await this.repo.save(student);
            delete student.user;
        } catch(err)
        {
            console.log(err);
            throw new BadRequestException("Either the school does not exist or the user already has a student");
        }
        
        return {
                "HTTPStatus code": HttpStatus.CREATED,
                "Student": `New student with name ${student.student_name} is created`
                }
    }

    // To find student using its roll number
    async findOne(roll_no: number, user: User){

        const student = await this.repo.findOne({where: {roll_no,userId: user.id}});
        if(!student)
        {
            throw new NotFoundException("Students Not found");

        }
        return student;
    }

    // To find the student using any of its attibutes
    async find(searchQueryDto:SearchQueryDto,user: User) {

        // const query = this.repo.createQueryBuilder("students");

        // query.where("students.user_id = :user_id", {user_id: user.id});
        const student = await this.repo.find(searchQueryDto);
        for(let i = 0; i<student.length; i++)
        {
            
            if(student[i].user_id != user.id)
            {
                delete student[i];
            }
        }

        if(!student)
        {
            throw new NotFoundException("No records found");
        }
        return student;
    }

    async update(roll_no: number, attrs: Partial<Students>, user: User) {

        if(attrs.user_id != undefined && attrs.user_id != user.id )
        {
            throw new BadRequestException("You can't update the user id");
        }

        const aadhar = await this.repo.find({where:{roll_no, user_id: user.id}});
        roll_no = aadhar[0].roll_no;
        const student = await this.repo.findOne({where:{roll_no,user_id: user.id}});

        // If students does not exist then throw error
        if (!student) {
            throw new NotFoundException('Student not found');
        }
        
        Object.assign(student, attrs);

        try {
            await this.repo.save(student);
        }
        catch(error)
        {
            throw new BadRequestException("Aadhar ID already exist in students");
        }
        return {
            "HTTPStatus code": HttpStatus.OK,
            "message": `Student with rollNo ${roll_no} has been updated`
            };
    }

    async remove(roll_no: number, user: User) {

        const student = await this.repo.find({where: {roll_no, user_id:user.id}});
        
        if(!student) {
            throw new NotFoundException("Student not found");
        }

        await this.repo.remove(student);
        if(student.length)
        {
            return {
                "HTTP Status": HttpStatus.ACCEPTED,
                "message": `Student with rollNo ${roll_no} is been removed`
            };
        }
        else
        {
            return {
                "HTTP Status": HttpStatus.UNAUTHORIZED,
                "message": "You don't have authentication to delete this user"
            }
        }
        
    }
}



