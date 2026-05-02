import {
  useQuery,
  useMutation,
  useQueryClient,
  type QueryClient,
} from '@tanstack/react-query';
import { postService } from '@/services/post.service';
import type { Post, UpdatePostData } from '@/lib/types';
import { queryKeys } from '@/lib/query-keys';
import { toast } from 'sonner';

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

async function invalidateAllPostLists(queryClient: QueryClient) {
  await queryClient.invalidateQueries({ queryKey: queryKeys.posts.root });
}

/**
 * @param scope `public` = published-only (blog / marketing). `admin` = all posts (dashboard).
 */
export function usePosts(scope: 'public' | 'admin' = 'public') {
  const isAdmin = scope === 'admin';

  return useQuery({
    queryKey: isAdmin ? queryKeys.posts.admin : queryKeys.posts.public,
    queryFn: () =>
      isAdmin ? postService.getPostsAdmin() : postService.getPosts(),
    staleTime: isAdmin ? 30 * 1000 : 60 * 1000,
  });
}

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postService.createPost,
    onSuccess: async () => {
      await invalidateAllPostLists(queryClient);
      toast.success('Post created successfully!');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to create post'));
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePostData }) =>
      postService.updatePost(id, data),
    onSuccess: async () => {
      await invalidateAllPostLists(queryClient);
      toast.success('Post updated successfully!');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to update post'));
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postService.deletePost,
    onMutate: async (postId: string) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.posts.root });

      const prevPublic = queryClient.getQueryData<Post[]>(
        queryKeys.posts.public,
      );
      const prevAdmin = queryClient.getQueryData<Post[]>(queryKeys.posts.admin);

      queryClient.setQueryData<Post[]>(queryKeys.posts.public, (old) =>
        old ? old.filter((p) => p.id !== postId) : [],
      );
      queryClient.setQueryData<Post[]>(queryKeys.posts.admin, (old) =>
        old ? old.filter((p) => p.id !== postId) : [],
      );

      return { prevPublic, prevAdmin };
    },
    onError: (error: unknown, _postId, ctx) => {
      if (ctx?.prevPublic !== undefined) {
        queryClient.setQueryData(queryKeys.posts.public, ctx.prevPublic);
      }
      if (ctx?.prevAdmin !== undefined) {
        queryClient.setQueryData(queryKeys.posts.admin, ctx.prevAdmin);
      }
      toast.error(getErrorMessage(error, 'Failed to delete post'));
    },
    onSuccess: async () => {
      toast.success('Post deleted successfully!');
    },
    onSettled: async () => {
      await invalidateAllPostLists(queryClient);
    },
  });
};
