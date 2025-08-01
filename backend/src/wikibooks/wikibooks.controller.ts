import { Controller, Get, Param } from '@nestjs/common';
import { WikibooksService } from './wikibooks.service';

@Controller('wikibooks')
export class WikibooksController {
    constructor(
        private readonly wikibooksService: WikibooksService) { }

    @Get(':bookId')
    getWikiBook(@Param('bookId') bookId: string) {
        return this.wikibooksService.getWikiBook(bookId);
    }
}
