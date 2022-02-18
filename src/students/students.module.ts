import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { Students } from './entities/students.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Students])],
  providers: [StudentsService],
  controllers: [StudentsController]
})
export class StudentsModule {}
