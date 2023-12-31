import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')

export class CarsController {

    constructor(
        private readonly carsService : CarsService
    ){}

    @Get()
    getAllCars(){
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarById( @Param('id', new ParseUUIDPipe({ version: '4'}) ) id : string){
        console.log(id)
        return this.carsService.findOneById(id)
    }

    @Post( )
    createCar(
        @Body() createCarDto : CreateCarDto){
        return this.carsService.createCarDto(createCarDto);
    }

    @Patch(':id')
    updateCar(
        @Param('id', new ParseUUIDPipe({ version: '4'})) id : string,
        @Body() updateCarDto : UpdateCarDto){

        return this.carsService.updateCarDto(id ,updateCarDto);
    }

    @Delete(':id')
    deleteCar(@Param('id', new ParseUUIDPipe({ version: '4'})) id : string){
        return this.carsService.deleteCarDto( id );
    }


}
