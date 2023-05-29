import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecialityEntity } from './entities/speciality.entity';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import {GenericCrudService} from '../Generics/service/generic-crud.service';

@Injectable()
export class SpecialityService extends GenericCrudService<SpecialityEntity> {
  private genericcrud: GenericCrudService<SpecialityEntity>;
  constructor(
    @InjectRepository(SpecialityEntity)
    private specialityRepository: Repository<SpecialityEntity>,
  ) {
    super(specialityRepository);
  }


  create(newSpeciality: CreateSpecialityDto): Promise<SpecialityEntity> {
    return this.specialityRepository.save(newSpeciality);
}

 

}