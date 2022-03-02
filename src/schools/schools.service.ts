import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Schools } from './entities/schools.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class SchoolsService {
    constructor(@InjectRepository(Schools) private repo: Repository<Schools>){}

    async Create(body: CreateSchoolDto, user: User){

        const school = this.repo.create(body);
        school.user = user;
        try{
            await this.repo.save(school);
        }
        catch(error){
            throw new ConflictException("School already exists");
        }
        delete school.user;
        return {
            "HTTP Status": HttpStatus.CREATED,
            "School": school
        }
    }

    async find(user:User){

        const query = this.repo.createQueryBuilder("school");

        query.where("school.user_id = :user_id", {user_id: user.id});

        // await this.repo.find({where: {searchQuery,user_id: user.id}});
        const school = await query.getMany();
        if(!school)
        {
            throw new NotFoundException("No records found");
        }
        return school;
    }
    
}
