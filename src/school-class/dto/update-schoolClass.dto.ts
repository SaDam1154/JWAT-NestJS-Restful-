import { InputType, PartialType } from '@nestjs/graphql';
import { CreateSchoolClassDto } from './create-schoolClass.dto';

@InputType()
export class UpdateSchoolClassDto extends PartialType(CreateSchoolClassDto) {}
