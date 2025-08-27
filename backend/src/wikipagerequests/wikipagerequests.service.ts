import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateArticleRequestDto } from 'src/dtos/create-article-request.dto';
import { UpdateArticleRequestDto } from 'src/dtos/update-article-request.dto';
import { Article } from 'src/schemas/article.schema';
import { ArticleRequest } from 'src/schemas/articlerequest.schema';
import { DeleteArticleRequest } from 'src/schemas/deletearticlerequest.schema';
import { DenyDeleteArticleRequest, ApproveDeleteArticleRequest, CreateDeleteArticleRequest, DenyArticleRequest, ApproveArticleRequest } from 'src/models/article';
import { User } from 'src/schemas/user.schema';
import { CommonService } from 'src/common/common.service';

@Injectable()
export class WikipagerequestsService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Article.name) private articleModel: Model<Article>,
        @InjectModel(ArticleRequest.name) private articleRequestModel: Model<ArticleRequest>,
        @InjectModel(DeleteArticleRequest.name) private deleteArticleRequestModel: Model<DeleteArticleRequest>,
        private readonly commonService: CommonService) { }

    async searchArticleRequests(
        qry: string,
        page: number = 1,
        limit: number = 10
    ): Promise<{ results: ArticleRequest[]; total: number }> {
        const query = { title: { $regex: qry, $options: 'i' }, status: 'pending' };

        const [results, total] = await Promise.all([
            this.articleRequestModel
                .find(query)
                .skip((page - 1) * limit)
                .limit(limit)
                .exec(),
            this.articleRequestModel.countDocuments(query).exec(),
        ]);

        return { results, total };
    }

    async usersRequest(pageId: string, userId: string): Promise<ArticleRequest> {
        return await this.articleRequestModel.findOne({ 
            pageid: pageId,
            submitByUserId: userId
        });
    }

    async usersDeleteRequest(pageId: string, userId: string): Promise<DeleteArticleRequest> {
        return await this.deleteArticleRequestModel.findOne({ 
            pageid: pageId,
            submitByUserId: userId
        });
    }

    async create(userId: string, articleId: string, createArticleRequestDto: CreateArticleRequestDto) {
        try {

            const user = await this.userModel.findById(userId);
            const article = await this.articleModel.findById(articleId);
            const createdArticleRequest = {
                newTitle: createArticleRequestDto.title,
                oldTitle: article.title,
                pageid: article.pageid,
                revid: article.revid,
                newText: createArticleRequestDto.text,
                oldText: article.text,
                newSummary: createArticleRequestDto.summary,
                oldSummary: article.summary,
                new_word_count: article.word_count,
                newAttribute: createArticleRequestDto.attributes,
                oldAttributes: article.attributes,
                submitByUserId: userId,
                contributors: [{
                    userId: userId,
                    userName: `${user.firstName} ${user.familyName}`
                }],
                status: 'pending',
                timestamp: new Date()
            }
            const newArticleRequest = new this.articleRequestModel(createdArticleRequest);
            await newArticleRequest.save();
        } catch (err) {
            console.log("Create new article request error:", err);
            return false;
        } finally {
            return true;
        }
    }


    async findByPageId(pageid: number): Promise<ArticleRequest> {
        return this.articleRequestModel.findOne({ pageid }).exec();
    }
    async findArticleByPageId(pageid: number): Promise<Article> {
        return this.articleModel.findOne({ pageid }).exec();
    }

    async update(userId: string, articleRequestId: string, updateArticleRequestDto: UpdateArticleRequestDto) {
        try {

            const user = await this.userModel.findById(userId);
            const existingArticleRequest = await this.articleRequestModel.findById(articleRequestId);

            const updatedArticleRequest = {
                newTitle: updateArticleRequestDto.title,
                newText: updateArticleRequestDto.text,
                newSummary: updateArticleRequestDto.summary,
                newAttribute: updateArticleRequestDto.attributes,
                contributors: Array.from(
                    new Set([
                        ...(existingArticleRequest.contributors ?? []),
                        {
                            userId: userId,
                            userName: `${user.firstName} ${user.familyName}`
                        }
                    ]).values()
                ),
                status: updateArticleRequestDto.status,
                timestamp: new Date()
            };

            await this.articleRequestModel.updateOne(
                { _id: articleRequestId },
                {
                    $set: updatedArticleRequest
                }
            );

        } catch (err) {
            console.log("Create new article request error:", err);
            return false;
        } finally {
            return true;
        }
    }

    async remove(id: string) {
        try {
            await this.articleRequestModel.findByIdAndDelete(id)
        } catch (err) {
            console.log("Delete article request error:", err);
            return false;
        } finally {
            return true;
        }
    }

    async createDeleteArticleRequest(userId: string, deleteArticleRequest: CreateDeleteArticleRequest) {
        try {
            const article = await this.articleModel.findById(deleteArticleRequest.articleId)
            const newArticleDeleteRequest = new this.deleteArticleRequestModel({
                pageid: article.pageid,
                title: article.title,
                reasonToDelete: deleteArticleRequest.reasonToDelete,
                submitByUserId: userId,
                status: "pending",
                reasonToApproveDelete: '',
                reasonToDenyDelete: '',
                judgedByUserId: '',
                judgedByUserName: '',
                timestamp: new Date(),
            });

            await newArticleDeleteRequest.save();
        } catch (err) {
            console.log("Issue creating delete article request:", err)
            return false;
        } finally {
            return true;
        }
    }

    async approveDeleteArticleRequest(userEmail: string, userToApproveId: string, approveRequest: ApproveDeleteArticleRequest) {
        try {

            if(!(await this.commonService.checkShura(userEmail)))
                throw new Error("Can't approve this delete wikipage request.");

            const judgedUser = await this.userModel.findById(userToApproveId);
            const deleteArticleRequestToUpdate = await this.deleteArticleRequestModel.findOne({ _id: approveRequest.id })
            await this.deleteArticleRequestModel.updateOne(
                { _id: approveRequest.id },
                {
                    $set: {
                        status: "approved",
                        reasonToApproveDelete: approveRequest.reasonToApproveDelete,
                        judgedByUserId: judgedUser._id,
                        judgedByUserName: `${judgedUser.firstName} ${judgedUser.familyName}`
                    }
                }
            );

            await this.articleModel.deleteOne({ pageid: deleteArticleRequestToUpdate.pageid })
        } catch (err) {
            console.log("Issue approving delete book request:", err)
            return false;
        } finally {
            return true;
        }
    }

    async denyDeleteArticleRequest(userEmail: string, userToApproveId: string, denyRequest: DenyDeleteArticleRequest) {
        try {
            if(!(await this.commonService.checkShura(userEmail)))
                throw new Error("Can't deny this delete wikipage request.");

            const judgedUser = await this.userModel.findById(userToApproveId);
            await this.deleteArticleRequestModel.updateOne(
                { _id: denyRequest.id },
                {
                    $set: {
                        status: "denied",
                        reasonToDenyDelete: denyRequest.reasonToDenyDelete,
                        judgedByUserId: judgedUser._id,
                        judgedByUserName: `${judgedUser.firstName} ${judgedUser.familyName}`
                    }
                }
            );
            
        } catch (err) {
            console.log("Issue approving delete article request:", err)
            return false;
        } finally {
            return true;
        }
    }

    async approveArticleRequest(judgeUserEmail: string, judgeUserId: string, approveRequest: ApproveArticleRequest) {
        try {
            if(!(await this.commonService.checkShura(judgeUserEmail)))
                throw new Error("Can't approve this wikipage request.");
            const judgedUser = await this.userModel.findById(judgeUserId);
    
            const existingArticleRequest = await this.articleRequestModel.findById(approveRequest.id);
            const existingArticle = await this.findArticleByPageId(existingArticleRequest.pageid);
            const updatedArticleRequest = {
                contributors: Array.from(
                    new Set([
                        ...(existingArticleRequest.contributors ?? []),
                        {
                            userId: judgeUserId,
                            userName: `${judgedUser.firstName} ${judgedUser.familyName}`
                        }
                    ]).values()
                ),
                status: "approved",
                timestamp: new Date()
            };

            await this.articleRequestModel.updateOne(
                { _id: approveRequest.id },
                {
                    $set: {
                        contributors: updatedArticleRequest.contributors,
                        deniedByUserId: judgeUserId,
                        status: updatedArticleRequest.status,
                        timestamp: updatedArticleRequest.timestamp
                    }
                }
            );

            await this.articleModel.updateOne(
                { _id: existingArticle.id },
                {
                    $set: {
                        title: existingArticleRequest.newTitle ? existingArticleRequest.newTitle : existingArticle.title, 
                        text: existingArticleRequest.newText ? existingArticleRequest.newText : existingArticle.text,
                        summary: existingArticleRequest.newSummary ? existingArticleRequest.newSummary : existingArticle.summary,
                        attributes: existingArticleRequest.newAttributes ? existingArticleRequest.newAttributes : existingArticle.attributes,
                        collaborators: updatedArticleRequest.contributors.length != existingArticle.collaborators.length ? updatedArticleRequest.contributors : existingArticle.collaborators
                    }
                }
            );
        } catch (err) {
            console.log("Issue approving article request:", err)
            return false;
        } finally {
            return true;
        }
    }

    async denyArticleRequest(judgeUserEmail: string, judgeUserId: string, denyRequest: DenyArticleRequest) {
        try {
            if(!(await this.commonService.checkShura(judgeUserEmail)))
                throw new Error("Can't deny this wikipage request.");
            const judgedUser = await this.userModel.findById(judgeUserId);
    
            const existingArticleRequest = await this.articleRequestModel.findById(denyRequest.id);

            const updatedArticleRequest = {
                contributors: Array.from(
                    new Set([
                        ...(existingArticleRequest.contributors ?? []),
                        {
                            userId: judgeUserId,
                            userName: `${judgedUser.firstName} ${judgedUser.familyName}`
                        }
                    ]).values()
                ),
                status: "denied",
                timestamp: new Date()
            };


            await this.articleRequestModel.updateOne(
                { _id: denyRequest.id },
                {
                    $set: {
                        contributors: updatedArticleRequest.contributors,
                        deniedByUserId: judgeUserId,
                        status: updatedArticleRequest.status,
                        timestamp: updatedArticleRequest.timestamp
                    }
                }
            );
        } catch (err) {
            console.log("Issue denying article request:", err)
            return false;
        } finally {
            return true;
        }
    }

    async deleteDeleteArticleRequest(deleteBookRequestId) {
        try {
            await this.deleteArticleRequestModel.deleteOne({ _id: deleteBookRequestId });
        } catch (err) {
            console.log("Issue creating delete book request:", err)
            return false;
        } finally {
            return true;
        }
    }
}
