import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user-decorator';

@Controller('dashboard')
export class DashboardController {
    constructor(
        private readonly dashboardService: DashboardService) { } 

    @Get('wikipagerequests')
    @UseGuards(JwtAuthGuard)
    async wikipageRequests(@GetUser() user) {
        const recentWikiPageRequests = await this.dashboardService.getArticleRequests(user.id);
            
        return {
            results: recentWikiPageRequests,
            status: 200
        };
    }

    @Get('deleterequests')
    @UseGuards(JwtAuthGuard)
    async deleteRequests(@GetUser() user) {
        const deleteWikiPageRequests = await this.dashboardService.getDeleteArticleRequests(user.id);
        const deleteWikiBookRequests = await this.dashboardService.getDeleteBookRequests(user.id);
        
        return {
            results: {
                deleteWikiPageRequests,
                deleteWikiBookRequests
            },
            status: 200
        };
    }

    @Get('recentActivityLogs')
    @UseGuards(JwtAuthGuard)
    async recentActivityLog(@GetUser() user) {
        const recentActivityLogs = await this.dashboardService.getActivityLogs(user.id);

        return {
            results: recentActivityLogs,
            status: 200
        };
    }

}
