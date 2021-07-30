import { Tasks } from '../../interface/Task';
import { Columns } from '../../interface/Column';

const tasks: Tasks = {
  'task-1': { Name: 'Essay on the enviroment', Color: '#5ACD76', Id: 'task-1' },
  'task-2': { Name: 'another test', Color: '#FF5D48', Id: 'task-2' },
  'task-3': { Name: 'the final test', Color: '#EDAB1D', Id: 'task-3' },
};
const columns: Columns = {
  'col-1': {
    Id: 'col-1',
    Title: 'Philosophy',
    Tasks: ['task-1', 'task-2'],
  },
  'col-2': {
    Id: 'col-2',
    Title: 'Math',
    Tasks: ['task-3'],
  },
};

const columnOrder: string[] = ['col-1', 'col-2'];

const mockData = {
  tasks: tasks,
  columns: columns,
  columnOrder: columnOrder,
};
export default mockData;
