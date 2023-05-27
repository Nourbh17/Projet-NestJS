import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecialityEntity } from './entities/speciality.entity';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import {GenericCrudService} from '../Generics/service/generic-crud.service';

@Injectable()
export class SpecialityService {
  private genericcrud: GenericCrudService <SpecialityEntity> ;
  constructor(@InjectRepository(SpecialityEntity)
        private specialityRepository : Repository<SpecialityEntity> ){
          this.genericcrud = new GenericCrudService<SpecialityEntity>(this.specialityRepository);
        }


  async  create(createSpecialityDto: CreateSpecialityDto) :Promise<SpecialityEntity> {
        return  await this.genericcrud.create(createSpecialityDto);
}

  async findAll() {
    return await this.genericcrud.findAll() ;}

  async findOne(id : string) :Promise<SpecialityEntity>{
    return await this.genericcrud.findOne(id);
}

 
async update(id: string,updateSpecialityDto: UpdateSpecialityDto): Promise<SpecialityEntity> {
  return await  this.genericcrud.update(id,updateSpecialityDto)
}
async Softdelete( id: string) {
  return await  this.genericcrud.softDelete(id);
}


  async restore(id : string){
  return await  this.genericcrud.restore(id) ;
}
  

}