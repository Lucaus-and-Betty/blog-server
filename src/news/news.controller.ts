import { Body, Controller, Get, Post } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewItemTpye } from './news.interface';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('all')
  findAll() {
    return {
      message: 'success',
      data: this.newsService.findAll()
    };
  }

  @Post('add')
  addProject(@Body() body: NewItemTpye) {
    this.newsService.addProject(body);
    return {
      message: 'success',
      data: body
    };
  }
}
