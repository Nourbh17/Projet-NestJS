import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { SearchQueryDto } from './dto/search-query.dto';
import { DoctorEntity } from './entities/doctor.entity';
import { UserSubscribeDto } from 'src/user/dto/user-subscribe.dto';
import { LoginCredentialsDto } from 'src/user/dto/login-credentials.dto';


@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

 /*@Post('/subscribe')
  register(@Body() userData: UserSubscribeDto) {
    return this.doctorService.register(userData);
  }

  @Post('/login')
   login( @Body() credentials: LoginCredentialsDto) {
    return  this.doctorService.login(credentials);
  }*/

/*
  @Get('/count')
  async countDoctors(){
      return await this.doctorService.countDoctorsByRate();
  }*/

 /* @Get("/all")
  
  async getTodosv2(@Query('visitprice') visitprice:string): Promise<DoctorEntity[]> {
    const params:SearchQueryDto={visitprice};
    return this.doctorService.getDoctorsByPrice(params);
  }*/
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
