import { postImage } from "./post-image.model";

export interface Post {
  postId: string;
  title: string;
  content: string;
  createdAt: string;
  userId: number;
  username: string;
  status: 'DRAFT' | 'PUBLISHED';
  images: postImage[];
  moderatorComment: string;
}

