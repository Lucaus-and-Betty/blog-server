import { Module } from '@nestjs/common';
import { LoveController } from './love.controller';
import { LoveService } from './love.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoveList } from './love.entities';

@Module({
  imports: [TypeOrmModule.forFeature([LoveList])],
  controllers: [LoveController],
  providers: [LoveService]
})
export class LoveModule {}
