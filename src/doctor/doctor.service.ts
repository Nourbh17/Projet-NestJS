import {  Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { DoctorEntity } from './entities/doctor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {GenericCrudService} from '../Generics/service/generic-crud.service';
import { SpecialityEntity } from 'src/speciality/entities/speciality.entity';
import { FindSpecialityDto } from 'src/speciality/dto/find-speciality.dto';
import { SpecialityService } from 'src/speciality/speciality.service';
import { Repository } from 'typeorm';


@Injectable()
export class DoctorService extends GenericCrudService<DoctorEntity>{
  constructor(
    @InjectRepository(DoctorEntity)
    private doctorRepository: Repository<DoctorEntity>,
    private readonly specialityService: SpecialityService,
    @InjectRepository(SpecialityEntity)
    private specialityRepository: Repository<SpecialityEntity>,
  ) {
    super(doctorRepository);
  }

  create(newdoctor : CreateDoctorDto): Promise<DoctorEntity> {
    return this.doctorRepository.save(newdoctor);
  }

  async FindDoctorsBySpeciality(spec: FindSpecialityDto,): Promise<DoctorEntity[]> {
    const { name } = spec;
    const q = await this.specialityService.getSpeciality(name);
    if (!q) {
      throw new NotFoundException('speciality not found ');
    }
    const doctors = await this.doctorRepository
      .createQueryBuilder('d')
      .where('d.speciality = :id', { id: q.id })
      .getMany();
    if (doctors) {
      return doctors;
    } else throw new NotFoundException('no doctors');
  }
}
   

  


