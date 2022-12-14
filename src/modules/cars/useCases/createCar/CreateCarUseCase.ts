import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}
  async execute(params: ICreateCarDTO): Promise<Car> {
    const {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    } = params;

    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      license_plate,
    );

    if (carAlreadyExists) {
      throw new AppError('Car already exists');
    }

    const car = await this.carsRepository.create({
      name,
      daily_rate,
      description,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return car;
  }
}

export { CreateCarUseCase };
