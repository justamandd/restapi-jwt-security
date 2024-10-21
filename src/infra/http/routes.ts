import { Router } from "express";
import { PrismaUserCreateRepository } from "@repositories/PrismaUserCreateRepository";
import { CreateUserUseCase } from "@useCases/createUser/CreateUserUseCase";
import { CreateUserController } from "@useCases/createUser/CreateUserController";
import { BCryptHashProvider } from "@providers/BCryptHashProvider";

const routes  = Router();

const usersRepository = new PrismaUserCreateRepository();
const hashProvider = new BCryptHashProvider();

const createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider);
const createUserController = new CreateUserController(createUserUseCase);

routes.post("/users", async (req, res) => {
  await createUserController.handle(req, res)
});

export { routes };