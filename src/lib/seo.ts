// SEO Configuration and Utilities
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://samiul.vercel.app";
export const siteName = "Mohammad Al Samiul | Full-Stack Software Engineer";
export const siteDescription =
  "Portfolio of Mohammad Al Samiul - Full-Stack Software Engineer specializing in web development, React, Next.js, Node.js, and modern technologies.";

export const defaultKeywords = [
  "Mohammad Al Samiul",
  "Al Samiul",
  "Full-Stack Developer",
  "Full Stack Engineer",
  "Software Engineer",
  "React Developer",
  "Next.js Developer",
  "Node.js Developer",
  "Web Developer",
  "JavaScript Developer",
  "TypeScript Developer",
  "Frontend Developer",
  "Backend Developer",
  "Portfolio",
  "Web Development",
];

export const profileImage =
  "https://res.cloudinary.com/dt9bjjzrd/image/upload/v1777565997/samiul_bvwuq9.jpg";

export const socialLinks = {
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  email: "mailto:samiul@example.com",
};

export function generateCanonicalUrl(path: string = ""): string {
  return `${siteUrl}${path}`;
}

export function generateOpenGraphImage(
  title: string,
  description: string,
  image: string = profileImage
) {
  return {
    url: image,
    width: 1200,
    height: 630,
    alt: title,
    type: "image/jpeg" as const,
  };
}

export const robotsConfig = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large" as const,
    "max-snippet": -1,
  },
};

export const twitterConfig = {
  card: "summary_large_image" as const,
  creator: "@samiul",
  site: "@samiul",
};
