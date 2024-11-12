import { Module } from '@nestjs/common';
import { ProjectsController } from './api/projects/projects.controller';
import { ProjectsService } from './api/projects/projects.service';
import { NewsModule } from './api/news/news.module';
import { DB_CONFIG } from 'src/db.config';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from './api/upload/upload.module';
import { LabelsModule } from './api/labels/labels.module';
import { ArticlesModule } from './api/articles/articles.module';
import { DiariesModule } from './api/diaries/diaries.module';
import { NovelsModule } from './api/novels/novels.module';
import { LoveModule } from './api/love/love.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../', 'public/upload'),
      serveRoot: '/static'
    }),
    NewsModule,
    DiariesModule,
    UploadModule,
    LabelsModule,
    ArticlesModule,
    NovelsModule,
    LoveModule,
    TypeOrmModule.forRoot(DB_CONFIG)
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class AppModule {}
