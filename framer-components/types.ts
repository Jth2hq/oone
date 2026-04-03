export type LogCategory = "ideas" | "artifacts" | "sensations";
export type LogEntry = {
  cat: LogCategory;
  rel?: string;
  title: string;
  sub?: string;
  place?: string;
  t: number;
  id?: string;
};

export type DwFact = { label: string; value: string };

export type CvRole = {
  title: string;
  date: string;
  org: string;
  desc?: string;
};

export type ServiceItem = {
  name: string;
  description: string;
  rate?: string;
  example?: string;
};

export type ProjectFact = [string, string];

export type ProjectData = {
  id: string;
  title: string;
  tag: string;
  desc: string;
  facts: ProjectFact[];
  eyebrow?: string;
  heroImage?: string;
  extraImages?: string[];
};

export type FeedBlock = {
  title?: string;
  content_html?: string;
  class?: string;
  source?: { url: string; title?: string };
  image?: { display?: { url: string } };
  _channel?: string;
};
