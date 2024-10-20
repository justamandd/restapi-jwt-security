import { Request, Response } from "express";
import { CreateUserUseCase } from "@useCases/createUser/CreateUserUseCase";

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    try {
      const user = await this.createUserUseCase.execute({ name, email, password })
      return res.status(201).send(JSON.stringify(user));
    } catch (err) {
      return res.status(400).send({ message: err });
    }
  }
}