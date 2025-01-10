import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { SchoolClass } from '../school-class/schoolClass.entity';

@ObjectType()
@Entity()
export class Student {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  schoolClassId: string;

  @Field(() => SchoolClass, { nullable: true })
  @ManyToOne(() => SchoolClass, (schoolClass) => schoolClass.students, {
    nullable: true,
  })
  schoolClass?: SchoolClass;
}
