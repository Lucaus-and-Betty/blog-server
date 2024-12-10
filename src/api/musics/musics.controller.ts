import { Body, Controller, Get, Post } from '@nestjs/common';
import { MusicsService } from './musics.service';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) {}

  @Get('get-all-musics')
  async findAll() {
    const mp3s = await this.musicsService.findAll();

    if (!mp3s) {
      return {
        message: 'error',
        data: null
      };
    }

    return {
      message: 'success',
      data: {
        mp3s,
        count: mp3s.length
      }
    };
  }

  @Post('get-music-info')
  async getMusicInfo(@Body() body: { name: string }) {
    const { name } = body;
    const res = await this.musicsService.getMusicInfo(name);

    if (!res) {
      return {
        message: 'error',
        data: null
      };
    }

    return {
      message: 'success',
      data: res
    };
  }
}
