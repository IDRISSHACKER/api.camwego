import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Camwego API! V3-prod';
  }

  getAuthor(): string {
    return 'IDRISSHACKER';
  }
}
