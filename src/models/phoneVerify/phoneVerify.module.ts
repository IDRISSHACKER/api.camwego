import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhoneVerifyResolver } from './phoneVerify.resolver';
import { PhoneVerifyService } from './phoneVerify.service';
import {
  PhoneVerifyEntity,
  PhoneVerifySchema,
} from './entity/phoneVerify.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PhoneVerifyEntity.name, schema: PhoneVerifySchema },
    ]),
  ],
  providers: [PhoneVerifyService, PhoneVerifyResolver],
})
export class PhoneVerifyModule {}
