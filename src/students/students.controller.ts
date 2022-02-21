import { Body,
         Controller,
         Delete,
         HttpException,
         Post,
         Get,
         Patch,
         Param,
         Query,
         HttpStatus,  
        } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentsService } from './students.service';


@Controller('students')
export class StudentsController {
    constructor(private studentsService: StudentsService){}

    @Post('/addStudent')
    createStudent(@Body() body: CreateStudentDto) {

        this.studentsService.create(body.studentName, body.schoolName, body.aadharID, body.email);
    }

    @Get('/:rollNo')
    async findStudent(@Param('rollNo') rollNo: string) {
        const student = await this.studentsService.findOne(parseInt(rollNo));
        if(!student) {
            throw new HttpException(`Student with Roll No ${rollNo} does not exist`, HttpStatus.NOT_FOUND);
        }

        return student;
    }

    @Get()
    findAllStudents(@Query() paginationQuery: PaginationQueryDto) {
        return this.studentsService.find(paginationQuery);
    }

    @Delete('/:aadharID')
    removeStudent(@Param('aadharID') aadharID: string) {
        return this.studentsService.remove(aadharID);
    }

    @Patch('/:aadharID')
    updateStudent(@Param('aadharID') aadharID: string, @Body() body: UpdateStudentDto) {
        return this.studentsService.update(aadharID, body);
    }
}
