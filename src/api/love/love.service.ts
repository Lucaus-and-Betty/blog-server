import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoveList } from './love.entities';

@Injectable()
export class LoveService {
  constructor(
    @InjectRepository(LoveList)
    private readonly loveList: Repository<LoveList>
  ) {}

  async findAll() {
    const news = await this.loveList.find({ order: { publishTime: 'ASC' } });
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
}
