import { Controller, Get, Post, Body } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { LabelType } from './labels.interface';
import { generateUUID } from 'src/utils/generateUUID';

@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Get('all')
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

  @Post('add')
  async addLabel(@Body() body: { title: string }) {
    const id = generateUUID();
    const label: LabelType = {
      id,
      title: body.title
    };
    const res = await this.labelsService.addLabel(label);
    if (res) {
      return {
        message: 'success',
        data: body
      };
    } else {
      return {
        message: 'error',
        data: null
      };
    }
  }
}
