import {  IsOptional } from 'class-validator' ;
import { DoctorRateEnum } from 'src/Enums/doctor-rate.enum';


export class SearchQueryDto{
    @IsOptional()
    rate: DoctorRateEnum ;
    
    @IsOptional()
    visitprice: string ;
}