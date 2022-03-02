import { Body, Controller, Get, Post, Query, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/entities/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateSchoolDto } from './dto/create-school.dto';
import { SearchQueryDto } from './dto/search-query.dto';
import { SchoolsService } from './schools.service';

@Controller('schools')
@UseGuards(AuthGuard())
export class SchoolsController {
    constructor(private schoolsService: SchoolsService){}

    @Post('addSchool')
    createSchool(@Body() body: CreateSchoolDto, @GetUser() user: User)
    {
        if(user.role == "admin")
        {
            return this.schoolsService.Create(body, user);
        }
        else{
            throw new UnauthorizedException("Only school admins have access");
        }
        
    }

    @Get()
    async findAllSchools(@GetUser() user: User){
        if(user.role == "admin")
        {
            return this.schoolsService.find(user);
        }
        else{
            throw new UnauthorizedException("Only school admins have access");
        }
    }

}
