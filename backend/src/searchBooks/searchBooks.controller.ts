import { Controller, Get, Query, Res } from '@nestjs/common';
import { SearchBooksService } from './searchBooks.service';
import { Response } from 'express';


@Controller('searchBooks')
export class SearchBooksController {
  constructor(
    private readonly searchBooksService: SearchBooksService) { }

  @Get()
  async searchWikiBooks(
    @Query('qry') qry: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Res() res: Response) {
    const wikibookSearchResult = await this.searchBooksService.wikiBooks(qry, page, limit);
    res.json({
      results: wikibookSearchResult,
      status: 200
    });
  }

  @Get('autocomplete')
  async autocomplete(
    @Query('qry') qry: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Res() res: Response) {
    const autoCompleteResults = await this.searchBooksService.autocomplete(qry, page, limit);
    res.json({
      results: autoCompleteResults,
      status: 200
    });
  }

}
