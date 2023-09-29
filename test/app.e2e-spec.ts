import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/')
      .send({
        facts: {
          personalFoulCount: 6,
        },
        qualificationPathways: [
          {
            conditions: {
              all: [
                {
                  not: {
                    fact: 'personalFoulCount',
                    operator: 'equal',
                    value: 62,
                  },
                },
              ],
            },
            event: {
              type: 'someEvent',
              params: { aaa: 'dadada' },
            },
          },
          {
            conditions: {
              all: [
                {
                  fact: 'personalFoulCount',
                  operator: 'equal',
                  value: 62,
                },
              ],
            },
            event: {
              type: 'someEvent2',
              params: { aaa: 'dadada' },
            },
          },
        ],
      })
      .expect(200)
      .expect({
        almanac: {
          factMap: {},
          factResultsCache: {},
          allowUndefinedFacts: false,
          events: {
            success: [
              {
                type: 'someEvent',
                params: {
                  aaa: 'dadada',
                },
              },
            ],
            failure: [
              {
                type: 'someEvent2',
                params: {
                  aaa: 'dadada',
                },
              },
            ],
          },
          ruleResults: [
            '{"conditions":{"priority":1,"all":[{"operator":"equal","value":62,"fact":"personalFoulCount","factResult":6,"result":false}]},"event":{"type":"someEvent2","params":{"aaa":"dadada"}},"priority":1,"result":false}',
            '{"conditions":{"priority":1,"all":[{"priority":1,"not":{"operator":"equal","value":62,"fact":"personalFoulCount","factResult":6,"result":false}}]},"event":{"type":"someEvent","params":{"aaa":"dadada"}},"priority":1,"result":true}',
          ],
        },
        results: [
          '{"conditions":{"priority":1,"all":[{"priority":1,"not":{"operator":"equal","value":62,"fact":"personalFoulCount","factResult":6,"result":false}}]},"event":{"type":"someEvent","params":{"aaa":"dadada"}},"priority":1,"result":true}',
        ],
        failureResults: [
          '{"conditions":{"priority":1,"all":[{"operator":"equal","value":62,"fact":"personalFoulCount","factResult":6,"result":false}]},"event":{"type":"someEvent2","params":{"aaa":"dadada"}},"priority":1,"result":false}',
        ],
        events: [
          {
            type: 'someEvent',
            params: {
              aaa: 'dadada',
            },
          },
        ],
        failureEvents: [
          {
            type: 'someEvent2',
            params: {
              aaa: 'dadada',
            },
          },
        ],
      });
  });
});
