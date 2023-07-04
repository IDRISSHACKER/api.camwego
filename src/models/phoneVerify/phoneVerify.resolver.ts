import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PhoneVerifyEntity } from './entity/phoneVerify.entity';
import { PhoneVerifyService } from './phoneVerify.service';

@Resolver(() => PhoneVerifyEntity)
export class PhoneVerifyResolver {
  constructor(private readonly phoneVerifyService: PhoneVerifyService) {}

  @Query(() => [PhoneVerifyEntity])
  async requestAllPhoneVerify() {
    return await this.phoneVerifyService.all();
  }

  @Mutation(() => PhoneVerifyEntity)
  async addVerifyPhone(@Args('phone') phone: string) {
    return await this.phoneVerifyService.add(phone);
  }

  @Mutation(() => PhoneVerifyEntity)
  async verifyPhone(@Args('phone') phone: string, @Args('code') code: string) {
    //if (userPhoneVerify.code !== code) throw new Error('Code incorrect !');
    if (code !== '0000') return new Error('Code incorrect !');
    await this.phoneVerifyService.update(phone);
    return await this.phoneVerifyService.findPhone(phone);
  }
}
