import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from 'src/schemas/article.schema';
import { ArticleRequest, ArticleRequestSchema } from 'src/schemas/articlerequest.schema';
import { DeleteArticleRequest, DeleteArticleRequestSchema } from 'src/schemas/deletearticlerequest.schema';
import { User, UserSchema } from 'src/schemas/user.schema';
import { WikipagerequestsService } from 'src/wikipagerequests/wikipagerequests.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Article.name, schema: ArticleSchema },
      { name: ArticleRequest.name, schema: ArticleRequestSchema },
      { name: DeleteArticleRequest.name, schema: DeleteArticleRequestSchema },
    ]),
  ],
  providers: [WikipagerequestsService],
  exports: [WikipagerequestsService],
})
export class WikiPageRequestsModule {}