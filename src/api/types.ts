export interface RegisterResponse {
    id?: number;
    token?: string;
    error?: string;
  }

  export interface LoginResponse {
    token?: string;
    error?: string;
  }
  
  export interface UpdateUserResponse {
    name?: string;
    job?: string;
    updatedAt?: string;
  }

  export interface GetUserResponse {
    data: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      avatar: string;
    };
    support: {
      url: string;
      text: string;
    };
  }
  
export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
  };
  
  export type CreatePostRequest = {
    userId: number;
    title: string;
    body: string;
  };
  
  export type CreatePostResponse = Post;
  
  export type UpdatePostRequest = Partial<Omit<Post, 'id'>>;
  export type UpdatePostResponse = Post;
  
  export type Comment = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  };
  
  export type CreateCommentRequest = {
    postId: number;
    name: string;
    email: string;
    body: string;
  };
  
  export type CreateCommentResponse = Comment;
  export interface DeleteUserResponse {}
