import { PartialType } from '@nestjs/mapped-types';
import { CreateSchoolClassDto } from './create-schoolclass.dto';

export class UpdateSchoolClassDto extends PartialType(CreateSchoolClassDto) {}
