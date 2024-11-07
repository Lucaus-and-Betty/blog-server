import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diary } from './diaries.entities';
import { generateUUID } from 'src/utils/generateUUID';
import * as dayjs from 'dayjs';

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

  addDiary = async (content: string, imgs: string) => {
    try {
      const diary = new Diary();
      diary.id = generateUUID();
      diary.content = content;
      diary.imgs = imgs;
      diary.time = dayjs().format('YYYY-MM-DD HH:mm:ss');
      const res = await this.diaries.save(diary);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}
