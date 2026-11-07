// Per-application CV values. The public CV (`npm run cv` → public/cv.pdf, deployed) always
// renders the defaults: the real title, the location alone, and the summary, bullets and skills
// from profile.ts. A copy for one application reads src/data/cv.local.json, which is gitignored
// (this repo is public) and only under CV_LOCAL=1 (`npm run apply`), so a tailored copy never
// lands in public/. The letter header reads the same values so the pair agrees. The build-cv
// skill (.claude/skills/build-cv) writes this file through its cv-builder agent.
//
// Example cv.local.json:
// {
//   "headline": "Senior iOS Engineer",
//   "destination": "Oslo",
//   "permit": "skilled-worker permit",
//   "availableFrom": "March 2027",
//   "summary": "One paragraph for this application, level sentence included.",
//   "bullets": { "2025 - now": ["First bullet, the ad's core.", "Second."] },
//   "skills": [{ "area": "Mobile architecture", "skills": ["Swift", "WKWebView"] }],
//   "projectCount": 2
// }

import { profile, statements } from './profile';

export interface CvSkillRow {
  area: string;
  skills: string[];
}

export interface CvInput {
  /**
   * The header title. Matches the level of the posting ("Senior iOS Engineer" for a senior
   * role) so the first words a screener reads are the ones they searched for. The experience
   * section keeps the real title, and `levelNote` says the level is a choice. Unset: the
   * real title from profile.ts.
   */
  headline?: string;
  /**
   * Where the move goes, the employer's city or country. Unset (the public CV): no relocation
   * text at all, the header prints the location only (the user's call, 2026-11-07). Never ranks
   * countries.
   */
  destination?: string;
  /**
   * The permit route, printed as "on a <permit>" — e.g. "skilled-worker permit". Names the
   * route so the reader knows the candidate knows the employer's part; it never says who pays.
   */
  permit?: string;
  /** Earliest start, e.g. "March 2027". Unset: nothing is printed — never invent a date. */
  availableFrom?: string;
  /** One sentence in the summary explaining a headline below the real title. Used only when `headline` is set and `summary` is not. */
  levelNote: string;
  /**
   * The whole summary paragraph for one application. Unset: summaryLead, the level note and
   * summaryBody from profile.ts. When set it carries its own level sentence if the headline
   * sits below the real title.
   */
  summary?: string;
  /**
   * Bullets per job, keyed by the job's `period` in profile.ts ("2025 - now"). A listed job
   * prints these bullets in this order; every other job keeps its profile.ts bullets.
   */
  bullets?: Record<string, string[]>;
  /** The whole Skills section, rows in order. Unset: the `statements` groups from profile.ts. */
  skills?: CvSkillRow[];
  /** How many Selected work items to print; 0 hides the section. Unset: 4, the two-page norm. */
  projectCount?: number;
}

export const cvDefaults: CvInput = {
  levelNote: 'Staff is the current title; applying for hands-on senior work by choice.',
};

// import.meta.glob resolves the gitignored file at build time and yields {} when it is absent.
const localFiles = import.meta.glob<Partial<CvInput>>('./cv.local.json', { eager: true, import: 'default' });

/** The values for this render: defaults for the public CV, the local file under CV_LOCAL=1. */
export function loadCvInput(): CvInput {
  // process.env, not import.meta.env: only PUBLIC_* shell vars reach import.meta.env.
  if (!process.env.CV_LOCAL) return cvDefaults;
  return { ...cvDefaults, ...(localFiles['./cv.local.json'] ?? {}) };
}

export const cvHeadline = (cv: CvInput) => cv.headline ?? `${profile.role} · ${profile.tagline}`;

// "Relocating to Oslo on a skilled-worker permit"; nothing when no destination is set.
const article = (noun: string) => (/^[aeiou]/i.test(noun) ? 'an' : 'a');
const move = (cv: CvInput) => cv.destination && `Relocating to ${cv.destination}${cv.permit ? ` on ${article(cv.permit)} ${cv.permit}` : ''}`;
const start = (cv: CvInput) => cv.availableFrom && `available from ${cv.availableFrom}`;

/** Header location line: "Dhaka, Bangladesh" alone by default; with an override, "Dhaka, Bangladesh · Relocating to Oslo on a skilled-worker permit · available from March 2027". */
export const locationLine = (cv: CvInput) => [profile.location, move(cv), start(cv)].filter(Boolean).join(' · ');

/**
 * The level note, only when the headline is overridden: it is the one fact the header does not
 * carry. The move itself is stated once, in the header line, never repeated in the summary.
 */
export const levelNote = (cv: CvInput) => (cv.headline ? cv.levelNote : '');

/** The summary paragraph: the override as written, else lead + level note + body from profile.ts. */
export const cvSummary = (cv: CvInput) =>
  cv.summary ?? [profile.summaryLead, levelNote(cv), profile.summaryBody].filter(Boolean).join(' ');

/** A job's bullets: the override for its period, else the profile.ts bullets. */
export const cvBullets = (cv: CvInput, job: { period: string; bullets: readonly string[] }) =>
  cv.bullets?.[job.period] ?? job.bullets;

/** The Skills rows: the override in its order, else the site's skill groups. */
export const cvSkills = (cv: CvInput): CvSkillRow[] =>
  cv.skills ?? statements.map((s) => ({ area: s.area, skills: [...s.skills] }));

/** How many Selected work items to print. */
export const cvProjectCount = (cv: CvInput) => cv.projectCount ?? 4;
