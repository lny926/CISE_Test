import { Controller, Post, Get, Body, Param, Patch } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './schemas/article.schema';

@Controller('api')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('articles')
  async createArticle(@Body() article: Article) {
    try {
      const newArticle = await this.articlesService.create(article);
      return { success: true, article: newArticle };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Get only non-rejected articles
  @Get('articles')
  async getAllArticles() {
    try {
      const articles = await this.articlesService.findAll();
      return { success: true, articles };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Get rejected articles
  @Get('articles/rejected')
  async getRejectedArticles() {
    try {
      const rejectedArticles = await this.articlesService.findRejected();
      return { success: true, articles: rejectedArticles };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // Reject an article
  @Patch('articles/:id/reject')
  async rejectArticle(@Param('id') id: string) {
    try {
      await this.articlesService.rejectArticle(id);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
