import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { Article } from 'src/schemas/article.schema';
import { ArticleRequest } from 'src/schemas/articlerequest.schema';
import { DeleteArticleRequest } from 'src/schemas/deletearticlerequest.schema';
import { DeleteBookRequest } from 'src/schemas/deletebookrequest.schema';
import { SavedArticle } from 'src/schemas/savedarticle.schema';
import { SavedBook } from 'src/schemas/savedbook.schema';
import { UserActivityLog } from 'src/schemas/useractivitylog.schema';

@Injectable()
export class DashboardService {
    constructor(
      @InjectModel(UserActivityLog.name) private userActivityLogModel: Model<UserActivityLog>,
      @InjectModel(Article.name) private articleModel: Model<Article>,
      @InjectModel(SavedArticle.name) private savedArticleModel: Model<SavedArticle>,
      @InjectModel(SavedBook.name) private savedBookModel: Model<SavedBook>,
      @InjectModel(ArticleRequest.name) private articleRequestModel: Model<ArticleRequest>,
      @InjectModel(DeleteBookRequest.name) private deleteBookRequestModel: Model<DeleteBookRequest>,
      @InjectModel(DeleteArticleRequest.name) private deleteArticleRequestModel: Model<DeleteArticleRequest>) {}
    
    userId: string;
    private setUserId(userId: string){
      this.userId = userId;
    }
    private get sortObj(): any {
      return { timestamp: -1 };
    }
    private get filterBySubmittedUser() {
      return { submitByUserId: this.userId }
    }
    private get filterBySavedByUser() {
      return { savedByUserId: this.userId }
    }

    async getArticleRequests(userId: string) {
      try {

        this.setUserId(userId);
        const pendingRequestPromise = this.articleRequestModel
                                          .find({ submitByUserId: this.userId, status: "pending" })
                                          .sort({ timestamp: 1 }).limit(10);
        const approvedRequestPromise = this.articleRequestModel
                                          .find({ submitByUserId: this.userId, status: "approved" })
                                          .sort({ timestamp: 1 }).limit(10);
        const deniedRequestPromise = this.articleRequestModel
                                          .find({ submitByUserId: this.userId, status: "denied" })
                                          .sort({ timestamp: 1 }).limit(10);
        const recentRequestPromise = this.articleRequestModel
                                          .find({ submitByUserId: this.userId })
                                          .sort({ timestamp: 1 }).limit(10);
        const [
          pendingRequests, 
          approvedRequests, 
          deniedRequests, 
          recentRequests
        ] = await Promise.all([pendingRequestPromise, approvedRequestPromise, deniedRequestPromise, recentRequestPromise])
                                  
        return {
          pendingRequests,
          approvedRequests,
          deniedRequests,
          recentRequests
        };
      } catch(err) {
        throw err;
      }
    }
    async getSavedArticles(userId: string) {
      this.setUserId(userId);
      const savedArticles = await this.savedArticleModel
                                      .find(this.filterBySavedByUser)
                                      .sort(this.sortObj).limit(20);
      return savedArticles;
    }

    async getRecentDeleteArticleRequests(userId: string) {
      this.setUserId(userId)
      const recentDeleteArticleRequests = await this.deleteArticleRequestModel
                                            .find({ submitByUserId: userId })
                                            .sort(this.sortObj).limit(10)

      return recentDeleteArticleRequests;
    }
    async getDeniedDeleteArticleRequests(userId: string) {
      this.setUserId(userId)
      const deniedDeleteArticleRequests = await this.deleteArticleRequestModel
                                            .find({ submitByUserId: userId, status: "denied" })
                                            .sort(this.sortObj).limit(10)

      return deniedDeleteArticleRequests;
    }
    async getApprovedDeleteArticleRequests(userId: string) {
      this.setUserId(userId)
      const approvedDeleteArticleRequests = await this.deleteArticleRequestModel
                                            .find({ submitByUserId: userId, status: "approved" })
                                            .sort(this.sortObj).limit(10)

      return approvedDeleteArticleRequests;
    }

    async getRecentDeleteBookRequests(userId: string) {
      this.setUserId(userId)
      const recentDeleteBookRequests = await this.deleteBookRequestModel
                                            .find({ submitByUserId: userId })
                                            .sort(this.sortObj).limit(10)

      return recentDeleteBookRequests;
    }
    async getDeniedDeleteBookRequests(userId: string) {
      this.setUserId(userId)
      const deniedDeleteBookRequests = await this.deleteBookRequestModel
                                            .find({ submitByUserId: userId, status: "denied" })
                                            .sort(this.sortObj).limit(10)

      return deniedDeleteBookRequests;
    }
    async getApprovedDeleteBookRequests(userId: string) {
      this.setUserId(userId)
      const approvedDeleteBookRequests = await this.deleteBookRequestModel
                                            .find({ submitByUserId: userId, status: "approved" })
                                            .sort(this.sortObj).limit(10)

      return approvedDeleteBookRequests;
    }

    async getSavedBooks(userId: string) {
      this.setUserId(userId);
      const savedArticles = await this.savedBookModel
                                      .find(this.filterBySavedByUser)
                                      .sort(this.sortObj).limit(20);
      return savedArticles;
    }

    async getActivityLogs(userId: string) {
      const userActivityLogs = await this.userActivityLogModel
                                      .find({ userId: userId })
                                      .sort(this.sortObj).limit(20);
      return userActivityLogs;
    }
    
    
    async getDashboardArticlesContributedTo(userId: string) {
      const dashboardArticles = await this.articleModel
                                      .find({ 
                                        $or: [
                                            { "tags.userId": userId },
                                          ]
                                       })
                                      .sort(this.sortObj).limit(20);
      return dashboardArticles;
    }
  
}
