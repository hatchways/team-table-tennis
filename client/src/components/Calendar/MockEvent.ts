export interface IUserSchedule {
  title: string;
  start: Date;
  end: Date;
  resource?: string;
}

const mockData1: IUserSchedule = {
  title: 'Math',
  start: new Date(2021, 7, 1),
  end: new Date(2021, 7, 1),
  resource: 'red',
};
const mockData2: IUserSchedule = {
  title: 'Science',
  start: new Date(2021, 7, 7),
  end: new Date(2021, 7, 7),
  resource: 'blue',
};
const mockData3: IUserSchedule = {
  title: 'Social',
  start: new Date(2021, 7, 15),
  end: new Date(2021, 7, 15),
  resource: 'orange',
};
const mockData4: IUserSchedule = {
  title: 'Computer',
  start: new Date(2021, 7, 20),
  end: new Date(2021, 7, 20),
  resource: 'white',
};
const mockData5: IUserSchedule = {
  title: 'Math Exam',
  start: new Date(2021, 7, 16),
  end: new Date(2021, 7, 16),
  resource: 'black',
};

const mockDatas: IUserSchedule[] = [mockData1, mockData2, mockData3, mockData4, mockData5];
export { mockDatas };
