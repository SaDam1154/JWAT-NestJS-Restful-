import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { SchoolClass } from 'src/school-class/schoolClass.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(SchoolClass)
    private readonly schoolClassRepository: Repository<SchoolClass>,
  ) {}

  async readAll(name?: string, schoolClassId?: string): Promise<Student[]> {
    const query = this.studentRepository.createQueryBuilder('student');

    if (name) {
      query.andWhere('LOWER(student.name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    }

    if (schoolClassId) {
      query.andWhere('student.schoolClassId LIKE :schoolClassId', {
        schoolClassId: `%${schoolClassId}%`,
      });
    }

    const students = await query.getMany();
    if (!students || students.length === 0) {
      throw new NotFoundException('No students found matching the criteria');
    }

    return students;
  }

  async readByName(name: string): Promise<Student[]> {
    const studentsByName = await this.studentRepository.find({
      where: { name: name },
    });

    if (!studentsByName || studentsByName.length === 0) {
      throw new NotFoundException('No students found with this name');
    }

    return studentsByName;
  }

  async readByClass(schoolClassId: string): Promise<Student[]> {
    const studentsByClass = await this.studentRepository.find({
      where: { schoolClassId: schoolClassId },
    });

    if (!studentsByClass || studentsByClass.length === 0) {
      throw new NotFoundException('No students found in this class');
    }

    return studentsByClass;
  }

  async readById(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({ where: { id } });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    return student;
  }

  async create(data: CreateStudentDto): Promise<Student> {
    const existStudent = await this.studentRepository.findOne({
      where: { name: data.name },
    });

    const existSchoolClass = await this.schoolClassRepository.findOne({
      where: { id: data.schoolClassId },
    });

    if (!existStudent && existSchoolClass) {
      const newStudent = this.studentRepository.create(data);
      return await this.studentRepository.save(newStudent);
    }

    if (existStudent) console.log('Student with this name already exists');
    if (!existSchoolClass) console.log('School class not found');
  }

  async update(id: number, updatedStudent: Partial<Student>): Promise<Student> {
    const student = await this.readById(id);
    Object.assign(student, updatedStudent);
    return await this.studentRepository.save(student);
  }

  async delete(id: number): Promise<void> {
    const result = await this.studentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Student not found');
    }
  }
}
