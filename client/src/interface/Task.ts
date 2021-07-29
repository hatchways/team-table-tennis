export interface Task {
  Name: string;
  Color: string;
  Id: string;
}
export interface Tasks {
  [key: string]: Task;
}
