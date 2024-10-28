import { Body, Controller, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('get-article-info-by-id')
  async getArticleInfoById(@Body() id: string) {
    return {
      message: 'success',
      data: await this.articlesService.getArticleInfoById(id)
    };
  }
}
