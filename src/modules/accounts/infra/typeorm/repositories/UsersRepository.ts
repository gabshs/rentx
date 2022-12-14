import { getRepository, Repository } from 'typeorm';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(params: ICreateUserDTO): Promise<void> {
    const { id, name, password, email, driver_license, avatar } = params;
    const user = this.repository.create({
      id,
      name,
      email,
      password,
      driver_license,
      avatar,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne(id);
  }
}

export { UsersRepository };
