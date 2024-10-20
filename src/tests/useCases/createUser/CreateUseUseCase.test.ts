// src/tests/useCases/createUser/CreateUserUseCase.test.ts
import { CreateUserUseCase } from "../../../useCases/createUser/CreateUserUseCase";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { BCryptHashProvider } from "../../../infra/providers/BCryptHashProvider";

const mockUsersRepository: IUsersRepository = {
  findByEmail: jest.fn(),
  create: jest.fn(),
};

const mockHashProvider: BCryptHashProvider = {
  saltRounds: 10,
  hash: jest.fn(() => Promise.resolve("hashedPassword")),
  compare: jest.fn(() => Promise.resolve(true)),
};

describe("CreateUserUseCase", () => {
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(mockUsersRepository, mockHashProvider);
  });

  it("should create a new user", async () => {
    (mockUsersRepository.findByEmail as jest.Mock).mockResolvedValue(null); // Simula email não existente

    await createUserUseCase.execute({
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
    });

    expect(mockUsersRepository.create).toHaveBeenCalled();
    expect(mockHashProvider.hash).toHaveBeenCalledWith("123456");
  });

  it("should throw an error if user already exists", async () => {
    (mockUsersRepository.findByEmail as jest.Mock).mockResolvedValue({
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      password: "123456",
    });

    await expect(
      createUserUseCase.execute({
        name: "John Doe",
        email: "john@example.com",
        password: "123456",
      })
    ).rejects.toThrow("User already exists");
  });
});
