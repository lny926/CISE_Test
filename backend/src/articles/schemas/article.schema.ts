import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema()
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  journal: string;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  volume: string;

  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  pages: string;

  @Prop({ required: true })
  doi: string;

  @Prop({ default: false }) // Track rejected status
  isRejected: boolean;

  @Prop({ default: false }) // Track accepted status
  isAccepted: boolean;

  @Prop({ default: false }) // Track approved status
  isApproved: boolean;

  @Prop({ type: [Number], default: [] }) // Add ratings field as an array of numbers
  ratings: number[]; // Use an array to store multiple ratings
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
