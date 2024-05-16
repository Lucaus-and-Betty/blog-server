import { Module } from '@nestjs/common';
import { ProjectsController } from './projects/projects.controller';
import { ProjectsService } from './projects/projects.service';

@Module({
  imports: [],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class AppModule {}
