import { Controller, Get } from '@nestjs/common';
import { LoveService } from './love.service';

@Controller('love')
export class LoveController {
  constructor(private readonly loveService: LoveService) {}

  @Get('get-all-love-list')
  async getAll() {
    const loveList = await this.loveService.findAll();
    if (loveList) {
      return {
        message: 'success',
        data: loveList.data
      };
    } else {
      return {
        message: 'error',
        data: null
      };
    }
  }
}
