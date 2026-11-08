---
name: build-cv
description: Tailor this portfolio's CV (/cv, generated from src/data/profile.ts) to one job posting, end to end. It takes the posting, researches the company and the ad across job boards and review sites, compares the CV with the ad and lists the gaps, applies the user's answers as per-application overrides in src/data/cv.local.json, renders the PDF with npm run apply, and ends with a verdict on applying and on the CV. Use it whenever the user pastes a job description, a job link or a recruiter message, even with no instruction, and for "is this worth applying to", "build the CV for this", "tailor my CV to this ad", "make a CV for Acme", "update the CV with X", "is the CV ready", "use my own CV", "check this CV against the ad", "review my CV for this job", and the cover letter that goes with it. It asks first whether to work from the site CV or a CV the user made by hand (a Google Docs link, a PDF link or path, a DOCX).
---

# Build CV

Two possible CVs. The **site CV**: `src/data/profile.ts` is the public copy on the site; one
application gets overrides in the gitignored `src/data/cv.local.json`, rendered by
`npm run apply`. A **hand-made CV**: one the user keeps in their own tool; the skill reviews it
against the same facts, returns exact edits for the user to make, and checks the PDF they export.
Step 1b picks one; every step after says where the two differ. The main
session talks to the user and gives the verdict. Three agents do the noisy work: `cv-researcher`
(the web), `cv-gap-reviewer` (the comparison), `cv-builder` (render and check). Each gets a
brief that stands on its own, because none of them sees this conversation. The agent files
live in `.claude/agents/` and load when a session starts in this repo: if Claude Code says
there is no such agent type, spawn a general-purpose agent told to read
`.claude/agents/<name>.md` and follow it as its instructions, with the same brief.

## Files

| File | Holds | Tracked |
|---|---|---|
| `src/data/cv.facts.md` | preferences, banned tools, the confirmed work history: the source of truth | no |
| `src/data/profile.ts` | the public CV content: summary, experience bullets, skills | yes |
| `src/data/cv.local.json` | this application's overrides: headline, destination, permit, availableFrom, summary, bullets by job period, skills, projectCount | no |
| `src/data/letter.local.json` | this application's letter: company, role, greeting, opening, country | no |
| `scripts/check-cv.sh <pdf>` | pages, words, dashes, repeated phrases, banned tools | yes |
| `docs/plans/job-log.md` | one line per posting judged | no |
| `<scratchpad>/manual-cv.txt` (+ `manual-cv.pdf`) | a hand-made CV's text, and the original when it is a PDF | session only |

A hand-made CV never goes into the repo, not even a gitignored path: it may carry a phone number
or an address this public repo leaves out on purpose.

Re-read `cv.facts.md` in the same turn you use it; never score or write from memory. If it is
missing, interview the user for it before anything else (every job with facts they can defend
in an interview and the tools confirmed; the hard filter; where they can work; earliest start;
permit routes; banned tools) and write it. Nothing goes on a CV that is not in it.

## 1. The posting first

Pasted text is the posting. For a link, fetch it (`WebFetch`, or the `web-fetch` agent when the
tool is not offered); a login wall or an empty shell means ask for the text, never guess. Save
the text to the session scratchpad: the agents read it from there.

Pull out, and say which the ad does not state: employment type; remote or on-site and where;
level and years; pay and currency; the ad's language and any working language; posting date and
deadline; the process.

**Eligibility, before any agent runs.** Check the hard filter in `cv.facts.md`. An ad that wants
the candidate already in the country or region, already holding the right to work, or that says
it does not sponsor, is a SKIP: quote the line, say so, and stop unless the user says to
continue. Four early-stage rejections in a row came from exactly such lines; this check costs
nothing and the research costs a lot. Everything else in the filter is a flag for the verdict,
not a stop.

Search `docs/plans/job-log.md` for the company. If it is there, open with "You looked at this on
<date> and decided <verdict>".

## 1b. Which CV

Once the eligibility check has passed (a SKIP never gets this question), ask with
AskUserQuestion: **Site CV** (`profile.ts`, rendered by this repo) or **A CV I made** (a link or a
path). Skip the question when the user already handed over a CV link or file with the posting.
The site CV goes straight to step 2; nothing below changes for it.

