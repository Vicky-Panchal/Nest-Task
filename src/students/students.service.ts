import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Students } from './entities/students.entity';
import { exit } from 'process';


@Injectable()
export class StudentsService {
    constructor(@InjectRepository(Students) private repo: Repository<Students>){}

    async create(studentName: string,schoolName: string, aadharID: number, email: string) {

        const student = this.repo.create({studentName,schoolName, aadharID, email});
        const aadhar = await this.repo.find({aadharID});
        if(aadharID === aadhar[0].aadharID)
        {
            console.log(`Student is already enrolled in ${aadhar[0].schoolName}`);
            return;
        }

        return this.repo.save(student);

    }

    findOne(rollNo: number){

        return  this.repo.findOne(rollNo);
    }

    find(studentName: string) {
        return this.repo.find({studentName});
    }

    async update(aadharID: number, attrs: Partial<Students>) {
        const aadhar = await this.repo.find({aadharID});
        const student = await this.repo.findOne(aadhar[0].rollNo);
        if (!student) {
            throw new NotFoundException('Student not found');
        }
        
        if(aadharID === aadhar[0].aadharID && !(aadharID === student[0].aadharID) )
        {
            console.log(`Student is already enrolled in ${aadhar[0].schoolName}`);
            return;
        }
        Object.assign(student, attrs);
        return this.repo.save(student);
        
    }

    async remove(aadharID: number) {
        const student = await this.findOne(aadharID);

        if(!student) {
            throw new NotFoundException("Student not found");
        }
        return this.repo.remove(student);
    }
}
