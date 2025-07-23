import { Injectable } from '@nestjs/common';
import { MailService as GenezioEmailService } from "@genezio/email-service";

@Injectable()
export class MailService {
    constructor() {}

    async sendVerificationEmail(userId: string, email: string, language?: string) {
        const siteLanguage = language ?? "en";
        const verificationUrl = `${process.env.CLIENT_SITE_URL}/${siteLanguage}/verify-account/${userId}`
        const response = await GenezioEmailService.sendMail({
          emailServiceToken: process.env.EMAIL_SERVICE_TOKEN,
          from: "novigo.ali@gmail.com",
          to: email,
          subject: "Verify your account",
          html: ` 
            <html>
                <head>
                    <link href="https://fonts.googleapis.com/css2?family=Roboto+Serif:ital,opsz,wght@0,8..144,100..900;1,8..144,100..900&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
                </head>
                <div style="font-family: 'Roboto Serif', serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <h1 style="color: #124a28; font-family: 'Roboto Serif', serif;">Verify Your Email Address</h1>
                    </div>
                    <div style="margin-bottom: 25px;">
                        <p style="font-family: 'Roboto Serif', serif;">Thank you for signing up! Please verify your email address by clicking the button below:</p>
                    </div>
                    <div style="text-align: center; margin-bottom: 30px;">
                        <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 4px; font-weight: bold; font-family: 'Roboto Serif', serif;">Verify Email</a>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <p style="font-family: 'Roboto Serif', serif;">If you didn't create an account, you can safely ignore this email.</p>
                    </div>
                    <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; text-align: center; color: #6b7280; font-size: 14px; font-family: 'Roboto Serif', serif;">
                        <p style="font-family: 'Roboto Serif', serif;">© ${new Date().getFullYear()} Muslim Wiki. All rights reserved.</p>
                    </div>
                </div>
            </html>
          `
        });
        
        if (!response.success) {
          return response.errorMessage;
        }
        
        return "success";
    }
    

}
