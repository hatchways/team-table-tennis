export interface Board {
  _id: string;
  title: string;
  columns: string[];
}
export interface Boards {
  [key: string]: Board;
}
