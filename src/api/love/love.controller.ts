import { Controller, Get, Post, Body } from '@nestjs/common';
import { LoveService } from './love.service';
import { generateUUID } from 'src/utils/generateUUID';
import { LoveListType } from './love.interface';
import * as dayjs from 'dayjs';

@Controller('love')
export class LoveController {
  constructor(private readonly loveService: LoveService) {}

  @Get('get-all-love-list')
  async getAll() {
    const loveList = await this.loveService.findAll();
    if (loveList) {
      return {
        message: 'success',
        data: loveList.data
      };
    } else {
      return {
        message: 'error',
        data: null
      };
    }
  }

  @Post('add-love-list')
  async addProject(@Body() body: { title: string; done: boolean }) {
    const { title, done } = body;
    const news: LoveListType = {
      id: generateUUID(),
      title,
      done,
      publishTime: dayjs().format('YYYY-MM-DD')
    };
    const res = await this.loveService.addProject(news);
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
