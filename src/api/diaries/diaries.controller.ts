import { Controller, Post, Body } from '@nestjs/common';
import { DiariesService } from './diaries.service';
import * as fs from 'fs';

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
        const imgs = JSON.parse(item.imgs);
        if (JSON.parse(item.imgs).length > 0) {
          item.imgs = imgs.map((img: string, index: number) => {
            return (imgs[index] = '/static/' + img);
          });
        } else {
          item.imgs = JSON.parse(item.imgs);
        }
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

  @Post('add')
  async addProject(@Body() body: { content: string; imgs: string[] }) {
    const { content, imgs } = body;
    let fileNotExist = false;
    // 检查数组里的文件是否有文件不存在
    imgs.forEach((item: string) => {
      console.log(fs.existsSync(process.cwd() + `/public/upload/${item}`));
      // 检查 /public/uploaded 中是否有这个文件
      if (!fs.existsSync(process.cwd() + `/public/upload/${item}`)) {
        fileNotExist = true;
      }
    });
    if (fileNotExist) {
      return {
        message: 'file not exist',
        data: null
      };
    }
    const res = await this.newsService.addDiary(content, JSON.stringify(imgs));
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
