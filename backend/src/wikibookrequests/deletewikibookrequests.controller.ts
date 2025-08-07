import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { WikibookRequestsService } from './wikibookrequests.service';
import { CreateDeleteBookRequestDto } from 'src/dtos/create-delete-book-request.dto';
import { GetUser } from 'src/auth/decorators/get-user-decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApproveDeleteWikiBookRequest, DenyDeleteWikiBookRequest } from 'src/models/book';

@Controller('deletewikibookrequests')
export class DeleteWikibookRequestsController {
    constructor(
        private readonly wikibookRequestsService: WikibookRequestsService) { }
    
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getYourRequest(
        @GetUser() user,
        @Param('id') id: string) {
        return await this.wikibookRequestsService.usersDeleteRequest(id, user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @GetUser() user,
        @Body() { values:deleteBookRequestDto  }: { values: CreateDeleteBookRequestDto}) {
        return await this.wikibookRequestsService.createDeleteBookRequest(
                user.id, 
                deleteBookRequestDto
            );
    }

    @UseGuards(JwtAuthGuard)
    @Put('approve/:id')
    async approve(
        @GetUser() user,
        @Param('id') id: string, 
        @Body() { values:deleteApproveWikiBookRequestDto  }: { values: ApproveDeleteWikiBookRequest}) {
        return await this.wikibookRequestsService.approveDeleteBookRequest(
                user.id, 
                deleteApproveWikiBookRequestDto
        );
    }

    @UseGuards(JwtAuthGuard)
    @Put('deny/:id')
    async deny(
        @GetUser() user,
        @Param('id') id: string, 
        @Body() { values:denyDeleteWikibookRequestDto  }: { values: DenyDeleteWikiBookRequest}) {
        return await this.wikibookRequestsService.denyDeleteBookRequest(
                user.id, 
                denyDeleteWikibookRequestDto
        );
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.wikibookRequestsService.deleteDeleteBookRequest(id);
    }
}
