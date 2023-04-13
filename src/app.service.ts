import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Camwego API! V1.6';
  }

  getAuthor(): string {
    return 'IDRISSHACKER';
  }
}
