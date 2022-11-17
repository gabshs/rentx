import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: CarsRepositoryInMemory;
let specificationsRepository: SpecificationsRepositoryInMemory;

describe('CreateCarSpecificationUseCase', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepository,
      specificationsRepository,
    );
  });

  it('should not be able to add a new specification to the car', async () => {
    const car_id = '1234';
    const specifications_ids = ['123', '456', '789'];

    const cars = createCarSpecificationUseCase.execute({
      car_id,
      specifications_ids,
    });
    await expect(cars).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carsRepository.create({
      name: 'Name Car',
      description: 'Car description',
      daily_rate: 110,
      license_plate: 'DEF-1234',
      fine_amount: 40,
      brand: 'Car brand',
      category_id: 'category_id',
    });

    const specification = await specificationsRepository.create({
      description: 'test',
      name: 'test',
    });
    const specifications_ids = [specification.id];

    const carSpecifications = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_ids,
    });

    expect(carSpecifications.specifications).toHaveLength(1);
    expect(carSpecifications).toHaveProperty('specifications', [specification]);
  });
});
