import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Camwego API! V3-prod-(Dépoiement avec les tests)';
  }

  getAuthor(): string {
    return 'IDRISSHACKER';
  }
}
