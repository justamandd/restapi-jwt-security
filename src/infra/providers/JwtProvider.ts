import Jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

export class JwtProvider {
  public readonly accessSecret: string = process.env.ACCESS_JWT_SECRET!
  public readonly refreshSecret: string = process.env.REFRESH_JWT_SECRET!
  
  async generateAccessToken(email: string, id: number): Promise<string> {
    return await Jwt.sign({ email, id }, this.accessSecret, { expiresIn: "15m" });
  }

  async generateRefreshToken(email: string, id: number): Promise<string> {
    return await Jwt.sign({ email, id }, this.refreshSecret, { expiresIn: "30d" });
  }

  async verifyAccessToken(token: string, callback: (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => void): Promise<void> {
    return await Jwt.verify(token, this.accessSecret, callback);
  }
}