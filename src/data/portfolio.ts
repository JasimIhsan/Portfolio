export type Experience = {
   id: number;
   role: string;
   company: string;
   duration: string;
   description: string;
   skills: string[];
   accent: "lime" | "white" | "violet" | "ink";
};

export type Project = {
   title: string;
   description: string;
   category: string;
   metric: string;
   accent: string;
   surface: string;
   tech: string[];
   github?: string;
   liveDemo: boolean;
   live: string;
};

export const experiences: Experience[] = [
   {
      id: 1,
      role: "Founding Engineer",
      company: "Ciltriq Technologies",
      duration: "2025 - Present",
      description:
         "Leading the development of scalable web and mobile applications using the MERN stack and Flutter. Building production-ready systems with clean architecture, API integrations, authentication flows, real-time features, and performance-focused user experiences.",
      skills: ["React", "Next.js", "Node.js", "MongoDB", "Flutter"],
      accent: "lime",
   },
   {
      id: 2,
      role: "Technical Mentor",
      company: "ExpertX Coding Academy",
      duration: "2025 - 2026",
      description:
         "Mentoring aspiring developers in MERN stack and Flutter development through live coding sessions, project-based learning, debugging practices, and real-world application architecture.",
      skills: ["MERN Stack", "Flutter", "TypeScript", "System Design"],
      accent: "white",
   },
   {
      id: 3,
      role: "Founding Engineer",
      company: "Onboard",
      duration: "2025 - Present",
      description:
         "Developing modern digital products with a strong focus on scalable backend systems, intuitive frontend experiences, and cross-platform mobile applications. Collaborating on product architecture and API development.",
      skills: ["React", "Next.js", "Node.js", "PostgreSQL", "Docker"],
      accent: "violet",
   },
   {
      id: 4,
      role: "Full Stack Developer",
      company: "Freelance",
      duration: "July 2024 - Present",
      description:
         "Building custom web and mobile applications for clients using the MERN stack and Flutter. Delivering responsive frontends, scalable backend APIs, authentication systems, and admin dashboards.",
      skills: ["React", "Node.js", "MongoDB", "Flutter", "Firebase"],
      accent: "ink",
   },
];

export const projects: Project[] = [
   {
      title: "Onboard Careers",
      description: "A dedicated recruitment portal connecting aspiring professionals with premier opportunities in the maritime and cruise industries.",
      category: "Recruitment portal",
      metric: "Career marketplace",
      accent: "#b9ff19",
      surface: "#f6f7ee",
      tech: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
      github: "https://github.com/muhammedsirajudeen/core-backend",
      liveDemo: true,
      live: "https://www.onboardcareers.in",
   },
   {
      title: "NearHirable Platform",
      description: "An assessment tool that evaluates coding fundamentals and provides actionable feedback on candidate readiness.",
      category: "Assessment engine",
      metric: "Skill readiness",
      accent: "#7b3ff2",
      surface: "#f0edff",
      tech: ["Next.js", "MongoDB", "Tailwind CSS", "TypeScript"],
      github: "https://github.com/muhammedsirajudeen/near-hireable-platform-engine",
      liveDemo: true,
      live: "https://forge.onboardcareers.in",
   },
   {
      title: "BrewCode JS Compiler",
      description: "A web application that compiles JavaScript code into a visual representation using modern queue management.",
      category: "Compiler tool",
      metric: "Visual execution",
      accent: "#090909",
      surface: "#eff2ee",
      tech: ["Next.js", "Docker", "BullMQ", "Redis"],
      github: "https://github.com/JasimIhsan/Brew-Code-JS-Compiler",
      liveDemo: true,
      live: "https://brewcode.jasimihsan.in",
   },
   {
      title: "MentorsHub",
      description: "A platform for booking mentorship sessions featuring chat, video calls, payments, and a complete admin panel.",
      category: "Mentorship platform",
      metric: "Sessions + chat",
      accent: "#20c997",
      surface: "#edf8f3",
      tech: ["React.js", "Node.js", "Socket.io", "MongoDB"],
      github: "https://github.com/JasimIhsan/MentorsHub",
      liveDemo: true,
      live: "https://mentors-hub-in.vercel.app",
   },
   {
      title: "Life Partner Again",
      description: "A matrimony platform designed specifically for middle-aged women seeking companionship through verified profiles.",
      category: "Mobile app",
      metric: "Verified profiles",
      accent: "#ff6b6b",
      surface: "#fff0ef",
      tech: ["Flutter", "Dart", "REST API"],
      liveDemo: false,
      live: "#",
   },
   {
      title: "Byteverse E-Commerce",
      description: "A full-stack e-commerce solution built with Node.js and RazorPay integration.",
      category: "Commerce system",
      metric: "Payments + catalog",
      accent: "#f5b700",
      surface: "#fff8df",
      tech: ["Node.js", "MongoDB", "Ejs", "RazorPay"],
      github: "https://github.com/JasimIhsan/Byteverse-E-commerse-website",
      liveDemo: false,
      live: "#",
   },
   {
      title: "User Management System",
      description: "A user management system built with React, TypeScript, and MongoDB.",
      category: "Admin dashboard",
      metric: "Role management",
      accent: "#4c6fff",
      surface: "#edf1ff",
      tech: ["React", "TypeScript", "MongoDB"],
      github: "https://github.com/JasimIhsan/User_Management",
      liveDemo: false,
      live: "#",
   },
];
