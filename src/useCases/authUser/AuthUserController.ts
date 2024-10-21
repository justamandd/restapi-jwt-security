import { Request, Response } from "express";
import { AuthUserUseCase } from "@useCases/authUser/AuthUserUseCase";

export class AuthUserController {
  constructor(private authUserUseCase: AuthUserUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const accessAndRefreshKeys = await this.authUserUseCase.execute({ email, password })
      return res.status(200).send(JSON.stringify(accessAndRefreshKeys));
    } catch (err) {
      return res.status(400).send({ message: err });
    }
  }
}