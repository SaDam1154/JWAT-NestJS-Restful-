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
  findAll() {
    return this.studentsService.readAll();
  }

  @Get('name')
  @Roles('admin', 'principal', 'teacher')
  @UseGuards(RolesGuard)
  readByName(@Query('name') name: string) {
    return this.studentsService.readByName(name);
  }

  @Get('class')
  @Roles('admin', 'teacher')
  @UseGuards(RolesGuard)
  readByClass(@Query('classId') classId: string) {
    return this.studentsService.readByClass(classId);
  }

  @Get(':id')
  @Roles('admin', 'principal', 'teacher')
  @UseGuards(RolesGuard)
  findById(@Param('id') id: number) {
    return this.studentsService.readById(id);
  }

  @Post()
  @Roles('admin', 'principal')
  @UseGuards(RolesGuard)
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Put(':id')
  @Roles('admin', 'principal', 'teacher')
  @UseGuards(RolesGuard)
  update(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(id, updateStudentDto);
  }

  @Delete(':id')
  @Roles('admin', 'principal')
  @UseGuards(RolesGuard)
  delete(@Param('id') id: number) {
    this.studentsService.delete(id);
    return { message: 'Student deleted successfully' };
  }
}
