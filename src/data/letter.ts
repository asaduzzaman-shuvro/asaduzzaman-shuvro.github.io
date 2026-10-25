// Cover-letter defaults. The per-application values (company, role, greeting, opening) come
// from src/data/letter.local.json, which is gitignored — this repo is public, so a letter
// addressed to a real company must never be committed. The body is built in letter.astro
// from profile.ts; `[TODO …]` markers are gaps that still need a real story or number.

export interface LetterInput {
  company: string;
  role: string;
  greeting: string;
  /** One or two sentences on why this company — written fresh for each application. */
  opening: string;
}

export const letterDefaults: LetterInput = {
  company: '[Company]',
  role: 'Senior iOS Engineer',
  greeting: 'Dear Hiring Manager,',
  opening: '',
};
