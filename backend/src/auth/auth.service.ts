import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as speakeasy from 'speakeasy';
import * as QRCode from 'qrcode';
import * as bcrypt from 'bcrypt';
import { User } from '../schemas/user.schema';
import { SessionUser } from 'src/models/auth';
import { RegistrationUserDto } from 'src/dtos/registration-user-dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService
  ) {}

  async getUserById(id: string) {
    const user: User = await this.userModel.findOne({ id }).exec() as User;        
    console.log("user:", user);

    return user;
  }

  async register(userToRegister: RegistrationUserDto) {
    const hashedPassword = await bcrypt.hash(userToRegister.password, 10);
    userToRegister.password = hashedPassword;
    const user = new this.userModel(userToRegister);
    await user.save();

    return this.createSessionFromUser(user);
  }
  async generateJWT(user: SessionUser): Promise<string> {
    return this.jwtService.sign({
      ...user,
      iat: Math.floor(Date.now() / 1000),
    });
  }

  async changePassword(email: string, newPassword: string) {
    const user = await this.userModel.findOne({ email });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    return user.updateOne();
  }
  async verifyEmail(userId: string): Promise<User | null> {
    const user = await this.userModel.findOne({ '_id': userId });
    if (!user) return null;

    user.emailVerified = true;
    await this.userModel.updateOne(user);
    return user;
  }



  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    return isPasswordValid ? user : null;
  }

  async generateMfaSecret(user: User) {
    const secret = speakeasy.generateSecret({
      name: `NestMFA:${user.email}`,
    });

    user.mfaSecret = secret.base32;
    await user.save();

    return {
      secret: secret.base32,
      qrCodeUrl: await QRCode.toDataURL(secret.otpauth_url),
    };
  }

  async enableMfa(userId: string, token: string) {
    const user = await this.userModel.findById(userId);
    if (!user || !user.mfaSecret) return false;

    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token,
    });

    if (verified) {
      user.isMfaEnabled = true;
      await user.save();
      return true;
    }

    return false;
  }

  verifyMfaToken(user: User, token: string) {
    return speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token,
      window: 1,
    });
  }

  private createSessionFromUser(user: User) {
    delete user.password;
    delete user.agreeToTerms;
    delete user.infoIsCorrect;
    delete user.nationalId;
    delete user.nationalIdCountry;
    delete user.nationalIdPicture;
    return user as SessionUser;
  }
}