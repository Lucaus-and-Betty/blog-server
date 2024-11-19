import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { New } from './news.entities';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(New)
    private readonly news: Repository<New>
  ) {}

  async findAll() {
    try {
      // 找到show为true的，并且按时间倒序排序
      const news = await this.news.find({ where: { show: true }, order: { time: 'DESC' } });
      return news;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
