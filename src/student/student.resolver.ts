import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guards';
import { Roles } from 'src/decorators/roles.decorator';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './student.entity';

@Resolver(() => Student)
@UseGuards(RolesGuard)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => [Student])
  @Roles('admin', 'principal', 'teacher')
  async getStudents(
    @Args('name', { nullable: true }) name?: string,
    @Args('schoolClassId', { nullable: true }) schoolClassId?: string,
  ) {
    return this.studentService.readAll(name, schoolClassId);
  }

  @Query(() => Student)
  @Roles('admin', 'principal', 'teacher')
  async getStudentById(@Args('id') id: number) {
    return this.studentService.readById(id);
  }

  @Mutation(() => Student)
  @Roles('admin', 'teacher')
  async createStudent(
    @Args('createStudentDto') createStudentDto: CreateStudentDto,
  ) {
    return this.studentService.create(createStudentDto);
  }

  @Mutation(() => Student)
  @Roles('admin', 'teacher')
  async updateStudent(
    @Args('id') id: number,
    @Args('updateStudentDto') updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Mutation(() => String)
  @Roles('admin', 'teacher')
  async deleteStudent(@Args('id') id: number) {
    await this.studentService.delete(id);
    return 'Student deleted successfully';
  }
}
