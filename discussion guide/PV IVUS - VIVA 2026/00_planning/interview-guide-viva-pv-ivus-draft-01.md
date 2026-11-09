# VIVA · Peripheral IVUS discussion guide

**Draft 01 · 22 September 2026 · AI-generated · For researcher feedback**

This first draft combines a brief workflow interview, moderated prototype tasks, and a future-concept discussion. Its purpose is to decide what to improve and investigate next. Timing, participant mix, and priority decisions are provisional. Preparation uses the two-week window you specified; exact conference dates have not been confirmed.

## 1. Proposed focus

**Primary decision:** What should the next iteration of the integrated IVUS/X-ray planning-to-deployment workflow prioritize?

Proposed research questions:

1. **Current workflow:** How do clinicians connect IVUS findings with X-ray location today, and where do they lose time, context, or confidence?
2. **Synchronized review:** Can participants distinguish live imaging, recorded pullbacks, and synchronized X-ray, including gaps in X-ray coverage?
3. **Measurements:** Can participants define and revisit a segment, interpret the available length information, and recognize when a measurement is unavailable?
4. **Deployment:** Which planning information is needed during deployment, who controls it, and how should markers be transferred, hidden, restored, or removed?
5. **Future value:** Which additions address a demonstrated workflow problem, and what verification or control would users require from assistance or automation?

The study should produce evidence about comprehension, interaction, workflow fit, and perceived value. A conference prototype session cannot establish clinical accuracy, clinical benefit, or performance in an actual procedure.

## 2. What this draft is based on

