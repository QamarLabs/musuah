import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WikiBookSearchResult } from 'src/models/book';
import { ServerPaginatedResult, ServerPagination } from 'src/models/paging';
import { WikiPageSearchResult, QueriedAutoCompleteValue } from 'src/models/search';
import { Book } from 'src/schemas/book.schema';

@Injectable()
export class SearchBooksService {

  constructor(@InjectModel(Book.name) private articleModel: Model<Book>) {}
    
  async autocomplete(
    qry: string,
    page: number = 1,
    limit: number = 10
  ): Promise<ServerPaginatedResult<QueriedAutoCompleteValue<string>[]>> {
    const query = { title: { $regex: qry, $options: 'i' } };
    
    const [results, total] = await Promise.all([
      this.articleModel
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.articleModel.countDocuments(query).exec(),
    ]);

    const data: QueriedAutoCompleteValue<string>[] = results.map(itm => ({ 
                                                        text: itm.displayName, 
                                                        value: itm._id as string,
                                                        author: itm.authors && itm.authors.length ? itm.authors[0].name : "",
                                                        primaryTopic: itm.primaryTopic,
                                                        publicationYear: itm.publicationYear,
                                                        timestamp: itm.publicationDate
                                                    }));
    const pagination: ServerPagination = {
      currentPage: page,
      itemsPerPage: limit,
      totalItems: total,
      totalPages: Math.round(total/limit)
    }

    return new ServerPaginatedResult<QueriedAutoCompleteValue<string>[]>(data, pagination);
  }

  
  async wikiBooks(
    qry: string,
    page: number = 1,
    limit: number = 25 // More for the search results page
  ): Promise<ServerPaginatedResult<WikiBookSearchResult[]>> {
    const query = { title: { $regex: qry, $options: 'i' } };
    console.log('search qry:', qry)
    const [results, total] = await Promise.all([
      this.articleModel
        .find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.articleModel.countDocuments(query).exec(),
    ]);

    const data: WikiBookSearchResult[] = results.map(itm => ({ 
                                          _id: itm._id as string,
                                          title: itm.title, 
                                          displayName: itm.displayName,
                                          description: itm.description,
                                          author: itm.authors.map(a => a.name).join(', '),
                                          publicationDate: itm.publicationDate,
                                          primaryTopic: itm.primaryTopic
                                        }));
    const pagination: ServerPagination = {
      currentPage: page,
      itemsPerPage: limit,
      totalItems: total,
      totalPages: Math.round(total/limit)
    }

    return new ServerPaginatedResult<WikiBookSearchResult[]>(data, pagination);
  }
}
