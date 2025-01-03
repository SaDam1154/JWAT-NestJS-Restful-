import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { RolesGuard } from 'src/guards/roles.guards';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('students')
export class StudentController {
  constructor(private readonly studentsService: StudentService) {}

  @Get()
  @Roles('admin', 'principal', 'teacher')
  @UseGuards(RolesGuard)
  readAll(
    @Query('name') name?: string,
    @Query('schoolClassId') schoolClassId?: string,
  ) {
    return this.studentsService.readAll(name, schoolClassId);
  }

  @Get('name')
  @Roles('admin', 'principal', 'teacher')
  @UseGuards(RolesGuard)
  readByName(@Query('name') name: string) {
    return this.studentsService.readByName(name);
  }

  @Get('class')
  @Roles('admin', 'principal', 'teacher')
  @UseGuards(RolesGuard)
  readByClass(@Query('schoolClassId') schoolClassId: string) {
    return this.studentsService.readByClass(schoolClassId);
  }

  @Get(':id')
  @Roles('admin', 'principal', 'teacher')
  @UseGuards(RolesGuard)
  findById(@Param('id') id: number) {
    return this.studentsService.readById(id);
  }

  @Post()
  @Roles('admin', 'teacher')
  @UseGuards(RolesGuard)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Put(':id')
  @Roles('admin', 'teacher')
  @UseGuards(RolesGuard)
  update(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @Roles('admin', 'teacher')
  @UseGuards(RolesGuard)
  delete(@Param('id') id: number) {
    this.studentsService.delete(id);
    return { message: 'Student deleted successfully' };
  }
}
