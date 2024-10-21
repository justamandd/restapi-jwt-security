import { IUsersAuthRepository } from "@repositories/IUsersAuthRepository";
import { AuthUserDTO } from "@useCases/authUser/AuthUserDTO";
import { BCryptHashProvider } from "@providers/BCryptHashProvider";
import { JwtProvider } from "@providers/JwtProvider";
import { ISessionsCreateRepository } from "@repositories/ISessionsCreateRepository";
import { TokenType } from "@prisma/client";

export class AuthUserUseCase {
  constructor(
    private userAuthRepository: IUsersAuthRepository,
    private sessionRepository: ISessionsCreateRepository,
    private hashProvider: BCryptHashProvider,
    private jwtProvider: JwtProvider 
  ) {}

  async execute(data: AuthUserDTO) {
    const user = await this.userAuthRepository.findByEmail(data.email);

    if (!user) {
      throw new Error('Invalid email.');
    }

    
    const passwordMatch = await this.hashProvider.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid password.');
    }
    
    const accessToken = await this.jwtProvider.generateAccessToken(user.email, user.id!);

    const refreshToken = await this.jwtProvider.generateRefreshToken(user.email, user.id!);

    await this.sessionRepository.createSession({
      userId: user.id!,
      token: refreshToken,
      type: TokenType.REFRESH,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });

    await this.userAuthRepository.updateIsActiveById(user.id!);

    return { accessToken, refreshToken };
  }
}