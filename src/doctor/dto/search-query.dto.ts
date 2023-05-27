import {  IsOptional } from 'class-validator' ;



export class SearchQueryDto{
   
    
    @IsOptional()
    visitprice: string ;
}