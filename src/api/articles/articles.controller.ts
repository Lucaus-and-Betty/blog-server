import { Body, Controller, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleInfoType } from './articles.interface';
import generateUUID from 'src/utils/generateUUID';
import * as dayjs from 'dayjs';
import mdParse from 'src/utils/mdParse';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('get-all-article-info')
  async getArticleInfoById(@Body() body: { page: number; pageSize: number }) {
    const { page, pageSize } = body;
    if (page === 0) {
      return {
        message: 'success',
        data: []
      };
    }
    const res = await this.articlesService.getAllArticleInfo(page, pageSize);
    if (res) {
      return {
        message: 'success',
        data: res
      };
    } else {
      return {
        message: 'error',
        data: null
      };
    }
  }

  @Post('get-article-content-by-id')
  async getArticleContentById(@Body() body: { id: string }) {
    const { id } = body;
    const res = await this.articlesService.getArticleContentById(id);
    if (res) {
      const parseMdRes = await mdParse(res[0].content);
      res[0].content = parseMdRes;
      return {
        message: 'success',
        data: res[0]
      };
    } else {
      return {
        message: 'error',
        data: null
      };
    }
  }

  @Post('get-article-info-by-label')
  async getArticleInfoByLabel(@Body() body: { labelId: string; page: number; pageSize: number }) {
    const { labelId, page, pageSize } = body;
    if (page === 0) {
      return {
        message: 'success',
        data: []
      };
    }
    const res = await this.articlesService.getArticleInfoByLabelId(labelId, page, pageSize);
    if (res) {
      return {
        message: 'success',
        data: res
      };
    } else {
      return {
        message: 'error',
        data: null
      };
    }
  }

  @Post('add-articles')
  async addArticles(
    @Body()
    body: {
      title: string;
      content: string;
      des: string;
      labels: string[];
      cover: string;
    }
  ) {
    const { title, content, labels, cover, des } = body;
    const article: ArticleInfoType = {
      id: generateUUID(),
      title,
      publishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      readCount: 0,
      content,
      cover,
      labels,
      des
    };
    const res = await this.articlesService.addArticles(article);
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
