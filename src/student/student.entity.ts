import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { SchoolClass } from '../school-class/schoolClass.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  schoolClassId: string;

  @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.students, {
    nullable: true,
  })
  schoolClass?: SchoolClass;
}
