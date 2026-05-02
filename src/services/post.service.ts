import api from '@/lib/axios';
import { Post, CreatePostData, UpdatePostData } from '@/lib/types';

export const postService = {
  /** Published posts only — blog / marketing pages */
  getPosts: async (): Promise<Post[]> => {
    const response = await api.get('/posts');
    return response.data;
  },

  /** All posts — requires auth cookie */
  getPostsAdmin: async (): Promise<Post[]> => {
    const response = await api.get('/posts?admin=1');
    return response.data;
  },

  createPost: async (data: CreatePostData): Promise<Post> => {
    const response = await api.post('/posts', data);
    return response.data;
  },

  updatePost: async (id: string, data: UpdatePostData): Promise<Post> => {
    const response = await api.patch(`/posts/${id}`, data);
    return response.data;
  },

  deletePost: async (id: string): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },
};
