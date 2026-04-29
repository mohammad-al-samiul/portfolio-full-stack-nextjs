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

export const projects: Project[] = [
  {
    id: "1",
    slug: "fabrica-fetish",
    title: "Fabrica Fetish",
    shortDescription:
      "Full-stack eCommerce platform with advanced inventory management",
    fullDescription:
      "Fabrica Fetish is a sophisticated full-stack eCommerce platform built with modern technologies. It features a complete product catalog, shopping cart functionality, secure payment integration, and an admin dashboard for inventory management. The platform supports user authentication, order tracking, and personalized recommendations.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop",
    techStack: ["Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    liveLink: "https://fabrica-fetish.vercel.app",
    githubLink: "https://github.com/yourusername/fabrica-fetish",
    challenges: [
      "Implementing real-time inventory synchronization",
      "Optimizing image delivery for product catalog",
      "Handling concurrent orders without race conditions",
      "Integrating Stripe payment gateway securely",
    ],
    futureImprovements: [
      "Machine learning-based product recommendations",
      "Multi-language support",
      "Advanced analytics dashboard",
      "Mobile app integration",
    ],
    featured: true,
    category: "Fullstack",
  },
  {
    id: "2",
    slug: "bikehub",
    title: "BikeHub",
    shortDescription:
      "Bike rental platform connecting users with local bike owners",
    fullDescription:
      "BikeHub is a peer-to-peer bike rental platform that connects bike owners with renters in their area. The platform features location-based search, real-time availability, secure booking, in-app messaging, and integrated payment processing. Users can browse bikes, check reviews, and book rentals seamlessly.",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
    techStack: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Google Maps API",
      "Socket.io",
    ],
    liveLink: "https://bikehub-app.vercel.app",
    githubLink: "https://github.com/yourusername/bikehub",
    challenges: [
      "Real-time location tracking and filtering",
      "Complex availability management system",
      "Payment splitting between platform and owners",
      "Building reliable rating and review system",
    ],
    futureImprovements: [
      "Insurance integration",
      "Advanced analytics for owners",
      "Subscription plans",
      "Mobile app development",
    ],
    category: "Fullstack",
  },
  {
    id: "3",
    slug: "taskflow",
    title: "TaskFlow",
    shortDescription:
      "Collaborative task management with real-time synchronization",
    fullDescription:
      "TaskFlow is a collaborative task management application that helps teams organize and track their work efficiently. It features board creation, drag-and-drop tasks, real-time collaboration, team communication, and progress tracking. The platform supports multiple workspaces and team roles with granular permissions.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
    techStack: [
      "React",
      "TypeScript",
      "Firebase",
      "Tailwind CSS",
      "Framer Motion",
    ],
    liveLink: "https://taskflow-app.vercel.app",
    githubLink: "https://github.com/yourusername/taskflow",
    challenges: [
      "Real-time data synchronization across clients",
      "Conflict resolution in collaborative editing",
      "Optimizing performance with large datasets",
      "Managing complex permission hierarchies",
    ],
    futureImprovements: [
      "Time tracking integration",
      "Automated workflow templates",
      "Advanced reporting and analytics",
      "Slack and Teams integration",
    ],
    category: "Frontend",
  },
];
