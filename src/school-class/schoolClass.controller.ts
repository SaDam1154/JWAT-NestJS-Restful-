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
import { SchoolClassService } from './schoolClass.service';
import { SchoolClass } from './schoolClass.entity';
import { RolesGuard } from 'src/guards/roles.guards';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('school-classes')
export class SchoolClassController {
  constructor(private readonly schoolClassService: SchoolClassService) {}

  @Get()
  @Roles('admin', 'principal', 'teacher')
  @UseGuards(RolesGuard)
  async getAllSchoolClasses(): Promise<SchoolClass[]> {
    return await this.schoolClassService.readAll();
  }

  @Get(':id')
  @Roles('admin', 'principal', 'teacher')
  @UseGuards(RolesGuard)
  async getSchoolClassById(@Param('id') id: string): Promise<SchoolClass> {
    return await this.schoolClassService.readById(id);
  }

  @Post()
  @Roles('admin', 'principal')
  @UseGuards(RolesGuard)
  async createSchoolClass(
    @Body() schoolClassDto: SchoolClass,
  ): Promise<SchoolClass> {
    return await this.schoolClassService.create(schoolClassDto);
  }

  @Put(':id')
  @Roles('admin', 'principal')
  @UseGuards(RolesGuard)
  async updateSchoolClass(
    @Param('id') id: string,
    @Body() updatedSchoolClass: Partial<SchoolClass>,
  ): Promise<SchoolClass> {
    return await this.schoolClassService.update(id, updatedSchoolClass);
  }

  @Delete(':id')
  @Roles('admin', 'principal')
  @UseGuards(RolesGuard)
  async deleteSchoolClass(@Param('id') id: string): Promise<void> {
    return await this.schoolClassService.delete(id);
  }
}
