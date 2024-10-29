import { Body, Controller, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticleInfoType } from './articles.interface';
import generateUUID from 'src/utils/generateUUID';
import * as dayjs from 'dayjs';
import mdParse from 'src/utils/mdParse';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('get-article-info-by-id')
  async getArticleInfoById(@Body() body: { id: string }) {
    const { id } = body;
    const res = await this.articlesService.getArticleInfoById(id);
    if (res) {
      const parseMdRes = await mdParse(res[0].content);
      res[0].content = parseMdRes;
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
      labels: string[];
      cover: string;
    }
  ) {
    const { title, content, labels, cover } = body;
    const article: ArticleInfoType = {
      id: generateUUID(),
      title,
      publishTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updateTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      readCount: 0,
      content,
      cover,
      labels
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
