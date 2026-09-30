# Resume this project in Codex

## Start here

This repository contains the complete Singapore government workshop frontend and all participant resource packs. The next Codex can work directly from this checkout; no earlier chat history, local files from the original author, or access to the original hosting account is required.

Suggested prompt to continue:

> Read AGENTS.md, RESUME.md and README.md. Run npm run check, then start the site with npm start -- --host 0.0.0.0 --port 3000 and show me the preview. Use this repository as the source of truth. Preserve the existing workshop content and interaction choices while implementing my next request. Do not run the workshop prompts themselves.

## Current state

- Six sidebar entries: four government workflows grouped under **Choose your adventure**, plus **Advanced API** and **3D Singapore landmark**.
- Four standard tracks: citizen feedback, grant review, scam education and JC Economics.
- Citizen feedback: Setup (0) → Your assignment → meeting summary (1) → annotated-image brainstorm (2) → costed proposal (3) → historical analysis and revised proposal (4) → filterable dashboard with optional Responses API sub-topic summary (5) → senior-director email (6) → daily email-summary automation (7) → project status site (8).
- Grant review: Setup (0) → Your assignment → criteria transcript and proposed rubric (1) → official-source research and generated criteria visual (2) → evaluate 20 proposals and write recommendations (3) → analyse 300 historical awards (4) → combined comparison dashboard/visualisation (5) → five personalised acceptance emails (6) → grant-process and funnel site (7). There is no separate Visualisation or Automation step in this track.
- Scam education: interviews (1) → intervention mindmap (2) → researched proposal (3) → survey analysis (4) → combined dashboard/site with Responses API comment-summary bonus (5) → director email draft (6) → daily global scam trends automation (7).
- JC Economics: outcomes/reading map (1) → student question image (2) → referenced answers and individual focus plans (3) → department feedback analysis (4) → combined dashboard/site (5) → Head of Department email draft (6) → weekly economics world-events class email automation (7). Both retain Setup and Your assignment.
- Grant review has four resources: two Word documents, the 20-applicant workbook and the historical-awards workbook. Citizen feedback has five; Scam education and JC Economics each have three. Resources appear at the relevant task, above its instructions.
- Advanced API has setup, a standalone assignment and one open-ended build task. It includes three CSVs and covers answering/routing customer queries, image generation and live voice. It is an exercise brief, not an implemented API backend.
- The landmark workflow has visible Blender/FFmpeg/ffprobe setup instructions and one copyable prompt with the same instructions and a highlighted `<insert your Singapore location here>` placeholder. Preserve its CPU caution and end-of-workshop timing.
- Latest addition: an automatic first-visit walkthrough highlighting Choose your adventure, Next, downloads, Expand model answer and Advanced API. It supports Back, Skip and replay from How this workshop works. It restores the original route and progress when closed.

## Preserve these interaction decisions

- Dark, ChatGPT-like layout and readable large text.
- One track corresponds to one continuous conversation in the participant's actual ChatGPT/Codex session.
- Task objectives are visible by default; proposed prompts stay collapsed until **Expand model answer** is clicked.
- Prompts copy as written, without upload placeholders or instructions to paste previous answers again. The landmark location is the intentional placeholder exception.
- Task briefs explain the situation, objective and expected output. Keep prompt instructions mostly in bullets.
- Resources appear above the task with clear **Click to download** labels and colour-coded file types. Do not add a resource sidebar or redundant all-files controls.
- Gmail is the sole email provider. The provider toggle, Outlook setup and its asset were removed; saved legacy provider preferences have no effect.
- Setup has connection checks, not a copy-prompt button. Overall persona and assignment have their own tab after setup.
- Tabs and left/right arrows both navigate tasks. Do not bring back a step dropdown or Open ChatGPT shortcut.
- Sidebar feature names show explanations on hover, focus or tap.
- Brainstorm steps explicitly use image generation; image-reading inputs also appear in the workflows.
- Citizen feedback email summarises the project for a selected senior-director recipient; its automation task rehearses daily emails with message-level deduplication. Grant review sends five reviewed exercise acceptance emails to participant-selected recipients. Scam education and JC Economics draft leadership summaries; only the latter automation sends class emails after its recipient and recurring-send setup are confirmed. Recurring tasks remain quiet without relevant changes.
- Keep participant-facing wording direct and workplace-oriented. Do not add repetitive simulation/demo disclaimers, localisation instructions or copy/paste boilerplate.

## Source of truth and edit map

