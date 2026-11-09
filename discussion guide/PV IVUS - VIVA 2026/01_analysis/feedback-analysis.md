# VIVA 2026 feedback session — working analysis

**Status:** Internal working notes, not a stakeholder report. Collected to decide what to investigate further and how to frame a later readout.

**Sources:**
- 9 screen/voice recordings in [`Feedback Recordings/`](../../../Feedback%20Recordings/) (2026-10-05 and 2026-10-06), transcribed in full — see [`Feedback Recordings/transcripts/`](../../../Feedback%20Recordings/transcripts/).
- [Interview guide Draft 04](../00_planning/interview-guide-viva-pv-ivus-draft-04.md) (the confirmed, current guide).
- [`VIVA-session-answer-sheet.docx`](../../VIVA-session-answer-sheet.docx) — the blank one-page per-session capture template; no filled-in copies were found, so the recordings are the only primary data for this round.
- Prototype source (`intrasight/`, `intrasight-distant-future/`) to confirm what each feature card (F1–F5) corresponds to in the actual build.

## 0. Method and data-quality caveats

- Transcripts were generated locally with Whisper **large-v3-turbo** (via `mlx-whisper`), not by a human. They are **not verbatim-verified**. Before quoting anyone externally or in a formal report, re-check the quote against the source audio/video.
- Known transcription failure modes present in this batch:
  - **Hallucinated loops during silence/non-speech audio** — long stretches of "Thank you." repeated every ~30s (e.g. tail of `Recording -20261005_153126`, tail of `Tuesday Recording-20261006_082814`). These are not real speech and were ignored in the analysis.
  - **Word-salad fragments during noisy/overlapping speech or low-mic-gain stretches** — e.g. the final ~5 minutes of `Tuesday Recording-20261006_144127` degrades into one-word-per-line fragments. The gist is still usable (confirmed by surrounding context) but exact wording there is unreliable.
  - Speaker attribution is **not available** (single mixed audio channel) — all transcripts show *what* was said, not *who* said it. Turns were inferred from context (moderator "Richard" = designer/moderator, remainder = participant(s)) and cross-checked against the discussion guide's script, but some sessions clearly have **two participants** talking (e.g. residents in pairs) and their lines are not distinguished from each other.
  - Numbers (measurements, percentages, timestamps the speakers refer to) should be treated as approximate; Whisper frequently mis-hears digits in rapid clinical speech.
- No written answer sheets were filled in during these sessions (or none were saved to the repo) — all per-session structured data (role, IVUS experience, exposure level, ranking order, parked cards) had to be **reconstructed from the conversation itself**, and is incomplete where the conversation didn't make it explicit. This is flagged per session below.

## 1. Recording inventory and session mapping

| File | Duration | Content | Session ref |
|---|---|---|---|
| `Recording-20261005_144022-Meeting Recording.mp4` | 4:09 | Mostly inaudible/ambient; no prototype content recovered | — (not a session) |
| `Recording-20261005_144444-Meeting Recording.mp4` | 28:40 | Full prototype walkthrough, one participant, Venous May-Thurner-style case with a 3D/plaque discussion | **Session A** |
| `Recording -20261005_153126-Meeting Recording.mp4` | 19:44 | Unrelated conversation about a separate registry/data-collection study (not this prototype), trailing silence | — (not a session) |
| `Tuesday Recording-20261006_082814-Meeting Recording.mp4` | 1:43 | Fragment, inaudible/garbled, no usable content | — (not a session) |
| `Tuesday Recording-20261006_083003-Meeting Recording.mp4` | 17:51 | Full walkthrough + explicit feature ranking, arterial/venous mixed, one physician | **Session B** |
| `Tuesday Recording-20261006_101318-Meeting Recording.mp4` | 24:01 | Full walkthrough + ranking + extensive wish-list discussion, one physician (IVC/May-Thurner case) | **Session C** |
| `Tuesday Recording-20261006_105835-Meeting Recording.mp4` | 9:28 | Short but complete walkthrough incl. Deploy Assist, enthusiastic reaction, one physician | **Session D** |
| `Tuesday Recording-20261006_140622-Meeting Recording.mp4` | 25:23 | Full walkthrough + ranking, two IR/vascular-surgery trainees together, Venous + arterial cases | **Session E** |
| `Tuesday Recording-20261006_144127-Meeting Recording.mp4` | 25:12 | Full walkthrough, two IR trainees together, strong UI/visualization feedback | **Session F** |

