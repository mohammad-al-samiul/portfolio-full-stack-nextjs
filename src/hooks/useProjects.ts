import {
  useQuery,
  useMutation,
  useQueryClient,
  type QueryClient,
} from '@tanstack/react-query';
import { projectService } from '@/services/project.service';
import type { Project, CreateProjectData, UpdateProjectData } from '@/lib/types';
import { queryKeys } from '@/lib/query-keys';
import { toast } from 'sonner';

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

async function invalidateAllProjectLists(queryClient: QueryClient) {
  await queryClient.invalidateQueries({ queryKey: queryKeys.projects.root });
}

/**
 * @param scope `public` = published-only (homepage portfolio). `admin` = all projects (dashboard).
 */
export function useProjects(scope: 'public' | 'admin' = 'public') {
  const isAdmin = scope === 'admin';

  return useQuery({
    queryKey: isAdmin ? queryKeys.projects.admin : queryKeys.projects.public,
    queryFn: () =>
      isAdmin ? projectService.getProjectsAdmin() : projectService.getProjects(),
    staleTime: isAdmin ? 30 * 1000 : 60 * 1000,
  });
}

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectService.createProject,
    onSuccess: async () => {
      await invalidateAllProjectLists(queryClient);
      toast.success('Project created successfully!');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to create project'));
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateProjectData;
    }) => projectService.updateProject(id, data),
    onSuccess: async () => {
      await invalidateAllProjectLists(queryClient);
      toast.success('Project updated successfully!');
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, 'Failed to update project'));
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectService.deleteProject,
    onMutate: async (projectId: string) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.projects.root });

      const prevPublic = queryClient.getQueryData<Project[]>(
        queryKeys.projects.public,
      );
      const prevAdmin = queryClient.getQueryData<Project[]>(
        queryKeys.projects.admin,
      );

      queryClient.setQueryData<Project[]>(queryKeys.projects.public, (old) =>
        old ? old.filter((p) => p.id !== projectId) : [],
      );
      queryClient.setQueryData<Project[]>(queryKeys.projects.admin, (old) =>
        old ? old.filter((p) => p.id !== projectId) : [],
      );

      return { prevPublic, prevAdmin };
    },
    onError: (error: unknown, _projectId, ctx) => {
      if (ctx?.prevPublic !== undefined) {
        queryClient.setQueryData(queryKeys.projects.public, ctx.prevPublic);
      }
      if (ctx?.prevAdmin !== undefined) {
        queryClient.setQueryData(queryKeys.projects.admin, ctx.prevAdmin);
      }
      toast.error(getErrorMessage(error, 'Failed to delete project'));
    },
    onSuccess: async () => {
      toast.success('Project deleted successfully!');
    },
    onSettled: async () => {
      await invalidateAllProjectLists(queryClient);
    },
  });
};
