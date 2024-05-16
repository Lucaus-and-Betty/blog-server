export interface ProjectListItem {
  title: string;
  personalList: PersonalListItem[];
}

export interface PersonalListItem {
  id: number;
  title: string;
  link: string;
}
