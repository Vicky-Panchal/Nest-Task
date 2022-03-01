import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Students } from './entities/students.entity';
import { Schools } from 'src/schools/entities/schools.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Students, Schools]), AuthModule],
  providers: [StudentsService],
  controllers: [StudentsController]
})
export class StudentsModule {}