Six substantive sessions (A–F) were recovered; three recordings contain no usable prototype feedback (likely accidental/ambient capture or unrelated conversation) and should be excluded from any count of "participants."

## 2. Prototype-task ↔ feature-card cross-check (code vs. guide)

Confirmed in `intrasight/` and `intrasight-distant-future/` source before analysis, so the mapping below is used consistently when reading the sessions:

| Card | Guide description | What it is in the build |
|---|---|---|
| F1 | IVUS + X-ray review | Synchronized recording/scrubbing of IVUS and X-ray frames (`CleanMedicalInterface.tsx`, `IVUSWorkflowApp.tsx`) |
| F2 | Segment length | "Add segment" distal/proximal handles on the ILD, length readout (`FunctionalSegmentEditingBox.tsx`) |
| F3 | Bookmarks and segments on X-ray | `NumberedBookmark`, `BookmarkContext`, transferred onto the X-ray view |
| F4 | Deploy mode | `DeployAssistScreen.tsx` ("Deploy Assist" button) — planning markers superimposed on a live X-ray feed |
| F5 | Automated lumen and vessel measurements | `IVUSMeasurementOverlay.tsx` / per-frame polygon keyframes, editable lumen (blue) and vessel (green) borders, diameter/area read-outs |

All six substantive sessions exercised **Near Future** (F1/F2/F3 equivalent) and **Distant Future** (F4/F5), in that order, matching the guide's prescribed route. None of the sessions show a participant reaching the Figma-only Deploy Mode concepts beyond what's implemented — all deploy-mode feedback here is about the **working prototype**, which is good (the guide explicitly warns not to treat static Figma discussion as tested interaction).

## 3. Findings by the guide's four research questions

### 3.1 How participants understand and navigate Near/Distant Future

- Synchronizing IVUS and X-ray recording (F1) was consistently the best-received, least-controversial feature. Multiple unprompted positive reactions: *"That's beautiful... because I do it myself"* (Session C), *"I like it, it certainly seems to make a lot of the thought processes a little bit easier"* (Session D).
- The "segment" terminology and interaction (drag handles on the ILD to set a treated length) was understood quickly in every session with no prompting beyond the first explanation; one participant explicitly liked it over drawing lines ("That would save me a lot of time" — Session C), another asked for better terminology but didn't object to the concept (Session B: *"Any suggestions for that terminology are more than welcome"* — said by moderator, participant didn't push back).
- Recurring real-workflow context that session participants volunteered, useful for future task design:
  - Several participants currently **don't do dedicated pullback recordings** at all — they assess live and record "for billing" only (Sessions B, C, F). The guide's assumption of "record pullback → review → decide" is a simplification of some participants' actual practice, which the moderator explicitly adapted to ("for the sake of this prototype, let's do it the way others do it").
  - Several participants **delegate on-screen marking to a tech/rep** with a grease/dry-erase marker today (Sessions A, B, F) — a workflow detail relevant to who would use bookmarking/segment tools in practice, and who "operates" Deploy Mode (ties into deploy-mode Q2).
  - One participant explicitly distinguishes workflows by vessel type: in venous cases, trusts IVUS over fluoroscopy ("don't trust the venography too much... you're going to land your stent on IVUS" — Session B).

### 3.2 How participants interpret automated lumen/vessel measurements, what they'd verify, how they'd handle disagreement

