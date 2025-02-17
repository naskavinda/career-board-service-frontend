import { postImage } from './post-image.model';

export interface UpdatePostRequest {
  postId: string;
  userId: number;
  title: string;
  content: string;
  images: postImage[];
  status: string;
  moderatorComment?: string;
}
