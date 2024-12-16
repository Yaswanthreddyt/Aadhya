export interface Quote {
  text: string;
  author: string;
  role?: string;
}

export const ADHD_QUOTES: Quote[] = [
  {
    text: "ADHD is not a deficit of attention, but a challenge of regulating it. You have a Ferrari brain with bicycle brakes.",
    author: "Dr. Edward Hallowell",
    role: "ADHD Expert & Author"
  },
  {
    text: "Your ADHD brain is not your enemy. It's simply a different operating system that needs its own unique set of tools to thrive.",
    author: "Dr. Ned Hallowell",
    role: "Psychiatrist & ADHD Specialist"
  },
  {
    text: "Different doesn't mean deficient. Your brain is wired uniquely, and that's your superpower.",
    author: "Jessica McCabe",
    role: "Creator of 'How to ADHD'"
  }
];
