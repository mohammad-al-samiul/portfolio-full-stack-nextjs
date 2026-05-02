/** Shape expected by `ProjectDetail` (maps DB / showcase fields). */
export type Project = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
  challenges: string[];
  futureImprovements: string[];
  featured?: boolean;
  category: "Frontend" | "Backend" | "Fullstack";
};
