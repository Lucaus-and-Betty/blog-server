import { Module } from '@nestjs/common';
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
import { ProjectsModule } from './api/projects/projects.module';

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
    ProjectsModule,
    TypeOrmModule.forRoot(DB_CONFIG)
  ]
})
export class AppModule {}
