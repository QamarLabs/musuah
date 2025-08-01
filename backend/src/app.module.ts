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
import { AiAssistantModule } from './modules/ai-assistant.module';
import { CacheModule } from '@nestjs/cache-manager';
import { SearchBooksModule } from './modules/searchBooks.module';
import { SearchBooksController } from './searchBooks/searchBooks.controller';
import { WikiBooksModule } from './modules/wikibook.module';
import { WikibooksController } from './wikibooks/wikibooks.controller';
import { WikiBookRequestsModule } from './modules/wikibookrequest.module';
import { WikibookRequestsController } from './wikibookrequests/wikibookrequests.controller';
import { DashboardModule } from './modules/dashboard.module';
import { DashboardController } from './dashboard/dashboard.controller';

console.log('process.env.NODE_ENV', process.env.NODE_ENV)
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // makes the ConfigService available globally
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, // loads the appropriate .env file
    }),
    CacheModule.register(),
    MongooseModule.forRoot(process.env.MUSLIM_WIKI_DATABASE_URL, {}),
    DashboardModule,
    WikiPagesModule,
    WikiBooksModule,
    WikiBookRequestsModule,
    WikiPageRequestsModule,
    SearchModule,
    SearchBooksModule,
    AuthModule,
    AiAssistantModule
  ],
  controllers: [
    AppController, 
    AuthController, 
    SearchController, 
    SearchBooksController,
    DashboardController, 
    WikipagesController, 
    WikibooksController,
    WikibookRequestsController,
    WikipagerequestsController
  ],
  providers: [AppService, MailService],
})
export class AppModule {}
