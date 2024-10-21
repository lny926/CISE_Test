import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ModeratorDocument = Moderator & Document;

@Schema()
export class Moderator {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const ModeratorSchema = SchemaFactory.createForClass(Moderator);
