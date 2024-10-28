import { Module } from '@nestjs/common';
import { ProjectsController } from './projects/projects.controller';
import { ProjectsService } from './projects/projects.service';
import { NewsController } from './news/news.controller';
import { NewsService } from './news/news.service';
import { ArticlesController } from './articles/articles.controller';
import { ArticlesService } from './articles/articles.service';

@Module({
  imports: [],
  controllers: [ProjectsController, NewsController, ArticlesController],
  providers: [ProjectsService, NewsService, ArticlesService]
})
export class AppModule {}
