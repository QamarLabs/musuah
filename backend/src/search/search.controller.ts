import { Controller, Get, Query, Res } from '@nestjs/common';
import { SearchService } from './search.service';
import { Response } from 'express';


@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService) { }

  @Get()
  async searchWikiPages(
    @Query('qry') qry: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Res() res: Response) {
    const wikiPageSearchResult = await this.searchService.wikipages(qry, page, limit);
    res.json({
      results: wikiPageSearchResult,
      status: 200
    });
  }

  @Get('autocomplete')
  async autocomplete(
    @Query('qry') qry: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Res() res: Response) {
    const autoCompleteResults = await this.searchService.autocomplete(qry, page, limit);
    res.json({
      results: autoCompleteResults,
      status: 200
    });
  }

}
