import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Student } from '../student/student.entity';

@Entity()
export class SchoolClass {
  @PrimaryColumn()
  id: string;

  @Column()
  schoolClassName: string;

  @OneToMany(() => Student, (student) => student.schoolClass)
  students: Student[];
}
