import { Injectable } from '@nestjs/common';
import { LabelType } from './labels.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Labels } from './labels.entities';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Labels)
    private readonly labels: Repository<Labels>
  ) {}
  async getAllLabel(): Promise<LabelType[] | null> {
    try {
      const res = await this.labels.find({ order: { createTime: 'DESC' } });
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
