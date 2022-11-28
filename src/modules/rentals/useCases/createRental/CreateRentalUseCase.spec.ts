import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateRentalUseCase } from './CreateRentalUseCase';

import dayjs from 'dayjs';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

let rentalsRepository: RentalsRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe('CreateRentalUseCase', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();

  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepository,
      dateProvider,
    );
  });

  it('should be able to create a new Rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '123123',
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should throw error when user has other rent in progress', async () => {
    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '123123',
      expected_return_date: dayAdd24Hours,
    });

    const rental2 = createRentalUseCase.execute({
      user_id: '12345',
      car_id: '3213312',
      expected_return_date: dayAdd24Hours,
    });

    await expect(rental2).rejects.toBeInstanceOf(AppError);
  });

  it('should throw error when car is unavailabled', async () => {
    await createRentalUseCase.execute({
      user_id: '321321',
      car_id: '123123',
      expected_return_date: dayAdd24Hours,
    });

    const rental2 = createRentalUseCase.execute({
      user_id: '12345',
      car_id: '123123',
      expected_return_date: dayAdd24Hours,
    });

    await expect(rental2).rejects.toBeInstanceOf(AppError);
  });

  it('should throw error when expected return date is minor than 24 hours', async () => {
    const rental = createRentalUseCase.execute({
      user_id: '12345',
      car_id: '123123',
      expected_return_date: new Date(),
    });

    expect(rental).rejects.toBeInstanceOf(AppError);
  });
});
