const mockData = {
  tasks: [
    {
      Name: 'Test Task 1',
      Color: 'red',
      Id: '0',
    },
    {
      Name: 'another test',
      Color: 'red',
      Id: '1',
    },
    {
      Name: 'the final test',
      Color: 'red',
      Id: '2',
    },
  ],
  columns: [
    {
      Id: '0',
      Title: 'Philosophy',
      Tasks: [0, 2],
    },
    {
      Id: '1',
      Title: 'Math',
      Tasks: [1],
    },
  ],
  columnOrder: [1, 2],
};
export default mockData;
