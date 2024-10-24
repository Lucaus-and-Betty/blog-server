import { Controller, Get } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('news')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('all')
  getArticleInfoById() {
    return {
      message: 'success',
      data: this.articlesService.getArticleInfo()
    };
  }
}
