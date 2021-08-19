export interface Column {
  _id: string;
  title: string;
  cards: string[];
}
export interface Columns {
  [key: string]: Column;
}
