import { Controller, Get } from '@nestjs/common';
import { LabelsService } from './labels.service';

@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Get('get-all-labels')
  async getAllLabel() {
    const res = await this.labelsService.getAllLabel();
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
