import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Labels } from '../labels/labels.entities';
import { Articles } from './articles.entities';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
@Module({
  imports: [TypeOrmModule.forFeature([Labels, Articles])],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule {}
