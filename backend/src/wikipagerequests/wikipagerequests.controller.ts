import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';
import { CreateArticleRequestDto } from 'src/dtos/create-article-request.dto';
import { UpdateArticleRequestDto } from 'src/dtos/update-article-request.dto';
import { WikipagerequestsService } from './wikipagerequests.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user-decorator';
import { CommonService } from 'src/common/common.service';
import { ApproveArticleRequest, DenyArticleRequest } from 'src/models/article';

@Controller('wikipagerequests')
export class WikipagerequestsController {
    constructor(
        private readonly wikipageRequestsService: WikipagerequestsService,
        private readonly commonService: CommonService) { }

    @UseGuards(JwtAuthGuard)
    @Get(':pageid')
    async getYourRequest(
        @GetUser() user,
        @Param('pageid') pageid: string) {
        return await this.wikipageRequestsService.usersRequest(pageid, user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @GetUser() user,
        @Body() { values:createArticleRequestDto  }: { values: CreateArticleRequestDto}) {
        return await this.wikipageRequestsService.create(user.id, createArticleRequestDto.articleId, createArticleRequestDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @GetUser() user,
        @Param('id') id: string, 
        @Body() { values: updateArticleRequestDto  }: { values: UpdateArticleRequestDto}) {
        return await this.wikipageRequestsService.update(user.id, id, updateArticleRequestDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('approve/:id')
    async approve(
        @GetUser() user,
        @Param('id') id: string, 
        @Body() { values: approveArticleRequest  }: { values: ApproveArticleRequest}) {
        return await this.wikipageRequestsService.approveArticleRequest(user.email, user.id, approveArticleRequest);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('deny/:id')
    async deny(
        @GetUser() user,
        @Param('id') id: string, 
        @Body() { values: denyArticleRequest  }: { values: DenyArticleRequest}) {
        return await this.wikipageRequestsService.denyArticleRequest(user.email, user.id, denyArticleRequest);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.wikipageRequestsService.remove(id);
    }

}
