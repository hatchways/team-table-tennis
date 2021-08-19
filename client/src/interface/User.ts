export interface User {
  email: string;
  username: string;
  boards: string[];
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
