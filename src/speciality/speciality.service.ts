import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecialityEntity } from './entities/speciality.entity';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';

@Injectable()
export class SpecialityService {

  constructor(@InjectRepository(SpecialityEntity)
        private specialityRepository : Repository<SpecialityEntity> ){}


  async  create(createSpecialityDto: CreateSpecialityDto) :Promise<SpecialityEntity> {
        return await this.specialityRepository.save(createSpecialityDto);
}

  findAll() {
    return this.specialityRepository.find() ;
  }

  async findOne(id : string) :Promise<SpecialityEntity>{
    const speciality=await this.specialityRepository.findOne({where: {id}});
    if (!speciality){
       throw new NotFoundException(`id : ${id} does not exist` );
    }
    return speciality;
}

 
async update(id: string,updateSpecialityDto: UpdateSpecialityDto): Promise<SpecialityEntity> {
    const  newspec = await this.specialityRepository.preload({id,...updateSpecialityDto,});
    if (newspec) {
      return this.specialityRepository.save(newspec);
    } else {
      throw new NotFoundException('Speciality does not exist ');
    }
}
async Softdelete( id: string) {
  const res = await this.specialityRepository.softDelete(id);
  if (res){
      return { message: 'Speciality deleted' };
  }
  else {
      throw new NotFoundException(`id ${id} does not exist` );
  }
}


restore(id : string){
return this.specialityRepository.restore(id) ;
}
  
}