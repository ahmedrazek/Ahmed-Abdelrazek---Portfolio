export type Stat = { value: string; label: string };

export type Project = {
  slug: string;
  name: string;
  anonymous: boolean;
  role: string;
  period: string;
  summary: string;
  problem: string;
  built: string[];
  stack: string[];
  liveUrl?: string;
};

export type Capability = {
  title: "Backend" | "Full-stack" | "AI";
  items: string[];
};

export type Role = {
  company: string;
  title: string;
  period: string;
  line: string;
};

export type Offer = { title: string; detail: string };

export type Profile = {
  name: string;
  greeting: string;
  title: string;
  tagline: string;
  photo: string;
  about: string[];
};

export type Contact = {
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  cvPath: string;
};

export type Site = {
  profile: Profile;
  stats: Stat[];
  skills: string[];
  projects: Project[];
  capabilities: Capability[];
  experience: Role[];
  offers: Offer[];
  contact: Contact;
};
