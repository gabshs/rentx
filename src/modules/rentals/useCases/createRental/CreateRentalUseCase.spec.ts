import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalsRepository: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe('CreateRentalUseCase', () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository);
  });

  it('should be able to create a new Rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '123123',
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should throw error when user has other rent in progress', async () => {
    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '123123',
      expected_return_date: new Date(),
    });

    const rental2 = createRentalUseCase.execute({
      user_id: '12345',
      car_id: '3213312',
      expected_return_date: new Date(),
    });

    await expect(rental2).rejects.toBeInstanceOf(AppError);
  });

  it('should throw error when car is unavailabled', async () => {
    await createRentalUseCase.execute({
      user_id: '321321',
      car_id: '123123',
      expected_return_date: new Date(),
    });

    const rental2 = createRentalUseCase.execute({
      user_id: '12345',
      car_id: '123123',
      expected_return_date: new Date(),
    });

    await expect(rental2).rejects.toBeInstanceOf(AppError);
  });
});
