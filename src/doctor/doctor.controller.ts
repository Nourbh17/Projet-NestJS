import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { DoctorRateEnum } from 'src/Enums/doctor-rate.enum';
import { SearchQueryDto } from './dto/search-query.dto';
import { DoctorEntity } from './entities/doctor.entity';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }
  @Get('/count')
  async countDoctors(){
      return await this.doctorService.countDoctorsByRate();
  }

  @Get("/all")
  
  async getTodosv2(@Query('rate') rate:DoctorRateEnum,@Query('visitprice') visitprice:string): Promise<DoctorEntity[]> {
    const params:SearchQueryDto={rate,visitprice};
    return this.doctorService.getDoctorsByRateOrByPrice(params);
  }
  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorService.Softdelete(id);
  }

  @Patch('/restore/:id')
    restoreTodo(@Param('id') id : string){
        return this.doctorService.restore(id) ;
    }

   


}
