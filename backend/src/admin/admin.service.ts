import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async findByEmail(email: string): Promise<Admin | null> {
    console.log('Searching for admin with email:', email); // Log email search

    const admin = await this.adminModel
      .findOne({ email: { $regex: new RegExp(`^${email}$`, 'i') } })
      .exec();

    console.log('Admin found:', admin); // Log what MongoDB returns
    return admin;
  }
}
