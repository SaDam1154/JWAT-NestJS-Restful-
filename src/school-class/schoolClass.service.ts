import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { SchoolClass } from './schoolClass.entity';

@Injectable()
export class SchoolClassService {
  constructor(
    @InjectRepository(SchoolClass)
    private readonly schoolClassRepository: Repository<SchoolClass>,
  ) {}

  async readAll(): Promise<SchoolClass[]> {
    return await this.schoolClassRepository.find();
  }

  async readById(id: string): Promise<SchoolClass> {
    const schoolClass = await this.schoolClassRepository.findOne({
      where: { id },
    });
    if (!schoolClass) {
      throw new NotFoundException('School class not found');
    }
    return schoolClass;
  }

  async create(schoolClassDto: SchoolClass): Promise<SchoolClass> {
    const { id, schoolClassName } = schoolClassDto;

    if (!id || !schoolClassName) {
      throw new BadRequestException('Missing field!');
    }

    const existingClassById = await this.schoolClassRepository.findOne({
      where: { id },
    });
    if (existingClassById) {
      throw new BadRequestException('School class ID must be unique');
    }

    const existingClassByName = await this.schoolClassRepository.findOne({
      where: { schoolClassName },
    });
    if (existingClassByName) {
      throw new BadRequestException('School class name must be unique');
    }

    const newSchoolClass = this.schoolClassRepository.create(schoolClassDto);
    return await this.schoolClassRepository.save(newSchoolClass);
  }

  async update(
    id: string,
    updatedSchoolClass: Partial<SchoolClass>,
  ): Promise<SchoolClass> {
    const schoolClass = await this.readById(id);

    if (
      updatedSchoolClass.schoolClassName &&
      (await this.schoolClassRepository.findOne({
        where: {
          schoolClassName: updatedSchoolClass.schoolClassName,
          id: Not(id),
        },
      }))
    ) {
      throw new BadRequestException('School class name must be unique');
    }

    Object.assign(schoolClass, updatedSchoolClass);
    return await this.schoolClassRepository.save(schoolClass);
  }

  async delete(id: string): Promise<void> {
    const studentCount = await this.schoolClassRepository
      .createQueryBuilder('schoolClass')
      .leftJoin('schoolClass.students', 'student')
      .where('schoolClass.id = :id', { id })
      .andWhere('student.schoolClassId = :id', { id })
      .getCount();

    if (studentCount > 0)
      throw new BadRequestException('Cannot delete school class with students');

    await this.schoolClassRepository.delete(id);
  }
}
