import type { ComponentType } from 'react';

export type Project = {
  slug: string;
  iconComponent: ComponentType;
  title: string;
  category: 'core' | 'midcore' | 'casual';
  type: string;
  tag: string;
  stack: string[];
  url: string | null;
  github: string | null;
  desc: string;
  deepDive: {
    quickPitch: {
      summary: string;
      role: string;
      tools: string[];
      liveUrl: string | null;
      githubUrl: string | null;
    };
    problem: {
      goal: string;
      userIssue: string;
    };
    process: {
      decisions: { title: string; detail: string }[];
      challenge: string;
      snippet: string;
    };
    solution: {
      description: string;
      mediaAlt: string;
      media?: string;
    };
    results: {
      impact: string;
      learnings: string;
      nextTime: string;
    };
  };
};
