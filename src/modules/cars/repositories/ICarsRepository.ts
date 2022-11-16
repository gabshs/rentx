import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

interface availableFilter {
  brand?: string;
  category_id?: string;
  name?: string;
}
interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findAvailable(filters: availableFilter): Promise<Car[]>;
}

export { ICarsRepository };
