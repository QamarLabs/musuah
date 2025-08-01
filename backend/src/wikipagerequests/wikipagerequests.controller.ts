import { Body, Controller, Delete, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateArticleRequestDto } from 'src/dtos/create-article-request.dto';
import { UpdateArticleRequestDto } from 'src/dtos/update-article-request.dto';
import { WikipagerequestsService } from './wikipagerequests.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user-decorator';

@Controller('wikipagerequests')
export class WikipagerequestsController {
    constructor(private readonly wikipageRequestsService: WikipagerequestsService) { }

    @UseGuards(JwtAuthGuard)
    @Post()
    create(
        @GetUser() user,
        @Body() createArticleRequestDto: CreateArticleRequestDto) {
        return this.wikipageRequestsService.create(user.id, createArticleRequestDto.articleId, createArticleRequestDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    update(
        @GetUser() user,
        @Param('id') id: string, 
        @Body() updateArticleRequestDto: UpdateArticleRequestDto) {
        return this.wikipageRequestsService.update(user.id, id, updateArticleRequestDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.wikipageRequestsService.remove(id);
    }

}
