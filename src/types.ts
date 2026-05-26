export interface ContactInfo {
  phone: string;
  email: string;
  website: string;
  location: string;
  homepage: string;
  youtube: string;
  instagram: string;
  threads: string;
}

export interface SkillItem {
  name: string;
  rating: number; // Max 5 stars
  description: string;
}

export interface WorkExperienceItem {
  company: string;
  period: string;
  role: string;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  school: string;
  major: string;
  degree: string;
  period: string;
}

export interface LanguageItem {
  name: string;
  rating: number; // Max 5 stars
  level: string;
}

export interface ProfileData {
  name: string;
  title: string;
  subtitle: string;
  contact: ContactInfo;
  bio: string;
  skills: SkillItem[];
  experience: WorkExperienceItem[];
  education: EducationItem[];
  languages: LanguageItem[];
}

export interface BlockCodeItem {
  id: string;
  label: string;
  category: "control" | "action" | "sensor";
  arduinoCode: string;
  description: string;
}
