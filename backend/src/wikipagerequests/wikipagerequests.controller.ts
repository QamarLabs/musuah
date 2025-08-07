import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateArticleRequestDto } from 'src/dtos/create-article-request.dto';
import { UpdateArticleRequestDto } from 'src/dtos/update-article-request.dto';
import { WikipagerequestsService } from './wikipagerequests.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user-decorator';

@Controller('wikipagerequests')
export class WikipagerequestsController {
    constructor(private readonly wikipageRequestsService: WikipagerequestsService) { }

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
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.wikipageRequestsService.remove(id);
    }

}
