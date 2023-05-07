import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecialityDto } from './create-speciality.dto';
import { IsOptional, Length } from 'class-validator';
import { length } from "src/Generics/error-messages";


export class UpdateSpecialityDto extends PartialType(CreateSpecialityDto) {

@IsOptional()
  @Length(3,10, { message: (validationData) => length(validationData) })
  name: string;

  @IsOptional()
  @Length(5,50, { message: (validationData) => length(validationData) })
  description: string;
}
