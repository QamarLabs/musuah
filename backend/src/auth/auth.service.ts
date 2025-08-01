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
import { UpdateUserDto } from 'src/dtos/update-user-dto';
import { UserActivityLog } from 'src/schemas/useractivitylog.schema';
import { UploadProfilePictureDto } from 'src/dtos/upload-profile-picture-dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserActivityLog.name) private userActivityLogModel: Model<UserActivityLog>,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService
  ) {}

  async addNewActivityLog(userId: string, activityMessage: string) {
    try {
      const newActivityLog = new this.userActivityLogModel({ 
        userId: userId,
        activity: activityMessage
      })
  
      await newActivityLog.save();
    
    } catch(err){
      console.log("Add New Activity Log Error:", err);
      return false;
    } finally {
      return true;
    }
  }

  async getUserById(id: string) {
    const user: User = await this.userModel.findById(id);
    console.log("user:", user);

    return user;
  }

  async getSessionUserById(id: string) {
    const user: User = await this.getUserById(id);
    console.log("user:", user);

    return this.createSessionFromUser(user);
  }

  async register(userToRegister: RegistrationUserDto) {
    const hashedPassword = await bcrypt.hash(userToRegister.password, 10);
    userToRegister.password = hashedPassword;
    const user = new this.userModel({...userToRegister, profilePicture: "N/A from incomplete registration"});
    await user.save();

    return this.createSessionFromUser(user);
  }
  async uploadProfilePicture(userId: string, uploadProfilePictureDto: UploadProfilePictureDto) {
      const userFromDb = await this.getUserById(userId as string);
      console.log('userFromDb:', userFromDb)
      console.log('userId uploadProfilePicture:', userId)
      if(!userFromDb)
        return null;

      userFromDb.profilePicture = uploadProfilePictureDto.profilePicture;
      await userFromDb.save();

      return this.createSessionFromUser(userFromDb);
  }

  async updateUserInfo(sessionUser: SessionUser, updateUser: UpdateUserDto) {
    await this.userModel.updateOne(
      { _id: sessionUser._id },
      {
        $set: {
          ...updateUser
        }
      }
    );
    const updatedUser = await this.userModel.findById(sessionUser._id);
    return this.createSessionFromUser(updatedUser);
  }

  async generateJWT(user: {
    id: string,
    email: string
  }): Promise<string> {
    console.log('signedJWT USER:', user);
    return this.jwtService.sign({
      ...user
    });
  }

  async changePassword(sessionUser: SessionUser, newPassword: string) {
    const user = await this.userModel.findById(sessionUser._id)
    if (!user) return null;

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    return user.updateOne();
  }
  
  async verifyAndChangeEmail(sessionUser: SessionUser, newEmail: string){
    const user = await this.userModel.findById(sessionUser._id);
    if (!user) return null;

    user.emailVerified = true;
    user.email = newEmail;
    await this.userModel.updateOne(user);
    return this.createSessionFromUser(user); 
  }

  async verifyEmail(userId: string): Promise<SessionUser | null> {
    const user = await this.userModel.findOne({ '_id': userId });
    console.log('user:', user);
    if (!user) return null;

    await this.userModel.updateOne(
      { _id: user._id },
      {
        $set: {
          emailVerified: true
        }
      }
    );
    return this.createSessionFromUser(user);
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
    return user as SessionUser;
  }
}