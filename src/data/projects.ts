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
      "Fabrica Fetish is a sophisticated full-stack eCommerce platform built with modern technologies. It features a complete product catalog, shopping cart functionality, secure payment integration, and an admin dashboard for inventory management. The platform supports user authentication, order tracking, and personalized recommendations.\n\n## 🚀 Project Overview\n\nFabrica Fetish delivers a seamless shopping experience with robust backend infrastructure. The platform handles complex inventory synchronization, processes secure payments through Stripe, and provides real-time order updates.\n\n## 🛠️ Technical Implementation\n\n### Core Features\n\n- Complete product catalog with filtering and search\n- Shopping cart with persistent storage\n- Secure checkout with Stripe integration\n- User authentication and profile management\n- Order tracking and history\n- Admin dashboard for inventory management\n- Real-time stock updates\n- Responsive design for all devices\n\n### Technology Stack\n\n- **Frontend**: Next.js with TypeScript and Tailwind CSS\n- **Backend**: Node.js with Express\n- **Database**: MongoDB for flexible data storage\n- **Payments**: Stripe API for secure transactions\n- **Authentication**: NextAuth.js for session management\n\n## 🎯 Key Challenges\n\n### Real-Time Inventory Synchronization\n\nImplemented WebSocket connections to keep inventory counts synchronized across multiple concurrent users, preventing overselling of limited-stock items.\n\n### Image Optimization\n\nUsed Next.js Image component with lazy loading and responsive sizing to ensure fast page loads while maintaining high-quality product images.\n\n### Concurrent Order Handling\n\nDeveloped a queue-based system to handle high-volume order processing without race conditions, ensuring data integrity.\n\n### Payment Security\n\nIntegrated Stripe with server-side validation, webhook verification, and PCI DSS compliance measures to protect sensitive payment data.\n\n## 🔮 Future Enhancements\n\n- Machine learning-based product recommendations\n- Multi-language support for global reach\n- Advanced analytics dashboard for sellers\n- Mobile app with React Native\n- Subscription-based inventory alerts\n- AI-powered search and categorization",
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
      "BikeHub is a peer-to-peer bike rental platform that connects bike owners with renters in their area. The platform features location-based search, real-time availability, secure booking, in-app messaging, and integrated payment processing. Users can browse bikes, check reviews, and book rentals seamlessly.\n\n## 🚀 Project Overview\n\nBikeHub revolutionizes the bike rental experience by creating a trusted marketplace where owners can list their bikes and renters can find the perfect ride. The platform handles everything from search and booking to payments and reviews.\n\n## 🛠️ Technical Implementation\n\n### Core Features\n\n- Location-based bike search with map integration\n- Real-time availability calendar\n- Secure booking and payment processing\n- In-app messaging between owners and renters\n- Two-way review system\n- User profiles and verification\n- Responsive design for mobile and desktop\n- Push notifications for booking updates\n\n### Technology Stack\n\n- **Frontend**: React with TypeScript and Tailwind CSS\n- **Backend**: Node.js with Express\n- **Database**: PostgreSQL for reliable data storage\n- **Maps**: Google Maps API for location services\n- **Real-time**: Socket.io for instant messaging\n- **Auth**: JWT-based authentication\n\n## 🎯 Key Challenges\n\n### Real-Time Location Tracking\n\nImplemented efficient geospatial queries using PostGIS to filter bikes by distance and availability in real-time.\n\n### Availability Management\n\nBuilt a sophisticated booking system that prevents double-booking while allowing flexible rental periods.\n\n### Payment Splitting\n\nDeveloped a secure payment distribution system that automatically splits payments between platform and bike owners.\n\n### Trust & Safety\n\nCreated a comprehensive review system with verification processes to ensure user trust and platform reliability.\n\n## 🔮 Future Enhancements\n\n- Insurance integration for added protection\n- Advanced analytics dashboard for owners\n- Subscription plans for frequent renters\n- Mobile app development with React Native\n- Integration with popular travel platforms\n- AI-powered price optimization",
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
      "TaskFlow is a collaborative task management application that helps teams organize and track their work efficiently. It features board creation, drag-and-drop tasks, real-time collaboration, team communication, and progress tracking. The platform supports multiple workspaces and team roles with granular permissions.\n\n## 🚀 Project Overview\n\nTaskFlow empowers teams to work together seamlessly with an intuitive kanban-style interface. Teams can create boards, add tasks, assign members, and track progress across multiple workspaces with role-based access control.\n\n## 🛠️ Technical Implementation\n\n### Core Features\n\n- Create unlimited boards and projects\n- Drag-and-drop task management\n- Real-time collaboration across team members\n- Team communication and commenting\n- Progress tracking with burndown charts\n- Multiple workspace support\n- Role-based permissions (Admin, Editor, Viewer)\n- File attachments and rich text descriptions\n- Activity timeline and notifications\n\n### Technology Stack\n\n- **Frontend**: React with TypeScript and Framer Motion\n- **Backend**: Firebase for real-time data sync\n- **Database**: Firestore for scalable storage\n- **Styling**: Tailwind CSS\n- **State Management**: React Context and custom hooks\n- **Auth**: Firebase Authentication\n\n## 🎯 Key Challenges\n\n### Real-Time Data Synchronization\n\nLeveraged Firebase's real-time capabilities to ensure all team members see updates instantly, with offline support and conflict resolution.\n\n### Collaborative Editing Conflicts\n\nImplemented operational transformation to handle concurrent edits, preventing data conflicts when multiple users modify tasks simultaneously.\n\n### Performance with Large Datasets\n\nOptimized Firestore queries with indexing and pagination to maintain smooth performance even with thousands of tasks.\n\n### Permission Hierarchies\n\nDesigned a flexible permission system that supports granular access control at workspace, board, and task levels.\n\n## 🔮 Future Enhancements\n\n- Time tracking integration\n- Automated workflow templates\n- Advanced reporting and analytics\n- Slack and Microsoft Teams integration\n- AI-powered task prioritization\n- Gantt chart and timeline views",
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
