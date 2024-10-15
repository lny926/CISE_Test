import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  // Existing method to create a new article (for user submissions)
  async create(article: Article): Promise<Article> {
    const newArticle = new this.articleModel(article);
    return newArticle.save();
  }

  // New method to fetch all articles (for admin dashboard)
  async findAll(): Promise<Article[]> {
    return this.articleModel.find().exec(); // Find all articles in the collection
  }
}
