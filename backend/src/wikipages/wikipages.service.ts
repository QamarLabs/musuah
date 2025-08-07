import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WikiPage } from 'src/models/article';
import { Article } from 'src/schemas/article.schema';

@Injectable()
export class WikipagesService {
    constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}
    
    async getWikiPage(
        pageId: string
    ): Promise<WikiPage> {
    
    const wikiPageResult: WikiPage = await this.articleModel.findOne({ pageid: pageId }).exec() as WikiPage;
    
    
    // console.log("wikiPageResult:", wikiPageResult);
    
    return wikiPageResult;
  }
}
