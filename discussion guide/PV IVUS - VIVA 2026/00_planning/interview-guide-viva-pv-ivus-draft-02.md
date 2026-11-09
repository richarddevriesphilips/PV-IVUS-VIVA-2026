# VIVA · Peripheral IVUS discussion guide

**Draft 02 · 22 September 2026 · AI-generated · For researcher feedback**

**Confirmed constraint: about 10 minutes per participant.** This version supersedes Draft 01 for conference use. It narrows each session to one workflow question, one focused task or concept, and one priority question. Participant roles and the main product decision remain provisional.

## Approach

Use two session tracks, alternating across participants with relevant experience:

- **A — Segment and length:** Can participants capture a segment and understand its length information?
- **B — Deployment:** What planning information should carry into live X-ray, and how do participants expect to control it?

Assign the track before showing the design. If one topic is the team's primary decision, allocate more sessions to it. Record assignment and any role-based routing. With the provisional 8–10 participants from Draft 01, splitting evenly gives only 4–5 exposures per track: useful directional evidence, with limited coverage of subgroups.

Preload the exact starting state. Skip live acquisition and the general product tour. Keep the broader roadmap, AI assistance, and alternative-interaction comparisons in the question bank for a separate follow-up; they do not fit alongside a meaningful task in ten minutes.

## Moderator card · 10 minutes

| Time | Purpose | Main prompt or action |
|---|---|---|
| 0:00–1:00 | Introduction and consent | Explain purpose, voluntary participation, notes, and data use; confirm consent. |
| 1:00–2:00 | Current workflow | Ask the recent-case question for the assigned track. |
| 2:00–6:30 | One focused task | Run Track A or B below; observe before probing. |
| 6:30–8:00 | Workflow fit | “Compared with how you handled your recent case, what would this change, if anything?” |
| 8:00–9:00 | Priority | “What is the one thing we should change or get right before you would use this?” |
| 9:00–10:00 | Close | “What important point have we missed?” Thank them and explain next steps. |

**Opening wording:** “We’re exploring how IVUS and X-ray information could support your workflow. We’ll ask about a recent case and look at one early design. We’re testing the design, not you. Some parts are incomplete. Please avoid patient names or identifying details. You can skip any question or stop at any time.”

Follow with the team's actual consent wording for note-taking, data use, access, retention, and withdrawal. Plan notes-only sessions unless recording is specifically needed and separately consented. Provide the study information in advance or at recruitment where feasible. If consent needs longer, shorten the task; do not rush consent to protect the timetable.

## Track A · Segment and length

**Learning question:** Can participants represent the intended segment and interpret what the length information does—and does not—tell them?

**Recent-case question, 1:00–2:00:** “In a recent peripheral case, how did you establish the length of the segment you were assessing?”

**Starting state:** Near Future prototype, already in review with a prepared pullback. Use a clinically reviewed illustrative case and two predefined endpoints. Confirm synchronized X-ray coverage and a valid length result during the pilot; these paths were not verified in the initial inspection.

**Task, 2:00–5:00:** “These are the two agreed endpoints for this example. Show me how you would capture that segment and find its length.”

Let the participant attempt it without naming controls. Then ask: “What does this value mean to you, and what would you check before using it?”

**One extension, 5:00–6:30, only if the main task is complete:** Show the prepared state displaying “Length measurement not available outside X-Ray area.” Ask: “What is available to you here, and what would you do next?”

If the main task takes longer, omit the extension and record it as not shown. If the valid-length state cannot be prepared, use the missing-coverage state as the sole comprehension exercise and label the session accordingly; do not claim segment-creation usability was tested.

**Observe:** First action, segment creation, endpoint interpretation, meaning and units of length, and any misunderstanding of unavailable information. Distinguish interface success from clinical accuracy, which this exercise does not evaluate.

**Success evidence:** Participant captures the specified segment and explains the displayed length without help. For the extension, they recognize that the length is unavailable and describe their next step. Record these outcomes separately.

## Track B · Deployment

**Learning question:** Which planning information belongs in the live view, and what do participants expect transfer and visibility controls to do?

**Recent-case question, 1:00–2:00:** “In a recent peripheral case, what planning information did you need in view when preparing for deployment, and who controlled it?”

**Starting state:** The linked Figma Deploy Mode concept showing Planning and Live X-Ray. Hide explanatory design annotations. Use one design version consistently. Its initial review established static concepts, not an operational deployment flow.

**Task, 2:00–5:00:** “Planning is complete for this example. What information would you want in the live view as the team prepares for deployment? Show or point to how you would make that available.”

