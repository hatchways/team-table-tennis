export interface Column {
  _id: string;
  title: string;
  tasks: string[];
}
export interface Columns {
  [key: string]: Column;
}
