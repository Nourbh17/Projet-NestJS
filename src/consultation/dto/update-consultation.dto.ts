import { PartialType } from '@nestjs/mapped-types';
import { CreateConsultationDto } from './create-consultation.dto';
import { IsBoolean, IsDate, IsNotEmpty } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateConsultationDto extends PartialType(CreateConsultationDto) {
@IsNotEmpty()
  @Optional()
  channel: string;

  @Optional()
  @IsDate()
  date : Date; 


  @Optional()
  @IsBoolean()
  acceptee: boolean;

}
