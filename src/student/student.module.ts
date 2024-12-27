import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { SchoolClass } from 'src/school-class/schoolClass.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, SchoolClass])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
