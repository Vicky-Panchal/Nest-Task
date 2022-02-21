import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Students } from './entities/students.entity';
import { PaginationQueryDto } from './dto/pagination-query.dto';


@Injectable()
export class StudentsService {
    constructor(@InjectRepository(Students) private repo: Repository<Students>){}

    // Create a new student
    async create(studentName: string,schoolName: string, aadharID: string, email: string) {

        if(aadharID.length !=12){
            console.log(`AadharID should be of length 12`);
            return;
        }

        const student = this.repo.create({studentName,schoolName, aadharID, email});
        const aadhar = await this.repo.find({aadharID});

        // If the student with aadharID already exist then throw error
        if(aadhar[0])
        {
            // throw new BadRequestException(`Student is already enrolled in ${aadhar[0].schoolName}`);
            console.log(`Student is already enrolled in ${aadhar[0].schoolName}`);
            return;
        }

        return this.repo.save(student);

    }

    // To find student using its roll number
    findOne(rollNo: number){

        return  this.repo.findOne(rollNo);
    }

    // To find the student using any of its attibutes
    find(paginationQuery: PaginationQueryDto) {
        return this.repo.find(paginationQuery);
    }

    async update(aadharID: string, attrs: Partial<Students>) {
        const aadhar = await this.repo.find({aadharID});
        const student = await this.repo.findOne(aadhar[0].rollNo);

        // If students does not exist then throw error
        if (!student) {
            throw new NotFoundException('Student not found');
        }
        
        Object.assign(student, attrs);
        // If the updated aadharID already exist in table then throw error
        if(student.aadharID != aadharID)
        {
            throw new BadRequestException(`Please update proper aadhar ID`);
        }
        if(student.aadharID.length != 12){
            console.log(`AadharID should be of length 12`);
            return;
        }
        return this.repo.save(student);
        
    }

    async remove(aadharID: string) {
        const student = await this.repo.find({aadharID});
        if(!student) {
            throw new NotFoundException("Student not found");
        }
        return this.repo.remove(student);
    }
}
