export class User {
  id: number;
  email: string;
  name: string;
  password: string;
  address: string;
  phone: string;
  /**
   *
   */
  constructor(
    id: number,
    email: string,
    name: string,
    password: string,
    address: string,
    phone: string
  ) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.address = address;
    this.phone = phone;
  }
}
export class UserResponse {
  message: string;
  user: _User;
}
export class _User {
  id: number;
  email: string;
  name: string;
  phone: number;
  address: string;
  role: string;
}
