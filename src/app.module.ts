import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from './students/entities/students.entity';
import { StudentsModule } from './students/students.module';
import { SchoolsModule } from './schools/schools.module';
import { Schools } from './schools/entities/schools.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: 'localhost', // database host
      port: 5433, // database host
      username: 'postgres', // username
      password: 'vicky3600', // user password
      database: 'postgres', // name of our database,
      entities: [Students,Schools, User], // models will be loaded automatically 
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),
    StudentsModule,
    SchoolsModule,
    AuthModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
