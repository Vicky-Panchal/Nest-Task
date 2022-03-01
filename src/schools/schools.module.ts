import { Module } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schools } from './entities/schools.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Schools]), AuthModule],
  providers: [SchoolsService],
  controllers: [SchoolsController]
})
export class SchoolsModule {}
