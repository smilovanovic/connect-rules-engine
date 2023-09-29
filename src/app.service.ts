import { Injectable } from '@nestjs/common';
import { QualificationPathwaysDto } from './dtos/qualification-pathways.dto';
import { Engine, TopLevelCondition } from 'json-rules-engine';

@Injectable()
export class AppService {
  executeQualificationPathways(
    qualificationPathwaysDto: QualificationPathwaysDto,
  ) {
    const engine = new Engine();
    qualificationPathwaysDto.qualificationPathways.forEach((qp) => {
      engine.addRule({
        conditions: qp.conditions as TopLevelCondition,
        event: qp.event,
      });
    });

    return engine.run(qualificationPathwaysDto.facts);
  }
}
