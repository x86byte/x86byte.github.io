export interface BlogPost {
  id: string;
  title: string;
  category: "malware-dev" | "reverse-engineering" | "kernel-hacking" | "obfuscation";
  date: string;
  readTime: string;
  excerpt: string;
  content: string; // Markdown / HTML text for full article
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  author: string;
}

export interface ResearchProject {
  id: string;
  name: string;
  description: string;
  category: "hypervisors" | "obfuscation" | "debuggers" | "kernel" | "rootkits";
  githubStars?: number;
  tags: string[];
  status: "active" | "archived" | "wip";
  codeSnippet: string;
  snippetLanguage: string;
}

export interface CrackmeChallenge {
  id: string;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Insane";
  points: number;
  description: string;
  hints: string[];
  hexDump: string;
  expectedFlag: string;
  successMessage: string;
}

export interface ObfuscationRule {
  id: string;
  name: string;
  description: string;
  example: string;
}
