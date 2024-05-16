import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectListItem } from './projects.interface';

@Controller('projets')
export class ProjectsController {
  constructor(private readonly projetsService: ProjectsService) {}

  @Get('all')
  findAll() {
    return {
      message: 'success',
      data: this.projetsService.findAll()
    };
  }

  @Post('add')
  addProject(@Body() body: ProjectListItem) {
    this.projetsService.addProject(body);
    return {
      message: 'success',
      data: body
    };
  }
}
