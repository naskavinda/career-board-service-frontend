export interface UpdatePostRequest {
  title: string;
  content: string;
  imageNames: string[];
  status: string;
  moderatorComment?: string;
}
