export interface Card {
  title: string;
  _id: string;
  description: string;
  cardDetails: CardDetails;
}
export interface CardDetails {
  color: string;
  tags: string[];
  deadLine: Date;
  attatchment: string;
  comment: string;
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
