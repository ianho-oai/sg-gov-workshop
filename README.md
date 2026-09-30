# Singapore Government Workshop

A self-contained workshop guide with downloadable resources, copyable prompts and a first-visit walkthrough.

**Continuing in another Codex?** Start with [RESUME.md](RESUME.md) for the handoff, design decisions and verification checklist.

## Run locally or in Codex

Requires **Node.js 20 or later**. There are no npm dependencies to install. The guide runs directly from `public/` and needs no credentials.

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

Use the environment's preview for port 3000. The included server is for development; it has no authentication. For hosting, serve `public/` with any static hosting service. No SPA rewrite is required because workshop navigation uses URL fragments.

## Workflows

- **Choose your adventure:** Citizen feedback, Grant review, Scam education and JC Economics.
- **Advanced API:** Build a customer-service assistant with text, image and live voice capabilities.
- **3D Singapore landmark:** Follow the Blender/FFmpeg setup instructions, then copy the creation prompt and insert your chosen location. Run this CPU-intensive workflow at the end.

Citizen feedback follows meeting summary → annotated image → costed proposal → historical analysis → dashboard → leadership email → daily automation → project site. The dashboard has an optional Responses API summary of filtered issues.

Grant review is an Enterprise Singapore AI-grants exercise: criteria transcript → research and criteria visual → evaluation of 20 applicants → analysis of 300 past awards → comparison dashboard → five personalised acceptance emails → grant-process site. The data and scheme rules are fictional training inputs. Its dashboard includes the visualisation task.

Scam education follows resident interviews → intervention mindmap → researched proposal → survey analysis → self-service analytics site with an optional Responses API comment summary → director email draft → daily global scam watch.

JC Economics follows learning outcomes and readings → student question map → referenced answers and individual focus plans → department feedback analysis → published dashboard → Head of Department email draft → weekly economics news email automation.

The guide includes Gmail setup instructions, task objectives, expandable model prompts, resource downloads and a replayable walkthrough. It stores progress and walkthrough preferences in the current browser.

This frontend is a guide: participants paste prompts and upload files into their own ChatGPT or Codex session. It does not connect to mailboxes, send messages, schedule tasks or call OpenAI APIs itself. Availability of plugins, models, live voice and scheduling depends on the participant's account; setup screenshots may differ from their interface. API exercises use participants’ own keys or credentials supplied privately by the facilitator, stored in their application’s server environment. This guide neither serves nor publishes credentials.

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
```

This validates JavaScript syntax and every resource referenced by the workshop data. After UI changes, check the walkthrough and normal navigation at desktop and mobile widths. If you change a resource in `public/packs/`, also update its matching archive in `public/downloads/`.

The repository contains the frontend, resources and current Sites project binding. Credentials remain outside Git. Publishing copies only `public/` assets into `dist/`; no key handout is generated. See RESUME.md.
