import dotenv from "dotenv";
dotenv.config();

import { AuthUserUseCase } from "../../../useCases/authUser/AuthUserUseCase";
import { IUsersAuthRepository } from "../../../repositories/IUsersAuthRepository";
import { BCryptHashProvider } from "../../../infra/providers/BCryptHashProvider";
import { JwtProvider } from "../../../infra/providers/JwtProvider";
import { ISessionsCreateRepository } from "@repositories/ISessionsCreateRepository";
import { VerifyErrors, JwtPayload } from "jsonwebtoken";




const mockJwtProvider: JwtProvider = {
  accessSecret: process.env.ACCESS_JWT_SECRET!,
  refreshSecret: process.env.REFRESH_JWT_SECRET!,
  generateAccessToken: jest.fn(() => Promise.resolve("accessToken")),
  generateRefreshToken: jest.fn(() => Promise.resolve("refreshToken")),
  verifyAccessToken: jest.fn(() => Promise.resolve()),
};

const mockUsersAuthRepository: IUsersAuthRepository = {
  findByEmail: jest.fn(),
  updateIsActiveById: jest.fn(),
};

const mockSessionRepository: ISessionsCreateRepository = {
  createSession: jest.fn(),
}

const mockHashProvider: BCryptHashProvider = {
  saltRounds: 10,
  hash: jest.fn(() => Promise.resolve("hashedPassword")),
  compare: jest.fn(() => Promise.resolve(true)),
};

describe("AuthUserUseCase", () => {
  let authUserUseCase: AuthUserUseCase;

  beforeEach(() => {
    authUserUseCase = new AuthUserUseCase(
      mockUsersAuthRepository, 
      mockSessionRepository,
      mockHashProvider,
      mockJwtProvider,
    );
  });

  it("should authenticate a user", async () => {
    (mockUsersAuthRepository.findByEmail as jest.Mock).mockResolvedValue({
      id: 2,
      email: "joe@doee.com",
      password: "123456",
      isActive: false,
    });


    await authUserUseCase.execute({
      email: "joe@doee.com",
      password: "123456",
    });

    expect(mockUsersAuthRepository.findByEmail).toHaveBeenCalled();	
    expect(mockHashProvider.compare).toHaveBeenCalled();
    expect(mockJwtProvider.generateAccessToken).toHaveBeenCalled();
    expect(mockJwtProvider.generateRefreshToken).toHaveBeenCalled();
    expect(mockSessionRepository.createSession).toHaveBeenCalled();
    expect(mockUsersAuthRepository.updateIsActiveById).toHaveBeenCalled();
  });
});