This is the most **mixed** area of feedback — reactions ranged from enthusiastic to a clear trust/verification gap:

- **Positive:** Session D's participant called the extra editable vertices "a new idea," explicitly contrasted it with the legacy system's 5–6-dot limit ("that was the biggest flaw of the parent system... you don't get a ton"), called the auto-measurement "almost spot on," and liked that clicking a point lets you drag/correct it.
- **Positive but conditional on trust:** Session C ("as long as you get to the point where you can trust it, then you're going to save a lot of time"); Session B raised unprompted skepticism about a *future* auto-landing-zone-detection idea the moderator floated ("trust over time... like trust in ChatGPT" — said with a laugh, read as polite skepticism, not enthusiasm).
- **Critical — verification gap (important finding):** In Session E, when shown the automated diameter read-out without the underlying measurement lines visible on the image, the participant said: *"you guys are not showing us like where the diameter or the lines are... I think I will not feel comfortable taking that diameter."* The moderator agreed this was valuable feedback. **This directly answers the guide's "what would you check before using them" probe — the un-prompted answer was "the underlying measurement line itself," which the current prototype state didn't show them.**
- **Critical — terminology/legend confusion:** In Session F, the per-frame "stenosis percentage" readout was read by the participant as applying to the *whole segment* rather than the single displayed slice, calling it "probably just more confusing" and asking for either a different term or a visible scale. The same session separately flagged that the lumen/vessel circle colors (blue/green) are not reused consistently with other color meaning in the UI (e.g., green also implying "good/healthy" elsewhere), creating a semantic clash. The participant suggested a legend or color-to-meaning consistency fix.
- Lower/no value seen in Session B specifically for a straightforward venous case ("I don't care about that" about automated lumen measurements) — this participant's highest-value feature was F1 review + co-registration, not automation, suggesting value perception may depend on procedure complexity/vessel type.
- Recurring wish beyond what was shown (none of this is built yet, capture as future-direction input, not current-build feedback):
  - Plaque morphology / calcium circumferential thickness and concentricity-vs-eccentricity change detection (Session C).
  - Before/after treatment comparison overlay ("two circles of what it looked like before" — Session C).
  - Flow/perfusion-style assessment below the knee, explicitly distrustful of an unexplained "black box" algorithm precedent (Medtronic reference) — participant wants an interpretable method, not just a result (Session C).
  - AI-suggested stent sizing/landing zones — interest conditional on it being a suggestion they can override, not an autonomous decision (Session E: *"you give a suggestion... I take the suggestion, it's fine... [but] your rational sense"*).

### 3.3 How Deploy Mode fits the planning→deployment transition

