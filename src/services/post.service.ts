import api from '@/lib/axios';
import { Post, CreatePostData, UpdatePostData } from '@/lib/types';

export const postService = {
  // Get all posts
  getPosts: async (): Promise<Post[]> => {
    const response = await api.get('/posts');
    return response.data;
  },

  // Get post by slug
  getPostBySlug: async (slug: string): Promise<Post> => {
    const response = await api.get(`/posts/slug/${slug}`);
    return response.data;
  },

  // Get post by ID
  getPostById: async (id: string): Promise<Post> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  // Create post
  createPost: async (data: CreatePostData): Promise<Post> => {
    const response = await api.post('/posts', data);
    return response.data;
  },

  // Update post
  updatePost: async (id: string, data: UpdatePostData): Promise<Post> => {
    const response = await api.patch(`/posts/${id}`, data);
    return response.data;
  },

  // Delete post
  deletePost: async (id: string): Promise<void> => {
    await api.delete(`/posts/${id}`);
  },
};