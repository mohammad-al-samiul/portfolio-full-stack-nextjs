/** Central TanStack Query keys — invalidate parent segments to refresh all scopes. */
export const queryKeys = {
  posts: {
    root: ["posts"] as const,
    public: ["posts", "public"] as const,
    admin: ["posts", "admin"] as const,
  },
  projects: {
    root: ["projects"] as const,
    public: ["projects", "public"] as const,
    admin: ["projects", "admin"] as const,
  },
} as const;
