import { Controller, Get } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projets')
export class ProjectsController {
  constructor(private readonly projetsService: ProjectsService) {}

  @Get('get-all-projects')
  async findAll() {
    const projects = await this.projetsService.findAll();
    if (projects) {
      return {
        message: 'success',
        data: projects
      };
    } else {
      return {
        message: 'error',
        data: null
      };
    }
  }
}
