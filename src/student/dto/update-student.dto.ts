import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateStudentDto } from './create-student.dto';

@InputType()
export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  schoolClassId?: string;
}
