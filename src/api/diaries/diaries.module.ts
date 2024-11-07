import { Module } from '@nestjs/common';
import { DiariesController } from './diaries.controller';
import { DiariesService } from './diaries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diary } from './diaries.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Diary])],
  controllers: [DiariesController],
  providers: [DiariesService]
})
export class DiariesModule {}
