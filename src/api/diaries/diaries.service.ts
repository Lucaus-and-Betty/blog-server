import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diary } from './diaries.entities';

@Injectable()
export class DiariesService {
  constructor(
    @InjectRepository(Diary)
    private readonly diaries: Repository<Diary>
  ) {}

  getPageDiaies = async (page: number, pageSize: number) => {
    try {
      // 按时间倒序
      const total = await this.diaries.count();
      const isOver = total <= (page - 1) * pageSize + pageSize;
      const data = await this.diaries
        .createQueryBuilder('diary')
        .skip((page - 1) * pageSize)
        .take(pageSize)
        .orderBy('diary.time', 'DESC')
        .getMany();
      return {
        isOver,
        data
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
