export class User {
  public readonly id?: number;
  public name: string;
  public email: string;
  public password: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public isActive?: boolean;

  constructor(props: Omit<User, 'id'>, id?: number, createdAt?: Date, updatedAt?: Date, isActive?: boolean) {
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;

    if (id) {
      this.id = id;
    }

    if (createdAt) {
      this.createdAt = createdAt;
    }

    if (updatedAt) {
      this.updatedAt = updatedAt;
    }

    if (isActive) {
      this.isActive = isActive;
    }
  }
}