import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const response = await appController.qualificationPathways({
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
      });

      expect(response).toMatchObject({
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
});
