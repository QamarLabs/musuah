import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { WikipagerequestsService } from './wikipagerequests.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user-decorator';
import { DeleteArticleRequestDto } from 'src/dtos/delete-article-request.dto';
import { ApproveDeleteArticleRequest, DenyDeleteArticleRequest } from 'src/models/article';

@Controller('deletewikipagerequests')
export class DeleteWikipagerequestsController {
    constructor(private readonly wikipageRequestsService: WikipagerequestsService) { }

    @UseGuards(JwtAuthGuard)
    @Get(':pageid')
    async getYourRequest(
        @GetUser() user,
        @Param('pageid') pageid: string) {
        return await this.wikipageRequestsService.usersDeleteRequest(pageid, user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @GetUser() user,
        @Body() { values:deleteArticleRequestDto  }: { values: DeleteArticleRequestDto}) {
        return await this.wikipageRequestsService.createDeleteArticleRequest(
                user.id, 
                deleteArticleRequestDto
            );
    }

    @UseGuards(JwtAuthGuard)
    @Patch('approve/:id')
    async approve(
        @GetUser() user,
        @Param('id') id: string, 
        @Body() { values:approveArticleRequestDto  }: { values: ApproveDeleteArticleRequest}) {
        return await this.wikipageRequestsService.approveDeleteArticleRequest(
            user.email,
            user.id, 
            approveArticleRequestDto
        );
    }

    @UseGuards(JwtAuthGuard)
    @Patch('deny/:id')
    async deny(
        @GetUser() user,
        @Param('id') id: string, 
        @Body() { values:denyArticleRequestDto  }: { values: DenyDeleteArticleRequest}) {
        return await this.wikipageRequestsService.denyDeleteArticleRequest(
            user.email,
            user.id, 
            denyArticleRequestDto
        );
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.wikipageRequestsService.deleteDeleteArticleRequest(id);
    }
}
