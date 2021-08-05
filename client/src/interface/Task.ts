export interface Task {
  name: string;
  date: string;
  color: string;
  id: string;
  isNew: boolean;
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
export interface TaskModel {
  task: Task;
  isNew: boolean;
}
