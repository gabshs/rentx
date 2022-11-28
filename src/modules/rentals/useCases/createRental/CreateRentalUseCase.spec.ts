import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from './CreateRentalUseCase';

let rentalsRepository: RentalsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;

describe('CreateRentalUseCase', () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository);
  });

  it('should be able to create a new Rental', async () => {
    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '123123',
      expected_return_date: new Date(),
    });
  });
});
