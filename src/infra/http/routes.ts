import { Router } from "express";
import { PrismaUserCreateRepository } from "@repositories/PrismaUserCreateRepository";
import { CreateUserUseCase } from "@useCases/createUser/CreateUserUseCase";
import { CreateUserController } from "@useCases/createUser/CreateUserController";
import { BCryptHashProvider } from "@providers/BCryptHashProvider";
import { AuthUserUseCase } from "@useCases/authUser/AuthUserUseCase";
import { PrismaSessionCreateRepository } from "@repositories/PrismaSessionCreateRepository";
import { JwtProvider } from "@infra/providers/JwtProvider";
import { PrismaUserAuthRepository } from "@repositories/PrismaUserAuthRepository";
import { AuthUserController } from "@useCases/authUser/AuthUserController";

const routes  = Router();

const usersRepository = new PrismaUserCreateRepository();
const hashProvider = new BCryptHashProvider();
const sessionRepository = new PrismaSessionCreateRepository();
const jwtProvider = new JwtProvider();
const usersAuthRepository = new PrismaUserAuthRepository();

const createUserUseCase = new CreateUserUseCase(usersRepository, hashProvider);
const createUserController = new CreateUserController(createUserUseCase);

const authUserUseCase = new AuthUserUseCase(usersAuthRepository, sessionRepository, hashProvider, jwtProvider);
const authUserController = new AuthUserController(authUserUseCase);

routes.post("/users", async (req, res) => {
  await createUserController.handle(req, res)
});

routes.post("/users/auth", async (req, res) => {
  await authUserController.handle(req, res)
});

export { routes };