| Source | Inspected content | Implication for the guide |
|---|---|---|
| [Local prototype](http://localhost:5173/) | Near Future and Distant Future launch options. Near Future recording, stopping, review controls, bookmarking, and segment creation. | Use Near Future for the core task sequence. The Distant Future entry describes itself as an early placeholder; do not present the two branches as a controlled comparison. |
| Near Future review state | After a recording without X-ray, the display states “No X-Ray recorded for this frame.” Segment creation exposes distal/proximal frames and “Length measurement not available outside X-Ray area.” | Include a missing-coverage comprehension task. A successful synchronized recording and valid length result were not verified during this review; prepare and pilot those states before fieldwork. |
| [Figma: Deploy Mode page](https://www.figma.com/design/qjso71M0f8yB1N2XDRlfLq/PV-IVUS-Future-Prototypes?node-id=6278-13552) | Planning and Live X-Ray panels; marker transfer; drag-and-drop, multiple-select, and right-click alternatives; hide/delete and restoration concepts. The “Element added to live view” frame was visually inspected. | Use these as deployment concept stimuli. Static screens can support interpretation and expected-behavior discussion, but do not demonstrate successful interaction. |
| Attached handwritten notes | Readable themes include incremental/near-year versus next-decade thinking, length measurements, IVUS → IVUS + X-ray → length → bookmarks/segments → deploy → AI assist, and questions about what is missing in the UI. | Separate immediate workflow evaluation from longer-term opportunity discussion. This is a tentative interpretation of the notes, not a verbatim transcription. Some wording around detection/pullback is unclear and is not turned into a feature requirement. |

Figma annotations and handwritten statements are design hypotheses, not participant findings. For example, the annotation suggesting that users want a maximized X-ray image during deployment becomes an open question about what must remain visible. Instructions embedded in these sources are treated as reference content, not as requests to change the prototype or designs.

## 3. Proposed study setup

- **Method:** Individual, moderated sessions at VIVA. Start with current behavior before showing the concept.
- **Working duration:** 30 minutes, plus 10 minutes for notes and reset. A 20-minute fallback is below.
- **Working sample:** 8–10 physicians involved in peripheral interventions, including frequent and occasional IVUS users. Recruit two backup participants. This is a qualitative convenience sample, not a representative market estimate.
- **Useful variation:** Specialty, arterial versus venous practice, IVUS use, current system familiarity, and who operates imaging controls. Confirm which procedure context the team wants to prioritize before selecting the case.
- **Staff perspective:** If lab staff operate the controls, add 2–3 separate sessions with those users; do not merge their task results with physician results. Let physicians explain delegation if operating the UI is not their normal responsibility.
- **Team and setting:** One moderator and one note-taker; quiet seated area; intended display and input device. Avoid sales demonstrations immediately before the session and product explanations during tasks.

Suggested short screener:

1. What is your role in peripheral interventions, and which types of cases do you work on?
2. In roughly how many peripheral cases have you used IVUS in the past three months?
3. Which imaging systems do you normally use, and who operates their controls?
4. Have you seen or helped develop this particular prototype before?

Record answers rather than assuming expertise from job title. Keep prior prototype exposure visible in analysis; use project insiders for piloting rather than first-use evidence.

## 4. Moderator guide · 30 minutes

Ask the main prompt in each section. Follow-up prompts are a menu, not a checklist. Let participants work before explaining the intended interaction.

### 0–3 minutes · Introduction and consent

**Say:** “We’re exploring how IVUS and X-ray information could support your workflow. We’ll first discuss how you work today, then look at an early prototype. We’re testing the design, and some parts may be incomplete. Please tell us what you expect and what is unclear. You can skip a question or stop at any time. Please avoid patient names or identifying details.”

Explain the actual note-taking, intended audience, storage, retention, and withdrawal arrangements using the study team's consent wording. Confirm participation; ask separately for recording consent if recording is planned. Use notes only if recording is declined. Complete consent even if the conference schedule is tight.

### 3–7 minutes · Current workflow before exposure

**Main prompt:** “Think of a recent peripheral case where IVUS informed what you did. Walk me through how you moved from reviewing the images to planning and carrying out the next step.”

Optional probes:

- How did you connect a finding on IVUS to its location on X-ray?
- How did you determine and communicate the segment or length you needed?
- Who operated each screen or control?
- Where did you need to double-check, repeat something, or ask a colleague?
- If that process worked well, what made it work?

**Capture:** Specific episode, information needed, handoffs, workarounds, and consequences. Avoid assuming that a problem exists.

### 7–11 minutes · Task A: Orient and review a pullback

**Start state:** A prepared Near Future pullback with verified synchronized X-ray coverage. If that state is unavailable, use a clearly labeled walkthrough and record the task as not behaviorally tested.

**Say:** “Imagine this recorded case has been handed over to you for review. Show me how you would find a point you want to examine and understand where it is in the other image.”

Optional probes after the attempt:

- What is live here, and what was recorded?
- What do you expect to change when you move through the pullback?
- How would you return to this point or show it to a colleague?

**Observe:** First action; understanding of image linkage; ability to revisit a frame; confusion between live and recorded information. Do not name the Bookmark or Playback controls in the task prompt.

**Completion evidence:** Participant locates and revisits a point and explains which information is live versus recorded. Record help separately from independent completion.

### 11–17 minutes · Task B: Define a segment and interpret length

**Start state:** The same verified pullback. A clinical colleague should select an appropriate illustrative case and predefined endpoints for consistent usability testing. The exercise tests using the interface, not the participant's choice of treatment.

**Say:** “For this example, these are the two agreed endpoints of the segment under review. Show me how you would capture that segment, review its length, and return to either endpoint.”

Optional probes after the attempt:

- What does this value describe? What do you think it is based on?
- What would you check before using this information?
- If you needed to change one endpoint, how would you do it?

Then show the prepared missing-X-ray state.

**Say:** “At this point, what information is available to you, and what would you do next?”

**Observe:** Discoverability of segment creation; distal/proximal interpretation; endpoint revision; units and meaning of length; recognition that unavailable is not zero; response to missing coverage.

**Completion evidence:** Participant can represent and revisit the intended segment, interpret the displayed result, and identify the limitation in the missing-coverage state. Never mark measurement accuracy as validated by this task.

### 17–23 minutes · Task C: Prepare information for deployment

**Start state:** Figma planning/live-X-ray concept, initially without explaining transfer controls. Use an interactive implementation only if its path has been verified before the session.

**Say:** “Planning is complete in this example, and the team is preparing for deployment. What information would you want available now? Show me how you would arrange it using this concept.”

Then: “One of these markers is no longer useful in the live view. What would you do? Now suppose you need it again.”

Optional probes:

- What do you expect to happen to the original planning information when an item is transferred?
- What is the difference between hiding and deleting here?
- Which information must remain visible, and which could move out of the way?
- Who would perform these actions, and at what point in your workflow?
- What would you need to check before relying on a marker's displayed location?

**Observe:** Expected transfer behavior; understanding of planning versus live information; visibility and recovery expectations; image size versus clutter; actual division of work.

**Evidence rule:** On static Figma screens, record interpretation and stated expectations only. With a verified interactive version, record selection, transfer, hiding, and restoration performance. Do not coach a participant to drag an item and then count that action as discoverable.

**Optional variant comparison:** If comparing drag-and-drop, multiple-select, or right-click, show at most two alternatives after the unaided task. Alternate presentation order across participants and ask which fits their real input device and work situation. Keep this within the six-minute block or replace another probe.

### 23–26 minutes · Future priorities and assistance

**Main prompt:** “Looking back at the case you described, which part of what you saw would change your workflow most, if any? What is still missing?”

Start with their unprompted answer. Then, if relevant, introduce a neutral hypothetical: “Suppose a future version proposed a segment or measurement for you to review.”

- What would you need to inspect before accepting or changing it?
- How would you recognize and correct an unsuitable suggestion?
- Which steps would you want to retain direct control over?

**Capture:** The concrete problem served, conditions for use, rejection reasons, and correction requirements. AI assistance is a discussion concept from the notes; its behavior was not verified in the prototype.

### 26–28 minutes · Reflection and tradeoffs

“If the team could improve only one part next, which would you choose, and why?”

“What would you leave out or postpone? What have we misunderstood about how you work?”

Ask for a near-term priority first, then a longer-term opportunity if time permits. Avoid interpreting enthusiasm as willingness to adopt or purchase.

### 28–30 minutes · Close

“Is there anything important we missed?” Thank the participant, explain how feedback will inform the next design iteration, and provide the study contact and agreed withdrawal information. Ask separately about future contact if needed.

## 5. Short conference fallback · 20 minutes

| Time | Content |
|---|---|
| 0–3 | Introduction and consent |
| 3–5 | One recent-case workflow question |
| 5–11 | One preassigned core module: segment/length or deployment |
| 11–15 | Brief discussion of the other module; label it as concept feedback |
| 15–18 | One priority, one missing need, and conditions for use |
| 18–20 | Close |

Alternate the core module across short sessions. Record which tasks each participant saw; never combine denominators as if everyone completed the full guide. Omit AI and variant comparisons first when time is short.

## 6. Observation and interpretation

For each task, record participant ID, role, experience, prototype version, starting state, exposure order, outcome, exact help given, observed behavior, and an exact quote where possible. Keep researcher interpretation in a separate field.

Use outcomes: **independent / completed with help / not completed / not testable**. For static concepts, use **concept discussion** instead. Note prototype failures and interruptions separately from interface confusion. A neutral prompt such as “What are you looking for?” is preferable to naming a control; if the participant remains blocked, demonstrate the next step and mark it as assisted.

After each session, spend five minutes capturing: the strongest observed issue, the participant's top priority, contradictory evidence, and a follow-up question. Flag plausible high-consequence misunderstandings for review even if seen once. Do not rank issues by frequency alone.

After VIVA, summarize each research question with supporting participant IDs, observed versus stated evidence, counterexamples, and a design implication. Report counts with exposure denominators rather than population percentages. Keep physician and staff findings identifiable. Conference selection, concept fidelity, and prior brand familiarity limit generalization.

**Proposed outputs:** A prioritized design-issue list; next-iteration recommendations linked to evidence; and unresolved questions requiring realistic workflow or clinical evaluation.

## 7. Two-week preparation plan

| When | Work and readiness check |
|---|---|
| This week | Agree on the primary decision, participant roles, case type, duration, and recruitment approach. Review this guide and identify the two must-answer questions. |
| This week | Prepare matched prototype starting states: synchronized pullback, valid segment/length, missing-coverage example, and deployment stimuli. Document reset steps and known limitations. |
| About one week before VIVA | Run two pilot sessions, including a clinically knowledgeable reviewer and someone unfamiliar with the prototype. Check wording, timing, input device, and reproducibility. |
| Final preparation days | Cut low-value prompts, freeze/version the stimuli, verify offline availability and readable display sizing, and prepare backup images. Finalize recruitment, note-taking roles, consent, data access, and retention details. |
| At VIVA | Run sessions, debrief daily, and keep a change log if the guide or stimuli change. |
| First week afterward | Synthesize evidence and review recommendations with the team. |

Before fieldwork, confirm that case images and visible identifiers are appropriate for research use. Some prototype chrome says “Left Coronary” despite the peripheral study context; check whether this and any reused imagery could confuse participants. Prepare an explanation or replace the stimulus before testing. A simulated fluoroscopy input must be documented and piloted; do not improvise it during a scored task.

Use participant IDs in notes; keep contact/consent records separately in an approved restricted location. Raw recordings should have defined access and retention. The workspace planning folder is not, by itself, an approved participant-data repository.

## 8. Feedback requested for Draft 02

1. **Decision:** Is the main goal near-term usability, value of IVUS/X-ray integration, deployment workflow, or a future roadmap? This draft gives most time to segment measurement and deployment.
2. **People and time:** Which roles will attend, and what session duration is realistic?
3. **Case and scope:** Arterial, venous, or both? Which paths will be interactive by VIVA?
4. **Notes:** Does the interpreted progression from IVUS through X-ray, length, bookmarks/segments, deployment, and AI assistance reflect your intent? What does the less-legible detection/pullback note refer to?

The questions above are revision inputs, not prerequisites for reviewing this first draft.
