export interface Task {
  Name: string;
  Color: string;
  Id: string;
}
export interface Tasks {
  [key: string]: Task;
}
export interface TaskPlaceHolder {
  clientHeight: number;
  clientWidth: number;
  clientY: number;
  clientX: number;
}
