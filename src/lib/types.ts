export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string | null;
  category: string;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  techStack: string[];
  coverImage?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Form types
export interface CreatePostData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  coverImage?: string | null;
  tags: string[];
  published: boolean;
}

export type UpdatePostData = Partial<CreatePostData>;

export interface CreateProjectData {
  title: string;
  slug: string;
  description: string;
  content: string;
  techStack: string[];
  coverImage?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  published: boolean;
}

export type UpdateProjectData = Partial<
  Omit<CreateProjectData, "slug" | "title">
> & {
  title?: string;
  slug?: string;
};