import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
      @InjectModel(Book.name) private bookRequestModel: Model<Book>) {}
    
    async createDeleteBookRequest(userId: string, deleteBookRequest: CreateDeleteBookRequestDto){
      try {
        const book = await this.bookRequestModel.findById(deleteBookRequest.bookId);
        const newDeleteBookRequest = new  this.deleteBookRequestModel({
          bookId: deleteBookRequest.bookId,
          submitByUserId: userId,
          title: book.title,
          reasonToDelete: deleteBookRequest.bookId,
          reasonToApproveDelete: '',
          reasonToDenyDelete: '',
          judgedByUserId: '',
          judgedByUserName: ''
        });
        await newDeleteBookRequest.save();
  
      } catch(err) {
        console.log("Issue creating delete book request:", err)
        return false;
      } finally {
        return true;
      }
    }

    async approveDeleteBookRequest(userToApproveId: string, approveRequest: ApproveDeleteWikiBookRequest){
      try {
        const judgedUser = await this.userModel.findById(userToApproveId);
        await this.deleteBookRequestModel.updateOne(
          { _id: approveRequest.id },
          {
            $set: {
              reasonToApproveDelete: approveRequest.reasonToApproveDelete,
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

    async denyDeleteBookRequest(userToApproveId: string, denyRequest: DenyDeleteWikiBookRequest){
      try {
        const judgedUser = await this.userModel.findById(userToApproveId);
        await this.deleteBookRequestModel.updateOne(
          { _id: denyRequest.id },
          {
            $set: {
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

    async deleteDeleteBookRequest(deleteBookRequestId){
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
