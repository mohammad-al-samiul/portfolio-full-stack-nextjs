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

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  replies: Reply[];
  createdAt: Date;
}

export interface Reply {
  id: string;
  content: string;
  contactMessageId: string;
  createdAt: Date;
}

export interface Newsletter {
  id: string;
  email: string;
  createdAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
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

export interface UpdatePostData extends Partial<CreatePostData> {}

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

export interface UpdateProjectData extends Partial<CreateProjectData> {
  id: string;
}