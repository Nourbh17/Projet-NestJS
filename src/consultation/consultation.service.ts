import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericCrudService } from '../Generics/service/generic-crud.service';
import { ConsultationEntity } from './entities/consultation.entity';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';

@Injectable()
export class ConsultationService extends GenericCrudService<ConsultationEntity> {
  constructor(
    @InjectRepository(ConsultationEntity)
    private consultationRepository: Repository<ConsultationEntity>,
  ) {
    super(consultationRepository);
  }

  async create(
    createConsultationDto: CreateConsultationDto,
  ): Promise<ConsultationEntity> {
    return await this.consultationRepository.save(createConsultationDto);
  }

  async accept(id : string,accept : UpdateConsultationDto){
    const con = await this.findOne(id);
    con.acceptee = true ;
    con.date = accept.date;
  }
}
