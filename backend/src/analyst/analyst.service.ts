import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Analyst, AnalystDocument } from './schemas/analyst.schema';

@Injectable()
export class AnalystService {
  constructor(
    @InjectModel(Analyst.name) private analystModel: Model<AnalystDocument>,
  ) {}

  // Find an analyst by email (case-insensitive)
  async findByEmail(email: string): Promise<Analyst | null> {
    console.log('Searching for analyst with email:', email); // Log email search

    const analyst = await this.analystModel
      .findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } })
      .exec();

    console.log('Analyst found:', analyst); // Log what MongoDB returns
    return analyst;
  }
}
