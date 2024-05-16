import { Injectable } from '@nestjs/common';
import { ProjectListItem } from './projects.interface';

@Injectable()
export class ProjectsService {
  private readonly projets: ProjectListItem[] = [
    {
      title: "Lucaus's project",
      personalList: [
        {
          id: 1,
          title: "Lucuas's project123123123123",
          link: 'www.baidu.com'
        },
        {
          id: 2,
          title: "Lucuas's project",
          link: 'www.baidu.com'
        }
      ]
    },
    {
      title: "Betty's project",
      personalList: [
        {
          id: 3,
          title: "Betty's project",
          link: 'www.baidu.com'
        },
        {
          id: 4,
          title: "Betty's project",
          link: 'www.baidu.com'
        }
      ]
    },
    {
      title: 'Our project',
      personalList: [
        {
          id: 5,
          title: 'Our project',
          link: 'www.baidu.com'
        },
        {
          id: 6,
          title: 'Our project',
          link: 'www.baidu.com'
        }
      ]
    }
  ];

  findAll() {
    return this.projets;
  }

  addProject(project: ProjectListItem) {
    this.projets.push(project);
  }
}
