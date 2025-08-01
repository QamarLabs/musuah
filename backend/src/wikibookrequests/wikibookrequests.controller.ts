import { Controller, Get, Param } from '@nestjs/common';
import { WikibookRequestsService } from './wikibookrequests.service';

@Controller('wikibookrequests')
export class WikibookRequestsController {
    constructor(
        private readonly wikibookRequestsService: WikibookRequestsService) { }


}
