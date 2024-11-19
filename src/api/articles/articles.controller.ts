import { Body, Controller, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import mdParse from 'src/utils/mdParse';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('get-page-article-info')
  async getArticleInfoById(@Body() body: { page: number; pageSize: number }) {
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

  @Post('get-page-article-info-by-label')
  async getArticleInfoByLabel(@Body() body: { labelId: string; page: number; pageSize: number }) {
    const { labelId, page, pageSize } = body;
    if (page === 0) {
      return {
        message: 'success',
        data: {
          isOver: false,
          data: []
        }
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
}
