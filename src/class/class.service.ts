import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { SchoolClass } from './class.entity';

@Injectable()
export class ClassService {
  private classes: SchoolClass[] = [
    { id: 'JWAT1', className: 'Class 1' },
    { id: 'JWAT2', className: 'Class 2' },
  ];

  private students = [
    { id: 1, name: 'Student1', classId: 'JWAT1' },
    { id: 2, name: 'Student2', classId: 'JWAT2' },
  ];

  readAll(): SchoolClass[] {
    return this.classes;
  }

  readById(id: string): SchoolClass {
    const cls = this.classes.find((c) => c.id === id);
    if (!cls) throw new NotFoundException('Class not found');
    return cls;
  }

  create(classDto: SchoolClass): SchoolClass {
    const { id, className } = classDto;

    if (!id || !className) {
      throw new BadRequestException('Missing field!');
    }

    if (this.classes.some((c) => c.id === id)) {
      throw new BadRequestException('Class ID must be unique');
    }

    if (this.classes.some((c) => c.className === className)) {
      throw new BadRequestException('Class name must be unique');
    }

    const newClass: SchoolClass = { id, className };
    this.classes.push(newClass);
    return newClass;
  }

  update(id: string, updatedClass: Partial<SchoolClass>): SchoolClass {
    const cls = this.readById(id);

    if (
      updatedClass.className &&
      this.classes.some(
        (c) => c.className === updatedClass.className && c.id !== id,
      )
    ) {
      throw new BadRequestException('Class name must be unique');
    }

    if (updatedClass.className) {
      cls.className = updatedClass.className;
    }

    return cls;
  }

  delete(id: string): void {
    if (this.students.some((student) => student.classId === id)) {
      throw new BadRequestException('Cannot delete class with students');
    }

    const index = this.classes.findIndex((c) => c.id === id);
    if (index === -1) throw new NotFoundException('Class not found');

    this.classes.splice(index, 1);
  }
}
