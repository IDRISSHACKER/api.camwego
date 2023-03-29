import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Api de catalogue de guihon!';
  }

  getAuthor(): string {
    return 'IDRISSHACKER'
  }
}
