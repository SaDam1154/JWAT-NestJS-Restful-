import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateClassDto {
  @IsNotEmpty()
  @IsString()
  className?: string;
}
