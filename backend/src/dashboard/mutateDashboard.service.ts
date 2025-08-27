import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Article } from "src/schemas/article.schema";
import { ArticleRequest } from "src/schemas/articlerequest.schema";
import { DeleteArticleRequest } from "src/schemas/deletearticlerequest.schema";
import { DeleteBookRequest } from "src/schemas/deletebookrequest.schema";
import { SavedArticle } from "src/schemas/savedarticle.schema";
import { SavedBook } from "src/schemas/savedbook.schema";
import { UserActivityLog } from "src/schemas/useractivitylog.schema";



@Injectable()
export class MutateDashboardService {
    constructor(
        @InjectModel(UserActivityLog.name) private userActivityLogModel: Model<UserActivityLog>,
        @InjectModel(Article.name) private articleModel: Model<Article>,
        @InjectModel(SavedArticle.name) private savedArticleModel: Model<SavedArticle>,
        @InjectModel(SavedBook.name) private savedBookModel: Model<SavedBook>,
        @InjectModel(ArticleRequest.name) private articleRequestModel: Model<ArticleRequest>,
        @InjectModel(DeleteBookRequest.name) private deleteBookRequestModel: Model<DeleteBookRequest>,
        @InjectModel(DeleteArticleRequest.name) private deleteArticleRequestModel: Model<DeleteArticleRequest>) { }

    userId: string;
    private setUserId(userId: string) {
        this.userId = userId;
    }

    async getWikiPageRequestsToMutate(userId: string) {
        try {

            this.setUserId(userId);
            return await this.articleRequestModel
                .find({ status: "pending", submitByUserId: { $ne: userId } })
                .sort({ timestamp: 1 }).limit(10).exec();

        } catch (err) {
            throw err;
        }
    }

    async getDeleteWikiPageRequestsToMutate(userId: string) {
        try {

            this.setUserId(userId);
            return await this.deleteArticleRequestModel
                .find({ status: "pending", submitByUserId: { $ne: userId } })
                .sort({ timestamp: 1 }).limit(10).exec();
        } catch (err) {
            throw err;
        }
    }

    async getDeleteWikiBookRequestsToMutate(userId: string) {
        try {

            this.setUserId(userId);
            return await this.deleteBookRequestModel
                .find({ status: "pending", submitByUserId: { $ne: userId }  })
                .sort({ timestamp: 1 }).limit(10).exec();
        } catch (err) {
            throw err;
        }
    }
}