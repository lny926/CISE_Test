import { Controller, Post, Get, Body } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './schemas/article.schema';

@Controller('api')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // Existing POST route for user to submit articles
  @Post('articles')
  async createArticle(@Body() article: Article) {
    try {
      const newArticle = await this.articlesService.create(article);
      return { success: true, article: newArticle };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // New GET route for admin to fetch all articles
  @Get('articles')
  async getAllArticles() {
    try {
      const articles = await this.articlesService.findAll();
      return { success: true, articles };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
