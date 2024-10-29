import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { New } from './news.entities';

@Module({
  imports: [TypeOrmModule.forFeature([New])],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule {}
