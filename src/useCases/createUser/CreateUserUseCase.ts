import { IUsersRepository } from "@repositories/IUsersRepository";
import { CreateUserDTO } from "@useCases/createUser/CreateUserDTO";
import { BCryptHashProvider } from "@providers/BCryptHashProvider";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: BCryptHashProvider
  ) {}

  async execute(data: CreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const hashedPassword = await this.hashProvider.hash(data.password);

    return this.usersRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword
    });
  }
}