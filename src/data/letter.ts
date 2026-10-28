// Cover-letter defaults. The per-application values (company, role, greeting, opening, country)
// come from src/data/letter.local.json, which is gitignored — this repo is public, so a letter
// addressed to a real company must never be committed. The body is built in letter.astro
// from profile.ts; `[TODO …]` markers are gaps that still need a real story or number.

export interface LetterInput {
  company: string;
  role: string;
  greeting: string;
  /** One or two sentences on why this company — written fresh for each application. */
  opening: string;
  /**
   * The employer's country ("Norway", "Germany"…). The location paragraph says "relocate to
   * <country>": a letter goes to one employer, so it names their country and never ranks it
   * against others. The site is where "Norway first, open to the Nordics and Central Europe" lives.
   */
  country: string;
}

export const letterDefaults: LetterInput = {
  company: '[Company]',
  role: 'Senior iOS Engineer',
  greeting: 'Dear Hiring Manager,',
  opening: '',
  country: 'Europe',
};
