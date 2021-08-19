import { Tasks } from '../../interface/Task';
import { Columns } from '../../interface/Column';

const tasks: Tasks = {
  'task-1': { name: 'Essay on the enviroment', date: '', color: '#5ACD76', id: 'task-1', isNew: false },
  'task-2': { name: 'another test', date: '', color: '#FF5D48', id: 'task-2', isNew: false },
  'task-3': { name: 'the final test', date: 'March 10', color: '#EDAB1D', id: 'task-3', isNew: false },
};
const columns: Columns = {
  'col-1': {
    _id: 'col-1',
    title: 'Philosophy',
    tasks: ['task-1', 'task-2'],
  },
  'col-2': {
    _id: 'col-2',
    title: 'Math',
    tasks: ['task-3'],
  },
};

const columnOrder: string[] = ['col-1', 'col-2'];

const mockData = {
  tasks: tasks,
  columns: columns,
  columnOrder: columnOrder,
};
export default mockData;
