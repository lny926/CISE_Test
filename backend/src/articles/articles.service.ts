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
    // eslint-disable-next-line prettier/prettier
    return this.articleModel.find({ isAccepted: true, isApproved: {$ne: true} }).exec(); // Fetch only accepted articles
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

  // Approve an article
  async approveArticle(id: string): Promise<void> {
    await this.articleModel.findByIdAndUpdate(id, { isApproved: true }).exec(); // Mark article as approved
  }

  // Find approved articles
  async findApproved(): Promise<Article[]> {
    return this.articleModel.find({ isApproved: true }).exec(); // Find all articles where `isApproved` is true
  }

  // Submit article rate
  async rateArticle(id: string, rating: number): Promise<Article | null> {
    const article = await this.articleModel.findById(id);
    if (!article) {
      return null;
    }
    article.ratings.push(rating);
    await article.save();
    return article;
  }

  // Calculate article rate
  async getAverageRating(id: string): Promise<number | null> {
    const article = await this.articleModel.findById(id);
    if (!article || article.ratings.length === 0) {
      return null;
    }
    const sum = article.ratings.reduce((a, b) => a + b, 0);
    const average = sum / article.ratings.length;
    return average;
  }
}
