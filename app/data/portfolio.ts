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
      role: "Software Development Engineer",
      company: "Ciltriq Technologies",
      duration: "2025 – 2026",
      description: "Developing a full-stack matrimonial platform consisting of a Flutter mobile application, Node.js backend, PostgreSQL database, Redis caching layer, and React admin dashboard.",
      skills: ["Flutter", "Node.js", "Express.js", "TypeScript", "PostgreSQL", "Prisma ORM", "Redis", "AWS S3", "ZegoCloud", "RevenueCat"],
      accent: "lime",
   },
   {
      id: 2,
      role: "Software Development Engineer",
      company: "Onboard",
      duration: "2025 – 2026",
      description: "Developed recruitment and workforce management platforms using Next.js, React.js, TypeScript, Node.js, PostgreSQL, and Prisma ORM in a cross-functional Agile team.",
      skills: ["Next.js", "React.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma ORM", "REST APIs", "RBAC", "Tailwind CSS"],
      accent: "violet",
   },
   {
      id: 3,
      role: "Technical Mentor",
      company: "ExpertX Coding Academy",
      duration: "2025 – 2026",
      description: "Mentored aspiring engineers in modern full-stack development, software architecture, debugging techniques, and agentic workflows.",
      skills: ["MERN Stack", "React.js", "Node.js", "JavaScript", "Software Architecture", "Debugging", "Code Reviews", "Agentic Coding"],
      accent: "white",
   },
   {
      id: 4,
      role: "Full Stack Developer",
      company: "Freelance",
      duration: "July 2024 – Present",
      description: "Building custom web and mobile applications for clients using the MERN stack and Flutter. Delivering responsive frontends, scalable backend APIs, authentication systems, and admin dashboards.",
      skills: ["React", "Node.js", "MongoDB", "Flutter", "Firebase"],
      accent: "ink",
   },
];

export const projects: Project[] = [
   {
      title: "MentorsHub",
      description: "A production-grade mentorship platform built following Clean Architecture principles, enabling 1-on-1 session bookings, mentor discovery, escrow wallet management, and real-time communications.",
      category: "Full-Stack",
      metric: "1-on-1 Sessions & Escrow Wallet",
      accent: "#20c997",
      surface: "#edf8f3",
      tech: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Redis", "Socket.io", "Razorpay"],
      github: "https://github.com/JasimIhsan/MentorsHub",
      liveDemo: true,
      live: "https://mentors-hub-in.vercel.app",
   },
   {
      title: "PDF ChatBot",
      description: "An AI-powered document intelligence system allowing users to upload PDF documents, generate vector embeddings, and conduct contextual Q&A using RAG architecture.",
      category: "AI & Full Stack",
      metric: "Instant Semantic RAG",
      accent: "from-blue-500 to-indigo-600",
      surface: "rgba(59, 130, 246, 0.08)",
      tech: ["Next.js", "TypeScript", "FastAPI", "Python", "Pinecone", "LangChain", "Tailwind CSS"],
      github: "https://github.com/JasimIhsan/pdf-chat-bot",
      liveDemo: true,
      live: "https://pdfchatbot.jasimihsan.in/",
   },
   {
      title: "Life Partner Again",
      description: "A full-stack matrimonial platform designed with verified profiles, geolocation services, subscriptions, and real-time voice and video communication.",
      category: "Mobile",
      metric: "Real-Time Audio/Video & Geo",
      accent: "#ff6b6b",
      surface: "#fff0ef",
      tech: ["Flutter", "Node.js", "PostgreSQL", "Prisma ORM", "Redis", "AWS S3", "ZegoCloud", "RevenueCat"],
      liveDemo: false,
      live: "#",
   },
   {
      title: "Brew Code JS Compiler",
      description: "An online JavaScript compiler and learning platform enabling developers to write, execute, and debug JavaScript directly from the browser with a VS Code-like coding environment.",
      category: "Systems & Cloud",
      metric: "Monaco IDE & Code Execution",
      accent: "#090909",
      surface: "#eff2ee",
      tech: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Monaco Editor"],
      github: "https://github.com/JasimIhsan/Brew-Code-JS-Compiler",
      liveDemo: true,
      live: "https://brewcode.jasimihsan.in",
   },
   {
      title: "Onboard Careers",
      description: "Recruitment and workforce management platform built with Next.js, React.js, TypeScript, Node.js, PostgreSQL, and Prisma ORM, featuring candidate search, filtering, and role-based workflows.",
      category: "Full-Stack",
      metric: "Recruitment & RBAC Engine",
      accent: "#b9ff19",
      surface: "#f6f7ee",
      tech: ["Next.js", "React.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma ORM", "Tailwind CSS"],
      github: "https://github.com/muhammedsirajudeen/core-backend",
      liveDemo: true,
      live: "https://www.onboardcareers.in",
   },
   {
      title: "NearHirable Engine (Forge)",
      description: "An automated diagnostic assessment engine that analyzes developer fundamentals and pinpoints exactly whether a candidate is near-hirable or job-ready, generating customized improvement roadmaps.",
      category: "Systems & Cloud",
      metric: "Skill Readiness & Scoring",
      accent: "#7b3ff2",
      surface: "#f0edff",
      tech: ["Next.js", "MongoDB", "Tailwind CSS", "TypeScript", "Node.js"],
      github: "https://github.com/muhammedsirajudeen/near-hireable-platform-engine",
      liveDemo: true,
      live: "https://forge.onboardcareers.in",
   },
   {
      title: "Byteverse E-Commerce",
      description: "Full-stack e-commerce web platform built with Node.js featuring secure checkout, RazorPay payment integration, dynamic catalog filtering, and order management.",
      category: "E-Commerce",
      metric: "Payments & Order Management",
      accent: "#f5b700",
      surface: "#fff8df",
      tech: ["Node.js", "Express.js", "MongoDB", "EJS", "RazorPay"],
      github: "https://github.com/JasimIhsan/Byteverse-E-commerse-website",
      liveDemo: false,
      live: "#",
   },
];
