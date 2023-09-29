import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { QualificationPathwaysDto } from './dtos/qualification-pathways.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Post()
  @HttpCode(200)
  qualificationPathways(
    @Body() qualificationPathwaysDto: QualificationPathwaysDto,
  ) {
    return this.appService.executeQualificationPathways(
      qualificationPathwaysDto,
    );
  }
}
