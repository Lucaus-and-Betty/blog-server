import { Injectable } from '@nestjs/common';
import { LabelType } from './labels.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Labels } from './labels.entities';
import generateUUID from 'src/utils/generateUUID';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Labels)
    private readonly labels: Repository<Labels>
  ) {}
  async getAllLabel(): Promise<LabelType[] | null> {
    try {
      const res = await this.labels.find();
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addLabel(label: LabelType): Promise<LabelType | null> {
    const newLabel = new Labels();
    newLabel.id = generateUUID();
    newLabel.title = label.title;
    try {
      // 先检查是否已经存在
      const repeated = await this.labels.find({ where: { title: label.title } });
      if (repeated.length > 0) {
        return null;
      }
      const res = await this.labels.save(newLabel);
      return res;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
