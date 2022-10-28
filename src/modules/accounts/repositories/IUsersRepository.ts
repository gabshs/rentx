import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

interface IUsersRepository {
  create(params: ICreateUserDTO): Promise<void>;
}

export { IUsersRepository };
