export interface NewItemTpye {
  id: string;
  des: string;
  link: string;
  show: boolean;
  time: string;
}

export interface NovelChapterType {
  id: string;
  novelId: string;
  content: string;
  time: string;
  order: number;
  previousId: string;
  name: string;
}
