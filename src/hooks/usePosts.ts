import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postService } from '@/services/post.service';
import { Post, CreatePostData, UpdatePostData } from '@/lib/types';
import { toast } from 'sonner';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: postService.getPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePost = (slug: string) => {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => postService.getPostBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePostById = (id: string) => {
  return useQuery({
    queryKey: ['post', 'id', id],
    queryFn: () => postService.getPostById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postService.createPost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post created successfully!');
      return data;
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to create post');
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostData }) =>
      postService.updatePost(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', data.slug] });
      toast.success('Post updated successfully!');
      return data;
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to update post');
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postService.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'Failed to delete post');
    },
  });
};