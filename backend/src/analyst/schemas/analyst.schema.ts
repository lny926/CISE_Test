import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AnalystDocument = Analyst & Document;

@Schema()
export class Analyst {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const AnalystSchema = SchemaFactory.createForClass(Analyst);
