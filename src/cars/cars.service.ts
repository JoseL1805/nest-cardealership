import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import {v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
    private cars : Car [] = [
        {
            id    :  uuid(),
            brand : 'Toyota',
            model : 'Corolla'
        },
        {
            id    : uuid(),
            brand : 'Honda',
            model : 'Civic'
        },
        {
            id    : uuid(),
            brand : 'Chevrolet',
            model : 'Camaro'
        },
    ];

    findAll() {
        return this.cars;
    }

    findOneById( id : string) {
        const car = this.cars.find( car => car.id === id);
        if ( !car ) 
            throw new NotFoundException(`Car whit id ${id} not found`);
        return car;
    }

    createCarDto( createCarDto : CreateCarDto){
        const car : Car = {
            id  : uuid(),
            ... createCarDto
        }

        this.cars.push(car)
            
        return car;
    }

    updateCarDto( id: string,  updateCarDto : UpdateCarDto ) {
        let carDB = this.findOneById(id);

        this.cars.map( carro => {
            if (carro.id === id) {
                return carDB = {
                    ...carDB,
                    ...updateCarDto,
                    id
                }
            }
            return carro;
        })
        
        return carDB;
    }

    deleteCarDto( id: string) {
        let carro = this.findOneById( id );
        console.log(carro)
        this.cars = this.cars.filter( carro => carro.id !== id)
        return;
    }
}