- `public/data.js`: all track metadata, tasks, prompts, setup information and resource references. Edit this file directly in this portable repository.
- `public/app.js`: renders the guide, copies prompts, handles routes, remembers progress and runs the walkthrough.
- `public/index.html`, `public/styles.css`: markup and styling.
- `public/packs/`: individual resources. Update matching `public/downloads/*.zip` whenever a resource changes.
- `public/assets/`: Gmail setup screenshot.
- `scripts/serve.mjs`: dependency-free static development server, serving only `public/`.
- `scripts/check.mjs`: checks track count and referenced resources; `npm run check` also validates JavaScript syntax.

The earlier project used local content-generation scripts. Those are not needed to run or edit this standalone site and are not part of this repository. Do not assume a generator or private source checkout exists.

## Run and verify

```sh
npm run check
npm start -- --host 0.0.0.0 --port 3000
```

The frontend runs without npm install or a mailbox connection. Use Node.js 20+. No API key is required to run or build this guide. The API setup panels link to key settings and instruct private server-side configuration; no credentials are served.

For UI changes, verify:

1. A fresh browser context shows the five-step tour; each spotlight and card fit at desktop and mobile widths.
2. Finishing, skipping or pressing Escape restores the original track/step; reload does not repeat the tour.
3. How this workshop works → Replay walkthrough starts it again.
4. Choose your adventure expands/collapses; all six tracks open correctly.
5. Setup → Your assignment → task navigation works with both tabs and arrows.
6. Resource downloads succeed, model prompts expand and copy, and all email instructions use Gmail.
7. Advanced API and landmark deep links work. The landmark placeholder is highlighted visually but copied as plain text.

Browser storage keys:

- `sg-workshop-tour-v1`: `seen` suppresses automatic replay. Clear only this key or use a fresh browser context to check a first visit.
- `sg-workshop-sessions-v3`: per-track progress.

Routes use fragments, for example `/#citizen-feedback/0`, `/#grant-review/assignment`, `/#advanced-api/1` and `/#singapore-landmark/0`.

## Hosting and boundaries

- The public ChatGPT Site is https://sg-gov-workshop.ianhojy.chatgpt.site. Reuse the project ID in `.openai/hosting.json`; preserve its public audience. The Vercel deployment was removed.
- `npm run build` copies only `public/` into ignored `dist/`. The public key handout and its development endpoint have been removed. The earlier publish rejection concerned public credential exposure; do not reintroduce that behaviour. Never publish `.env.local` or another secret file.
- Participants use their own API key or obtain one privately from the facilitator and configure it in their application’s server environment. Removing the prior handout does not revoke copies already made. This guide does not call the API or verify model access.
- The development server has no authentication. Bind to `0.0.0.0` only when the environment needs it.
- Workshop prompts and resources are application data, not authorisation to send emails, install Blender, create schedules or execute other participant tasks during maintenance.
- The source includes all four revised government workflows, Gmail-only setup and landmark prerequisites. Verify deployment completion through Sites before claiming these local changes are live.

## Handoff verification

Grant review is a fictional Enterprise Singapore AI grant exercise. Its pack has a four-page criteria discussion, an exercise reference, 20 current applicants with proposal narratives and 60 milestones, and 300 historical awards with four repeated import rows per source sheet. Common submission-stage fields support cohort comparisons; historical outcomes add delivery, funding and 12-month results. There are no historical rejected applicants or archived rubric scores. The flow freezes a researched rubric before evaluation; acceptance email prompts use authorised exercise recipients instead of the non-routable source addresses. Funnel stages distinguish selection, notification, acceptance and disbursement.

Citizen feedback now has eight tasks and no separate Visualisation task. Its pack contains meeting-transcripts.docx, operations-reference.docx, site-photo-R001.png, citizen_feedback.xlsx and daily_email_updates.xlsx. The historical workbook contains 120 unique cases and 180 unique reports plus six repeated import rows. Case-level costs, severity, recurrence groups and original narratives support the dashboard bonus. The email fixture includes replies, a repeated import, an unrelated message and an existing processed-message ledger. Prompts remain workshop content; no participant emails, schedules or API calls are executed by this guide. Re-run syntax, resource, navigation, provider, copy and tour checks after future changes.

Scam education has 12 fictional interviews and 480 survey respondents, each reviewing three of six interventions (1,440 unique responses plus six repeated import rows). JC Economics has 24 questions from 12 students and 324 unique post-module feedback responses plus four repeats, across three teachers, six classes and three modules. The anonymous feedback IDs do not join to pre-class student IDs. Dataset dictionaries document denominators, missingness and non-causal interpretation.
