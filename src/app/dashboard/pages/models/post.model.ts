export interface Post {
  postId: number;
  title: string;
  content: string;
  createdAt: string;
  username: string;
  status: "DRAFT" | "PUBLISHED";
  images: {
    imageId: number;
    imageName: string;
  }[]
}
