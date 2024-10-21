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

  // Find non-rejected and non-accepted articles (for AdminDashboard)
  async findAll(): Promise<Article[]> {
    return this.articleModel
      .find({ isRejected: { $ne: true }, isAccepted: { $ne: true } })
      .exec(); // Fetch articles that are neither rejected nor accepted
  }

  // Find accepted articles (for AnalystDashboard)
  async findAccepted(): Promise<Article[]> {
    return this.articleModel.find({ isAccepted: true }).exec(); // Fetch only accepted articles
  }

  // Find rejected articles (for RejectedArticles page)
  async findRejected(): Promise<Article[]> {
    return this.articleModel.find({ isRejected: true }).exec(); // Fetch only rejected articles
  }

  // Mark article as rejected
  async rejectArticle(id: string): Promise<void> {
    await this.articleModel.findByIdAndUpdate(id, { isRejected: true }).exec(); // Mark article as rejected
  }

  // Mark article as accepted
  async acceptArticle(id: string): Promise<void> {
    await this.articleModel.findByIdAndUpdate(id, { isAccepted: true }).exec(); // Mark article as accepted
  }

  // Update article details
  async updateArticle(id: string, updateData: Partial<Article>): Promise<void> {
    await this.articleModel.findByIdAndUpdate(id, updateData).exec();
  }

  // Find all articles (rejected, accepted, and pending)
  async findAllArticles(): Promise<Article[]> {
    return this.articleModel.find().exec(); // Fetch all articles
  }
}
