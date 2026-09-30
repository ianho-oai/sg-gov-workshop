# Singapore Government Workshop

A self-contained workshop guide with downloadable resources, copyable prompts and a first-visit walkthrough.

**Continuing in another Codex?** Start with [RESUME.md](RESUME.md) for the handoff, design decisions and verification checklist.

## Run locally or in Codex

Requires **Node.js 22.16 or later**. No dependencies or credentials are needed to run the guide.

```sh
git clone https://github.com/ianho-oai/sg-gov-workshop.git
cd sg-gov-workshop
npm start
```

Open **http://localhost:3000**. If Codex has already checked out the repository, run `npm start` from its root.

For an environment that exposes a forwarded preview port:

```sh
npm start -- --host 0.0.0.0 --port 3000
```

Use the environment's preview for port 3000. The included server is for development; bind it to localhost. Public hosting serves the guide plus a password-protected key retrieval endpoint. No SPA rewrite is required because workshop navigation uses URL fragments.

## Workflows

- **Choose your adventure:** Citizen feedback, Grant review, Scam education and JC Economics.
- **Experience:** Quick activities for Computer use, Appshots, Live voice, Create a site, Image generation, Image reading, Subagents, Create and use a skill, and Goal mode. The skill activity has two copyable steps in the same chat.
- **Advanced API:** Build a Meet-the-People Session voice intake, transcription and research tool, with FAQ retrieval, agency routing and an admin interaction dashboard.
- **3D Singapore landmark:** Follow the Blender/FFmpeg setup instructions, then copy the creation prompt and insert your chosen location. Run this CPU-intensive workflow at the end.

Citizen feedback follows meeting summary → annotated image → costed proposal → historical analysis → dashboard → leadership email → daily automation → project site. The dashboard has an optional Responses API summary of filtered issues.

Grant review is an Enterprise Singapore AI-grants exercise: criteria transcript → research and criteria visual → evaluation of 20 applicants → analysis of 300 past awards → comparison dashboard → five personalised acceptance emails → grant-process site. The data and scheme rules are fictional training inputs. Its dashboard includes the visualisation task.

Scam education follows resident interviews → intervention mindmap → researched proposal → survey analysis → self-service analytics site with an optional Responses API comment summary → director email draft → daily global scam watch.

JC Economics follows learning outcomes and readings → student question map → referenced answers and individual focus plans → department feedback analysis → published dashboard → Head of Department email draft → weekly economics news email automation.

The guide includes Gmail setup instructions, task objectives, expandable model prompts, resource downloads and a replayable walkthrough. It stores progress and walkthrough preferences in the current browser.

Participants paste prompts and upload files into their own ChatGPT or Codex session. The guide does not connect to mailboxes, send emails or create schedules. The API steps let participants enter the facilitator’s password, unlock the workshop key and copy it into a private environment file. A participant-owned key setup prompt remains available as an alternative. The guide does not create keys or call OpenAI itself.

## Edit and check

| Path | Purpose |
| --- | --- |
| `public/index.html` | Page structure |
| `public/styles.css` | Layout, colours and walkthrough styling |
| `public/app.js` | Navigation, copying and walkthrough |
| `public/data.js` | Track descriptions, tasks and prompts |
| `public/packs/` | Individual downloadable documents, workbooks, images and CSVs |
| `public/downloads/` | Resource-pack ZIPs |
| `public/assets/` | Setup reference screenshots |
| `docs/workshop-guide.md` | Participant flow and workshop guidance |

```sh
npm run check
npm run build
```

This validates JavaScript syntax and every resource referenced by the workshop data. After UI changes, check the walkthrough and normal navigation at desktop and mobile widths. If you change a resource in `public/packs/`, also update its matching archive in `public/downloads/`.

The repository contains the frontend, resources and current Sites project binding. Credentials remain outside Git. Publishing builds a Worker from `public/` and `worker/key-access.js`, with D1 migrations for attempt limits. Credentials and the password verifier are Sites runtime secrets. See the API key access section in RESUME.md for configuration and fake-key local testing.
