export interface Column {
  id: string;
  title: string;
  cards: string[];
}
export interface Columns {
  [key: string]: Column;
}
