import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';
import { Article, ArticleSchema } from './articles/schemas/article.schema';

// Add Admin-related imports
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { Admin, AdminSchema } from './admin/schemas/admin.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, { dbName: 'SPEED' }), // MongoDB connection
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema }, // Register Article Schema
      { name: Admin.name, schema: AdminSchema }, // Register Admin Schema
    ]),
    UsersModule, // Existing Users module
  ],
  controllers: [ArticlesController, AdminController], // Register both Articles and Admin Controllers
  providers: [ArticlesService, AdminService], // Register both Articles and Admin Services
})
export class AppModule {}
