import { LoginUser } from "src/models/auth";

export class LoginUserDto implements LoginUser {
  email: string;
  password: string;
  ipAddress: string;
}