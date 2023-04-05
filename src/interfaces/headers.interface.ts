import { Headers } from '@nestjs/common';

export interface myHeaders extends Headers {
  authorization: string;
}
