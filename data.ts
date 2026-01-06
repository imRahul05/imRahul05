import { Tag } from "lucide-react";

export const DATA = {
  personal: {
    name: "Rahul Kumar",
    title: "Software Engineer",
    location: "Bangalore, Bharat",
    bio: "Software Engineer at Nuvi Technology | SIH 2023 Winner | Building an AI-powered automated medical coding & claims workflow.",
    image: "/rahul-profile.webp",
    profileVideo: "https://res.cloudinary.com/divkfbddw/video/upload/v1767192966/convert_to_3d_i2hi0n.mp4",
    email: "imrahul2516@gmail.com", // Placeholder for UI consistency
    github: "github.com/imRahul05",
    X: "x.com/imrahul165",
    linkedin: "linkedin.com/in/imrahul05",
    resume: "https://acrobat.adobe.com/id/urn:aaid:sc:AP:dac855c6-b1f7-4c61-8457-78ab550f19d0",
    currentlyBuilding: {
      name: "Arthion AI",
      url: "https://arthionai.app/",
      previewImage: "https://res.cloudinary.com/dw8r5ivmx/image/upload/v1767183858/Screenshot_2025-12-31_at_5.54.11_PM_wmhsv3.png"
    }
  },
  skills: [
    "React.js", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Node.js",
    "Vite", "SQL", "NoSQL", "MongoDB", "REST API", "AI Integration", "Cursor", "AntiGravity"
  ],
  education: [
    {
      institution: "Visvesvaraya Technological University",
      degree: "Master of Computer Applications (MCA)",
      period: "2022 — 2024",
      description: "Focus on Software Engineering and AI. Winner of Smart India Hackathon (SIH) 2023.",
      image: "https://upload.wikimedia.org/wikipedia/en/a/a0/Visvesvaraya_Technological_University_logo.png",
      tags: ["Computer Application", "Software Development", "Algorithms", "Data Structures", "OOPs", "DB"]
    }
  ],
  experience: [
    {
      company: "Nuvi Technology",
      role: "Full Stack Developer",
      period: "Sep 2024 - Present",
      description: "Working as a Full Stack Developer, focusing on building scalable web applications and integrating AI solutions to enhance user experience.",
      image: "https://nuviltech.vercel.app/logo11.png"
    },
    {
      company: "Freelance / Personal Projects",
      role: "Software Engineer",
      period: "2024 — Present",
      description: "Developing production-grade full-stack applications. Built diverse tools ranging from AI-assisted dev environments to dynamic streaming platforms. Integrating modern APIs including OpenAI and TMDB.",
      image: "https://cdn.papershift.com/20220808070712/freelancing-work-and-its-statutory-laws-and-regulations-in-the-UK-explained-by-Papershift-min-910x500.jpeg"
    }
  ],
  projects: [
    {
      name: "FinSage AI",
      period: "November 2024 - December 2024",
      description:
        "A better way to manage your finances. Take control of your financial journey with our comprehensive suite of tools.",
      tech: ["React", "Web", "JS", "FireBase"],
      link: "https://finsage-ai.vercel.app/",
      sourceUrl: "https://github.com/imRahul05",
      image: "https://res.cloudinary.com/dw8r5ivmx/image/upload/v1767173443/Screenshot_2025-12-31_at_3.00.33_PM_jfpils.png",
      video: "https://res.cloudinary.com/divkfbddw/video/upload/v1756879926/Screen_Recording_2025-09-03_at_11.40.15_AM_qxxhxn.mov"
    },
    {
      name: "School Management System",
      period: "October 2024 - November 2024",
      description:
        "A comprehensive school management system and website designed to serve various stakeholders including students, parents, teachers, and administrators.",
      tech: ["MERN", "MongoDB", "Express", "React", "Node.js"],
      link: "https://mansarovar-public-school-green.vercel.app/",
      sourceUrl: "https://github.com/imRahul05",
      image: "https://res.cloudinary.com/dw8r5ivmx/image/upload/v1767173536/Screenshot_2025-12-31_at_3.02.07_PM_syjpih.png",
      video: "https://prourls.link/MnBUVO"
    },
    {
      name: "PillPal AI",
      period: "September 2024 - October 2024",
      description:
        "PillPal helps you manage medications, track doses, and stay on top of refills with smart reminders and a simple tracking system.",
      tech: ["React", "Web", "JS"],
      link: "https://pill-pal-ai.vercel.app/",
      sourceUrl: "https://github.com/imRahul05",
      video: "https://res.cloudinary.com/divkfbddw/video/upload/v1756879926/Screen_Recording_2025-09-03_at_11.40.15_AM_qxxhxn.mov"
    },
    {
      name: "Billing and Management App",
      period: "August 2024 - September 2024",
      description:
        "A web app for managing billing and invoicing with role-based authentication. Users can create, view, and manage invoices.",
      tech: ["MERN", "Tailwind", "JWT"],
      tag: "Currently used by client",
      sourceUrl: "https://github.com/imRahul05"
    },
    {
      name: "Movie Stream",
      description:"Built with react and tailwind css, this is a movie streaming web application that allows users to browse, search, and watch movies from a vast collection. It features a sleek and user-friendly interface, making it easy for users to find their favorite films using TMDB Apis and enjoy a seamless streaming experience.",
      tech: ["React", "Tailwind CSS", "TMDB API","VidSrc API"],
      link: "https://sidemo.vercel.app"
    },
    {
      name: "Community Care",
      description:
        "Community Care is a platform that connects volunteers with local community service opportunities. Built with React and Vite, it allows users to find, join, and manage volunteer activities in their area.",
      tag:" Built this in Smart India Hackathon 2023",
      tech: ["Flutter", "Dart","Firebase","Android"],
      link:"https://communitycarev4.web.app"
    },
    {
      name: "SnapDigest",
      description:
        "SnapDigest is an adaptive news reader application that personalizes content based on user location and network conditions. Built with React and Vite, the application delivers relevant news content while optimizing for various network speeds.",
      tech: ["React", "Vite"],
      link: "https://snap-digest.vercel.app/"
    },
    {
      name: "TypeFast - Competitive Typing Speed Game",
      description:
        "A modern, feature-rich typing speed test application built with React, Node.js, and MongoDB. Challenge yourself, compete with friends, and improve your typing skills with real-time feedback and performance tracking.",
      tech: ["React", "Node.js", "MongoDB"],
      link: "https://battle-type.vercel.app/"
    },
    {
      name: "OMS - Order Management System",
      period: "July 2024 - August 2024",
      description:
        "A web app for managing orders with role-based authentication. Users can place orders, staff/admins can manage them via dashboards.",
      tech: ["MERN", "Vite", "Tailwind", "JWT"],
      link: "https://order-management-system-inky-alpha.vercel.app/",
      sourceUrl: "https://github.com/imRahul05"
    },
    {
      name: "Algo-Blockchain",
      description:
        "I built this project to explore how Algorand transactions work end-to-end using a modern web stack. It connects a React + Vite frontend with an Express + MongoDB backend to send and track Algorand TestNet transactions in real time. The goal was to understand blockchain integration, transaction lifecycle, and persistence in a practical, hands-on way.",
      tech: ["React", "Vite", "Express", "MongoDB", "Algorand", "Blockchain"],
      link: "https://algorand-task.vercel.app/"
    },
    {
      name: "Candidate Referral Management System (CRMS)",
      description:
        "A comprehensive web application for managing employee referrals built with React and Vite. This system allows employees to submit candidate referrals and tracks these referrals through the hiring pipeline.",
      tech: ["React", "Vite"],
      link: "https://crms-dash.vercel.app/"
    }

  ]
};