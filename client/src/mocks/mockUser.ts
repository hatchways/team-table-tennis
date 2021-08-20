import { User } from '../interface/User';

const mockLoggedInUser: User = {
  email: 'mockLoggedInUser@gmail.com',
  _id: '0',
  boards: [],
};

const mockOtherUser1: User = {
  email: 'mockTestUser1@gmail.com',
  _id: '2',
  boards: [],
};
const mockOtherUser2: User = {
  email: 'mockTestUser2@gmail.com',
  _id: '2',
  boards: [],
};
const mockOtherUser3: User = {
  email: 'mockTestUser3@gmail.com',
  _id: '3',
  boards: [],
};

const mockOtherUsers: User[] = [mockOtherUser1, mockOtherUser2, mockOtherUser3];

export { mockLoggedInUser, mockOtherUsers };
