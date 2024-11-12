import { Module } from '@nestjs/common';
import { NovlesController } from './novels.controller';
import { NovelsService } from './novels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Novles } from './novels.entities';
import { NovelChapter } from './novel-chapter.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Novles]), TypeOrmModule.forFeature([NovelChapter])],
  controllers: [NovlesController],
  providers: [NovelsService]
})
export class NovelsModule {}
