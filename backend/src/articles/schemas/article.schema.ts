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
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
