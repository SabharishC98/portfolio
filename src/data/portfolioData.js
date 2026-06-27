export const portfolioData = {
  personal: {
    name: "Sabharish C",
    initials: "SC",
    title: "Full-Stack Developer",
    subtitle: "Full-Stack Developer · LLM Security Researcher · 700+ LeetCode",
    heroLine1: "Building Intelligent",
    heroLine2: "Systems.",
    bio: "I'm Sabharish — a full-stack developer and AI security researcher from Coimbatore. I build production-grade web apps, explore LLM vulnerabilities, and solve complex problems one algorithm at a time. Currently pursuing B.E. in CSE at Dr. NGP Institute of Technology (CGPA: 8.28).",
    email: "sabharishc98@gmail.com",
    phone: "9597673566",
    location: "Coimbatore, Tamil Nadu",
    links: {
      linkedin: "https://www.linkedin.com/in/sabharish-c",
      github: "https://github.com/SabharishC98",
      leetcode: "https://leetcode.com/u/Sabharish_C/",
    },
    resume: "/resume.pdf",
  },

  stats: [
    { value: "700+", label: "LeetCode Problems" },
    { value: "2", label: "Internships" },
    { value: "3", label: "Live Projects" },
  ],

  skills: [
    {
      category: "Languages",
      items: ["Python", "Java", "JavaScript"],
    },
    {
      category: "Frontend",
      items: ["React.js", "Vite", "HTML5", "CSS3"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js"],
    },
    {
      category: "Databases",
      items: ["MySQL", "MongoDB"],
    },
    {
      category: "AI / LLM",
      items: ["LangChain", "AssemblyAI", "Murf AI", "Prompt Engineering", "LLM Security"],
    },
    {
      category: "Tools",
      items: ["Git", "GitHub", "Monaco Editor", "Chrome Extensions (MV3)", "Vosk (Offline ASR)"],
    },
  ],

  projects: [
    {
      id: 1,
      title: "InterviewAI",
      stack: ["React.js", "Node.js", "MongoDB", "Google Gemini", "AssemblyAI", "Murf AI"],
      description:
        "Full-stack AI mock interview platform.\nParses resumes with Gemini, conducts voice interviews via AssemblyAI + Murf AI, and delivers structured AI scoring & feedback reports.",
      link: "https://github.com/SabharishC98/Mock_Interview_AI",
      tags: ["AI", "Full-Stack"],
    },
    {
      id: 2,
      title: "Offline Voice Chess",
      stack: ["Python", "Pygame", "Vosk", "python-chess"],
      description:
        "Fully offline voice-controlled chess app with zero cloud dependency.\nTuned for Indian English accents — accurately recognizes chess notation commands like \"E2 to E4.\"",
      link: "https://github.com/SabharishC98/Voice_Chess_Offline",
      tags: ["Offline AI", "Python"],
    },
    {
      id: 3,
      title: "LeetCode IntelliSense",
      stack: ["Chrome Extension", "Manifest V3", "JavaScript", "Monaco Editor API"],
      description:
        "Open-source Chrome extension injecting real method completions.\nInjects 100+ algorithm snippet templates (BFS, DFS, DP, Backtracking) and keyword suggestions into LeetCode's sandboxed Monaco editor.",
      link: "https://github.com/SabharishC98/leetcode-autocomplete-extension",
      tags: ["Open Source", "DevTools"],
    },
    {
      id: 4,
      title: "LLM Firewall",
      stack: ["React", "Express.js", "FAISS", "DistilBERT", "OpenAI API", "Gemini API"],
      description:
        "Real-time prompt injection defense system intercepting malicious requests before they reach the model.\nUses a 6-layer detection pipeline (canary tokens, regex, heuristics, FAISS similarity, fine-tuned DistilBERT, policy enforcement) supporting OpenAI, Gemini, Anthropic, and Groq.",
      tags: ["Security", "Middleware"],
      inDevelopment: true,
    },
    {
      id: 5,
      title: "ShadowLens",
      stack: ["Python", "LangGraph", "FastAPI", "React", "MongoDB", "DistilBERT"],
      description:
        "Security testing harness for LangGraph multi-agent pipelines detecting prompt injection propagation across agent trust boundaries.\nFeatures a passive Observer architecture for zero-overhead, real-time monitoring of agent-to-agent communications.",
      tags: ["AI Security", "LangGraph"],
      inDevelopment: true,
    },
  ],

  experience: [
    {
      role: "LLM Security & Cloud Engineer",
      company: "Centillion Labs",
      period: "Sep 2025 – Oct 2025",
      location: "Bengaluru, Karnataka",
      points: [
        "LLM jailbreaking research: adversarial prompt injection & manipulation targeting production LLMs",
        "Evaluated AI safety mitigations; identified failure modes under manipulated prompts",
        "Designed prompt engineering methodologies to strengthen guardrails",
        "Built AI-powered web features with Python + LLM APIs for real-time decision-making",
      ],
    },
    {
      role: "AI & ML Intern",
      company: "Gateway Software Solutions",
      period: "Jun 2025",
      location: "Coimbatore, Tamil Nadu",
      points: [
        "Built real-time crop suitability model using DeepSeek + Mistral API",
        "Processed soil, weather, and crop yield data for agricultural decision-making",
      ],
    },
  ],

  research: [
    {
      title: "LLM Jailbreaking & Prompt Injection",
      year: "2025",
      org: "Centillion Labs, Bengaluru",
      summary:
        "Investigated jailbreak attack patterns and adversarial prompt injection in production LLMs. Analyzed safety gaps and proposed mitigation strategies.",
      tags: ["AI Security", "NLP", "LLM"],
    },
    {
      title: "Hospital-Scale Autonomous Logistics & Thermal Delivery",
      year: "2024–Present",
      org: "Field Research @ KMCH, Coimbatore (Ottonomy)",
      summary:
        "Mapped full hospital logistics flow; proposed temperature-controlled autonomous robot deployment with optimized indoor navigation routes.",
      tags: ["Robotics", "Logistics", "AI"],
    },
  ],

  achievements: [
    { rank: "1st", event: "Coder's Arena", org: "Bannari Amman Institute of Technology", date: "Nov 2024" },
    { rank: "1st", event: "Glitch Hunt (Debugging)", org: "Bannari Amman Institute of Technology", date: "Nov 2024" },
    { rank: "1st", event: "Hack Quest", org: "Suguna College of Engineering", date: "Oct 2024" },
    { rank: "1st", event: "Pixel Pursuit", org: "PSG iTech", date: "2024" },
    { rank: "2nd", event: "Find Boo Boo", org: "SKCET", date: "Mar 2024" },
  ],

  certifications: [
    { name: "Cloud Computing", issuer: "NPTEL (IIT Kharagpur)" },
    { name: "Introduction to IoT", issuer: "NPTEL (IIT Kharagpur)" },
  ],
};
