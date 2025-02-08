import { postImage } from "./post-image.model";

export interface Post {
  postId: number;
  title: string;
  content: string;
  createdAt: string;
  userId: number;
  username: string;
  status: 'DRAFT' | 'PUBLISHED';
  images: postImage[];
}

