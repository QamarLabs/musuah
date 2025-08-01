import { Controller, Post, Body, Req, UseGuards, Param, Get, Put, Query, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RegistrationUserDto } from 'src/dtos/registration-user-dto';
import { MailService } from 'src/mail/mail.service';
import { LoginUserDto } from 'src/dtos/login-user-dto';
import { SessionUserDto } from 'src/dtos/session-user-dto';
import { MuslimWikiSession, RequestWithUser } from 'src/models/auth';
import { GetUser } from './decorators/get-user-decorator';
import { UploadProfilePictureDto } from 'src/dtos/upload-profile-picture-dto';

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
    const registeredUserJwt = await this.authService.generateJWT({ id: registeredUser._id, email: registeredUser.email });
    await this.mailService.sendVerificationEmail(registeredUser._id as string, registeredUser.email, lang);

    return new SessionUserDto({
      jwt: registeredUserJwt,
      userInfo: registeredUser
    } as MuslimWikiSession);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('uploadProfilePicture')
  async uploadProfilePicture(
    @GetUser() user: RequestWithUser["user"],
    @Body() body: { values: UploadProfilePictureDto },
  ) {
    const updatedUser = await this.authService.uploadProfilePicture(user.id as string, body.values);
    if(!updatedUser)
      throw new Error("User to update not found");

    const updatedUserJwt = await this.authService.generateJWT({ id: updatedUser._id, email: updatedUser.email });

    return new SessionUserDto({
      jwt: updatedUserJwt,
      userInfo: updatedUser
    } as MuslimWikiSession);
  }

  @UseGuards(JwtAuthGuard) // Protects route with JWT
  @Get('validateToken')
  async validateToken(
    @GetUser() user: RequestWithUser["user"]
  ) {
    const sessionUser = await this.authService.getSessionUserById(user.id);
    if(!sessionUser)
      return new Error("Please login again,");

    return sessionUser;
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
  async verifyEmail(
    @GetUser() user: RequestWithUser["user"],
    @Body() body: { values: { _id: string }}) {
      console.log('user:', user);
      console.log('user userId:', user._id);
      const verifiedUser = await this.authService.verifyEmail(user.id as string);
      console.log('verifiedUser verifyEmail endpoint:', verifiedUser)
      return verifiedUser;
  }

  @Post('login')
  async login(@Body() { values  }: { values: LoginUserDto}) {
    const user = await this.authService.validateUser(values.email, values.password);

    if(!user)
      return new Error("Invalid Login");

    await this.authService.addNewActivityLog(user._id as string, `Logged in from ${values.ipAddress}` );

    return user;
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('changePassword')
  // async changePassword(
  //   @Req() req: Request,
  //   @Body() body: { email: string; newPassword: string }) {
      
  //   return this.authService.changePassword(body.email, body.newPassword);
  // }

  @UseGuards(JwtAuthGuard)
  @Post('mfa/generate')
  async generateMfa(@GetUser() userFromRequest) {
    const user = await this.authService.getUserById(userFromRequest.id);
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