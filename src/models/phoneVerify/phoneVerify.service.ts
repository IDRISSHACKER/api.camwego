import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhoneVerifyEntity } from './entity/phoneVerify.entity';
import _ from 'underscore';

@Injectable()
export class PhoneVerifyService {
  constructor(
    @InjectModel(PhoneVerifyEntity.name)
    private readonly phoneVerifyModel: Model<PhoneVerifyEntity>,
  ) {}

  async all() {
    return this.phoneVerifyModel.find();
  }

  async findPhone(phone: string) {
    return this.phoneVerifyModel.findOne({ phone });
  }

  async add(phone: string) {
    const code = _.random(1000, 9999);
    const phoneCodeInDB = await this.phoneVerifyModel.find({ phone });

    if (phoneCodeInDB.length)
      return this.phoneVerifyModel.findOneAndUpdate(
        { phone: phone },
        { code },
        { new: true },
      );

    return this.phoneVerifyModel.create({ phone, code });
  }

  async update(phone: string) {
    return this.phoneVerifyModel.findOneAndUpdate(
      { phone: phone },
      { verified: true },
      { new: true },
    );
  }
}
