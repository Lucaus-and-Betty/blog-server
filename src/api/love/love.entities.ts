import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity({ name: 'love_list' })
export class LoveList {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'publish_time' })
  publishTime: string;

  @Column({ name: 'done' })
  done: boolean;
}
