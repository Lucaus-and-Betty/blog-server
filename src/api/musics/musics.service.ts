import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as nodeId3 from 'node-id3';
import * as musicMetadata from 'music-metadata';
import * as dayjs from 'dayjs';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

@Injectable()
export class MusicsService {
  constructor() {}

  async findAll() {
    // 读取 /Users/betty/my-projects/blog-musics 下的所有文件名
    const files = fs.readdirSync(process.env.NODE_ENV_MUSIC as string);
    // 筛除所有 非 .mp3 的文件名
    const mp3s = files.filter(file => file.endsWith('.mp3'));

    return mp3s;
  }

  async getMusicInfo(name: string) {
    // 读取该 mp3 文件解析数据
    const mp3 = nodeId3.read(`${process.env.NODE_ENV_MUSIC}/${name}`);

    const mm = await musicMetadata.loadMusicMetadata();

    const info = await mm.parseFile(`${process.env.NODE_ENV_MUSIC}/${name}`);
    return {
      title: mp3.title,
      duration: dayjs(info.format.duration && info.format.duration * 1000).format('mm:ss'),
      cover: mp3.image,
      lyrics: info.common.lyrics
    };
  }
}