On static screens, invite pointing and explanation. With a verified interactive implementation, let the participant act. Then ask: “What would you expect to happen to the original planning information?”

**One extension, 5:00–6:30, only if the main task is complete:** “A marker is no longer useful in the live view. What would you do? Suppose you need it again—what would you expect?”

If time runs short, omit the extension. Avoid introducing several competing interaction designs in the same session.

**Observe:** Information selected, planning/live distinction, transfer versus copy expectations, visual clutter, hide/delete interpretation, restoration expectations, and whether the participant would delegate the action.

**Evidence:** Static screens yield stated needs and expected behavior. Only a verified interactive version can yield observed transfer or recovery outcomes. If a colleague normally operates the controls, capture that handoff instead of treating delegation as failure.

## Moderator rules

- Start with current behavior before revealing the concept. Ask for one concrete example, not a full case history.
- Ask the main prompt and at most one clarifying probe. Optional extensions should never displace the final priority question or closing.
- If stuck for roughly 30 seconds, ask “What are you looking for?” If still blocked, record the issue and move to interpretation or provide help, clearly logged. Do not turn the session into training.
- At 6:30, stop the task and ask about workflow fit. Mark an unfinished task as time-limited; do not automatically classify it as a usability failure.
- Do not describe the design as faster, safer, or easier. Ask what would change, including what could become harder.

## Recruitment and session logistics

Primary audience remains provisionally physicians involved in peripheral interventions. Confirm whether lab staff should have a separate track or sample. Capture role, arterial/venous focus, IVUS frequency, normal control operator, system familiarity, and previous exposure to this prototype in a short recruitment record. If this information is unavailable, use part of the context minute to establish role and relevance and shorten the task accordingly.

Allow approximately five minutes between participants for notes and reset, outside their ten-minute session. Use one moderator and one note-taker where possible. Prepare readable stimuli at the intended display size, a reliable reset path, and offline backup screens. Keep product demonstrations and sales conversations separate from the research interaction.

## Minimal note sheet · one per participant

**ID:** ___ **Role/IVUS experience:** ___ **Case focus:** ___ **Normal control operator:** ___

**Track:** A / B **Stimulus version:** ___ **Interactive / static:** ___ **Prior exposure:** ___

**Participation consent:** ___ **Recording consent, if applicable:** ___

| Item | Notes |
|---|---|
| Recent workflow example | |
| First action or interpretation | |
| Core outcome | Independent / with help / not completed / not testable / concept discussion |
| Why unfinished, if relevant | Time limit / interface difficulty / prototype failure / interruption |
| Exact help given | |
| Extension | Not shown / shown; observation and outcome |
| Workflow fit and top requested change | |
| Exact quote | |
| Researcher interpretation, separate from observation | |

Use participant IDs and approved restricted storage for actual research data; keep contacts and consent records separately. This planning folder is not designated as the participant-data repository.

## Preparation and synthesis

1. **This week:** Agree on the primary decision and participant roles, select the case context, and prepare starting states for both tracks. Finalize consent and data arrangements.
2. **Next week:** Pilot each track at ten minutes, including introduction and closing. Remove prompts if timing slips. Verify length availability, missing-coverage messaging, deployment stimulus fidelity, display readability, and reset steps.
3. **At VIVA:** Alternate tracks, record actual exposure, debrief briefly, and log stimulus changes.
4. **After VIVA:** Summarize each track separately using participant IDs, observed versus stated evidence, contradictory cases, and recommended changes. Use exposure denominators; do not treat omitted extensions as failures. Review potentially consequential misunderstandings even if observed once.

Conference recruitment, small samples, short exposure, and prototype fidelity limit generalization. These sessions inform design priorities; they do not establish clinical performance or real-procedure usability.

## Sources and open decisions

This revision uses the inspection documented in [Draft 01](interview-guide-viva-pv-ivus-draft-01.md), your handwritten notes, the [local prototype](http://localhost:5173/), and the [Figma Deploy Mode page](https://www.figma.com/design/qjso71M0f8yB1N2XDRlfLq/PV-IVUS-Future-Prototypes?node-id=6278-13552). It incorporates your confirmed ten-minute constraint. No new prototype verification was performed for this timing revision.

The Distant Future path is labeled an early placeholder. AI assistance and the near-term/next-decade progression in the notes remain future-discussion topics. Some handwritten detection/pullback wording remains uncertain. Design annotations are hypotheses to explore, not established findings or instructions to execute.

**For the next iteration:** Confirm the participant roles and whether measurement or deployment deserves most of the sessions. The two-track split is a proposed way to cover both within the confirmed time limit.
