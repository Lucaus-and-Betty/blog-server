import { Body, Controller, Post } from '@nestjs/common';
import { NovelsService } from './novels.service';
import { NovelChapterType } from './novels.interface';
import { generateUUID } from 'src/utils/generateUUID';
import * as dayjs from 'dayjs';

@Controller('novels')
export class NovlesController {
  constructor(private readonly novelsService: NovelsService) {}

  @Post('get-all-novels-by-author')
  async findAllByAuthor(@Body() body: { author: string }) {
    const { author } = body;
    const news = await this.novelsService.findAllByAuthor(author);
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

  @Post('get-novel-chapter-by-order')
  async getNovelChapterByOrder(@Body() body: { novelId: string; order: number }) {
    const { novelId, order } = body;
    const novel = await this.novelsService.getNovelChapterByOrder(novelId, order);
    if (novel) {
      return {
        message: 'success',
        data: novel[0]
      };
    } else {
      return {
        message: 'error',
        data: null
      };
    }
  }

  @Post('get-order-by-id')
  async getOrderById(@Body() body: { novelId: string; id: string }) {
    const { id } = body;
    const novel = await this.novelsService.getOrderById(id);
    if (novel) {
      return {
        message: 'success',
        data: novel
      };
    } else {
      return {
        message: 'error',
        data: null
      };
    }
  }

  @Post('add-novel-chapter')
  async addNovelChapter(
    @Body()
    body: {
      novelId: string;
      content: string;
      previousId: string;
      name: string;
    }
  ) {
    const { novelId, content, previousId, name } = body;
    let order = 1;
    if (previousId !== null) {
      // 检查是否已经存在
      const hasPrevious = await this.novelsService.getNovelChapterIdByPreviousId(previousId);
      if (hasPrevious) {
        return {
          message: 'error, already exist',
          data: null
        };
      }
      const previous = await this.novelsService.getOrderById(previousId);
      if (previous) {
        order = previous.order + 1;
      }
    }
    const novelChapter: NovelChapterType = {
      id: generateUUID(),
      time: dayjs().format('YYYY-MM-DD'),
      novelId,
      content,
      order,
      previousId,
      name
    };
    const novel = await this.novelsService.addNovelChapter(novelChapter);
    if (novel) {
      return {
        message: 'success',
        data: novel
      };
    } else {
      return {
        message: 'error',
        data: null
      };
    }
  }

  @Post('get-novel-chapter-by-id')
  async getNovelChapterById(@Body() body: { id: string }) {
    try {
      const { id } = body;
      const res = await this.novelsService.getNovelChapterById(id);
      return {
        message: 'success',
        data: res
      };
    } catch (error) {
      return {
        message: 'error',
        data: null
      };
    }
  }

  @Post('get-novel-chapter-id-by-previous-id')
  async getNovelChapterIdByPreviousId(@Body() body: { previousId: string }) {
    try {
      const { previousId } = body;
      const res = await this.novelsService.getNovelChapterIdByPreviousId(previousId);
      return {
        message: 'success',
        data: res
      };
    } catch (error) {
      return {
        message: 'error',
        data: null
      };
    }
  }
}
