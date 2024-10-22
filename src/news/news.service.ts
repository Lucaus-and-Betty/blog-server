import { Injectable } from '@nestjs/common';
import { NewItemTpye } from './news.interface';

@Injectable()
export class NewsService {
  private readonly news: NewItemTpye[] = [
    {
      id: '1',
      title: 'test-1',
      description:
        '假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1假新闻1',
      link: 'https://baidu.com'
    },
    {
      id: '2',
      title: 'test-2',
      description: '假新闻2',
      link: '/home/Lucaus'
    },
    {
      id: '3',
      title: 'test-3',
      description: '假新闻3',
      link: '/home/Betty'
    },
    {
      id: '4',
      title: 'test-4',
      description: '假新闻4',
      link: '/home/Betty'
    }
  ];

  findAll() {
    return this.news;
  }

  addProject(project: NewItemTpye) {
    this.news.push(project);
  }
}
