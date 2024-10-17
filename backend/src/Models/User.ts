export class User {
  private _id: number;
  private _firstName: string;
  private _lastName: string;
  private _password: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    password: string
  ) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._password = password;
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(firstName: string) {
    this._firstName = firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(lastName: string) {
    this._lastName = lastName;
  }

  get password(): string {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }
}
