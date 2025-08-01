import { Controller, Get, Query, Res } from '@nestjs/common';
import { AiAssistantService } from './ai-assistant.service';
import { Response } from 'express';


@Controller('ai-assistant')
export class AiAssistantController {
  constructor(
    private readonly searchService: AiAssistantService) { }

}
