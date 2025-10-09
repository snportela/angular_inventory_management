import {User} from './user';

export interface UserList {
  totalItems: number,
  totalPages: number,
  users: User[],
  currentPage: number
}
