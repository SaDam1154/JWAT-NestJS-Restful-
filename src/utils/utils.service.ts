import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UtilsService {
  private readonly DATA_FILE = path.join(__dirname, '../../data/data.json');

  readData = () => {
    const data = fs.readFileSync(this.DATA_FILE, 'utf8');
    return JSON.parse(data);
  };

  writeData = (data: any) => {
    fs.writeFileSync(this.DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  };

  checkClassExist = (coursesArr: any, courseId: number) => {
    const courseIdx = coursesArr.findIndex(
      (course: { id: number }) => course.id === Number(courseId),
    );

    if (courseIdx !== -1) {
      return true;
    } else {
      return false;
    }
  };

  checkClassName = (courseArr: any, courseName: string) => {
    const courseIdx = courseArr.findIndex(
      (course: { name: string }) => course.name == courseName,
    );

    if (courseIdx !== -1) {
      return true;
    } else {
      return false;
    }
  };

  checkStudentName = (studentArr: any, studentName: string) => {
    const studentIdx = studentArr.filter(
      (student: { name: string }) => student.name === studentName,
    );

    if (studentIdx.length > 0) {
      return true;
    }
    return false;
  };

  checkEnrolledStudents = (studentArr: any, courseId: number) => {
    const students = studentArr.filter(
      (student: { classId: number }) => student.classId === courseId,
    );

    if (students.length > 0) {
      return true;
    }
    return false;
  };

  checkNewStudentClass = (
    studentData: any,
    studentArr: any,
    courseArr: any,
  ) => {
    const courseId = studentData['classId'];

    if (
      this.checkClassExist(courseArr, courseId) &&
      !this.checkStudentName(studentArr, studentData?.name)
    ) {
      return true;
    }
    return false;
  };
}
