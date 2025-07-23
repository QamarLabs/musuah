import { Controller, Post, Body, Req, UseGuards, Param, Get, Put, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegistrationUserDto } from 'src/dtos/registration-user-dto';
import { MailService } from 'src/mail/mail.service';
import { LoginUserDto } from 'src/dtos/login-user-dto';
import { SessionUserDto } from 'src/dtos/session-user-dto';
import { MuslimWikiSession } from 'src/models/auth';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService) {}

  @Post('register')
  async register(
    @Query('lang') lang: string | undefined,
    @Body() body: { values: RegistrationUserDto},
  ) {
    const registeredUser = await this.authService.register(body.values);
    const registeredUserJwt = await this.authService.generateJWT(registeredUser);

    await this.mailService.sendVerificationEmail(registeredUser._id as string, registeredUser.email, lang);

    return new SessionUserDto({
      jwt: registeredUserJwt,
      userInfo: {
        _id: registeredUser._id,
        email: registeredUser.email,
        firstName: registeredUser.firstName,
        profilePicture: registeredUser.profilePicture,
        countryOfOrigin: registeredUser.countryOfOrigin,
      }
    } as MuslimWikiSession);
  }

  @UseGuards(JwtAuthGuard) // Protects route with JWT
  @Get('sendVerificationEmail/:userId')
  async sendVerificationMail(
    @Query('lang') lang: string,
    @Param('userId') userId: string
  ) {
    const user = await this.authService.getUserById(userId);
    if(!user)
      return new Error("User to verify not found.");

    return this.mailService.sendVerificationEmail(userId, user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Put('verifyEmail')
  async verifyEmail(@Body() body: { values: { _id: string }}) {
    return this.authService.verifyEmail(body.values._id);
  }

  @Post('login')
  async login(@Body() { values  }: { values: LoginUserDto}) {
    const user = await this.authService.validateUser(values.email, values.password);

    if(!user)
      return new Error("Invalid Login");

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('changePassword')
  async changePassword(@Body() body: { email: string; newPassword: string }) {
    return this.authService.changePassword(body.email, body.newPassword);
  }

  @UseGuards(JwtAuthGuard)
  @Post('mfa/generate')
  async generateMfa(@Body() body: { userId: string }) {
    const user = await this.authService.getUserById(body.userId);
    return this.authService.generateMfaSecret(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('mfa/enable')
  async enableMfa(@Body() body: { userId: string; token: string }) {
    return this.authService.enableMfa(body.userId, body.token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('mfa/verify')
  async verifyMfa(@Body() body: { userId: string; token: string }) {
    const user = await this.authService.getUserById(body.userId);
    return this.authService.verifyMfaToken(user, body.token);
  }
}