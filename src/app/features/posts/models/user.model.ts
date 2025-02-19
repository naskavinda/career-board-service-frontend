import { Post } from "./post.model";

export interface User {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  active: boolean;
  role: string;
  createdAt: string;
  postCount: number;
}
