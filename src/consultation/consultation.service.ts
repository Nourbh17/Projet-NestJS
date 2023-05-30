import {  Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {GenericCrudService} from '../Generics/service/generic-crud.service';
import { ConsultationEntity } from './entities/consultation.entity';
import { CreateConsultationDto } from './dto/create-consultation.dto';




      
        @Injectable()
        export class ConsultationService extends GenericCrudService<ConsultationEntity> {
          constructor(
            @InjectRepository(ConsultationEntity)
            private consultationRepository: Repository<ConsultationEntity>,
          ) {
            super(consultationRepository);
          }
        
          /*async create(createConsultationDto: CreateConsultationDto,): Promise<ConsultationEntity> {
            return await this.consultationRepository.save(createConsultationDto);
          }*/

          
        }