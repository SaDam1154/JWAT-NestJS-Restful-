import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { SchoolClass } from './class.entity';
import { RolesGuard } from 'src/guards/roles.guards';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('classes')
export class ClassController {
  constructor(private readonly classesService: ClassService) {}

  @Get()
  @Roles('admin', 'principal', 'teacher')
  @UseGuards(RolesGuard)
  getAllClasses(): SchoolClass[] {
    return this.classesService.readAll();
  }

  @Get(':id')
  @Roles('admin', 'principal', 'teacher')
  @UseGuards(RolesGuard)
  getClassById(@Param('id') id: string): SchoolClass {
    return this.classesService.readById(id);
  }

  @Post()
  @Roles('admin', 'principal')
  @UseGuards(RolesGuard)
  createClass(@Body() classDto: SchoolClass): SchoolClass {
    return this.classesService.create(classDto);
  }

  @Put(':id')
  @Roles('admin', 'principal')
  @UseGuards(RolesGuard)
  updateClass(
    @Param('id') id: string,
    @Body() updatedClass: Partial<SchoolClass>,
  ): SchoolClass {
    return this.classesService.update(id, updatedClass);
  }

  @Delete(':id')
  @Roles('admin', 'principal')
  @UseGuards(RolesGuard)
  deleteClass(@Param('id') id: string): void {
    return this.classesService.delete(id);
  }
}
