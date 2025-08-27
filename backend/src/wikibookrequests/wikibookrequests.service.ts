import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommonService } from 'src/common/common.service';
import { CreateDeleteBookRequestDto } from 'src/dtos/create-delete-book-request.dto';
import { ApproveDeleteWikiBookRequest, DenyDeleteWikiBookRequest } from 'src/models/book';
import { Book } from 'src/schemas/book.schema';
import { DeleteBookRequest } from 'src/schemas/deletebookrequest.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class WikibookRequestsService {
    constructor(
      @InjectModel(User.name) private userModel: Model<User>,
      @InjectModel(DeleteBookRequest.name) private deleteBookRequestModel: Model<DeleteBookRequest>,
      @InjectModel(Book.name) private bookModel: Model<Book>,
      private readonly commonService: CommonService) {}

      
    async usersDeleteRequest(id: string, userId: string): Promise<DeleteBookRequest> {
      return await this.deleteBookRequestModel.findOne({ 
          bookId: id,
          submitByUserId: userId
      });
    }

    async createDeleteBookRequest(userId: string, deleteBookRequest: CreateDeleteBookRequestDto){
      try {
        const book = await this.bookModel.findById(deleteBookRequest.bookId);
        const newDeleteBookRequest = new  this.deleteBookRequestModel({
          bookId: deleteBookRequest.bookId,
          submitByUserId: userId,
          title: book.title,
          reasonToDelete: deleteBookRequest.reasonToDelete,
          status: 'pending',
          reasonToApproveDelete: '',
          reasonToDenyDelete: '',
          judgedByUserId: '',
          judgedByUserName: '',
          timestamp: new Date()
        });
        await newDeleteBookRequest.save();
  
      } catch(err) {
        console.log("Issue creating delete book request:", err)
        return false;
      } finally {
        return true;
      }
    }

    async approveDeleteBookRequest(userToApproveEmail: string, userToApproveId: string, approveRequest: ApproveDeleteWikiBookRequest){
      try {
        if(!(await this.commonService.checkShura(userToApproveEmail)))
          throw new Error("Can't approve this delete wikibook request.");

        const judgedUser = await this.userModel.findById(userToApproveId);
        const deleteBookRequest = await this.deleteBookRequestModel.findById(approveRequest.id);

        const bookToDelete = await this.bookModel.findById(deleteBookRequest.bookId)

        await this.deleteBookRequestModel.updateOne(
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

        await this.bookModel.findByIdAndDelete(bookToDelete._id);
      } catch(err) {
        console.log("Issue approving delete book request:", err)
        return false;
      } finally {
        return true;
      }
    }

    async denyDeleteBookRequest(userToDenyEmail: string, userToDenyId: string, denyRequest: DenyDeleteWikiBookRequest){
      try {
        if(!(await this.commonService.checkShura(userToDenyEmail)))
          throw new Error("Can't deny this delete wikibook request.");

        const judgedUser = await this.userModel.findById(userToDenyId);
        await this.deleteBookRequestModel.updateOne(
          { _id: denyRequest.id },
          {
            $set: {
              status: 'denied',
              reasonToDenyDelete: denyRequest.reasonToDenyDelete,
              judgedByUserId: judgedUser._id,
              judgedByUserName: `${judgedUser.firstName} ${judgedUser.familyName}`
            }
          }
        );
      } catch(err) {
        console.log("Issue approving delete book request:", err)
        return false;
      } finally {
        return true;
      }
    }

    async deleteDeleteBookRequest(deleteBookRequestId: string){
      try {
        await this.deleteBookRequestModel.deleteOne({ _id: deleteBookRequestId });
      } catch(err) {
        console.log("Issue creating delete book request:", err)
        return false;
      } finally {
        return true;
      }
    }
}
