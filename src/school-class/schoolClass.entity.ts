import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Student } from '../student/student.entity';

@ObjectType()
@Entity()
export class SchoolClass {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  schoolClassName: string;

  @Field(() => [Student], { nullable: true })
  @OneToMany(() => Student, (student) => student.schoolClass)
  students: Student[];
}
