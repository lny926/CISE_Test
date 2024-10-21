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

import { ModeratorController } from './moderator/moderator.controller'; // Moderator controller
import { ModeratorService } from './moderator/moderator.service'; // Moderator service
// eslint-disable-next-line prettier/prettier
import { Moderator, ModeratorSchema } from './moderator/schemas/moderator.schema'; // Moderator schema

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI, { dbName: 'SPEED' }), // MongoDB connection
    MongooseModule.forFeature([
      { name: Article.name, schema: ArticleSchema }, // Register Article Schema
      { name: Admin.name, schema: AdminSchema }, // Register Admin Schema
      { name: Analyst.name, schema: AnalystSchema }, // Register Analyst Schema
      { name: Moderator.name, schema: ModeratorSchema },
    ]),
    UsersModule, // Existing Users module
  ],
  // eslint-disable-next-line prettier/prettier
  controllers: [ArticlesController, AdminController, AnalystController, ModeratorController], // Register Articles, Admin, and Analyst Controllers
  providers: [ArticlesService, AdminService, AnalystService, ModeratorService], // Register Articles, Admin, and Analyst Services
})
export class AppModule {}
