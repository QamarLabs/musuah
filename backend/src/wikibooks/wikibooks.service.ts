import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WikiPage } from 'src/models/article';
import { WikiBook } from 'src/models/book';
import { Book } from 'src/schemas/book.schema';

@Injectable()
export class WikibooksService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}
    
    async getWikiBook(
        bookId: string
    ): Promise<WikiBook> {
    
    const wikiBookResult: WikiBook = await this.bookModel.findOne({ _id: bookId }).exec() as WikiBook;
    
    console.log("wikiBookResult:", wikiBookResult);
    
    return wikiBookResult;
  }
}
