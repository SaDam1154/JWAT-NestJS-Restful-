import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSchoolClassDto {
  @IsString()
  @IsNotEmpty()
  schoolClassName: string;

  @IsString()
  @IsNotEmpty()
  id: string;
}
