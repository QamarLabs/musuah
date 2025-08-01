import { Controller, Get, Param } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(
        private readonly dashboardService: DashboardService) { }

    @Get(':userId')
    getWikiBook(@Param('userId') userId: string) {
        return null;
        // return this.wikibooksService.getWikiBook(bookId);
    }
}
