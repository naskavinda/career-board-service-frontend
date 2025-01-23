export interface CreatePostRequest {
    title: string;
    content: string;
    userId: number;
    imageNames: string[];
    status: "DRAFT" | "PUBLISHED";
}