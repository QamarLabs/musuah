import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonService } from 'src/common/common.service';
import { DashboardService } from 'src/dashboard/dashboard.service';
import { Article, ArticleSchema } from 'src/schemas/article.schema';
import { ArticleRequest, ArticleRequestSchema } from 'src/schemas/articlerequest.schema';
import { CouncilMember, CouncilMemberSchema } from 'src/schemas/councilmember.schema';
import { DeleteArticleRequest, DeleteArticleRequestSchema } from 'src/schemas/deletearticlerequest.schema';
import { DeleteBookRequest, DeleteBookRequestSchema } from 'src/schemas/deletebookrequest.schema';
import { SavedArticle, SavedArticleSchema } from 'src/schemas/savedarticle.schema';
import { SavedBook, SavedBookSchema } from 'src/schemas/savedbook.schema';
import { UserActivityLog, UserActivityLogSchema } from 'src/schemas/useractivitylog.schema';
import { CommonModule } from './common.module';
import { MutateDashboardService } from 'src/dashboard/mutateDashboard.service';

@Module({
imports: [
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema },
      { name: SavedArticle.name, schema: SavedArticleSchema },
      { name: SavedBook.name, schema: SavedBookSchema },
      { name: ArticleRequest.name, schema: ArticleRequestSchema },
      { name: DeleteArticleRequest.name, schema: DeleteArticleRequestSchema },
      { name: DeleteBookRequest.name, schema: DeleteBookRequestSchema },
      { name: UserActivityLog.name, schema: UserActivityLogSchema },
      { name: CouncilMember.name, schema: CouncilMemberSchema }
    ]),
    CommonModule
  ],
  providers: [DashboardService, MutateDashboardService],
  exports: [DashboardService, MutateDashboardService],
})
export class DashboardModule {}