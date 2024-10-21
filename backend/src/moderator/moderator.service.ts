import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Moderator, ModeratorDocument } from './schemas/moderator.schema';

@Injectable()
export class ModeratorService {
  constructor(
    @InjectModel(Moderator.name)
    private moderatorModel: Model<ModeratorDocument>,
  ) {}

  // Find an analyst by email (case-insensitive)
  async findByEmail(email: string): Promise<Moderator | null> {
    console.log('Searching for moderator with email:', email); // Log email search

    const moderator = await this.moderatorModel
      .findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } })
      .exec();

    console.log('Moderator found:', moderator); // Log what MongoDB returns
    return moderator;
  }
}
