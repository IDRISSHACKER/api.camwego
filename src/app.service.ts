import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Camwego API! V1.8';
  }

  getAuthor(): string {
    return 'IDRISSHACKER';
  }
}
