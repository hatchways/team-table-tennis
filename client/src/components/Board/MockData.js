const mockData = {
  tasks: [
    {
      Name: 'Test Task 1',
      Color: '#5ACD76',
      Id: '0',
    },
    {
      Name: 'another test',
      Color: '#FF5D48',
      Id: '1',
    },
    {
      Name: 'the final test',
      Color: '#EDAB1D',
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