- Universally well-received **in concept** — "step forward," "chef's kiss," "would save me a ton of time," "I like the deployment" appear across four of six sessions.
- **Q1 (what's missing/what to remove or emphasize):**
  - Session F: *"less is more, I just want to know what the goal was"* — a minimal-information preference once actively deploying.
  - Session E: once the stent begins to flare/engage, the participant stops looking at any markers at all and focuses purely on the live fluoro image — meaning Deploy Mode's useful window may be *before* the final seconds of deployment, not throughout. Worth testing where exactly value drops off.
  - Session F / Session C both raise **marker drift under patient motion** (breathing, coughing, table moves) as the main thing that would undermine trust in an overlay that doesn't visibly track the live image. Explicitly framed by moderator and participant alike as "future AI" work, not a near-term fix.
- **Q2 (when to enter, who operates):**
  - No session gave a crisp, confident answer to "who operates it" independent of "who already operates the console today" — in sessions where a tech/rep normally drives the screen, that's assumed to carry over; in sessions where the physician is hands-on, same assumption. This question wasn't probed deeply enough in any transcript to get a differentiated answer — **candidate gap in how the guide's Q2 was actually asked/time-boxed in the field.**
  - Delegation economics: Session E's trainees explicitly tied Deploy Mode + automated measurements value to removing the step where "the rep is not there, then it's me and my staff doing it... it adds an hour" — i.e., the value framing that resonated was *time/rep-dependency reduction*, not diagnostic improvement.
- **Q3 (what changes vs. today, concerns):**
  - Consistently framed as a time-saver and a "trust it once, then go faster" proposition, not a safety concern per se.
  - The clearest *concern* raised was the same measurement-verification gap from §3.2 — if Deploy Mode inherits automated measurements the clinician didn't verify, that risk compounds.
  - One participant (Session C) raised "overlapping stents (up to 4)" as supported-but-unnecessary — a scope/priority signal, not a risk.
- Optional probes (markers obscuring info, returning to planning, etc.) were **not clearly exercised** in any transcript — no session shows a participant hiding/restoring an annotation or asking to go back to planning. Likely not reached given the ~10 minute time-box; flag as an exposure gap per the guide's own instruction ("record the exposure gap... allow 'not enough information'").

### 3.4 Feature value and sequencing (ranking)

Explicit rank orders were only captured clearly in Sessions B, C, and E (3 of 6). Sessions A, D, and F ran out of time or the recording ends before/without a clean ranking pass.

| Session | Rank pattern (most → least, as stated) | Notable reasoning |
|---|---|---|
| B | F1 (+ implicit F2) "base of everything" → F3+F4 "codependent"/paired → F5 "I don't care about that" | F5 explicitly deprioritized for this participant's case type |
| C | F1+F2 treated as a bundled prerequisite → F3+F4 paired, F4 valued mainly *because* it exposes F3 on the live feed (participant initially said they might not need F4 "if I'm able to bookmark it on the live") → F5 ranked least ("I don't know that I need deploy mode if...") | Clear **dependency logic**, not independent valuation — worth flagging since the guide explicitly warns not to confuse dependency with standalone value |
| E | F4 (deploy) ranked highest, explicitly for rep/tech-time savings → F2 (length) solid but secondary → F1 implied prerequisite | Value framed around removing rep dependency, not diagnostic benefit |

No session logged use of the "Not relevant to my work" / "Not enough information" parking lanes explicitly, though Session B's "I don't care about that" for F5 functions the same way in substance.

#### Additional numeric rankings (source: paper/verbal submissions, session not identifiable)

Three more rank sets were supplied after the fact as plain 1–5 rankings per feature (1 = most valuable). **These could not be confidently matched to a specific recorded session** (possibly covering some of A/D/F, possibly participants whose sessions weren't recorded at all) — treat them as additional independent data points, not as filling in the "missing" A/D/F rows above.

| Submission | F1 | F2 | F3 | F4 | F5 | Order (most → least valuable) |
|---|---|---|---|---|---|---|
| X | 2 | 4 | 1 | 5 | 3 | F3 → F1 → F5 → F2 → F4 |
| Y | 1 | 4 | 3 | 3 (tie) | 2 | F1 → F5 → F3 = F4 (tie) → F2 |
| Z | 2 | 4 | 3 | 1 | 1 (tie) | F4 = F5 (tie) → F1 → F3 → F2 |

Average rank per feature across these three (lower = more valuable): **F1 = 1.67**, **F5 = 2.0**, **F3 = 2.33**, **F4 = 3.0**, **F2 = 4.0**.

This complicates the "F1+F2 inseparable" read from the transcript-based sessions above: here, when forced to rank them apart, **F2 (segment length) is the consistent bottom-two feature across all three submissions**, while F1 (review) stays top-two every time. That's the opposite of a tie — it suggests that once people *can* separate "seeing things together" from "getting a length number," review/co-registration is valued clearly higher than the length read-out on its own. F4 (deploy mode) is the most volatile feature across these three (ranked both best and worst), consistent with the transcript finding that its perceived value depends heavily on *when during deployment* it's still relevant (§3.3, Q1).

**Combined pattern across all 6 ranking data points (3 transcript-based + 3 numeric):** F1 is the most consistently high-valued feature overall; F2 and F5 show the widest swings in perceived value (procedure/role-dependent); F4's value is conditional on trust and on the deployment-phase framing; F3 sits in the middle in every data point so far. Treat this as directional only — six rankings is not a basis for a precise priority order, especially with 3 of them unlinked to session context (role, case type), which the earlier qualitative reasoning relies on to explain *why* a feature ranked where it did.

## 4. Per-session mini dossiers (reconstructed from transcript; many answer-sheet fields are "not captured")

### Session A — `Recording-20261005_144444` (28:40)
- **Role/context:** Not stated on tape. Case discussed is a May-Thurner-style venous + separate arterial segment (double "pullback").
- **Near Future:** Hands-on, completed; comfortable with record → scrub → segment flow; liked the X-ray/IVUS side-by-side sync immediately.
- **Automated measurements:** Hands-on; positive on both lumen+vessel display; wants more clinical depth (plaque morphology, calcium thickness/circumference, eccentricity change over a lesion, flow/perfusion assessment below the knee) as *future* asks, not complaints about what was shown.
- **Deploy mode:** Reached and liked ("cool," "this will be cool"); no explicit Q1–Q3 answers captured distinctly — conversation moved to future wish-list before the three core questions were asked verbatim.
- **Ranking:** Not completed on tape (recording likely cuts before this stage).
- **Missing capability/concern raised:** Plaque characterization, perfusion/duplex-like assessment, distrust of unexplained ("black box") automated scoring.
- **Strongest quote (unverified against audio):** *"Because I think the goal eventually is to get to a point where we don't need as much extra [X-ray/contrast]... we can lean a lot from [IVUS]."*

### Session B — `Tuesday Recording-20261006_083003` (17:51)
- **Role/context:** Physician, uses an "integrated" console today, currently marks lesions with a dry-erase marker on the screen; does arterial and venous cases.
- **Near Future:** Hands-on, completed. Explicitly said synchronized X-ray/IVUS mimics what they do with a grease marker and is an improvement.
- **Automated measurements:** Hands-on; explicitly low-value for this participant/case ("I don't care about that"). Raised an interesting original suggestion: auto-detect the device's distal marker/tip during deployment so the operator can toggle between proximal/distal to confirm healthy landing zones — **a concrete, participant-generated feature idea not currently on any of the F1–F5 cards.**
- **Deploy mode:** Hands-on; reached and reacted positively to multi-pullback overlay ("that would be neat," "I like that"); flagged **FDA/regulatory classification question** about co-registration needing a new 510(k) submission (not a design question but a go-to-market one worth routing to RA/QA).
- **Ranking:** Completed — see §3.4. Clear statement that F1/F2 are foundation, F3+F4 paired, F5 deprioritized.
- **Missing capability/concern:** Automatic landing-zone detection raised by moderator as a hypothetical — participant's response leaned skeptical/conditional ("trust over time... like trust in ChatGPT").

### Session C — `Tuesday Recording-20261006_101318` (24:01)
- **Role/context:** Physician, IVC/May-Thurner-type venous case; uses verbal "mark for IVC / mark for confluence" instructions to staff today, not synced to X-ray.
- **Near Future:** Hands-on, completed, **strongly positive** ("That's chef kiss," "That's clean"). Segment + sync explicitly said to save time versus today's verbal-marking workflow.
- **Automated measurements:** Hands-on; liked automation in principle (saves time without a rep present) but explicitly conditioned value on trust being earned over time, and ranked it lowest of the five cards because of dependency reasoning (see §3.4).
- **Deploy mode:** Hands-on; liked the overlay concept, but was the most detailed session on the breathing/motion-drift concern, and separately described their own real procedural pattern of abandoning any markers entirely once the stent starts to flare/engage.
- **Ranking:** Completed; F4 ranked above F2/F5, reasoning tied explicitly to "being able to bookmark it on the live" rather than deploy mode as a feature in isolation.
- **Missing capability/concern:** Sharper/clearer IVUS image quality was the explicit "magic wand" answer — a base image-quality ask, not a software-feature ask. Also wants lesion characterization (plaque composition/calcium), before/after comparison, and flow/perfusion measurement below the knee; explicitly distrustful of unexplained proprietary scoring precedent (cites a Medtronic foot-probe anecdote).

### Session D — `Tuesday Recording-20261006_105835` (9:28)
- **Role/context:** Physician; vein diameter case with two IVUS pullbacks; uses a different/third-party console today limited to ~5–6 manual measurement points.
- **Near Future:** Hands-on, completed; comfortable navigating with minimal guidance; liked bookmarks "mapped" to X-ray.
- **Automated measurements:** Hands-on; the **most enthusiastic reaction in the dataset** — explicitly favorable comparison to the legacy 5–6-dot system's limitations, confirmed the auto-generated contour was "almost spot on," liked click-to-edit correction.
- **Deploy mode:** Hands-on; reacted immediately positively ("I like it... makes a lot of the thought processes a little bit easier"); no explicit missing-info answer beyond a deflected hardware/monitor-placement tangent (not a software finding).
- **Ranking:** Not completed on tape — session ends on thanks before a ranking pass starts.
- **Missing capability/concern:** None substantive beyond the monitor-placement aside.
- **Strongest quote:** *"The difference is that these are AI generated... that was the biggest flaw of the parent system — like I said, you only get five dots."*

### Session E — `Tuesday Recording-20261006_140622` (25:23, two trainees)
- **Role/context:** Two IR/vascular-surgery trainees (explicitly "last year, integrated vascular surgery" / IR), work across Philips and Siemens labs.
- **Near Future:** Hands-on, completed; liked the automated per-frame annotation immediately ("I think that is awesome, like saves a lot of time"). Confirmed one participant's real workflow still measures diameter/area manually today by eyeballing/averaging.
- **Automated measurements:** Hands-on; **critical verification-gap finding** — asked where the measurement lines/dots are shown on the image, said they would not feel comfortable trusting the diameter number without seeing them. Moderator explicitly logged this as valuable feedback in the moment.
- **Deploy mode:** Hands-on; positive on time savings conditioned on trust; detailed discussion that markers stop mattering once stent flaring/engagement begins (attention fully shifts to the live fluoro image at that point) — a concrete answer to "when would this mode be unnecessary or get in your way."
- **Ranking:** Completed; Deploy Mode ranked highest, explicitly because of rep/tech-time economics; length measurement ranked solid-but-secondary.
- **Missing capability/concern:** "Magic wand" answer = sharper/clearer IVUS image, specifically for small patients where vessel edges are hard to resolve. Also discussed stent-sizing "advice" (AI suggestion, not automatic decision) as something they'd want and would weigh against their own judgment, not follow blindly.

### Session F — `Tuesday Recording-20261006_144127` (25:12, two trainees)
- **Role/context:** Two residents, mixed venous/arterial cases discussed; uses dry-erase marker + mental "internal sense" for distance today; both labs integrated desktop (not touchscreen) Intrasite.
- **Near Future:** Hands-on, completed; comfortable with segment creation; asked good clarifying questions about how distance is actually computed (confirmed it's X-ray centimeter-marker-based plus image processing, not purely IVUS-derived) — a comprehension check that the explanation satisfied.
- **Automated measurements:** Hands-on; liked the new processed/graphical ILD view as "easier to look at" but explicitly flagged that a more senior/seasoned attending "probably want[s] all the information" — i.e., a simplified view may not suit every user. Also the **terminology/legend confusion** finding (stenosis % per-slice vs. whole segment) and the **color-semantics clash** finding (green meaning different things in different parts of the UI) both come from this session — see §3.2.
- **Deploy mode:** Hands-on; reiterated the motion-drift concern and explicitly deferred any auto-correction to "future AI." Preference leaned toward minimal information during the live deployment phase ("less is more").
- **Ranking:** Not clearly completed before the transcript quality degrades near the end (noisy audio); no reliable rank order recovered.
- **Missing capability/concern:** Visualization clarity/consistency (color legend), not a new feature ask.

## 5. Candidate cross-cutting issues worth deeper investigation (not yet prioritized)

1. **Automated-measurement trust gap:** the single clearest, most actionable, most-repeated finding — participants in Sessions E and F explicitly want to see the underlying measurement lines/points, not just the output number, before they'd trust or use it. This is a concrete design fix candidate (show the contour/line, not only the derived value) rather than a trust-over-time problem.
2. **Deploy Mode's useful window may be front-loaded:** multiple participants describe disengaging from any overlay/markers once mechanical deployment (stent flaring/engagement) begins. Worth testing explicitly whether Deploy Mode should emphasize the *approach/positioning* phase and intentionally simplify or reduce information once deployment starts, rather than keeping the same information density throughout.
3. **Motion drift between planning and live is a recognized, not-yet-solved gap** that participants raised themselves (breathing, coughing, table movement) — currently out of scope per the prototype's own code comments and openly described to participants as "future AI"; expectations were managed reasonably in the sessions, but this should stay visible as a disclosed limitation in any roadmap communication.
4. **Color/terminology consistency** in the Distant Future measurement overlay (stenosis % semantics, green meaning "vessel" vs. implying "healthy") is a usability defect findable without new user research — candidate design fix, not a strategic question.
5. **Value of F5 (automated measurements) is case-dependent**, not uniformly high — strongest for sessions with time-pressure/rep-dependency framing (D, E), weakest where a participant saw it as replacing a step they don't mind doing (B). Suggests the future reporting pass should **cross-tabulate ranking by how the participant frames their current workflow pain**, not just aggregate counts.
6. **F1 and F2 get conflated in conversation but not when actually force-ranked apart.** Sessions B/C talk about them as one "foundation" (the guide's anticipated bundling risk), but all three numeric ranking submissions in §3.4 that *did* separate them put F2 (segment length) in the bottom two and F1 (review) in the top two. Worth testing directly in the next round whether this is a real preference (review > a length number on its own) or an artifact of how the cards were explained.
7. **Deploy Mode "who operates it" (Q2) is under-answered** across the dataset — worth a targeted follow-up rather than assuming today's console-operator pattern simply carries over.
8. Two participant-generated feature ideas outside the current F1–F5 set surfaced and are worth logging for the backlog: **(a)** auto-detect device distal-tip/marker during deployment to toggle and confirm landing zones (Session B); **(b)** AI-suggested stent sizing/landing zone as an overridable suggestion, not an automatic decision (Session E).

## 6. Explicit exposure/data gaps to disclose in any future report

- Only 3 of 6 substantive sessions reached a clean feature-ranking pass; none used the guide's "Not relevant" / "Not enough information" parking lanes in named form. Three additional numeric rankings exist (§3.4) but **cannot be confidently attributed to a specific recorded session or participant role** — do not present them as filling the A/D/F gap without flagging this provenance limitation.
- No session transcript contains a clearly asked-and-answered version of Deploy Mode Q2 ("who would operate it") independent from today's status quo.
- No participant demographic/role/IVUS-frequency data was captured in a structured way — any later report can only use what each participant volunteered conversationally, which is uneven across sessions.
- Three recordings (`Recording-20261005_144022`, `Recording -20261005_153126`, `Tuesday Recording-20261006_082814`) contain no usable prototype feedback and should not be counted as sessions/participants in any later summary.
- All quotes above are from machine transcription and must be spot-checked against the source video before being used in any externally shared document, consistent with the guide's own instruction to capture "exact quote only verbatim words."