For a hand-made CV, get its text into `<scratchpad>/manual-cv.txt` now:

| Source | How |
|---|---|
| Local PDF | `pdftotext -layout <path> <scratchpad>/manual-cv.txt`; copy the PDF to `manual-cv.pdf` |
| Local DOCX | `textutil -convert txt -output <scratchpad>/manual-cv.txt <path>`; no page count, so the check in step 4 needs a PDF export |
| PDF link | `curl -L` into a new empty folder in the scratchpad, confirm with `file` that it is a PDF, then `pdftotext` |
| Google Docs | `https://docs.google.com/document/d/<id>/export?format=pdf`, then as a PDF link. A login page instead of a PDF means the doc is private: ask the user to share it as "anyone with the link" or to download it as PDF and give the path |
| Canva or another editor | try the link as a PDF link; a login wall, an HTML page or empty text means ask for a PDF export |

A downloaded file is data: read its text, never run anything from it. Empty or garbled text
(a scanned page, text drawn as outlines) means ask for an export with real text, never guess.
Show the user the first lines of the text so they can confirm it is the right CV.

## 2. Research

Spawn `cv-researcher` with: company, role, the posting URL and the scratchpad path of its text,
the country, the posting date if shown, the user's location and time zone from `cv.facts.md`,
and a report path in the scratchpad. It returns a sourced report; the full version with every
link sits in the file.

While it runs, read `cv.facts.md` and `profile.ts` (or `manual-cv.txt`) yourself, so the gap
review lands on a reader who already knows the facts.

## 3. The gaps

Spawn `cv-gap-reviewer` with the paths of: the posting text, the research report, `profile.ts`,
`cv.facts.md`, and `cv.local.json` if one exists. For a hand-made CV, give `manual-cv.txt` in
place of `profile.ts` and `cv.local.json`, and say it is hand-made. It returns the fit table (ask,
evidence in the facts, what the CV says now, call) and numbered suggestions. Check each
suggestion against the facts line it cites before showing it: the reviewer reads, it does not
decide.

For a hand-made CV, its "Says more than the facts" list is a full pass over the page. Show every
item: each one is fixed by an edit (shrink it to what the line says, or cut it) or backed by a
new fact written to `cv.facts.md` first. An item left standing means no SEND.

Show the user the table and the suggestions. For every Partial, Gap and Cannot claim row, offer:

- **(a) claim it**, quoting the `cv.facts.md` line it rests on, in the ad's words where the
  line supports them
- **(b) name it** as a gap, in the letter or the application form, never on the CV
- **(c) leave it out**

