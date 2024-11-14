export interface ProjectListItem {
  title: string;
  personalList: PersonalListItem[];
}

export interface PersonalListItem {
  id: string;
  title: string;
  link: string;
}
