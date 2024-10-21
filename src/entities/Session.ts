import { TokenType } from "@prisma/client";

export class Session {
  public readonly id?: number;
  public userId: number;
  public token: string;
  public type: TokenType;
  public expiresAt: Date;
  public createdAt?: Date;
  public isValid?: boolean;

  constructor(props: Omit<Session, 'id' | 'createAt' | 'isValid'>, 
    id?: number, 
    createdAt?: Date,
    isValid?: boolean
  ){
    this.userId = props.userId;
    this.token = props.token;
    this.expiresAt = props.expiresAt;
    this.type = props.type;

    Object.assign(this, {id, createdAt, isValid});
  }
}