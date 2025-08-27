import { Controller, Get, Param, Query, Res, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user-decorator';
import { CommonService } from 'src/common/common.service';
import { MutateDashboardService } from './mutateDashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(
        private readonly dashboardService: DashboardService,
        private readonly mutateDashboardService: MutateDashboardService,
        private readonly commonService: CommonService) { } 

    @Get('check')
    @UseGuards(JwtAuthGuard)
    async check(@GetUser() user) {
        const isCm = await this.commonService.checkShura(user.email);

        return {
            cM: isCm,
            status: 200
        };
    }

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
        const recentDeleteWikiPageRequests = await this.dashboardService.getRecentDeleteArticleRequests(user.id);
        const approvedDeleteWikiPageRequests = await this.dashboardService.getApprovedDeleteArticleRequests(user.id);
        const deniedDeleteWikiPageRequests = await this.dashboardService.getDeniedDeleteArticleRequests(user.id);
        const recentDeleteWikiBookRequests = await this.dashboardService.getRecentDeleteBookRequests(user.id);
        const approvedWikiBookRequests = await this.dashboardService.getApprovedDeleteBookRequests(user.id);
        const deniedWikiBookRequests = await this.dashboardService.getDeniedDeleteBookRequests(user.id);

        return {
            results: {
                recentDeleteWikiPageRequests,
                approvedDeleteWikiPageRequests,
                deniedDeleteWikiPageRequests,
                recentDeleteWikiBookRequests,
                approvedWikiBookRequests,
                deniedWikiBookRequests
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


    @Get('mutate/recentrequests')
    @UseGuards(JwtAuthGuard)
    async wikipageRequestsToMutate(@GetUser() user) {
        const wikipageRequestsToMutate = await this.mutateDashboardService.getWikiPageRequestsToMutate(user.id);
        const deleteWikipageRequestsToMutate = await this.mutateDashboardService.getDeleteWikiPageRequestsToMutate(user.id);
        const deleteWikibookRequestsToMutate = await this.mutateDashboardService.getDeleteWikiBookRequestsToMutate(user.id);
            
        return {
            results: {
                wikipageRequestsToMutate,
                deleteWikipageRequestsToMutate,
                deleteWikibookRequestsToMutate
            },
            status: 200
        };
    }

}
