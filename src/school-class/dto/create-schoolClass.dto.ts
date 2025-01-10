import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';
import { Student } from 'src/student/student.entity';
import { OneToMany } from 'typeorm';

@InputType()
export class CreateSchoolClassDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  schoolClassName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  id: string;

  @OneToMany(() => Student, (student) => student.schoolClass)
  students: Student[];
}
