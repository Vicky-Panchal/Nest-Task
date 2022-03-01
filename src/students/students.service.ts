import { BadRequestException, Body, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { createQueryBuilder, Repository } from 'typeorm';
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
       
        const aadharID = body.aadharID;
        const aadhar = await this.repo.find({aadharID});

        // If the student with aadharID already exist then throw error
        if(aadhar[0])
        {
            throw new BadRequestException(`Student is already enrolled.`);
        }

        const student = this.repo.create(body);
        console.log(((await this.repo.find({userId:user.id})).length));
        console.log([].length == 0);
        if(user.role == "student" && ((await this.repo.find({userId:user.id})).length))
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
                "Student": student
                }
    }

    // To find student using its roll number
    async findOne(rollNo: number, user: User){

        const student = await this.repo.findOne({where: {rollNo,userId: user.id}});
        if(!student)
        {
            throw new NotFoundException("Students Not found");

        }
        return student;
    }

    // To find the student using any of its attibutes
    async find(searchQueryDto:SearchQueryDto,user: User) {

        const query = this.repo.createQueryBuilder("students");

        query.where("students.userId = :userId", {userId: user.id});

        // const student = await query.getMany();
        // console.log(student);
        const student = await this.repo.find(searchQueryDto);
        console.log(student.length);
        for(let i = 0; i<student.length; i++)
        {
            console.log(student[i]);
            if(student[i].userId == user.id)
            {
                console.log("inside if condition");
                delete student[i].user;
                delete student[i].schoolID.user;
                continue;
            }
            else{
                console.log("inside else condition");
                student.splice(i,1);
            }
        }

        if(!student)
        {
            throw new NotFoundException("No records found");
        }
        return student;
    }

    async update(rollNo: number, attrs: Partial<Students>, user: User) {

        if(attrs.userId != user.id)
        {
            throw new BadRequestException("You can't update the user id");
        }

        const og_rollNo = rollNo;
        const aadhar = await this.repo.find({where:{rollNo, userId: user.id}});
        rollNo = aadhar[0].rollNo;
        const student = await this.repo.findOne({where:{rollNo,userId: user.id}});

        // If students does not exist then throw error
        if (!student) {
            throw new NotFoundException('Student not found');
        }
        
        Object.assign(student, attrs);
        // If the updated aadharID already exist in table then throw error
        if(student.rollNo != og_rollNo)
        {
            throw new BadRequestException(`Please update proper aadhar ID`);
        }



        await this.repo.save(student);
        delete student.user;
        return {
            "HTTPStatus code": HttpStatus.CREATED,
            "Student": student
            };
    }

    async remove(rollNo: number, user: User) {
        // [aadharID] = aadharID;
        const query = this.repo.createQueryBuilder("students");
        query.where("students.userId = :userId", {userId: user.id});

        const student = await this.repo.find({rollNo});
        
        if(!student) {
            throw new NotFoundException("Student not found");
        }

        await this.repo.remove(student);
        return {
            "HTTP Status": HttpStatus.ACCEPTED,
            "Removed student": student
        };
    }
}



