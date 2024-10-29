import { Controller, Get, Post, Body } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewItemTpye } from './news.interface';
import { generateUUID } from 'src/utils/generateUUID';
import * as dayjs from 'dayjs';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('all-show')
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

  @Post('add')
  async addProject(@Body() body: { des: string; link: string; show: boolean; time: string }) {
    const id = generateUUID();
    const news: NewItemTpye = {
      id,
      des: body.des,
      link: body.link,
      show: body.show,
      time: dayjs().format('YYYY-MM-DD HH:mm:ss')
    };
    const res = await this.newsService.addNew(news);
    if (res) {
      return {
        message: 'success',
        data: body
      };
    } else {
      return {
        message: 'error',
        data: null
      };
    }
  }
}
