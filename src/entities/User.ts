export class User {
  public readonly id?: number;
  public name?: string;
  public email: string;
  public password: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public isActive?: boolean;

  constructor(props: Omit<User, 'id' | 'createAt' | 'updatedAt' | 'isActive' | 'name'>, 
    id?: number, 
    createdAt?: Date, 
    updatedAt?: Date, 
    isActive?: boolean, 
    name?: string
  ){
    this.email = props.email;
    this.password = props.password;

    Object.assign(this, {id, createdAt, updatedAt, isActive, name});
  }
}