import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { QualificationPathwaysDto } from './dtos/qualification-pathways.dto';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('evaluate')
@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Evaluate rules' })
  @ApiResponse({
    status: 200,
    description: 'Rules engine evaluation',
  })
  qualificationPathways(
    @Body() qualificationPathwaysDto: QualificationPathwaysDto,
  ) {
    return this.appService.executeQualificationPathways(
      qualificationPathwaysDto,
    );
  }
}
