export interface User {
  email: string;
  username: string;
  boards: string[];
  _id: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
