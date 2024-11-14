import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('get-all-show-news')
  async findAll() {
    const news = await this.newsService.findAll();
    if (news) {
      return {
        message: 'success',
        data: news
      };
    } else {
      return {
        message: 'error',
        data: null
      };
    }
  }
}