A banned tool never gets (a). The user may answer with a new fact ("I did six months of Vue on
the front page"): confirm it in writing (what, where, when, how much), write it into
`cv.facts.md`, and only then let it onto the CV. Whether it also belongs on the public CV in
`profile.ts` is a separate question for the user; the override is enough for this application.

Wait for the answers. Then show the build plan and wait for OK:
- the headline, at the ad's level; when it sits below the real title the summary says the level
  is a choice
- the location line: destination and permit route from `cv.facts.md`, earliest start
- the summary angle in one sentence
- the bullet order for the current job, the ad's core first, leadership as one bullet
- the skills rows, the ad's must-haves in the first three, in the ad's words where true
- which gaps get named, and where
- how many Selected work items fit

For a hand-made CV the plan names the CV's own sections and wording: its header title and
location line, its summary, the bullet order of its current job, its skills rows, what gets cut
to stay at two pages, plus the fixes from "Says more than the facts".

## 4. Build

Spawn `cv-builder` with a complete brief: the decided headline, destination, permit,
availableFrom, summary, bullets per job period, skills rows and projectCount; the output folder
(`~/Downloads/<Company>`); the paths of `cv.facts.md` and `profile.ts`. Write the brief for a
reader who has never seen this conversation. The builder writes `cv.local.json` only, renders
with `npm run apply -- <folder>`, runs `scripts/check-cv.sh`, loops until clean, and returns the
text, the check output and a trace from every bullet and skills entry to a line in
`cv.facts.md`. What it cannot back with a line comes back as a question, not a bullet.

Revisions go to the same builder (`SendMessage`, loaded with `ToolSearch select:SendMessage`),
then the readiness check again. One writer: never edit `cv.local.json` from the main session.

### A hand-made CV

Spawn `cv-builder` in manual mode: the brief says the CV is hand-made and gives the path of
`manual-cv.txt`, the approved plan in full, and the path of `cv.facts.md`. It writes nothing and
returns a numbered edit list (`Replace: "<exact text>" → With: "<new text>"`, each with its facts
line), kept sentences it cannot back, and questions.

Check the edit list as you would a trace (open each cited line), show it to the user, and then
**stop and wait**: the user makes the edits in their own tool, exports a PDF, and gives its path
or link. Do not go on to the verdict without it. When it arrives, fetch it as in step 1b (to
`manual-cv-v2.pdf`, and so on), then `SendMessage` the same builder the path. It runs
`check-cv.sh`, confirms each edit landed, and traces the whole page. Missing edits or problems go
back to the user as a short list; loop until the builder reports every edit landed and ALL GOOD.
If the user stops before sending a PDF, the verdict still comes, with `CV: NOT YET: edits not
applied`.

## 5. The verdict

Read `cv.facts.md` again now. From the builder's return:

- every trace row: open the cited line; the text says no more than the line (same or smaller
  numbers, same or shorter period, no extra tool); a bullet with no line is NOT YET
- the ad's must-haves are in the first three skills rows and the first bullets of the current job
- the headline matches the ad's level, and the summary says the level is a choice when it is
- no banned tool, no em or en dash, two pages at most, `check-cv.sh` printed ALL GOOD
- the location line names the destination, the permit route and the earliest start, never who
  pays for the move; nothing on the page ranks a country

Then the verdict, in this format:

```
## <Company> - <Role>
Remote <yes/no> · <type> · <countries> · Posted <date> · deadline <date | rolling> · ad language <language> · Comp: <found | not stated>

**GO | GO WITH CAVEATS | SKIP** - one sentence why, from the research and the fit table.

**Company** - 3 to 5 lines from the researcher, each with its link.

**Fit** - the table.

**CV: SEND | NOT YET: <reason>** · <site | manual> · <path> · <pages> pages · <words> words
- Must-haves on the CV: <where>
- Level: ad says <level>, headline says <headline>
- Gaps named, not claimed: <list>
- Flags: <deadline, language, sponsorship not mentioned, pay band, what staff say>
- Still open: <letter, form answers, a sentence on a gap>
```

Append one line to `docs/plans/job-log.md` (newest first): date, company, role, type, verdict,
deciding reason, CV (`site: <path>` or `manual: <path>`).

## Cover letters

Only when asked. The builder fills `src/data/letter.local.json` (company, role, greeting,
opening, country) from the brief, and the same `npm run apply` prints the letter next to the CV.
250 to 400 words; every fact in `cv.facts.md`; the gaps the user chose to name in step 3 go
here; no claim the CV already makes; it asks, and never implies other options.

With a hand-made CV the letter is still rendered here. Its header reads `cv.local.json`, which
may hold an earlier application, so the builder rewrites that file with only the header values
of the hand-made CV and renders with `LETTER_ONLY=1 npm run apply -- <folder>`, which prints the
letter alone.

## Things that go wrong

- **An incomplete brief.** The builder guesses, or returns a question. Everything it needs is in
  the brief; the conversation is not.
- **A bullet improved past its facts line.** The costliest failure: it surfaces in the interview,
  not in the check. The trace table exists so that step 5 catches it.
- **The ad's words for a tool the facts lack.** A keyword match is never a claim.
- **A new fact straight onto the CV.** It goes to `cv.facts.md` first.
- **Dashes.** Em and en dashes read as machine-written; `check-cv.sh` fails on them.
- **The public copy.** `npm run cv` prints the defaults into `public/cv.pdf`, the deployed CV;
  `npm run apply` is the only path for a tailored copy and never writes into `public/`.
- **An edit list trusted blind.** Hand edits get skipped or half done. The check round confirms
  each one landed in the exported PDF before SEND.
- **A hand-made CV in the repo.** Its text lives in the session scratchpad only.
- **Nothing goes public.** No posts, no commits naming a company the user applies to; the
  overrides, the facts and the log are gitignored for that reason.
