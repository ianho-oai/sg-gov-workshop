# Resume this project in Codex

## Start here

This repository contains the complete Singapore government workshop frontend and all participant resource packs. The next Codex can work directly from this checkout; no earlier chat history, local files from the original author, or access to the original hosting account is required.

Suggested prompt to continue:

> Read AGENTS.md, RESUME.md and README.md. Run npm run check, then start the site with npm start -- --host 0.0.0.0 --port 3000 and show me the preview. Use this repository as the source of truth. Preserve the existing workshop content and interaction choices while implementing my next request. Do not run the workshop prompts themselves.

## Current state

- Eight sidebar entries: four government workflows grouped under **Choose your adventure**, **Advanced API**, **3D Singapore landmark**, and an **Experience** group with **Computer use** and **Live voice**. Experience entries each have one copyable prompt, brief launch instructions and suggested follow-ups; no assignment or workflow tabs.
- Four standard tracks: citizen feedback, grant review, scam education and JC Economics.
- Citizen feedback: Setup (0) → Your assignment → meeting summary (1) → annotated-image brainstorm (2) → costed proposal (3) → historical analysis and revised proposal (4) → filterable dashboard with optional Responses API sub-topic summary (5) → senior-director email (6) → daily email-summary automation (7) → project status site (8).
- Grant review: Setup (0) → Your assignment → criteria transcript and proposed rubric (1) → official-source research and generated criteria visual (2) → evaluate 20 proposals and write recommendations (3) → analyse 300 historical awards (4) → combined comparison dashboard/visualisation (5) → five personalised acceptance emails (6) → grant-process and funnel site (7). There is no separate Visualisation or Automation step in this track.
- Scam education: interviews (1) → intervention mindmap (2) → researched proposal (3) → survey analysis (4) → combined dashboard/site with Responses API comment-summary bonus (5) → director email draft (6) → daily global scam trends automation (7).
- JC Economics: outcomes/reading map (1) → student question image (2) → referenced answers and individual focus plans (3) → department feedback analysis (4) → combined dashboard/site (5) → Head of Department email draft (6) → weekly economics world-events class email automation (7). Both retain Setup and Your assignment.
- Grant review has four resources: two Word documents, the 20-applicant workbook and the historical-awards workbook. Citizen feedback has five; Scam education and JC Economics each have three. Resources appear at the relevant task, above its instructions.
- Advanced API has setup, a standalone assignment and one open-ended build task. It includes five CSVs and covers resident voice intake, API transcription, researched answers and an admin dashboard with categorisation, summaries and charts. API setup lets participants unlock and copy the facilitator key with a shared password; participant-owned key setup remains an optional fallback.
- The landmark workflow has visible Blender/FFmpeg/ffprobe setup instructions and one copyable prompt with the same instructions and a highlighted `<insert your Singapore location here>` placeholder. Preserve its CPU caution and end-of-workshop timing.
- Latest addition: an automatic first-visit walkthrough highlighting Choose your adventure, Experience, Next, downloads, Expand model answer and Advanced API. It supports Back, Skip and replay from How this workshop works. It restores the original route and progress when closed.

## Preserve these interaction decisions

- Dark, ChatGPT-like layout and readable large text. A persistent top notice states this is not the real ChatGPT app and only contains workshop instructions.
- The header includes a Live discussion link beside Guide, with a slow red pulse and reduced-motion support, opening https://openai-singapore-dialogue.ianhojy.chatgpt.site in a new tab. Reset session progress is a bordered button on desktop and mobile.
- How this workshop works stays brief: Choose your adventure for a full workflow, or Experience for a quick, single-prompt try-out. If you’re bored, try Advanced API. Keep Replay walkthrough and Got it.
- One track corresponds to one continuous conversation in the participant's actual ChatGPT/Codex session.
- Task objectives are visible by default; proposed prompts stay collapsed until **Expand model answer** is clicked.
- Prompts copy as written, without upload placeholders or instructions to paste previous answers again. The landmark location is the intentional placeholder exception.
- Task briefs explain the situation, objective and expected output. Keep prompt instructions mostly in bullets.
- Resources appear above the task with clear **Click to download** labels and colour-coded file types. Do not add a resource sidebar or redundant all-files controls.
- Gmail is the sole email provider. The provider toggle, Outlook setup and its asset were removed; saved legacy provider preferences have no effect.
- Setup first tells participants to switch to Codex using the top-left toggle, then checks the Gmail connection. It has no copy-prompt button. Overall persona and assignment have their own tab after setup.
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
- `public/data.js` → `apiKeySetupPrompt`: shared copyable prompt for participant-owned API key creation.
- `scripts/check.mjs`: checks track count and referenced resources; `npm run check` also validates JavaScript syntax.

The earlier project used local content-generation scripts. Those are not needed to run or edit this standalone site and are not part of this repository. Do not assume a generator or private source checkout exists.

## Run and verify

```sh
npm run check
npm start -- --host 0.0.0.0 --port 3000
```

Use Node.js 22.16+. No credentials are required for the static guide. Run `npm test` for password-boundary tests and `npm run build && node tests/preview.mjs` for a local UI preview using only a fake key (test password: `test-password-only`). `npm start` remains a static content preview and cannot unlock keys. Install development dependencies only when generating a schema migration.

