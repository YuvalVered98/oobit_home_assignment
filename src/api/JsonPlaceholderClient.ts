import { BaseApiClient } from './BaseApiClient';
import type { Post, Comment, CreatePostResponse, UpdatePostResponse } from './types';

export class JsonPlaceholderClient extends BaseApiClient {
  constructor() {
    super("https://jsonplaceholder.typicode.com");
  }

  async createPost(data: Omit<Post, 'id'>): Promise<CreatePostResponse> {
    const response = await this.post("/posts", data);
    return response.data as CreatePostResponse;
  }

  async getPost(id: number): Promise<Post> {
    const response = await this.get(`/posts/${id}`);
    return response.data as Post;
  }

  async updatePost(id: number, data: Partial<Post>): Promise<UpdatePostResponse> {
    const response = await this.put(`/posts/${id}`, data);
    return response.data as UpdatePostResponse;
  }

  async deletePost(id: number): Promise<void> {
    await this.delete(`/posts/${id}`);
  }

  async createComment(data: Omit<Comment, 'id'>): Promise<Comment> {
    const response = await this.post("/comments", data);
    return response.data as Comment;
  }

  async getComments(postId: number): Promise<Comment[]> {
    const response = await this.get(`/posts/${postId}/comments`);
    return response.data as Comment[];
  }
}
