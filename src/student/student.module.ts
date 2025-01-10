import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { SchoolClass } from 'src/school-class/schoolClass.entity';
import { StudentResolver } from './student.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Student, SchoolClass])],
  providers: [StudentService, StudentResolver],
})
export class StudentModule {}