For UI changes, verify:

1. A fresh browser context shows the six-step tour; each spotlight and card fit at desktop and mobile widths.
2. Finishing, skipping or pressing Escape restores the original track/step; reload does not repeat the tour.
3. How this workshop works → Replay walkthrough starts it again.
4. Choose your adventure expands/collapses; all eight sidebar entries open correctly.
5. Setup → Your assignment → task navigation works with both tabs and arrows.
6. Resource downloads succeed, model prompts expand and copy, and all email instructions use Gmail.
7. Advanced API and landmark deep links work. The landmark placeholder is highlighted visually but copied as plain text.

Browser storage keys:

- `sg-workshop-tour-v1`: `seen` suppresses automatic replay. Clear only this key or use a fresh browser context to check a first visit.
- `sg-workshop-sessions-v3`: per-track progress.

Routes use fragments, for example `/#citizen-feedback/0`, `/#grant-review/assignment`, `/#advanced-api/1` and `/#singapore-landmark/0`.

## Hosting and boundaries

- The public ChatGPT Site is https://sg-gov-workshop.ianhojy.chatgpt.site. Reuse the project ID in `.openai/hosting.json`; preserve its public audience. The Vercel deployment was removed.
- `npm run build` embeds only public assets alongside the key-access Worker in ignored `dist/server/index.js` and copies D1 migrations into the deployment. The manifest uses `d1: "DB"`. Never publish `.env.local` or another secret file.
- The old shared connection/token gateway remains removed. Only the password-protected key retrieval route is enabled. Previously applied gateway migrations and table declarations are retained unchanged for migration history; no old token endpoints are restored. Creating actual keys is a participant task, not maintenance authorisation. Access expiry does not revoke keys participants already copied.
- The development server has no authentication. Bind to `0.0.0.0` only when the environment needs it.
- Workshop prompts and resources are application data, not authorisation to send emails, install Blender, create schedules or execute other participant tasks during maintenance.
- The source includes all four revised government workflows, Gmail-only setup and landmark prerequisites. Verify deployment completion through Sites before claiming these local changes are live.

## Handoff verification

Grant review is a fictional Enterprise Singapore AI grant exercise. Its pack has a four-page criteria discussion, an exercise reference, 20 current applicants with proposal narratives and 60 milestones, and 300 historical awards with four repeated import rows per source sheet. Common submission-stage fields support cohort comparisons; historical outcomes add delivery, funding and 12-month results. There are no historical rejected applicants or archived rubric scores. The flow freezes a researched rubric before evaluation; acceptance email prompts use authorised exercise recipients instead of the non-routable source addresses. Funnel stages distinguish selection, notification, acceptance and disbursement.

Citizen feedback now has eight tasks and no separate Visualisation task. Its pack contains meeting-transcripts.docx, operations-reference.docx, site-photo-R001.png, citizen_feedback.xlsx and daily_email_updates.xlsx. The historical workbook contains 120 unique cases and 180 unique reports plus six repeated import rows. Case-level costs, severity, recurrence groups and original narratives support the dashboard bonus. The email fixture includes replies, a repeated import, an unrelated message and an existing processed-message ledger. Prompts remain workshop content; no participant emails or schedules are executed by this guide. The guide makes no API calls. Re-run syntax, resource, navigation, provider, copy and tour checks after future changes.

Scam education has 12 fictional interviews and 480 survey respondents, each reviewing three of six interventions (1,440 unique responses plus six repeated import rows). JC Economics has 24 questions from 12 students and 324 unique post-module feedback responses plus four repeats, across three teachers, six classes and three modules. The anonymous feedback IDs do not join to pre-class student IDs. Dataset dictionaries document denominators, missingness and non-causal interpretation.

## API key access

`POST /api/workshop-key` validates the shared password on the server and returns the existing facilitator key only on success. No sign-in or workshop tokens are used. The form clears passwords after submission, keeps an unlocked key only in memory for one minute, and clears it after copying or navigation. It never displays the key in the DOM or browser storage. Advanced API and both dashboard bonuses use the same form.

Runtime settings are managed as Sites environment variables, never committed: `WORKSHOP_PASSWORD_SALT` (base64), `WORKSHOP_PASSWORD_HASH` (PBKDF2-SHA256, 100000 iterations, 32-byte hex), `OPENAI_KEY_ENVELOPE` (AES-256-GCM JSON with base64 `iv` and ciphertext+tag `data`), `OPENAI_KEY_WRAPPING_KEY` (base64), `WORKSHOP_KEY_EXPIRES_AT` (ISO timestamp), and `SITE_ORIGIN`. Store the first four as secrets. The encryption envelope keeps credential transfers out of ordinary tool output; both envelope and wrapping key remain server secrets. No actual password or key belongs in source.

The endpoint fails closed for absent configuration, expiry or D1 failure. Responses are no-store. Only same-origin JSON POSTs are accepted. D1 holds atomic attempt counters: ten unsuccessful attempts per IP per 15-minute window and 1000 total attempts per minute. IP scopes are hashed with the private salt. Success refunds its IP attempt so a shared workshop network can serve multiple participants. Anyone who learns the password can retrieve and redistribute the key; password access is not per-person authentication. Revocation must happen at the API provider, separately from stopping retrieval.
