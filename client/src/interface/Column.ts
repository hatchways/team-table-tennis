export interface Column {
  Id: string;
  Title: string;
  Tasks: string[];
}
export interface Columns {
  [key: string]: Column;
}
