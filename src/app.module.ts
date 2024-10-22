import { Module } from '@nestjs/common';
import { ProjectsController } from './projects/projects.controller';
import { ProjectsService } from './projects/projects.service';
import { NewsController } from './news/news.controller';
import { NewsService } from './news/news.service';

@Module({
  imports: [],
  controllers: [ProjectsController, NewsController],
  providers: [ProjectsService, NewsService]
})
export class AppModule {}
