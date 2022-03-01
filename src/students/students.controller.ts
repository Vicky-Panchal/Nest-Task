import { Body,
         Controller,
         Delete,
         Post,
         Get,
         Patch,
         Param,
         Query,
         HttpStatus,
         UseGuards,  
        } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { Schools } from 'src/schools/entities/schools.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { SearchQueryDto } from './dto/search-query.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentsService } from './students.service';


@Controller('students')
@UseGuards(AuthGuard())
export class StudentsController {
    constructor(private studentsService: StudentsService){}

    @Post('/addStudent')
    createStudent(@Body() body: CreateStudentDto, school: Schools, @GetUser() user: User) {

        return this.studentsService.create(body, school, user);
    }

    @Get('/:rollNo')
    async findStudent(@Param('rollNo') rollNo: string, @GetUser() user: User) {
        const student = await this.studentsService.findOne(parseInt(rollNo),user);
        return student;
    }

    @Get()
    findAllStudents(@Query() searchQueryDto: SearchQueryDto,@GetUser() user:User) {
        return this.studentsService.find(searchQueryDto,user);
    }

    @Delete('/:rollNo')
    removeStudent(@Param('rollNo') rollNo: string, @GetUser() user: User) {
        return this.studentsService.remove(parseInt(rollNo), user);
    }

    @Patch('/:rollNo')
    updateStudent(@Param('rollNo') rollNo: string, @Body() body: UpdateStudentDto, @GetUser() user: User) {
        return this.studentsService.update(parseInt(rollNo), body,user);
    }
}
