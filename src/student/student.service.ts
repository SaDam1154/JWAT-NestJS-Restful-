import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  private students: Student[] = [
    { id: 0, name: 'Student1', classId: 'JWAT1' },
    { id: 1, name: 'Student2', classId: 'JWAT2' },
    { id: 2, name: 'Student3', classId: 'JWAT3' },
  ];

  readAll(name?: string, classId?: string): Student[] {
    if (!name && !classId) {
      return this.students;
    }

    let filteredStudents = this.students;
    if (name) {
      filteredStudents = filteredStudents.filter((s) =>
        s.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    if (classId) {
      filteredStudents = filteredStudents.filter((s) =>
        s.classId.toLowerCase().includes(classId.toLowerCase()),
      );
    }

    if (filteredStudents.length === 0) {
      throw new NotFoundException('No students found matching the criteria');
    }

    return filteredStudents;
  }

  readByName(name: string): Student[] {
    const studentsByName = this.students.filter((s) =>
      s.name.toLowerCase().includes(name.toLowerCase()),
    );
    if (studentsByName.length === 0)
      throw new NotFoundException('No students found with this name');
    return studentsByName;
  }

  readByClass(classId: string): Student[] {
    const studentsByClass = this.students.filter((s) =>
      s.classId.toLowerCase().includes(classId.toLowerCase()),
    );
    if (studentsByClass.length === 0)
      throw new NotFoundException('No students found in this class');
    return studentsByClass;
  }

  readById(id: number): Student {
    const student = this.students.find((s) => s.id == id);
    if (!student)
      throw new NotFoundException('Student not found when searchID');
    return student;
  }

  create(student: Omit<Student, 'id'>): Student {
    const newId =
      this.students.length > 0
        ? this.students[this.students.length - 1].id + 1
        : 1;

    const newStudent = { id: newId, ...student };
    this.students.push(newStudent);
    return newStudent;
  }

  update(id: number, updatedStudent: Partial<Student>): Student {
    const student = this.readById(id);
    Object.assign(student, updatedStudent);
    return student;
  }

  delete(id: number): void {
    const index = this.students.findIndex((s) => s.id == id);
    if (index === -1) throw new NotFoundException('Student not found');
    this.students.splice(index, 1);
  }
}
