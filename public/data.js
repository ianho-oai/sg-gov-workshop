window.WORKSHOP_DATA = {
  "title": "Singapore Public Service Workshop",
  "updated": "28 September 2026",
  "steps": [
    "Setup",
    "Introduction",
    "Brainstorming",
    "Document",
    "Data analysis",
    "Dashboard",
    "Visualisation",
    "Email workflow",
    "Build a site",
    "Create an automation"
  ],
  "tracks": [
    {
      "id": "citizen-feedback",
      "name": "Citizen feedback",
      "short": "Better neighbourhood services",
      "role": "Municipal services",
      "workbook": "citizen_feedback.xlsx",
      "accent": "#527766",
      "description": "Turn resident feedback into an evidence-backed estate improvement brief.",
      "context": "A inter-agency municipal coordination desk reviewing feedback from six Singapore towns. Agency and Town Council responsibilities must be confirmed before routing.",
      "sheets": [
        {
          "name": "Feedback",
          "rows": 200
        },
        {
          "name": "Case_updates",
          "rows": 181
        },
        {
          "name": "Data_dictionary",
          "rows": 13
        },
        {
          "name": "Read_me",
          "rows": 7
        }
      ],
      "overview": {
        "role": "Municipal coordination officer supporting an estate review across six Singapore towns.",
        "task": "Your director needs three priorities for the next estate review. Use resident feedback and case updates to identify recurring issues, compare towns and recommend practical follow-up actions. Read a site photograph alongside the written feedback to distinguish observations from claims.",
        "outputs": [
          "A concise director’s brief",
          "An Excel analysis and filterable dashboard",
          "A meeting visual and weekly email drafts",
          "A team briefing site with evidence and downloads"
        ]
      },
      "baseUrl": "packs/citizen-feedback/",
      "packUrl": "downloads/citizen-feedback.zip",
      "files": [
        "manager-email.pdf",
        "operations-reference.docx",
        "site-photo-R001.png",
        "citizen_feedback.xlsx",
        "weekly_feedback_updates.xlsx"
      ],
      "steps": [
        {
          "number": 0,
          "name": "Setup",
          "minutes": 3,
          "prompt": "",
          "resources": [],
          "checkpoint": "Gmail is connected to the account you will use.",
          "checklist": [
            "In ChatGPT, open Plugins and check whether Gmail is already connected to the account you will use.",
            "If Gmail is already connected, you are ready. Continue to step 1."
          ],
          "connectionSteps": [
            "Search for Gmail in Plugins.",
            "Select Gmail — Read and manage Gmail, as shown below.",
            "Choose Connect or follow the setup option shown. Sign in to the Google account approved for this session and review the requested permissions.",
            "Return to ChatGPT and check that Gmail is connected. Continue to step 1."
          ]
        },
        {
          "number": 1,
          "name": "Introduction",
          "minutes": 2,
          "prompt": "- I support a Singapore municipal coordination team.\n- My director needs a short brief for the weekly estate review: which three recurring issues should we prioritise across the six towns, and what should happen next?\n- Read the attached manager email and operations reference.\n- Summarise the decision, constraints and available evidence in five bullets.",
          "objective": "Understand the director’s decision and the evidence available for prioritising estate issues across six towns.",
          "resources": [
            {
              "file": "manager-email.pdf",
              "label": "manager-email.pdf",
              "hint": "Download and upload before this prompt"
            },
            {
              "file": "operations-reference.docx",
              "label": "operations-reference.docx",
              "hint": "Download and upload before this prompt"
            }
          ],
          "checkpoint": "Check the goal, audience and available source documents.",
          "situation": "The director is preparing for the weekly estate review across six towns. Reports arrive with different levels of detail, and the team needs an agreed decision frame before comparing issues or assigning follow-up work.",
          "deliverables": [
            "Summarise the decision requested, the audience and the reporting period in five bullets.",
            "Identify the available evidence, operational constraints and questions the review must resolve."
          ]
        },
        {
          "number": 2,
          "name": "Brainstorming",
          "minutes": 4,
          "prompt": "- Inspect the attached site photograph for report R001, case C001, alongside the manager email.\n- List three visible features and separate observations from possible explanations; flag anything the image cannot establish.\n- Suggest three practical responses to the reported access and visibility concern, with trade-offs and checks needed before action.\n- Recommend an approach to test against the full feedback data.\n- Treat the photograph as evidence for the existing case, not a new report.\n- Use image generation to create a landscape service-improvement mind map centred on R001/C001. Branch into visible evidence, questions for inspection, the three response options, trade-offs and next checks. Use short readable labels and highlight the recommended option; keep unverified causes out of the evidence branch.\n- Generate the actual image and provide it as a downloadable PNG, with a short text outline alongside it. Check labels against the source material and correct any inaccurate or unreadable text before returning it.",
          "objective": "Read the site photograph, distinguish visible evidence from assumptions, and choose an approach to the access concern. Generate a visual brainstorm to develop and communicate the options.",
          "resources": [
            {
              "file": "site-photo-R001.png",
              "label": "site-photo-R001.png",
              "hint": "Download and upload before this prompt"
            }
          ],
          "checkpoint": "Choose a practical approach for the decision you need to support.",
          "situation": "A resident has reported an access and visibility concern in R001/C001. Before choosing a response, the team needs to distinguish what the photograph shows from what still requires a site inspection, then explore practical options.",
          "deliverables": [
            "Read the photograph and compare three responses, including trade-offs and checks.",
            "Use image generation to create a service-improvement mind map connecting the concern, visible evidence, response options and next checks.",
            "Recommend which approach to test against the full feedback dataset."
          ]
        },
        {
          "number": 3,
          "name": "Document",
          "minutes": 3,
          "prompt": "- Using your recommended approach, prepare a one-page Word briefing template for the director.\n- Include the decision requested, three proposed priorities, supporting evidence, responsible team to confirm, and next action.\n- Use the responsibilities described in the operations reference.\n- Leave findings and rankings clearly marked Pending analysis.\n- Make this a document a colleague can edit and circulate before a meeting.\n- Include a short photo-evidence section for R001: observations, resident claim and questions for a site visit.",
          "objective": "Create an editable one-page director’s brief, ready to fill with findings from the data.",
          "resources": [],
          "checkpoint": "Open the Word document and check its structure.",
          "situation": "The director needs a short document colleagues can edit before the review meeting. The data has not yet been analysed, so the structure must help the team record a decision without presenting untested priorities as findings.",
          "deliverables": [
            "Create a one-page Word decision brief with space for three priorities, supporting evidence, proposed owners and next actions.",
            "Add a compact R001 photo-evidence section and mark findings as pending analysis."
          ]
        },
        {
          "number": 4,
          "name": "Data analysis",
          "minutes": 6,
          "prompt": "- Analyse the attached feedback spreadsheet for the director's review, using 22 September 2026 as the reference date.\n- Check duplicate reports, blank towns, inconsistent dates and case updates without a matching report.\n- Distinguish reports from cases; follow-up comments are not necessarily duplicates.\n- Compare unresolved cases, recurring themes and valid resolution times by town.\n- Explain the figures in plain language, show the source record IDs, and flag uncertain classifications.\n- Return an Excel summary and update our Word brief with three proposed actions.\n- Show one example of a data-quality issue and how you handled it.\n- Link the photo observations to R001/C001; do not count the image as an additional report or generalise it to all six towns.",
          "objective": "Clean and analyse the feedback workbook, identify three priorities, and support them with traceable figures.",
          "resources": [
            {
              "file": "citizen_feedback.xlsx",
              "label": "citizen_feedback.xlsx",
              "hint": "Download and upload before this prompt"
            }
          ],
          "checkpoint": "Verify one source record, one data-quality issue and one total.",
          "situation": "The feedback export contains reports, case histories and data-quality issues that can distort the apparent workload. The director needs a defensible comparison across towns, including the difference between several reports about one case and several distinct cases.",
          "deliverables": [
            "Check duplicates, dates, missing towns and unmatched updates using 22 September 2026 as the reference date.",
            "Produce a traceable Excel summary of themes, unresolved cases and valid resolution times.",
            "Complete the director’s brief with three priorities, source IDs and one worked data-quality check."
          ]
        },
        {
          "number": 5,
          "name": "Dashboard",
          "minutes": 6,
          "prompt": "- Create a dashboard the director can explore during the meeting, using the analysis above.\n- Include feedback volume, unresolved cases, common themes and resolution times.\n- Add town and theme filters and let us see the original comments behind a finding.\n- Show a working preview here and explain where to click.\n- Display the date range and what each number counts.\n- Check that the totals match the Excel summary.\n- If an interactive preview is unavailable, provide a filterable Excel dashboard and say so.\n- Let me open the R001 photo from its case detail and distinguish visible evidence from the resident’s claim.",
          "objective": "Turn the analysis into a dashboard the director can filter and use to inspect the evidence behind each finding.",
          "resources": [],
          "checkpoint": "Try a filter and inspect the evidence behind a number.",
          "situation": "During the meeting, the director may ask why one town or issue appears to need attention. A static total is not enough: colleagues must be able to filter the results and inspect the comments and case evidence behind a recommendation.",
          "deliverables": [
            "Create a dashboard with town and theme filters, clear counting definitions and the reporting period.",
            "Link headline figures to source comments and the R001 photograph.",
            "Reconcile dashboard totals with the Excel summary and show one complete filter-to-evidence journey."
          ]
        },
        {
          "number": 6,
          "name": "Visualisation",
          "minutes": 4,
          "prompt": "- Create an annotated copy of the site photograph for the estate review.\n- Point out the visible step, lighting and surface conditions without asserting an unverified cause.\n- Add a separate panel with the relevant figures from our analysis and one proposed action.\n- Label observations, reported concerns and matters to verify clearly.\n- Keep the original photograph unchanged and preserve report R001 and case C001 references.\n- Provide a PNG or PDF that is readable on a meeting-room screen.",
          "objective": "Create an annotated site image that explains the concern, relevant figures and proposed action at a glance.",
          "resources": [],
          "checkpoint": "Check the labels, figures and intended audience.",
          "situation": "The estate review needs a visual that colleagues can understand quickly on a meeting-room screen. The original photograph should remain available, while an annotated version helps explain the observed conditions and the proposed follow-up.",
          "deliverables": [
            "Create an annotated image highlighting the step, lighting and surface conditions.",
            "Place relevant analysis figures and a proposed action in a separate panel.",
            "Provide a readable PNG or PDF that distinguishes observations, resident claims and matters to verify."
          ]
        },
        {
          "number": 7,
          "name": "Email workflow",
          "minutes": 5,
          "prompt": "- The next weekly export has arrived. Run a change-to-email workflow using the attached weekly_feedback_updates.xlsx and our earlier analysis.\n- Use 29 September 2026 as the new reference date. This file contains changes since the 22 September snapshot, not a replacement dataset.\n- Use event_id and the Processed sheet to skip handled events. Add new reports by report_id, link reports to case_id, and apply status changes without counting them as new reports.\n- Update the Excel summary and director’s brief. Show what changed: new reports, new cases, resolved cases and any change to the three priorities. Preserve the original snapshot for comparison.\n- If there are unprocessed changes, prepare one digest for the reviewer in our operations reference. Include the reporting period, changed case IDs, decisions needed and the updated brief. Use the batch ID in the subject.\n- Record processed event IDs, batch ID, recipient, draft reference and outcome in an Excel workflow log. Check for an existing draft with the same batch ID before preparing another.\n- Run the same batch through the updated log once more as a check. Show that it produces no new rows or email drafts. If there are no new events, stop with No new updates.\n- Reuse this workflow when I upload the next export. Do not activate a timer or assume access to future files.",
          "objective": "Process the new weekly updates, refresh the brief and prepare one change digest without repeating work already done.",
          "resources": [
            {
              "file": "weekly_feedback_updates.xlsx",
              "label": "weekly_feedback_updates.xlsx",
              "hint": "Download and upload before this prompt"
            }
          ],
          "checkpoint": "Check the recipient, content, review status and handling of repeated drafts.",
          "situation": "The following week’s export has arrived with new reports and case-status changes. The team needs to update its position and brief the reviewer once, while retaining the earlier snapshot and avoiding duplicate work if the same batch is uploaded again.",
          "deliverables": [
            "Apply the new events using 29 September 2026 as the reference date, preserving report and case identities.",
            "Update the summary and brief, then prepare one batch-specific change digest for review.",
            "Record processed events and draft outcomes in Excel; rerun the batch to verify that nothing is duplicated."
          ]
        },
        {
          "number": 8,
          "name": "Build a site",
          "minutes": 7,
          "prompt": "- Create a simple team briefing site using the documents, dashboard, graphic and draft email already provided.\n- Include Overview, Explore feedback, Proposed actions and Weekly email sections.\n- Let a colleague filter a town, inspect supporting comments and download the brief.\n- Build it for a municipal coordination meeting, with proposed owners clearly labelled.\n- Show me a clickable preview and check one complete journey from a headline number to its source and recommended action.\n- Handle the technical work yourself; I should only need to open, click and review.\n- Keep the preview private.\n- Include the original photo and annotated copy in the R001 evidence view.\n- Include the step 7 updates and workflow log. Show which input batch was processed, which items were held or skipped, and the draft review status.",
          "objective": "Bring the brief, dashboard, visual evidence and email workflow together in a usable team site.",
          "resources": [],
          "checkpoint": "Try one complete journey and check its downloads.",
          "situation": "The meeting materials now span a brief, spreadsheet, dashboard, photo evidence and email digest. Colleagues need one place to move from an estate issue to its evidence and proposed action without searching through separate outputs.",
          "deliverables": [
            "Build a private team site with overview, feedback exploration, proposed actions and weekly email sections.",
            "Include downloads, the input-batch status and the workflow log.",
            "Check a complete journey from a headline figure to the source comment and recommended action."
          ]
        },
        {
          "number": 9,
          "name": "Create an automation",
          "minutes": 5,
          "prompt": "- Create an automation called Estate feedback morning digest, running every weekday at 9 am Singapore time.\n- Use the Gmail plugin. First ask me to select the label, folder or sender filter containing estate feedback and case updates. Limit the automation to that scope.\n- For each new message, summarise the issue, town or location if stated, case reference, requested action and any deadline. Link to the source email. Flag possible duplicates and urgent issues for my review; do not invent missing details.\n- Group the digest into new issues, case updates and follow-ups. Suggest the next action for each item. Keep the output in my task results; do not send replies or modify the mailbox.\n- Run a first check on the last seven days, show up to 20 relevant messages and flag any remaining backlog. Record processed message IDs and the last successful check. Later runs should cover only unprocessed messages, including the backlog.\n- Notify me only when there are new relevant messages or a failure that needs attention. If access fails, report the coverage gap and keep the last successful checkpoint.\n- Check whether this automation already exists and update it rather than creating a duplicate. Verify that scheduled runs can access the selected email scope and retain the processing log. If either is unavailable, explain what is missing instead of claiming it is running.\n- After creating it, show the saved schedule, next run in Singapore time, source filter and where I can pause it. Include all source and processing instructions in the saved automation.",
          "objective": "Create a weekday automation that reads new estate-related emails from a mailbox folder you select and gives you a concise triage digest with links, priorities and follow-up actions.",
          "resources": [],
          "checkpoint": "Verify the saved schedule, next run, sources and first-run result.",
          "situation": "Estate feedback continues to arrive in email between review meetings. A recurring digest is useful only if it reads a clearly selected mailbox scope, recognises messages already handled and draws attention to new issues or meaningful case updates.",
          "deliverables": [
            "Select an estate-feedback folder, label or sender filter and create a weekday 9 am Singapore-time watch.",
            "Verify the first scan, source links, processing log and handling of any backlog.",
            "Confirm the saved schedule and pause control; subsequent runs should report new relevant messages or access failures."
          ]
        }
      ],
      "stepLabels": [
        "Setup",
        "Introduction",
        "Brainstorm",
        "Document",
        "Data analysis",
        "Dashboard",
        "Visualisation",
        "Email",
        "Build a site",
        "Automation"
      ]
    },
    {
      "id": "grant-review",
      "name": "Grant review",
      "short": "Clearer application reviews",
      "role": "Programme administration",
      "workbook": "grant_applications.xlsx",
      "accent": "#7b6890",
      "description": "Check community-project applications and prepare precise clarifications.",
      "context": "A Community Digital Inclusion Pilot supporting small digital-literacy projects in Singapore. Funding decisions require approval.",
      "sheets": [
        {
          "name": "Applications",
          "rows": 6
        },
        {
          "name": "Attachments",
          "rows": 17
        },
        {
          "name": "Correspondence",
          "rows": 2
        },
        {
          "name": "Data_dictionary",
          "rows": 18
        },
        {
          "name": "Read_me",
          "rows": 7
        }
      ],
      "overview": {
        "role": "Programme officer reviewing applications for the Community Digital Inclusion Pilot.",
        "task": "Prepare six community-project applications for an internal review meeting. Check the scheme requirements against the application documents, flag missing or conflicting information and prepare precise clarification requests. Read a scanned supplier quotation and cross-check its figures against the application.",
        "outputs": [
          "A review guide and evidence-linked Excel register",
          "A dashboard of application status and outstanding checks",
          "A meeting visual and clarification email drafts",
          "An officer workspace for reviewing cases"
        ]
      },
      "baseUrl": "packs/grant-review/",
      "packUrl": "downloads/grant-review.zip",
      "files": [
        "scheme-guide.pdf",
        "applications-dossier.pdf",
        "quotation-G003.png",
        "grant_applications.xlsx",
        "applicant_reply_batch.xlsx"
      ],
      "steps": [
        {
          "number": 0,
          "name": "Setup",
          "minutes": 3,
          "prompt": "",
          "resources": [],
          "checkpoint": "Gmail is connected to the account you will use.",
          "checklist": [
            "In ChatGPT, open Plugins and check whether Gmail is already connected to the account you will use.",
            "If Gmail is already connected, you are ready. Continue to step 1."
          ],
          "connectionSteps": [
            "Search for Gmail in Plugins.",
            "Select Gmail — Read and manage Gmail, as shown below.",
            "Choose Connect or follow the setup option shown. Sign in to the Google account approved for this session and review the requested permissions.",
            "Return to ChatGPT and check that Gmail is connected. Continue to step 1."
          ]
        },
        {
          "number": 1,
          "name": "Introduction",
          "minutes": 2,
          "prompt": "- I am a programme officer preparing six community-project applications for an internal review meeting.\n- Use the attached scheme guide and application dossier for the Community Digital Inclusion Pilot.\n- Read the officer instructions, six review checks and application documents.\n- Explain the six checks and what our reviewer needs to decide next.\n- Keep administrative completeness separate from funding approval.",
          "objective": "Understand the six administrative checks and the decisions the programme officer needs to make.",
          "resources": [
            {
              "file": "scheme-guide.pdf",
              "label": "scheme-guide.pdf",
              "hint": "Download and upload before this prompt"
            },
            {
              "file": "applications-dossier.pdf",
              "label": "applications-dossier.pdf",
              "hint": "Download and upload before this prompt"
            }
          ],
          "checkpoint": "Check the goal, audience and available source documents.",
          "situation": "Six community-project applications are waiting for an internal review meeting. Before assessing individual cases, the programme officer needs a shared understanding of the administrative requirements and the evidence needed to move a case forward.",
          "deliverables": [
            "Read the scheme guide and application dossier and explain all six checks.",
            "Identify the officer’s next decisions and distinguish document completeness from funding approval."
          ]
        },
        {
          "number": 2,
          "name": "Brainstorming",
          "minutes": 4,
          "prompt": "- Read the attached image of quotation QT-G003, including the line items, total, GST wording, date and validity period.\n- Transcribe those fields into a small evidence table and flag any uncertain reading.\n- Compare the scan with G003 in the application dossier; identify any amount or tax-treatment discrepancy with source references.\n- Suggest three ways to organise the six-application review and recommend one that keeps each finding linked to its evidence.\n- Treat this image as another view of QT-G003, not a second quotation.\n- Use image generation to create a landscape review-planning mind map centred on the Community Digital Inclusion Pilot. Show the six checks from the guide, evidence needed and clarification routes, with G003’s amount discrepancy as an example. Use short readable labels and keep administrative review separate from funding approval.\n- Generate the actual image and provide it as a downloadable PNG, with a short text outline alongside it. Check labels against the source material and correct any inaccurate or unreadable text before returning it.",
          "objective": "Read the scanned quotation, compare it with the application and identify discrepancies that need clarification. Generate a visual brainstorm to develop and communicate the options.",
          "resources": [
            {
              "file": "quotation-G003.png",
              "label": "quotation-G003.png",
              "hint": "Download and upload before this prompt"
            }
          ],
          "checkpoint": "Choose a practical approach for the decision you need to support.",
          "situation": "The scanned quotation for G003 provides details that must agree with the application record, including GST treatment and validity. The review team also needs a practical way to organise its checks so discrepancies remain attached to their source evidence.",
          "deliverables": [
            "Extract the quotation fields, record uncertainty and compare them with the G003 application.",
            "Use image generation to create a review-planning mind map around the six checks, required evidence and clarification routes.",
            "Compare three ways to organise the review and recommend one evidence-linked approach."
          ]
        },
        {
          "number": 3,
          "name": "Document",
          "minutes": 3,
          "prompt": "- Create an editable Word review note for the meeting.\n- Include the six checks from the scheme guide, the evidence to record, and the statuses Ready for review, Needs clarification and Unable to determine.\n- Add a compact case-note template and a polite clarification-email template.\n- Cite the relevant guide sections.\n- Leave individual findings pending until we reconcile the register in the next step.\n- Include fields for image source, extracted value and any unresolved reading before a reviewer accepts it.",
          "objective": "Create a consistent review-note template for recording evidence, unresolved issues and clarification requests.",
          "resources": [],
          "checkpoint": "Open the Word document and check its structure.",
          "situation": "Different officers may review different applications, so free-form notes could lead to inconsistent conclusions or missing evidence. A shared template will make it easier to compare cases and write clear clarification requests after reconciliation.",
          "deliverables": [
            "Create an editable Word review note with the six checks, evidence fields and review-status definitions.",
            "Include a compact case-note template, image-reading uncertainty fields and a polite clarification-email template.",
            "Keep individual findings pending until the register is reconciled."
          ]
        },
        {
          "number": 4,
          "name": "Data analysis",
          "minutes": 6,
          "prompt": "- Reconcile the attached Excel register against the application documents in the dossier.\n- For each application, check the six scheme requirements, amounts, dates, signatures and quotation validity.\n- Preserve each source reference and show both values when documents disagree.\n- Treat absent or ambiguous evidence as unresolved rather than inventing a result.\n- Use 22 September 2026 for date comparisons.\n- Return an Excel review table and complete the Word case notes.\n- Highlight which cases can go to the officer and which need clarification, without approving or rejecting funding.\n- Verify one amount discrepancy directly against the source documents.\n- Cross-check the values read from QT-G003 against the application register and dossier; keep one record for the quotation.",
          "objective": "Reconcile all six applications against the scheme rules and source documents, producing a traceable review table.",
          "resources": [
            {
              "file": "grant_applications.xlsx",
              "label": "grant_applications.xlsx",
              "hint": "Download and upload before this prompt"
            }
          ],
          "checkpoint": "Verify one source record, one data-quality issue and one total.",
          "situation": "The application register and supporting documents do not always agree. The officer needs to know which cases are ready for review and which require clarification, with the original values preserved so another colleague can inspect the reasoning.",
          "deliverables": [
            "Reconcile amounts, dates, signatures and quotation validity for all six cases as at 22 September 2026.",
            "Produce an Excel review table and completed Word case notes, with source references for every discrepancy.",
            "Verify one amount mismatch directly against the documents and leave unresolved evidence visible."
          ]
        },
        {
          "number": 5,
          "name": "Dashboard",
          "minutes": 6,
          "prompt": "- Create a review dashboard for the officer, using the findings above.\n- Show the six applications by review status, outstanding issue and time since receipt.\n- Let me choose an application and see the relevant evidence and proposed next action.\n- Keep a place for the officer's correction alongside the original finding.\n- Provide a working preview and show me one case.\n- If a preview is unavailable, give me a filterable Excel review dashboard with an Officer comments column.\n- Explain how to use it without technical instructions.\n- Make the G003 quotation image available beside the application amount for comparison.",
          "objective": "Create a dashboard that helps an officer inspect each application, its outstanding checks and next action.",
          "resources": [],
          "checkpoint": "Try a filter and inspect the evidence behind a number.",
          "situation": "At the review meeting, officers need to focus on outstanding issues without losing access to the underlying documents. They also need to correct a finding while preserving the original assessment and the reason it was made.",
          "deliverables": [
            "Build a dashboard showing review status, outstanding checks and time since receipt.",
            "Provide application-level evidence, proposed next actions and space for officer comments.",
            "Show the G003 quotation beside the application amount and walk through one case."
          ]
        },
        {
          "number": 6,
          "name": "Visualisation",
          "minutes": 4,
          "prompt": "- Create a one-page review visual showing the G003 amount discrepancy.\n- Use an annotated copy of the quotation image beside the application amount and the relevant scheme check.\n- Show the two line items, quoted total, GST treatment and the amount that needs clarification.\n- Keep the original scan unchanged and make all figure labels legible.\n- State the next clarification question without implying that the grant is approved or rejected.\n- Provide a printable PDF or PNG for the review meeting.",
          "objective": "Explain the G003 amount discrepancy in a clear visual for the review meeting.",
          "resources": [],
          "checkpoint": "Check the labels, figures and intended audience.",
          "situation": "The G003 discrepancy needs a clear explanation for colleagues deciding what to ask the applicant. A visual comparison will make the figures and tax treatment easier to inspect than a paragraph of arithmetic.",
          "deliverables": [
            "Annotate a copy of QT-G003 with the two line items, total and GST treatment.",
            "Show the application amount alongside the quotation and the relevant scheme requirement.",
            "Create a printable PDF or PNG with the precise clarification question."
          ]
        },
        {
          "number": 7,
          "name": "Email workflow",
          "minutes": 5,
          "prompt": "- New applicant replies have arrived. Run a reply-triage workflow using the attached applicant_reply_batch.xlsx and our six-application review.\n- Use 29 September 2026 as the reference date. Join each reply to application_id and skip message IDs already in the Processed sheet.\n- Update the correspondence tracker with the new information, outstanding evidence and next officer action. An applicant’s statement is not a replacement quotation or signed form.\n- Pause outstanding chasers for applicants who have replied. Apply the scheme’s seven-day rule to any proposed repeat request, and do not invent a deadline or promise approval.\n- For each new reply, prepare a short acknowledgement addressing its actual question and identifying anything that still needs officer review. Use applicant contacts from the register and put the message ID in the subject.\n- Provide the drafts in Word and an Excel workflow log with message ID, application ID, recipient, action, draft reference and outcome. Keep the previously processed reply out of the new batch.\n- Run the same batch against the updated log as a check: no duplicate acknowledgements or chasers. If no unprocessed replies remain, stop with No new replies.\n- Reuse this workflow when I upload another reply export. Do not schedule a daily run against the unchanged register.",
          "objective": "Process new applicant replies, update the tracker and prepare relevant acknowledgements without duplicate chasing.",
          "resources": [
            {
              "file": "applicant_reply_batch.xlsx",
              "label": "applicant_reply_batch.xlsx",
              "hint": "Download and upload before this prompt"
            }
          ],
          "checkpoint": "Check the recipient, content, review status and handling of repeated drafts.",
          "situation": "Applicants have sent replies to earlier requests. The officer must acknowledge the new information, pause inappropriate chasers and distinguish an applicant’s statement from the replacement evidence needed to resolve a check.",
          "deliverables": [
            "Match new message IDs to applications and update the correspondence tracker as at 29 September 2026.",
            "Prepare relevant acknowledgements and an Excel workflow log, respecting the seven-day repeat-request rule.",
            "Process the batch a second time to verify that it creates no duplicate acknowledgements or chasers."
          ]
        },
        {
          "number": 8,
          "name": "Build a site",
          "minutes": 7,
          "prompt": "- Create a simple application-review site for the officer using our existing outputs.\n- Include a case list, application detail, review guide, meeting graphic and clarification drafts.\n- A reviewer should be able to select a case, inspect the source evidence, record a correction and download the reviewed table.\n- Show a clickable preview and test this using one complete application and one with conflicting amounts.\n- Keep review status separate from grant approval.\n- Handle the technical work yourself; I only want to open, click and review.\n- Keep the preview private.\n- Include the quotation image in G003’s source-evidence view.\n- Include the step 7 updates and workflow log. Show which input batch was processed, which items were held or skipped, and the draft review status.",
          "objective": "Create an officer workspace for reviewing applications, checking source evidence and tracking follow-up drafts.",
          "resources": [],
          "checkpoint": "Try one complete journey and check its downloads.",
          "situation": "Case notes, evidence, outstanding questions and reply drafts are now spread across several outputs. The officer needs a single workspace to inspect a case, make a correction and prepare for the meeting with a clear audit trail.",
          "deliverables": [
            "Build a private application-review site with case detail, source evidence, review guidance and clarification drafts.",
            "Allow corrections and downloads while keeping review status separate from grant approval.",
            "Test one complete case and one case with conflicting amounts, including its latest reply status."
          ]
        },
        {
          "number": 9,
          "name": "Create an automation",
          "minutes": 5,
          "prompt": "- Create an automation called Community funding watch, running every Monday at 9 am Singapore time.\n- Check Tote Board’s grants page at https://www.toteboard.gov.sg/grants/ and the official fund, application and FAQ pages linked from it. Focus on community inclusion, digital access and support for underserved groups.\n- Report up to three newly announced opportunities or material changes to eligibility, required documents, funding conditions or deadlines. Include the source link, publication or update date when available, what changed and its possible relevance to our work. Do not infer that an application is eligible.\n- Keep this as a separate funding-watch digest for my review. Do not change the application scores or scheme rules we used earlier, and do not submit applications or send messages.\n- Run an initial scan now and label it as the baseline. Save the source URLs, observed terms and check date. On later runs compare against the last successful scan; an unchanged page is not a new opportunity. Do not describe an undated item as newly published without evidence.\n- Notify me only about relevant new information, material changes or access failures that need attention. Report unavailable sources and retain their previous checkpoint rather than treating them as unchanged.\n- Check for an existing automation with this purpose before creating one. Verify that scheduled runs can browse these sources and retain a comparison log. If not, explain what is missing instead of claiming the watch is active.\n- Show the saved schedule, next run in Singapore time and where to pause it. Save the full source list, comparison rules and output requirements in the automation.",
          "objective": "Create a weekly automation that finds new or changed community-funding opportunities and grant guidance, then highlights what a programme officer should review.",
          "resources": [],
          "checkpoint": "Verify the saved schedule, next run, sources and first-run result.",
          "situation": "Community funding opportunities and application requirements can change independently of the six cases under review. A weekly watch should help the programme officer spot relevant developments without silently changing the rules used for existing assessments.",
          "deliverables": [
            "Create a Monday 9 am Singapore-time watch of Tote Board grants and linked official application and FAQ pages.",
            "Capture an initial baseline and report only relevant new opportunities or material changes with dated source links.",
            "Verify the schedule, comparison log and pause control, keeping the funding watch separate from case decisions."
          ]
        }
      ],
      "stepLabels": [
        "Setup",
        "Introduction",
        "Brainstorm",
        "Document",
        "Data analysis",
        "Dashboard",
        "Visualisation",
        "Email",
        "Build a site",
        "Automation"
      ]
    },
    {
      "id": "scam-education",
      "name": "Scam education",
      "short": "More confident residents",
      "role": "Community outreach",
      "workbook": "scam_learning.xlsx",
      "accent": "#a36d3d",
      "description": "Use practice-quiz results to build a focused scam-awareness session.",
      "context": "A outreach team preparing sessions at community clubs in Bedok and Woodlands. Use ScamShield references, Singapore English, and optional Simplified Chinese draft material.",
      "sheets": [
        {
          "name": "Attempts",
          "rows": 203
        },
        {
          "name": "Questions",
          "rows": 5
        },
        {
          "name": "Messages",
          "rows": 8
        },
        {
          "name": "Data_dictionary",
          "rows": 21
        },
        {
          "name": "Read_me",
          "rows": 9
        }
      ],
      "overview": {
        "role": "Community outreach coordinator planning sessions for older residents in Bedok and Woodlands.",
        "task": "Use practice-quiz responses to identify topics residents need help with. Prepare an accessible scam-awareness session that helps people pause, check independently and take appropriate next steps. Interpret message screenshots and use their visible clues as teaching examples.",
        "outputs": [
          "A facilitator guide and resident takeaway",
          "An Excel analysis and learning dashboard",
          "A teaching visual and organiser email drafts",
          "A mobile-friendly learning site with a five-question activity"
        ]
      },
      "baseUrl": "packs/scam-education/",
      "packUrl": "downloads/scam-education.zip",
      "files": [
        "session-plan.docx",
        "advice-reference.pdf",
        "message-screenshots.png",
        "scam_learning.xlsx",
        "new_session_results.xlsx"
      ],
      "steps": [
        {
          "number": 0,
          "name": "Setup",
          "minutes": 3,
          "prompt": "",
          "resources": [],
          "checkpoint": "Gmail is connected to the account you will use.",
          "checklist": [
            "In ChatGPT, open Plugins and check whether Gmail is already connected to the account you will use.",
            "If Gmail is already connected, you are ready. Continue to step 1."
          ],
          "connectionSteps": [
            "Search for Gmail in Plugins.",
            "Select Gmail — Read and manage Gmail, as shown below.",
            "Choose Connect or follow the setup option shown. Sign in to the Google account approved for this session and review the requested permissions.",
            "Return to ChatGPT and check that Gmail is connected. Continue to step 1."
          ]
        },
        {
          "number": 1,
          "name": "Introduction",
          "minutes": 2,
          "prompt": "- I coordinate community outreach and need a practical scam-awareness session for older residents at community clubs in Bedok and Woodlands.\n- Read the attached session plan and scam-awareness reference notes.\n- Summarise the audience's needs and the learning objective in five bullets.",
          "objective": "Understand the residents’ learning needs and the goal of the community scam-awareness session.",
          "resources": [
            {
              "file": "session-plan.docx",
              "label": "session-plan.docx",
              "hint": "Download and upload before this prompt"
            },
            {
              "file": "advice-reference.pdf",
              "label": "advice-reference.pdf",
              "hint": "Download and upload before this prompt"
            }
          ],
          "checkpoint": "Check the goal, audience and available source documents.",
          "situation": "Community clubs in Bedok and Woodlands are preparing scam-awareness sessions for older residents with different levels of digital confidence. The organiser needs practical teaching priorities that help residents act on a suspicious message without feeling blamed or overwhelmed.",
          "deliverables": [
            "Read the session plan and advisory notes, then summarise audience needs and learning objectives.",
            "Identify what residents should be able to notice, check and do after the session."
          ]
        },
        {
          "number": 2,
          "name": "Brainstorming",
          "minutes": 4,
          "prompt": "- Read all three messages in the attached screenshot sheet, including sender displays and requested actions.\n- For M1, M2 and M3, quote the relevant wording, identify warning signs or uncertainty, and suggest a sensible next action.\n- Do not infer that a sender is genuine from a display name or professional presentation.\n- Suggest three ways to teach these examples to older residents with different levels of digital confidence.\n- Recommend a five-question activity and one printed takeaway; include independent verification for the ambiguous message.\n- Use image generation to create a landscape facilitator brainstorm map centred on helping residents pause and check a message. Connect M1–M3 to warning signs or uncertainty, three teaching approaches, discussion questions and the printed takeaway. Use large readable labels and highlight independent verification for M3.\n- Generate the actual image and provide it as a downloadable PNG, with a short text outline alongside it. Check labels against the source material and correct any inaccurate or unreadable text before returning it.",
          "objective": "Read the message screenshots, identify warning signs and choose an accessible teaching approach. Generate a visual brainstorm to develop and communicate the options.",
          "resources": [
            {
              "file": "message-screenshots.png",
              "label": "message-screenshots.png",
              "hint": "Download and upload before this prompt"
            }
          ],
          "checkpoint": "Choose a practical approach for the decision you need to support.",
          "situation": "The facilitator has three message screenshots to discuss, including an ambiguous reminder. The challenge is to teach a repeatable checking habit rather than treating a familiar display name or polished presentation as proof that a message is safe.",
          "deliverables": [
            "Read M1–M3, identify warning signs or uncertainty and propose sensible next actions.",
            "Use image generation to create a facilitator brainstorm map connecting the messages to teaching methods, discussion questions and a printed takeaway.",
            "Recommend a five-question activity suited to different levels of digital confidence."
          ]
        },
        {
          "number": 3,
          "name": "Document",
          "minutes": 3,
          "prompt": "- Create an editable Word facilitator guide and a one-page resident takeaway using the supplied advisory notes.\n- Explain the warning signs and sensible next actions in clear, calm language.\n- Include the five-question activity structure and links to the relevant official sources.\n- Leave the teaching priorities open until we examine the quiz results.\n- Use large readable text for the resident sheet and avoid blaming someone for a wrong answer.\n- Use examples from the screenshot sheet and retain the message IDs M1–M3 so a facilitator can find the source.",
          "objective": "Create a facilitator guide and resident takeaway that explain warning signs and practical next actions.",
          "resources": [],
          "checkpoint": "Open the Word document and check its structure.",
          "situation": "The facilitator needs a usable running guide and residents need a simple sheet to take home. These materials must stay faithful to the advisory sources, while leaving room to adjust teaching priorities once the quiz results are analysed.",
          "deliverables": [
            "Create an editable Word facilitator guide and a separate one-page resident takeaway.",
            "Include the five-question activity, practical protective actions and official source links.",
            "Use large text, supportive language and message IDs so examples can be traced back to the screenshots."
          ]
        },
        {
          "number": 4,
          "name": "Data analysis",
          "minutes": 6,
          "prompt": "- Analyse the attached Excel quiz results.\n- Check repeated response IDs, missing answers, question mappings and partially completed sessions.\n- Show completion and question accuracy with clear denominators, listing unanswered items separately.\n- Identify the three concepts that most need reinforcement in these results.\n- Return an Excel summary and update the Word facilitator guide to address those gaps.\n- Verify one question's percentage against its original responses.\n- Do not claim the workshop caused improvement: we have no before-and-after comparison.\n- Match the learning gaps to relevant screenshot examples; keep the three messages separate from learner response counts.",
          "objective": "Analyse the quiz results to identify learning gaps and use them to improve the facilitator guide.",
          "resources": [
            {
              "file": "scam_learning.xlsx",
              "label": "scam_learning.xlsx",
              "hint": "Download and upload before this prompt"
            }
          ],
          "checkpoint": "Verify one source record, one data-quality issue and one total.",
          "situation": "Quiz responses are available, but repeated IDs, blank answers and incomplete sessions can make headline percentages misleading. The organiser needs to identify concepts to reinforce without overstating what the results say about learning or residents in either town.",
          "deliverables": [
            "Check response quality and report completion and question accuracy with explicit denominators.",
            "Produce an Excel summary identifying the three concepts most in need of reinforcement.",
            "Update the facilitator guide and verify one percentage against the original responses."
          ]
        },
        {
          "number": 5,
          "name": "Dashboard",
          "minutes": 6,
          "prompt": "- Create an organiser dashboard showing participation, completion and commonly missed warning signs.\n- Let the organiser filter by community-club session and question, with anonymous response detail available.\n- Every percentage must show its denominator.\n- Include a short recommendation for what to emphasise at the next session.\n- Provide a working preview and show me one filter.\n- If that is unavailable, provide a filterable Excel dashboard with clear charts.\n- Explain the result in plain language.\n- Add relevant message examples as teaching references, with their M1–M3 identifiers.",
          "objective": "Build an organiser dashboard showing participation, completion and the concepts that need reinforcement.",
          "resources": [],
          "checkpoint": "Try a filter and inspect the evidence behind a number.",
          "situation": "The organiser needs to plan the next session and explain the priorities to facilitators. They should be able to compare sessions and questions, inspect anonymous response detail and see how a learning gap connects to a useful message example.",
          "deliverables": [
            "Create a dashboard with session and question filters, participation counts and completion measures.",
            "Show a denominator for every percentage and link learning gaps to M1–M3 teaching examples.",
            "Demonstrate one filter and give a practical recommendation for the next session."
          ]
        },
        {
          "number": 6,
          "name": "Visualisation",
          "minutes": 4,
          "prompt": "- Create a large-text teaching visual for the most-missed warning sign.\n- Annotate one of the supplied message screenshots with the clues to notice, the next sensible action and its advisory source.\n- Show an English version and a Singapore Simplified Chinese draft using the terminology in the session plan.\n- Label the Chinese version For bilingual review.\n- Do not imply that a professional-looking message is safe.\n- Provide the visual as a PNG or PDF suitable for printing or showing on screen.\n- Keep the original screenshot unchanged and label the extracted wording accurately.",
          "objective": "Create a large-text teaching visual using a message screenshot, with an English version and a Chinese draft for review.",
          "resources": [],
          "checkpoint": "Check the labels, figures and intended audience.",
          "situation": "One warning sign is commonly missed in the quiz results. A large-text visual can help the facilitator slow down the discussion and show exactly what to notice and what action to take, using a message residents have already seen.",
          "deliverables": [
            "Annotate a message screenshot with the relevant clue, protective action and advisory source.",
            "Create an English version and a Simplified Chinese version for bilingual review.",
            "Provide a printable or screen-ready PNG or PDF while keeping the original screenshot unchanged."
          ]
        },
        {
          "number": 7,
          "name": "Email workflow",
          "minutes": 5,
          "prompt": "- A new outreach session has finished. Run a session-closeout workflow using the attached new_session_results.xlsx and the question key already provided.\n- Read the Sessions sheet. Process only completed sessions whose session_id and results_version are absent from the Processed sheet; hold sessions still in progress.\n- For each eligible session, check duplicate attempt IDs, blank answers and question mappings. Use session_id plus learner_id to count learners; do not merge people across sessions.\n- Calculate participation, completion, answered-item accuracy and unanswered counts with clear denominators. Update the organiser dashboard and the next-session teaching priorities; do not claim a causal improvement over earlier cohorts.\n- Prepare one email per newly completed session for its listed organiser. Include the three topics to reinforce and the relevant takeaway and visual. Put the session ID and results version in the subject; exclude individual learner records.\n- Return the drafts in Word and an Excel workflow log recording session ID, results version, completion date, recipient, draft reference and outcome. Explain why the ongoing session is held.\n- Repeat the eligibility check using the updated log: the completed session must not generate a second email. If no newly completed sessions remain, stop with No new completed sessions.\n- Reuse this workflow when I upload results after another session. Do not create a recurring email from the same quiz results.",
          "objective": "Process results from a newly completed session and prepare its organiser summary, holding incomplete sessions and avoiding duplicates.",
          "resources": [
            {
              "file": "new_session_results.xlsx",
              "label": "new_session_results.xlsx",
              "hint": "Download and upload before this prompt"
            }
          ],
          "checkpoint": "Check the recipient, content, review status and handling of repeated drafts.",
          "situation": "Another outreach session has finished, while other sessions may still be in progress. The organiser needs a closeout summary only when results are complete, using session and results-version identifiers to prevent repeated emails or accidental merging of learners across sessions.",
          "deliverables": [
            "Process eligible completed sessions and hold unfinished or already processed results.",
            "Update the dashboard and teaching priorities, then prepare one organiser email per newly completed session.",
            "Log the outcome in Excel and rerun the eligibility check to verify that no second email is created."
          ]
        },
        {
          "number": 8,
          "name": "Build a site",
          "minutes": 7,
          "prompt": "- Build a simple mobile-friendly learning site from our guide, practice messages and teaching visual.\n- Include a five-question activity with supportive explanations, an independently-check-the-sender example, and links to official advice.\n- Keep organiser results separate from the resident activity.\n- Use large text, clear buttons and keyboard navigation.\n- Show a clickable preview and test every answer option and the takeaway download.\n- Any Chinese content remains a draft for bilingual review.\n- Handle the technical work yourself; I should only need to open and click.\n- Do not imply the site checks real messages for scams.\n- Keep it private.\n- Use the supplied screenshots with their message IDs in the activities.\n- Include the step 7 updates and workflow log. Show which input batch was processed, which items were held or skipped, and the draft review status.",
          "objective": "Create an accessible learning site with practice questions, explanations and takeaways, keeping organiser results separate.",
          "resources": [],
          "checkpoint": "Try one complete journey and check its downloads.",
          "situation": "Residents need a simple place to practise after the session, while organisers still need access to their own results. The site should make the learning activity easy to use on a phone and keep organiser information separate from resident-facing content.",
          "deliverables": [
            "Build a mobile-friendly site with a five-question activity, supportive explanations and official advice links.",
            "Include accessible text, clear controls and takeaway downloads.",
            "Test every answer option and the download, retaining bilingual review labels where needed."
          ]
        },
        {
          "number": 9,
          "name": "Create an automation",
          "minutes": 5,
          "prompt": "- Create an automation called Scam-awareness teaching update, running every Wednesday at 9 am Singapore time.\n- Check https://www.scamshield.gov.sg/ for new scam advisories, scam trends and Monthly Scams Bulletins. Follow the official advisory links and prioritise information useful to older residents.\n- For each meaningful new warning, explain the scam approach, two warning signs and the recommended protective action. Cite the official source and its date. Keep allegations and advice faithful to the source.\n- Choose one warning relevant to our learning gaps and draft a five-minute teaching activity with a short scenario, two discussion questions and suggested answers. Keep it for facilitator review; do not publish it or message residents.\n- Run an initial scan of items from the last 30 days and record it as the baseline. Store source URLs, dates and the points already covered. Later runs should report only new advisories or substantive updates, without repeating the same warning from several pages.\n- Notify me only when there is a useful update or a source-access failure that needs attention. Do not create a new activity just to fill a quiet week. Preserve the last successful checkpoint for any unavailable source.\n- Reuse an existing automation with this purpose if one exists. Check that scheduled runs can browse the sources and retain the comparison log. If unsupported, explain the gap rather than claiming it is active.\n- Show the saved schedule, next run in Singapore time and pause control. Include the audience, learning topics identified here, source list and output instructions in the saved task so it can run independently.",
          "objective": "Create a weekly automation that checks official scam updates and prepares one timely teaching example for the next community session.",
          "resources": [],
          "checkpoint": "Verify the saved schedule, next run, sources and first-run result.",
          "situation": "Scam approaches change between community sessions. The facilitator needs a recurring check of official updates that turns a useful new warning into a short teaching activity, rather than recycling the same message or filling a quiet week with unnecessary content.",
          "deliverables": [
            "Create a Wednesday 9 am Singapore-time watch of ScamShield advisories and bulletins.",
            "Establish a baseline, then draft a five-minute activity only when a relevant new or materially updated warning appears.",
            "Verify sources, comparison history, saved schedule and pause control before relying on future runs."
          ]
        }
      ],
      "stepLabels": [
        "Setup",
        "Introduction",
        "Brainstorm",
        "Document",
        "Data analysis",
        "Dashboard",
        "Visualisation",
        "Email",
        "Build a site",
        "Automation"
      ]
    },
    {
      "id": "jc-economics",
      "name": "JC Economics",
      "short": "A next step for every student",
      "role": "JC1 H2 Economics",
      "workbook": "economics_responses.xlsx",
      "accent": "#567da0",
      "description": "Create personalised economics practice from each student’s written answers.",
      "context": "A JC1 H2 Economics class studying imported food costs, elasticity and government intervention in Singapore. Use the case-study extracts and marking guidance.",
      "sheets": [
        {
          "name": "Responses",
          "rows": 49
        },
        {
          "name": "Questions",
          "rows": 4
        },
        {
          "name": "Market_model",
          "rows": 7
        },
        {
          "name": "Data_dictionary",
          "rows": 14
        },
        {
          "name": "Read_me",
          "rows": 7
        }
      ],
      "overview": {
        "role": "JC1 H2 Economics teacher preparing the next tutorial for a class of twelve students.",
        "task": "Review students’ written answers about imported food costs, heartland meal prices and government intervention. Identify each student’s strengths and learning needs, then tailor practice materials to their response evidence. Read a student’s handwritten script and graph alongside the response transcript.",
        "outputs": [
          "A tutorial plan and twelve personalised learning packs",
          "An Excel class summary and progress dashboard",
          "An economic diagram and individual feedback email drafts",
          "A teacher workspace for reviewing and downloading materials"
        ]
      },
      "baseUrl": "packs/jc-economics/",
      "packUrl": "downloads/jc-economics.zip",
      "files": [
        "case-study.pdf",
        "teacher-guide.docx",
        "student-S07-E1.png",
        "economics_responses.xlsx",
        "revised_student_answers.xlsx"
      ],
      "steps": [
        {
          "number": 0,
          "name": "Setup",
          "minutes": 3,
          "prompt": "",
          "resources": [],
          "checkpoint": "Gmail is connected to the account you will use.",
          "checklist": [
            "In ChatGPT, open Plugins and check whether Gmail is already connected to the account you will use.",
            "If Gmail is already connected, you are ready. Continue to step 1."
          ],
          "connectionSteps": [
            "Search for Gmail in Plugins.",
            "Select Gmail — Read and manage Gmail, as shown below.",
            "Choose Connect or follow the setup option shown. Sign in to the Google account approved for this session and review the requested permissions.",
            "Return to ChatGPT and check that Gmail is connected. Continue to step 1."
          ]
        },
        {
          "number": 1,
          "name": "Introduction",
          "minutes": 2,
          "prompt": "- I teach JC1 H2 Economics in Singapore.\n- My class has answered a case study on imported food costs, heartland meal prices and government intervention.\n- Read the attached case-study paper and teacher marking guide.\n- Summarise the learning objectives and what good economic reasoning looks like.\n- Prepare materials for my next tutorial, with teacher review of all feedback.",
          "objective": "Understand the H2 Economics learning objectives and the reasoning expected in the case-study answers.",
          "resources": [
            {
              "file": "case-study.pdf",
              "label": "case-study.pdf",
              "hint": "Download and upload before this prompt"
            },
            {
              "file": "teacher-guide.docx",
              "label": "teacher-guide.docx",
              "hint": "Download and upload before this prompt"
            }
          ],
          "checkpoint": "Check the goal, audience and available source documents.",
          "situation": "A JC1 H2 Economics class has completed a case study on imported food costs, heartland meal prices and government intervention. The teacher is preparing the next tutorial and needs to connect feedback to the reasoning expected in the case and marking guide.",
          "deliverables": [
            "Read the case paper and teacher guide and summarise the learning objectives.",
            "Explain what strong economic reasoning would show, including correct use of evidence, diagrams and evaluation."
          ]
        },
        {
          "number": 2,
          "name": "Brainstorming",
          "minutes": 4,
          "prompt": "- Read the attached handwritten response and diagram for S07-E1 against the case paper and marking guide.\n- Transcribe the answer, describe the axes, curve and movement from A to B, and flag anything unclear.\n- Explain where the written claim and diagram agree or conflict, and what this shows about movement along a curve versus a shift.\n- Suggest three targeted follow-up activities and recommend a 15-minute learning-pack structure with feedback, a worked example, practice and an exit ticket.\n- Keep the judgement specific to this answer; do not infer ability or effort from handwriting.\n- Treat the image and spreadsheet transcript as the same response when we analyse the class.\n- Use image generation to create a landscape teacher-planning mind map centred on S07’s next 15 minutes of learning. Connect the answer evidence, movement-versus-shift confusion, three follow-up activities, a worked example and the exit ticket. Use concise readable labels and keep feedback specific to the response.\n- Generate the actual image and provide it as a downloadable PNG, with a short text outline alongside it. Check labels against the source material and correct any inaccurate or unreadable text before returning it.",
          "objective": "Read S07’s handwritten answer and diagram, diagnose the specific reasoning gap and choose targeted follow-up activities. Generate a visual brainstorm to develop and communicate the options.",
          "resources": [
            {
              "file": "student-S07-E1.png",
              "label": "student-S07-E1.png",
              "hint": "Download and upload before this prompt"
            }
          ],
          "checkpoint": "Choose a practical approach for the decision you need to support.",
          "situation": "S07’s written response and diagram need to be read together to understand a possible confusion between a movement along a curve and a shift. The teacher wants a focused follow-up activity that addresses the answer itself and fits into a short tutorial segment.",
          "deliverables": [
            "Transcribe S07-E1, inspect the diagram and identify where the written reasoning and graph agree or conflict.",
            "Use image generation to create a teacher planning mind map connecting answer evidence, the reasoning gap and three targeted follow-up activities.",
            "Recommend a 15-minute learning-pack structure with feedback, a worked example, practice and an exit ticket."
          ]
        },
        {
          "number": 3,
          "name": "Document",
          "minutes": 3,
          "prompt": "- Create a Word template for an individual student's learning pack and a separate teacher answer-key template.\n- Include What you did well, One thing to improve, a targeted explanation or worked example, three practice questions and an exit ticket.\n- Use the case and H2 rubric already attached.\n- Keep feedback specific to an answer rather than labelling a student's ability.\n- Leave student-specific content blank until we analyse the responses.\n- Design it to print clearly for a tutorial.\n- Include a place for a student’s original diagram, one evidence-based feedback point and a corrected worked example.",
          "objective": "Design an individual learning-pack template and a separate teacher answer key for the next tutorial.",
          "resources": [],
          "checkpoint": "Open the Word document and check its structure.",
          "situation": "Each student will need material suited to their own response, but the teacher needs a consistent structure that is easy to review and print. Preparing the template first will make it easier to compare the quality of the personalised feedback later.",
          "deliverables": [
            "Create an editable Word student learning-pack template with a strength, improvement point, worked example, three practice questions and an exit ticket.",
            "Provide a separate teacher answer-key template and space for original diagram evidence.",
            "Leave student-specific judgements blank until the class responses are analysed."
          ]
        },
        {
          "number": 4,
          "name": "Data analysis",
          "minutes": 6,
          "prompt": "- Read the attached responses spreadsheet against the case and rubric already provided.\n- Check duplicates, blank answers and question IDs.\n- For each of the 12 students, identify a demonstrated strength and one priority for the next tutorial, quoting short evidence from their answers.\n- Accept valid alternative arguments; a blank is insufficient evidence, not a misconception.\n- Produce an Excel teacher summary, then fill our Word template with a concise personalised learning pack for each student.\n- Tailor examples and practice to the evidence, with extension for stronger answers.\n- Keep teacher answers in a separate Word document.\n- Show two contrasting student packs first so I can check the differentiation.\n- Mark all feedback Draft for teacher review.\n- For S07-E1, combine the handwritten graph evidence with its transcript without adding another student or response; use it to tailor S07’s practice.",
          "objective": "Analyse the class responses and create personalised learning packs grounded in each student’s demonstrated needs.",
          "resources": [
            {
              "file": "economics_responses.xlsx",
              "label": "economics_responses.xlsx",
              "hint": "Download and upload before this prompt"
            }
          ],
          "checkpoint": "Verify one source record, one data-quality issue and one total.",
          "situation": "The spreadsheet contains responses from twelve students with different strengths and gaps. The next tutorial should respond to what each answer demonstrates, including valid alternative arguments and blanks that provide too little evidence for a judgement.",
          "deliverables": [
            "Check response quality and create an Excel teacher summary with answer excerpts supporting each proposed next step.",
            "Produce personalised Word learning packs for all twelve students, with targeted explanations, practice and suitable extension.",
            "Show two contrasting packs first and keep teacher answers separate from student copies."
          ]
        },
        {
          "number": 5,
          "name": "Dashboard",
          "minutes": 6,
          "prompt": "- Create a teacher dashboard showing class learning needs and each student's supporting answer excerpts, proposed next step and personalised pack.\n- Let me select a student and inspect the evidence.\n- Include a simple way to record my review or correction; keep student copies separate from teacher answers and class records.\n- Show a working preview, or a filterable Excel teacher dashboard if a preview is unavailable.\n- Show two students with different needs and explain the next teaching action for each.\n- Let me compare S07’s original diagram with the proposed explanation and pack.",
          "objective": "Create a teacher dashboard for inspecting student evidence, reviewing feedback and accessing individual packs.",
          "resources": [],
          "checkpoint": "Try a filter and inspect the evidence behind a number.",
          "situation": "The teacher needs to review the proposed feedback before distributing materials. A dashboard should make it easy to move from a class-level need to an individual answer, correct the suggested response and find the relevant learning pack.",
          "deliverables": [
            "Create a teacher dashboard with student selection, source excerpts and pack access.",
            "Include a review or correction field and keep teacher-only material separate.",
            "Walk through two students with different needs, including S07’s diagram evidence."
          ]
        },
        {
          "number": 6,
          "name": "Visualisation",
          "minutes": 4,
          "prompt": "- Create an annotated demand-and-supply diagram for students who need help with the input-cost increase and a binding price ceiling.\n- Use the market-model data already attached, with price in SGD and quantity in hundreds of meals per day.\n- Show the original and new equilibrium, the S$5 ceiling, quantities demanded and supplied, and the shortage.\n- Check the values against the teaching notes.\n- Add a short reasoning question, place the diagram in the relevant learning packs, and offer a printable PDF or image.\n- Keep teacher answers separate.\n- Include a side-by-side teaching panel with S07’s original diagram and the corrected model, explaining the specific difference; use this only in S07’s pack and the teacher copy.",
          "objective": "Build a clear economic diagram explaining the cost increase and price ceiling, with targeted support for S07.",
          "resources": [],
          "checkpoint": "Check the labels, figures and intended audience.",
          "situation": "Students need to connect a rise in input costs with the supply shift, the new equilibrium and the effect of a binding price ceiling. The teacher wants a diagram that explains this sequence with the case’s model values and targets S07’s specific confusion.",
          "deliverables": [
            "Create and check an annotated demand-and-supply diagram with SGD prices, quantities, the S$5 ceiling and the shortage.",
            "Add a reasoning question and insert the visual into the relevant learning packs.",
            "Compare S07’s original diagram with the corrected model only in S07’s pack and the teacher copy."
          ]
        },
        {
          "number": 7,
          "name": "Email workflow",
          "minutes": 5,
          "prompt": "- Students have submitted revised answers after the tutorial. Run a feedback-update workflow using the attached revised_student_answers.xlsx and our earlier H2 Economics analysis.\n- Match each submission to its student and question, and skip submission IDs already in the Processed sheet. Preserve the first attempt as historical evidence; do not add students to the class count.\n- For each new revision, compare the reasoning with the original answer and teacher rubric. Quote what improved, what remains unresolved and one useful next step; do not infer a misconception from a blank.\n- Update only those students’ learning packs to v2, tailoring the explanation and practice to the revised answer. Keep teacher answers separate and all new feedback pending teacher review.\n- Prepare one encouraging email per updated student using the teacher-guide contacts. Refer only to that student’s revised pack and next step; put the student ID and pack version in the subject.\n- Return Word drafts and an Excel workflow log containing submission ID, student ID, old and new pack versions, recipient, draft reference and review status. Leave students without new submissions unchanged.\n- Recheck the same submissions against the updated log: do not create another pack version or email. If nothing new remains, stop with No new submissions.\n- Reuse this workflow when I upload another set of revised answers. Do not schedule a daily batch against the same student responses.",
          "objective": "Assess newly revised answers, update only the affected students’ packs and prepare feedback drafts without duplicate versions.",
          "resources": [
            {
              "file": "revised_student_answers.xlsx",
              "label": "revised_student_answers.xlsx",
              "hint": "Download and upload before this prompt"
            }
          ],
          "checkpoint": "Check the recipient, content, review status and handling of repeated drafts.",
          "situation": "Students have submitted revised answers after the tutorial. The teacher needs to recognise changes in reasoning and update the affected materials without overwriting first attempts, generating new packs for unchanged students or sending unreviewed feedback.",
          "deliverables": [
            "Match new submission IDs to students and questions, comparing revised reasoning with the original answer and rubric.",
            "Update affected packs to v2 and prepare individual feedback email drafts for teacher review.",
            "Record versions and outcomes in Excel, then repeat the check to confirm that no duplicate pack or draft appears."
          ]
        },
        {
          "number": 8,
          "name": "Build a site",
          "minutes": 7,
          "prompt": "- Create a simple teacher workspace using our class summary, learning packs, diagram and draft emails.\n- Include a class overview, individual pack previews, print/download buttons and a teacher-only review queue.\n- Show a clickable preview and walk through two contrasting students.\n- Let me revise a feedback item and update its pack, keeping it pending teacher review.\n- Handle the technical work yourself; I only want to open, click and review.\n- Keep the preview private and teacher answers out of student downloads.\n- Keep S07’s original script beside the proposed feedback in the teacher evidence view.\n- Include the step 7 updates and workflow log. Show which input batch was processed, which items were held or skipped, and the draft review status.",
          "objective": "Create a teacher workspace for reviewing, revising and downloading individual materials while keeping teacher answers separate.",
          "resources": [],
          "checkpoint": "Try one complete journey and check its downloads.",
          "situation": "The teacher now has class findings, individual packs, diagrams and feedback drafts to manage. A private workspace should support review and revision while ensuring that students’ downloads contain only their own learning materials.",
          "deliverables": [
            "Build a class overview, individual pack previews, downloads and a teacher review queue.",
            "Allow a feedback correction to update the relevant pack while retaining its review status.",
            "Check two contrasting student journeys and confirm that teacher answers are excluded from student downloads."
          ]
        },
        {
          "number": 9,
          "name": "Create an automation",
          "minutes": 5,
          "prompt": "- Create an automation called H2 Economics in the news, running every Friday at 3 pm Singapore time.\n- Check SingStat’s publications and resources at https://www.singstat.gov.sg/publication-resources?resourceType=Reports and MTI’s Economic Survey at https://www.mti.gov.sg/resources/economic-survey-of-singapore/. Follow the official links to new releases about consumer prices, food costs, trade and economic growth.\n- Select up to two new or materially revised releases relevant to demand and supply, elasticity, costs or government intervention. Cite the source, publication date and data period; distinguish monthly from annual changes and revised from earlier figures.\n- Turn the strongest example into a ten-minute activity: a short factual extract, three questions of increasing difficulty, a diagram task where appropriate and a separate teacher answer guide. Add one scaffold for shift-versus-movement confusion and one evaluation extension. Do not force a causal explanation that the source does not support.\n- Keep the activity for my review rather than distributing it to students. Use class-level learning needs, without saving individual student answers or personal details in the automation.\n- Run an initial scan of releases from the last 30 days and save a baseline of URLs, release dates and figures used. Future runs should identify new releases or substantive revisions since the last successful check. Stay quiet if nothing relevant changed; report source-access failures and retain their previous checkpoints.\n- Reuse an existing automation with this purpose if one exists. Check that scheduled runs can browse the sources and retain the comparison log. If unsupported, explain what is missing rather than claiming it is active.\n- Show the saved schedule, next run in Singapore time and where to pause it. Include the topic focus, source list and output instructions in the saved automation.",
          "objective": "Create a weekly automation that turns new official Singapore economic releases into a short JC H2 Economics activity relevant to the class’s learning needs.",
          "resources": [],
          "checkpoint": "Verify the saved schedule, next run, sources and first-run result.",
          "situation": "New Singapore economic releases can supply relevant examples for later tutorials. The teacher needs a weekly watch that selects useful developments, connects them to class-level learning needs and prepares a short activity with a separate answer guide.",
          "deliverables": [
            "Create a Friday 3 pm Singapore-time watch of the specified SingStat and MTI sources.",
            "Establish a baseline and turn a relevant new or revised release into a ten-minute activity with a scaffold and an evaluation extension.",
            "Verify source dates, data periods, saved schedule and pause control, without including individual student information."
          ]
        }
      ],
      "stepLabels": [
        "Setup",
        "Introduction",
        "Brainstorm",
        "Document",
        "Data analysis",
        "Dashboard",
        "Visualisation",
        "Email",
        "Build a site",
        "Automation"
      ]
    },
    {
      "id": "advanced-api",
      "kind": "api",
      "name": "Advanced API",
      "short": "Customer query assistant",
      "description": "Use OpenAI APIs to answer and route customer queries through text, generated images and GPT-Live voice.",
      "baseUrl": "packs/advanced-api/",
      "packUrl": "downloads/advanced-api.zip",
      "stepLabels": [
        "Setup",
        "Build the assistant"
      ],
      "overview": {
        "role": "Customer-support lead improving how a service organisation handles enquiries.",
        "task": "Your support team repeatedly answers questions about accounts, invoices, bookings and uploads. Build one assistant that helps customers in text or live voice, creates visual guidance and gives staff enough context to handle unresolved requests. Use the supplied database, team directory and your OpenAI API key; Codex handles the code.",
        "context": [
          "Today, staff search the same FAQs, retype instructions and manually decide which team should respond. Customers repeat their problem when a case is handed over.",
          "The starting data contains ten knowledge records, five support teams and twelve checks covering text, images and live voice. There is no existing support application to connect.",
          "Customers need clear answers; support staff need the correct team, source evidence and a short handoff summary. Keep the queue inside the application for review.",
          "Example journey: a customer asks why an 18 MB PDF upload fails. The assistant checks the 10 MB limit, explains it, generates a visual help card and routes a continuing problem to Technical Support."
        ],
        "success": [
          "A typed query produces an answer tied to a database record, or an honest request for clarification.",
          "A real generated help image can be downloaded and revised without changing the source rules.",
          "A customer can speak live, add a detail while the assistant talks and receive an answer based on the same database.",
          "Staff can review the team assignment and handoff summary. Ending voice stops the microphone and closes the session."
        ],
        "outputs": [
          "Text answers and routing with the Responses API",
          "Generated visual help cards with GPT Image",
          "Live voice conversations with GPT-Live",
          "One review queue with source references and handoff summaries"
        ]
      },
      "steps": [
        {
          "number": 0,
          "name": "API setup",
          "minutes": 5,
          "prompt": "",
          "resources": [],
          "setupType": "api",
          "setupSections": [
            {
              "title": "Before you begin",
              "items": [
                "Open a Codex workspace that can run an application. Complete API setup before the exercise.",
                "Check that your approved API project has billing or credits and access to Responses, GPT Image and GPT-Live. Resolve any model-access or organisation-verification requirements before starting. API usage is billed separately from ChatGPT.",
                "Use secure setup to choose an authorised key or create one. Confirm where it will be stored; never paste it into chat or this website.",
                "Keep OPENAI_API_KEY on the application server, outside browser code and source control.",
                "Have a microphone and headphones ready. Use a browser on HTTPS or localhost and allow microphone access when starting voice.",
                "Agree limits for text requests, generated images and live voice minutes with the facilitator. End voice sessions after testing; voice duration and backend work are billed separately."
              ]
            }
          ],
          "references": [
            {
              "label": "API quickstart",
              "url": "https://developers.openai.com/api/docs/quickstart"
            },
            {
              "label": "Image generation",
              "url": "https://developers.openai.com/api/docs/guides/image-generation"
            },
            {
              "label": "GPT-Live",
              "url": "https://developers.openai.com/api/docs/guides/live"
            },
            {
              "label": "API key safety",
              "url": "https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety"
            }
          ]
        },
        {
          "number": 1,
          "name": "Build a customer-query assistant",
          "minutes": 45,
          "objective": "Given a customer-service database and team directory, build an assistant using OpenAI APIs that answers and routes queries, generates visual help cards and lets customers speak with it live using GPT-Live.",
          "prompt": "- I lead customer support for an organisation handling account access, invoices, bookings and technical questions. Staff currently search FAQs, repeat the same guidance and manually route requests.\n- Build one assistant for customers to get help and for support staff to review unresolved queries. Use the attached database and team directory as the source of truth, with text, image generation and live voice capabilities.\n- For example: a customer asks why an 18 MB PDF will not upload. Explain the database limit, offer a visual help card and route a continuing issue to Technical Support with a useful summary. Keep handoffs in the review queue; do not claim another team has received them.\n- Text: use the Responses API to answer customer queries from the database, with the source record shown.\n- Classify the query, route it to the right team and show the reason. Prepare a short handoff summary for queries that need human help.\n- Images: use GPT Image through the Image API or Responses image-generation tool to create a downloadable visual help card, such as a guide to supported file uploads. Let me request an edit. Check the content against the database and include readable companion text.\n- Live voice: use GPT-Live for a two-way spoken conversation. Customers should be able to add details while the assistant speaks. Connect its backend to the same knowledge lookup and routing logic, then show the source references and handoff summary.\n- Add clear start, mute and end controls, a visible microphone state and an AI voice label. End must stop microphone capture and close the voice session.\n- Ask for clarification when needed. If the database does not contain the answer, say so and route the query for review across both text and voice.\n- Create a simple interface for chat, visual help, live voice and the routed queue. Handle the implementation and choose a practical approach using current official API documentation.\n- Use my securely configured API key on the server. Confirm secure setup with me if needed; never ask me to paste the key into chat.\n- Work within our agreed text-request, image and voice-duration limits. Check model access before building each capability; explain any blocker instead of substituting a static image or recorded voice response.\n- Use the mode column in the sample queries to test text answers, image creation and editing, and live voice follow-ups and interruptions. Ask me to speak for the microphone tests. Show actual API outputs and unresolved issues; use expected results only for checking, not as input to the model.",
          "resources": [
            {
              "file": "customer-service-database.csv",
              "label": "customer-service-database.csv",
              "hint": "Download and upload before this prompt"
            },
            {
              "file": "routing-directory.csv",
              "label": "routing-directory.csv",
              "hint": "Download and upload before this prompt"
            },
            {
              "file": "sample-customer-queries.csv",
              "label": "sample-customer-queries.csv",
              "hint": "Download and upload before this prompt"
            }
          ],
          "checkpoint": "Verify a sourced text answer, a generated and revised image, and a live voice conversation with an interruption and clean session close. Check routing and actual API evidence.",
          "situation": "The support team repeatedly answers questions about accounts, invoices, bookings and uploads, and customers repeat their problem when a case changes hands. You have a knowledge database and team directory but no existing support application; the task is to turn those resources into one usable service for customers and staff.",
          "deliverables": [
            "Build sourced text answers and routing with the Responses API, including clarification and a review queue for unresolved queries.",
            "Use GPT Image to generate and revise a downloadable help card, and GPT-Live for a live spoken conversation using the same knowledge and routing logic.",
            "Run the supplied twelve checks, including voice interruptions and microphone shutdown; show actual API results, source references and remaining issues."
          ]
        }
      ],
      "files": [
        "customer-service-database.csv",
        "routing-directory.csv",
        "sample-customer-queries.csv"
      ]
    },
    {
      "id": "singapore-landmark",
      "kind": "prompt",
      "name": "3D Singapore landmark",
      "description": "Create an editable Blender landmark and cinematic film.",
      "files": [],
      "steps": [
        {
          "number": 0,
          "name": "Landmark prompt",
          "prompt": "LOCATION: <insert your Singapore location here>\nCreate a beautiful, recognizable, editable 3D recreation of this landmark in Blender, and deliver a finished cinematic film with architectural labels and an interesting-facts side panel.\nThis is for an audience demo. The result should be architecturally convincing, immediately recognizable from a distance, rewarding to inspect up close, and beautifully composed. Complete the work through research, modeling, animation, rendering, and verification. Do not stop at a plan, script, unfinished model, or render instructions.\nAccuracy takes priority over invented detail. Use the location above as the single source of truth for all research, modeling, labels, and facts.\n1. TOOLS AND EXECUTION\nInspect the available Blender version and hardware first. Use existing installations where possible.\nUse Blender Python, command-line rendering, computer use, and other available tools as appropriate. Work autonomously and resolve routine creative and technical decisions yourself.\nAsk only if a missing permission, paid dependency, or essential input genuinely blocks progress.\n2. RESEARCH THE LANDMARK FROM ALL SIDES\nFind publicly accessible photographs, maps, aerial views, architectural references, and available street-level panoramas before modeling.\nBuild a reference set that collectively covers the full 360-degree exterior, including:\n- Front, rear, and both side elevations.\n- Elevated views showing roof geometry, footprints, and site layout.\n- Ground-level views showing entrances, structural supports, glazing, terraces, and pedestrian areas.\n- Close-ups of distinctive architectural details and materials.\n- Surrounding streets, landscape, shoreline, and nearby landmarks where applicable.\nPrefer official venue sources, architects’ published material, reliable maps, and clearly attributed photographs.\nCreate an annotated reference contact sheet and a simple viewpoint coverage map. Record source URLs and distinguish verified observations, inferred dimensions, and simplified areas.\nDo not claim complete 360-degree reference coverage if some viewpoints are unavailable. Identify gaps and use conservative estimates. Never invent hidden geometry and present it as verified.\nPublic accessibility does not automatically permit redistribution. Use photographs as modeling references unless their licenses allow inclusion in the deliverables.\nChoose a compact scene boundary around the landmark and its immediate setting so the entire scene can be finished to a high standard.\n3. VALIDATE PROPORTIONS BEFORE ADDING DETAIL\nBuild a proportion study first. Render it from viewpoints matching the reference photographs and compare the results.\nCheck:\n- Overall silhouette, height, footprint, and orientation.\n- Relative sizes and spacing of major building volumes.\n- Roof curvature and transitions.\n- Structural rhythm and distinctive façade patterns.\n- Entrances, connecting structures, terraces, and lower levels.\n- Alignment with surrounding paths, roads, landscape, and water.\nCorrect visible mismatches before adding small details. Do not use decorative complexity to disguise inaccurate proportions.\n4. BUILD THE EDITABLE SCENE\nModel the landmark as real 3D geometry with organized, meaningfully named objects, materials, and collections.\nPrioritize accurate overall proportions and defining architectural features. Use convincing materials, deliberate bevels, and sufficient geometric detail for close views.\nInclude appropriate glazing, structural supports, roof surfaces, interior depth, architectural lighting, landscaping, paving, and scale cues.\nInclude enough surrounding context to establish the setting without spending most of the effort on distant scenery. Represent nearby landmarks only where their placement and appearance are supported by references.\nDo not substitute a flat photograph, backdrop, or generated video for the 3D landmark. Avoid obvious primitive shapes where the architecture requires distinctive geometry.\nRecord the sources and licenses of external assets. Clearly document estimated or simplified details.\n5. DESIGN LANDMARK LABELS AND A FACTS PANEL\nCreate a restrained, elegant information layer that complements the cinematic imagery.\nLandmark labels:\n- Identify important visible architectural features and relevant nearby landmarks represented in the scene.\n- Use verified names and accurate positions.\n- Place labels along the sides of the frame, with subtle leader lines connected to corresponding 3D anchor points.\n- Keep text stable and readable as the camera moves.\n- Show only a few labels at a time.\n- Avoid overlapping labels, crossing leader lines, and covering important architecture.\n- Fade labels out when their targets leave the frame or become obscured. Do not point through buildings.\nInteresting-facts panel:\n- Reserve a consistent side area for a beautifully typeset panel.\n- Include a small number of concise, verified facts about the architecture, history, cultural purpose, design, or engineering.\n- Show one fact or a small related group at a time, synchronized with the camera view.\n- Use a clear heading and short explanatory text.\n- Allow enough reading time for each fact.\n- Use unobtrusive source numbers linked to full references in the README.\n- Avoid unsupported claims, invented statistics, and excessive text.\nCompose the shots with the information panel in mind so the landmark remains prominent. Preserve image proportions; do not squeeze or distort the rendered view.\nKeep label text, anchor positions, timings, and fact-panel content editable through named scene elements or a reproducible overlay project.\nDeliver both an annotated film and a matching clean version without informational overlays.\n6. CREATE THE CINEMATIC REVEAL\nProduce a 20-second, 1920×1080, 24 fps film with a cohesive blue-hour or nighttime look, warm architectural lighting, and restrained atmosphere.\nSuggested sequence:\n- 0–5 seconds: Establish the landmark and its immediate setting. Introduce the location and one concise fact.\n- 5–14 seconds: Move closer to reveal defining architectural details. Introduce relevant labels and update the facts panel.\n- 14–20 seconds: Pull back or rise into a memorable final hero view, with a restrained final set of labels and a closing fact.\nAdapt the camera path to the actual geometry and strongest views of the landmark.\nUse smooth, intentional movement with no clipping through geometry, abrupt turns, distracting occlusions, or visible drone.\nResearch the full exterior, but do not force a rushed 360-degree orbit into the film. Select the views that best communicate the architecture.\nAudio is optional and must not delay delivery.\n7. REVIEW BEFORE THE FINAL RENDER\nRender low-resolution stills from every shot and a lightweight preview of the entire camera movement, including labels and the facts panel.\nActually inspect the images and playback. Do not rely only on successful script execution.\nCheck:\n- Recognizability and agreement with reference photographs.\n- Proportions, materials, geometry, lighting, and framing.\n- Camera collisions, flicker, floating objects, and missing geometry.\n- Label accuracy, anchoring, stability, and visibility.\n- Fact accuracy, typography, contrast, and reading time.\n- Whether overlays obscure important architectural features.\nFix visible issues before committing to the final render.\nBenchmark a short sample and select practical render settings for the available hardware. If rendering is too slow, reduce samples or secondary scene complexity while preserving the landmark’s defining geometry and visual quality.\nRender to an image sequence so interrupted work can resume.\n8. DELIVER AND VERIFY\nSave everything under outputs/landmark/:\n- landmark.blend — complete editable scene, with dependencies packed or included.\n- landmark-film.mp4 — finished film with labels and the facts panel.\n- landmark-film-clean.mp4 — matching film without informational overlays.\n- Three high-quality PNG stills, including the final hero view.\n- Reference contact sheet and viewpoint coverage map.\n- Reproducible scene-generation and overlay scripts, plus required assets.\n- A short README covering sources, licenses, fact citations, assumptions, reference gaps, dependencies, and rebuild steps.\nReopen the saved Blender file and render a verification frame from it.\nCheck both MP4s for:\n- 20-second duration.\n- 1920×1080 resolution.\n- 24 fps and 480 frames.\n- Successful decoding of the entire film.\nInspect the encoded films at shot transitions and representative moments, including every label and fact-panel change.\nVerify that all delivered files exist and match the final scene.\nFinish by showing the hero image, linking the films and editable project, and briefly stating any remaining accuracy limitations.\nIf something is blocked, preserve completed work and explain the specific blocker. Never report an unrendered animation, unsupported architectural claim, or untested file as a finished deliverable.",
          "resources": []
        }
      ]
    }
  ]
};
