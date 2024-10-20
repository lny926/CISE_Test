import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';
import { Article, ArticleSchema } from './articles/schemas/article.schema';

// Add Admin and Analyst-related imports
import { AdminController } from './admin/admin.controller'; // Admin controller
import { AdminService } from './admin/admin.service'; // Admin service
import { Admin, AdminSchema } from './admin/schemas/admin.schema'; // Admin schema

import { AnalystController } from './analyst/analyst.controller'; // Analyst controller
import { AnalystService } from './analyst/analyst.service'; // Analyst service
import { Analyst, AnalystSchema } from './analyst/schemas/analyst.schema'; // Analyst schema

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, { dbName: 'SPEED' }), // MongoDB connection
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema }, // Register Article Schema
      { name: Admin.name, schema: AdminSchema }, // Register Admin Schema
      { name: Analyst.name, schema: AnalystSchema }, // Register Analyst Schema
    ]),
    UsersModule, // Existing Users module
  ],
  controllers: [ArticlesController, AdminController, AnalystController], // Register Articles, Admin, and Analyst Controllers
  providers: [ArticlesService, AdminService, AnalystService], // Register Articles, Admin, and Analyst Services
})
export class AppModule {}
