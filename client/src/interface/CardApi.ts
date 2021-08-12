export interface Card {
  name: string;
  date: string;
  color: string;
  id: string;
  isNew: boolean;
}
export interface Cards {
  [key: string]: Card;
}
export interface TaskPlaceHolder {
  clientHeight: number;
  clientWidth: number;
  clientY: number;
  clientX: number;
}
export interface CardModel {
  card: Card;
  isNew: boolean;
}
