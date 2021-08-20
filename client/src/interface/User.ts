export interface User {
  email: string;
  boards: string[];
  _id: string;
  isDemo: boolean;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
