import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Student } from '../student/student.entity';

@Entity()
export class SchoolClass {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  schoolClassName: string;

  @OneToMany(() => Student, (student) => student.schoolClass)
  students: Student[];
}
