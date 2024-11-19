import { Controller, Post, Body } from '@nestjs/common';
import { DiariesService } from './diaries.service';

@Controller('diaries')
export class DiariesController {
  constructor(private readonly newsService: DiariesService) {}

  @Post('get-page-diaries')
  async findAll(@Body() body: { page: number; pageSize: number }) {
    const { page, pageSize } = body;
    if (page === 0) {
      return {
        message: 'success',
        data: {
          isOver: false,
          data: []
        }
      };
    }
    const news = await this.newsService.getPageDiaies(page, pageSize);
    if (news) {
      news.data.forEach(item => {
        item.imgs = JSON.parse(item.imgs);
      });
    }
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
