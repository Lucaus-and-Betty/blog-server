import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './projects.entities';
import { ProjectListItem } from './projects.interface';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly project: Repository<Project>
  ) {}

  async findAll() {
    const res = await this.project.find();
    if (res) {
      const lucausProject: ProjectListItem = {
        title: "Lucaus's project",
        personalList: []
      };
      const bettyProject: ProjectListItem = {
        title: "Betty's project",
        personalList: []
      };
      const ourProject: ProjectListItem = {
        title: 'Our project',
        personalList: []
      };
      res.forEach(item => {
        if (item.blow === 'Lucaus') {
          lucausProject.personalList.push({
            id: item.id,
            title: item.title,
            link: item.link
          });
        } else if (item.blow === 'Betty') {
          bettyProject.personalList.push({
            id: item.id,
            title: item.title,
            link: item.link
          });
        } else {
          ourProject.personalList.push({
            id: item.id,
            title: item.title,
            link: item.link
          });
        }
      });
      // 要是为空就不放进数组
      return [
        lucausProject.personalList.length > 0 ? lucausProject : null,
        bettyProject.personalList.length > 0 ? bettyProject : null,
        ourProject.personalList.length > 0 ? ourProject : null
      ];
    } else {
      return null;
    }
  }
}
