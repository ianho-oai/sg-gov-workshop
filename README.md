# Singapore Government Workshop

A self-contained workshop guide with downloadable resources, copyable prompts and a first-visit walkthrough.

**Continuing in another Codex?** Start with [RESUME.md](RESUME.md) for the handoff, design decisions and verification checklist.

## Run locally or in Codex

Requires **Node.js 20 or later**. There are no npm dependencies to install, no build step and no API key needed to run the guide.

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
- **3D Singapore landmark:** Copy a Blender creation prompt and insert your chosen location.

The guide includes Gmail/Outlook setup choices, task objectives, expandable model prompts, resource downloads and a replayable walkthrough. It stores progress and walkthrough preferences in the current browser.

This frontend is a guide: participants paste prompts and upload files into their own ChatGPT or Codex session. It does not connect to mailboxes, send messages, schedule tasks or call OpenAI APIs itself. Availability of plugins, models, live voice and scheduling depends on the participant's account; setup screenshots may differ from their interface. The Advanced API exercise requires a separately configured API project and server-side key, but the guide never requests or stores keys.

## Edit and check

| Path | Purpose |
| --- | --- |
| `public/index.html` | Page structure |
| `public/styles.css` | Layout, colours and walkthrough styling |
| `public/app.js` | Navigation, email toggle, copying and walkthrough |
| `public/data.js` | Track descriptions, tasks and prompts |
| `public/packs/` | Individual downloadable documents, workbooks, images and CSVs |
| `public/downloads/` | Resource-pack ZIPs |
| `public/assets/` | Setup reference screenshots |
| `docs/workshop-guide.md` | Participant flow and workshop guidance |

```sh
npm run check
```

This validates JavaScript syntax and every resource referenced by the workshop data. After UI changes, check the walkthrough and normal navigation at desktop and mobile widths. If you change a resource in `public/packs/`, also update its matching archive in `public/downloads/`.

The repository contains the portable frontend and resources. It has no binding to the original Sites project and no deployment credentials.
