import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WikiPagesModule } from './modules/wikipage.module';
import { WikiPageRequestsModule } from './modules/wikipagerequest.module';
import { SearchController } from './search/search.controller';
import { SearchModule } from './modules/search.module';
import { WikipagesController } from './wikipages/wikipages.controller';
import { WikipagerequestsController } from './wikipagerequests/wikipagerequests.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail/mail.service';
import { AuthController } from './auth/auth.controller';
import { AiAssistentService } from './ai-assistent/ai-assistent.service';
import { AiAssistantModule } from './modules/ai-assistant.module';

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes the ConfigService available globally
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // loads the appropriate .env file
    }),
    MongooseModule.forRoot(process.env.MUSLIM_WIKI_DATABASE_URL, {
    }),
    WikiPagesModule,
    WikiPageRequestsModule,
    SearchModule,
    AuthModule,
    AiAssistantModule
  ],
  controllers: [AppController, AuthController, SearchController, WikipagesController, WikipagerequestsController],
  providers: [AppService, MailService, AiAssistentService],
})
export class AppModule {}
