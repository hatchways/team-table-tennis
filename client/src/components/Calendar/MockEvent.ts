export interface IUserSchedule {
  title: string;
  start: Date;
  end: Date;
  resources: 'InComplete' | 'Completed';
}

const mockData1: IUserSchedule = {
  title: 'Math',
  start: new Date(2021, 7, 1),
  end: new Date(2021, 7, 1),
  resources: 'Completed',
};
const mockData2: IUserSchedule = {
  title: 'Science',
  start: new Date(2021, 7, 7),
  end: new Date(2021, 7, 7),
  resources: 'InComplete',
};
const mockData3: IUserSchedule = {
  title: 'Social',
  start: new Date(2021, 7, 15),
  end: new Date(2021, 7, 15),
  resources: 'Completed',
};
const mockData4: IUserSchedule = {
  title: 'Computer',
  start: new Date(2021, 7, 20),
  end: new Date(2021, 7, 20),
  resources: 'InComplete',
};
const mockData5: IUserSchedule = {
  title: 'Math Exam',
  start: new Date(2021, 7, 16),
  end: new Date(2021, 7, 16),
  resources: 'InComplete',
};

const mockDatas: IUserSchedule[] = [mockData1, mockData2, mockData3, mockData4, mockData5];
export { mockDatas };
