import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ServerPaginatedResult, ServerPagination } from 'src/models/paging';
import { WikiPageSearchResult, QueriedAutoCompleteValue } from 'src/models/search';
import { Article } from 'src/schemas/article.schema';

@Injectable()
export class SearchService {

  constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {}
    
async autocomplete(
  qry: string,
  page: number = 1,
  limit: number = 10
): Promise<ServerPaginatedResult<QueriedAutoCompleteValue<number>[]>> {
  // Use text search if query is long enough, otherwise use anchored regex
  const query = qry.length > 2 
    ? { $text: { $search: qry } } 
    : { title: { $regex: `^${qry}`, $options: 'i' } };
  
  const [results, total] = await Promise.all([
    this.articleModel
      .find(query)
      .sort('field +title')
      .skip((page - 1) * limit)
      .limit(limit)
      .lean() // Faster response by returning plain JS objects
      .exec(),
    this.articleModel.countDocuments(query).exec(),
  ]);

  const data: QueriedAutoCompleteValue<number>[] = results.map(itm => ({
    text: itm.title, 
    value: itm.pageid, 
    timestamp: itm.timestamp 
  }));
  
  const pagination: ServerPagination = {
    currentPage: page,
    itemsPerPage: limit,
    totalItems: total,
    totalPages: Math.ceil(total/limit) // Fixed: use ceil instead of round
  };

  return new ServerPaginatedResult(data, pagination);
}

  
  async wikipages(
    qry: string,
    page: number = 1,
    limit: number = 25 // More for the search results page
  ): Promise<ServerPaginatedResult<WikiPageSearchResult[]>> {
    try {
      // Use text search if query is long enough, otherwise use anchored regex
      const query = qry.length > 2 
        ? { $text: { $search: qry } } 
        : { title: { $regex: `^${qry}`, $options: 'i' } };
    
        const [results, total] = await Promise.all([
          this.articleModel
              .find(query)
              .sort('field +title')
              .skip((page - 1) * limit)
              .limit(limit)
              .lean() // Faster response by returning plain JS objects
              .exec(),
          this.articleModel.countDocuments(query).exec(),
        ]);
    
        const data: WikiPageSearchResult[] = results.map(itm => ({ 
                                              id: itm.id,
                                              pageid: itm.pageid,
                                              title: itm.title, 
                                              summary: itm.summary, 
                                              timestamp: itm.timestamp 
                                            }));
        const pagination: ServerPagination = {
          currentPage: page,
          itemsPerPage: limit,
          totalItems: total,
          totalPages: Math.round(total/limit)
        }
    
        return new ServerPaginatedResult<WikiPageSearchResult[]>(data, pagination);
    } catch(err) {
      console.log("Get wikipage data error:", err);
    }
  }
}
