import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Camwego API! V2-beta';
  }

  getAuthor(): string {
    return 'IDRISSHACKER';
  }
}
