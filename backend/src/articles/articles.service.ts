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

  // Find non-rejected articles (for AdminDashboard)
  async findAll(): Promise<Article[]> {
    return this.articleModel.find({ isRejected: { $ne: true } }).exec(); // Fetch articles that are not rejected
  }

  // Find rejected articles (for rejectedarticles page)
  async findRejected(): Promise<Article[]> {
    return this.articleModel.find({ isRejected: true }).exec(); // Fetch only rejected articles
  }

  // Update an article to mark it as rejected
  async rejectArticle(id: string): Promise<void> {
    await this.articleModel.findByIdAndUpdate(id, { isRejected: true }).exec(); // Mark article as rejected
  }
}
