import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleInfoType } from './articles.interface';
import { Articles } from './articles.entities';
import { Labels } from '../labels/labels.entities';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Articles)
    private readonly articlesRepository: Repository<Articles>,
    @InjectRepository(Labels)
    private readonly labelsRepository: Repository<Labels>
  ) {}

  /**
   * @description 通过id获取文章信息
   * @param { string } id
   * @returns { Promise<ArticleInfoType> } 文章信息
   */
  async getArticleInfoById(id: string): Promise<Articles[] | null> {
    try {
      const res = await this.articlesRepository.find({ relations: ['labels'], where: { id } });
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addArticles(article: ArticleInfoType) {
    try {
      const labelsArr = [];
      for (let i = 0; i < article.labels.length; i++) {
        const res = await this.labelsRepository.find({ where: { id: article.labels[i] } });
        if (res.length > 0) {
          labelsArr.push(res[0]);
        }
      }
      console.log(labelsArr);
      const newArticle = new Articles();
      newArticle.id = article.id;
      newArticle.title = article.title;
      newArticle.labels = labelsArr;
      newArticle.content = article.content;
      newArticle.publishTime = article.publishTime;
      newArticle.updateTime = article.updateTime;
      newArticle.readCount = article.readCount;
      newArticle.cover = article.cover;
      const res = await this.articlesRepository.save(newArticle);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
