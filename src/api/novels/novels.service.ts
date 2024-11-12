import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Novles } from './novels.entities';
import { NovelChapter } from './novel-chapter.entities';
import { NovelChapterType } from './novels.interface';

@Injectable()
export class NovelsService {
  constructor(
    @InjectRepository(Novles)
    private readonly novles: Repository<Novles>,
    @InjectRepository(NovelChapter)
    private readonly novelChapters: Repository<NovelChapter>
  ) {}

  async findAllByAuthor(author: string) {
    try {
      const novlesList = await this.novles.find({ where: { author } });
      return novlesList;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getNovelChapterByOrder(id: string, order: number) {
    try {
      const res = await this.novelChapters.find({ where: { novelId: id, order } });
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getOrderById(id: string) {
    try {
      const res = await this.novelChapters.find({ where: { id } });
      return res[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addNovelChapter(novelChapter: NovelChapterType) {
    const newNovelChapter = new NovelChapter();
    newNovelChapter.id = novelChapter.id;
    newNovelChapter.novelId = novelChapter.novelId;
    newNovelChapter.content = novelChapter.content;
    newNovelChapter.time = novelChapter.time;
    newNovelChapter.order = novelChapter.order;
    newNovelChapter.previousId = novelChapter.previousId;
    newNovelChapter.name = novelChapter.name;
    try {
      const res = await this.novelChapters.save(newNovelChapter);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * @description 查看是否已经有章节的上一章 id 和参数一致
   * @param { string } previousId 上一章 id
   */
  async getNovelChapterIdByPreviousId(previousId: string) {
    try {
      const res = await this.novelChapters.find({ where: { previousId } });
      return res[0].id;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getNovelChapterById(id: string) {
    try {
      const res = await this.novelChapters.find({ where: { id } });
      return res[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
