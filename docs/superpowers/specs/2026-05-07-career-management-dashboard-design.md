# Career Management Dashboard, Design Spec

**Date:** 2026-05-07
**Author:** Logan (Elcee) and Claude
**Status:** Draft, awaiting review

---

## Goal

A personal management dashboard that gives Logan a clear, actionable daily schedule across his entire career, artist work and engineering business, so that he can stop trying to keep track in his head and focus on doing the work.

The dashboard removes ambiguity, indecision, and roadblocks by surfacing exactly what to do today, this week, and over the longer horizon, with everything time blocked into Google Calendar around his existing obligations.

The MVP is the smallest version that delivers this end to end. It is designed to evolve, not to be perfect on day one.

---

## Design Principles

These are non-negotiable. Every implementation decision is checked against them.

1. **Logan drives, system supports.** The system asks for input rather than assuming. It does not generate vague tasks, generic content, or stale trend references on its own. Where it does not know, it asks. Where it has learned, it confirms.

2. **Tasks must be specific.** No vague entries. Every task references the real subject (which post, which video, which client, which job), with a time estimate, and clear "done" criteria. "Edit videos" is not a task. "Edit Tuesday's Reel, hook X, b roll from Monday session, audio Y, output 7s vertical, 45 min" is a task.

3. **Stream split first.** Artist work is always the priority because the engineering business funds the artist career. The split between artist and business is visible in the layout, not buried in a filter.

4. **Self improving.** The system captures feedback after each task, reads it at the next weekly planning session, and adjusts. Time estimates calibrate. Patterns surface. The system gets sharper over time, not staler.

5. **UI quality matches elceethealchemist.com.** Same fonts (Nimbus Sans Black, Nimbus Sans), dark theme, sharp geometry, restrained smooth animations, no SaaS rounded corners.

6. **Desktop and mobile both excellent.** Logan's proper work sessions are on his laptop, on the move uses are mobile. Neither is a second class citizen.

7. **Existing infrastructure is reused.** The Reddit lead scanner, Telegram bot, Hetzner cron server, Supabase database, Vercel hosting, content skills (`/instagram-plan`, `/instagram-from-leads`, `/content-draft`, `/studio-reel`, `/analyse-content`), knowledge base, and saved posts library all stay. The dashboard wires them together rather than replacing them.

---

## Architecture Overview

```
                      ┌──────────────────────────┐
                      │    Logan's daily flow    │
                      └─────────────┬────────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              ▼                     ▼                     ▼
      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
      │   Telegram   │      │   Web        │      │   Google     │
      │   briefing   │      │   dashboard  │      │   Calendar   │
      │   (8am)      │      │   (laptop +  │      │   (phone +   │
      │              │      │    mobile)   │      │    desktop)  │
      └──────┬───────┘      └──────┬───────┘      └──────┬───────┘
             │                     │                     │
             └─────────────────────┼─────────────────────┘
                                   │
                                   ▼
                          ┌──────────────────┐
                          │    Supabase      │
                          │  (tasks, feedback,│
                          │  recurring rules) │
                          └────────┬─────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
      ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
      │ /plan-week  │      │  Existing   │      │  Reddit     │
      │ skill       │      │  content    │      │  lead       │
      │ (Sunday)    │      │  skills     │      │  scanner    │
      └─────────────┘      └─────────────┘      └─────────────┘
```

**Key flows:**

- **Sunday evening:** Logan runs `/plan-week`. Claude pulls last week's completion data + this week's calendar + Supabase content drafts + lead pipeline, has a curated conversation with Logan, generates specific time blocked tasks, writes them to Supabase and Google Calendar.
- **Every morning:** Telegram bot sends today's tasks at 8am, pulled from Supabase.
- **Throughout the day:** Logan opens the dashboard (or his calendar) to see what's next. Ticks tasks complete. Adds optional one line feedback. Tasks update Supabase, which flags Calendar events as done.
- **Throughout the week:** Recurring tasks auto generate (e.g. "Monday morning, review last week's content performance"). Manual adds happen when something new comes up.

---

## Data Model

Four new tables in Supabase. All include `created_at`, `updated_at`, `user_id` (for future multi tenancy, but defaults to Logan).

### `tasks`

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `title` | text | Specific, no vagueness |
| `description` | text | Full context: hooks, file paths, references, criteria |
| `stream` | enum | `artist`, `business` |
| `category` | enum | `engineering`, `content`, `releases`, `live`, `strategic` |
| `service_theme` | enum | `recording`, `mixing`, `production`, `tuition`, null (for non-business) |
| `status` | enum | `backlog`, `this_week`, `today`, `in_progress`, `done`, `skipped`, `rolled_over` |
| `priority` | int | 1–3 (1 = highest) |
| `est_minutes` | int | Estimate at creation |
| `actual_minutes` | int | Logged on completion (optional) |
| `time_block_start` | timestamp | When the task is scheduled |
| `time_block_end` | timestamp | |
| `deadline` | timestamp | Hard deadline if any |
| `project_id` | uuid | FK to `projects`, optional |
| `parent_task_id` | uuid | FK to self for sub tasks |
| `calendar_event_id` | text | Google Calendar event ID (for sync) |
| `feedback_note` | text | Optional one liner on completion |
| `completed_at` | timestamp | |
| `source` | enum | `manual`, `recurring_rule`, `plan_week`, `auto_generated` |
| `linked_data` | jsonb | Flexible link to Supabase rows (lead id, content draft id, etc.) |

### `projects`

Multi task bodies of work. A single release, an EP release, a client mix package, a build like this dashboard, a tutoring student's curriculum.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `title` | text | |
| `description` | text | |
| `stream` | enum | `artist`, `business` |
| `category` | enum | Same as tasks |
| `template_id` | uuid | FK to `project_templates`, optional (manual projects skip this) |
| `anchor_type` | enum | `target_date` (back tracked from a deadline) or `milestone` (organised by phase) |
| `target_date` | date | Release day, delivery date, etc. Required if `anchor_type = target_date` |
| `milestones` | jsonb | Ordered list of milestones with target dates, used if `anchor_type = milestone` |
| `goals` | text | What "done" looks like in plain English |
| `status` | enum | `active`, `paused`, `done`, `archived` |
| `start_date` | date | |
| `metadata` | jsonb | Type specific fields, e.g. song count for an EP, client name, build deliverables |

### `project_templates`

The framework for each project type. New ones get captured the first time Logan runs that type of project. Improved over time after each instance.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `name` | text | e.g. "Single Release", "EP Release", "Client Mix Package", "Claude Code Build" |
| `category` | enum | Same as tasks |
| `anchor_type` | enum | `target_date` or `milestone` |
| `task_template` | jsonb | Ordered list of task definitions with relative timing |
| `description` | text | What this template covers, when to use it |
| `version` | int | Increments each time the template is refined |
| `improvement_notes` | jsonb | History of changes, why each change was made |

**`task_template` shape (jsonb):**

```jsonc
[
  {
    "title": "Book mastering",
    "description": "Send final mix to mastering engineer. Standard turnaround 7 days.",
    "stream": "artist",
    "category": "releases",
    "relative_timing": "T-12w",   // for target_date anchored
    "est_minutes": 30,
    "priority": 2
  },
  {
    "title": "DistroKid upload",
    "description": "Upload to DistroKid with 4-week lead time for editorial pitching window.",
    "stream": "artist",
    "category": "releases",
    "relative_timing": "T-4w",
    "est_minutes": 45,
    "priority": 1
  }
  // ... more
]
```

For `milestone` anchored templates, swap `relative_timing` for `milestone_index`.

### `recurring_rules`

Templates that auto generate tasks on a schedule. Used in v1.1 (engine deferred), but the table exists in MVP for forward compatibility.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `title` | text | |
| `description_template` | text | Variables like `{{week_of}}` filled in at generation |
| `stream` | enum | |
| `category` | enum | |
| `frequency` | enum | `daily`, `weekly`, `monthly` |
| `day_of_week` | int | 0–6, for weekly |
| `time_of_day` | time | Default time slot |
| `est_minutes` | int | |
| `active` | bool | |

### `weekly_reviews`

Snapshots of each Sunday planning session, used by self improvement.

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `week_of` | date | Monday of the week reviewed |
| `tasks_planned` | int | |
| `tasks_completed` | int | |
| `tasks_skipped` | int | |
| `tasks_rolled_over` | int | |
| `notes` | text | Logan's free text reflection |
| `claude_observations` | jsonb | Patterns Claude noticed (estimate accuracy, completion times of day, etc.) |
| `next_week_adjustments` | text | What we agreed to do differently |

---

## Project Frameworks

Without frameworks, `/plan-week` cannot generate project tasks. It only handles recurring work. Releases are the highest stakes projects in Logan's calendar, so frameworks are MVP scope, not deferred.

### Project types that need frameworks

Four project types cover the bulk of Logan's work. Each gets a template captured during its first run.

| Type | Anchor | Typical lead time | Task count | Notes |
|---|---|---|---|---|
| **Single release** | release date | 6 to 8 weeks | 15 to 25 | High frequency, fast cycle |
| **EP release** | release date | 12 to 16 weeks | 40 to 60 | Lower frequency, full campaign |
| **Client work** | delivery date | 5 to 10 working days | 5 to 10 | Mix, master, multi track packages |
| **Claude Code build** | milestones (no fixed end) | variable | variable | This dashboard, future tools |

Other project types (festival applications, press campaigns, tutoring curricula, music videos) get added when Logan first runs them. The system asks: "I have not seen a project of this type before. Want to capture a template?" If yes, Claude walks Logan through the questions, captures the answers, generates the template.

### How frameworks generate tasks

When Logan creates a project from a template:

1. Pick template (e.g. "Single Release").
2. Set anchor (e.g. release date 15 August 2026).
3. System computes absolute dates for every task in the template (T-12w from 15 Aug = 24 May).
4. Tasks get written to the `tasks` table with `project_id` set, status `backlog`.
5. As each task's date approaches, it surfaces in `/plan-week` for the relevant week.

Logan can override any auto generated task before it lands in the calendar. Skipping a task is fine, the template does not become rigid.

### Self improving templates

After each project ends, Claude runs a **post project review** during the next `/plan-week`:

- Which template tasks did you skip? (Should they be removed from the template?)
- Which tasks were added manually that were not in the template? (Should they be added?)
- Were any tasks scheduled too late or too early? (Adjust relative timing.)
- Did anything go wrong because of a missing step? (Add it.)

Logan accepts or rejects each suggestion. Approved changes update the template, increment the version, and log the reasoning in `improvement_notes`. The next single release uses the improved version.

This is the system getting sharper over time. A release framework written today will look different and better six releases from now.

### MVP framework: capture during first use

The spec does not pre define every framework's content. Templates get built when Logan first runs each project type. For releases specifically, this likely happens in the first or second `/plan-week` after the dashboard ships, when Logan is setting up his next release. Claude leads the conversation:

> "Walk me through what a single release needs from kickoff to one week post release. I will capture each task as we go, with timing relative to release day, who does it, how long it takes, and why it matters."

The captured framework becomes the v1 template. Future releases use it. Each release's post project review refines it.

### `/plan-week` integration with projects

The Sunday flow gets a new step for project state. See updated flow below.

---

## The Three Views

### 1. Daily tasks (Today)

Default landing page when Logan opens the dashboard.

**Layout:**
- Header: today's date, day of week, weather optional, current local time.
- Two columns on desktop, stacked on mobile, with a clear visual divider:
  - **Left or top: ARTIST.** Today's artist tasks, ordered by time block. Each task shows title, time block, est minutes, status.
  - **Right or bottom: BUSINESS.** Same shape, business tasks.
- Below: "Already completed today" collapsed by default, expand to see ticked items.
- Top right: button "Add task" (modal, manual quick add).
- Bottom right (mobile): floating "Add" button.

**Task card design:**
- Two state visual: pending (sharp white border, dark fill) vs done (faded, struck through, ticked).
- Title in Nimbus Sans Black, 16px on mobile, 18px on desktop.
- Time block in monospace, e.g. `09:30 → 10:15`.
- Sub line: stream badge, category, est minutes.
- Tap on task: expands to show full description, related project, linked data (e.g. content draft preview).
- Tick to complete: opens a small one line feedback prompt (optional, can skip). On submit, marks done, updates Calendar.
- Right of card: "skip" and "reschedule" actions (small icons).

**Empty state:** If today has no tasks, prompt: "No tasks for today. Run /plan-week to populate, or add one manually."

**Stream priority:** Artist tasks always render first when ordering is ambiguous, reinforcing the "artist is priority" principle.

### 2. Weekly tasks (Week)

Calendar style 7 day grid. Visually similar to Google Calendar but with stream split.

**Layout:**
- Top: navigation, "← Prev week" / "Today" / "Next week →" / "Jump to date".
- 7 columns, Monday to Sunday. Each column is a day.
- Within each day column, time slots from 06:00 to 22:00 by default (toggleable).
- Tasks render as time blocked cards in their slot, coloured by stream:
  - Artist: warm tone (off white on dark, or cream)
  - Business: cool tone (white on dark, or pale grey)
- Drag to reschedule on desktop.
- Tap to view details on mobile.
- Calendar style: existing Google Calendar events show as faint background blocks, so the planner can see what's already booked but not interfere.

**Stream split:** Two row layout option, top half shows artist tasks across the week, bottom half shows business. Toggleable in settings. Default: combined view colour coded.

**Mobile:** Day at a time, swipe between days, current day highlighted.

### 3. Kanban

Workflow status view. All active tasks regardless of date.

**Columns:**
- **Backlog** (status: `backlog`)
- **This Week** (status: `this_week`)
- **Today** (status: `today`)
- **In Progress** (status: `in_progress`)
- **Done** (status: `done`, last 7 days only)

**Layout:**
- Five columns horizontally on desktop, scroll horizontally on tablet, stacked on mobile.
- Cards drag between columns to update status.
- Filter bar at top: stream (Artist | Business | All), category, project.
- Card shows: title, time block if scheduled, stream badge, est minutes.
- Compact view toggle.

**Use case:** When Logan wants to see "what's in flight across everything" rather than today specifically. Useful for planning ahead, balancing load, spotting bottlenecks.

---

## The `/plan-week` Sunday Flow

The most important interaction in the system. Done well, the entire week unfolds clearly. Done badly, garbage tasks appear.

### Trigger

Logan runs `/plan-week` from Claude Code on Sunday evening. Could also be triggered from the dashboard ("Plan next week" button) which deep links into Claude.

### Flow

**Step 1, Review last week.**

Claude pulls the latest `weekly_reviews` row plus the past week's tasks. Reports:
- Completion rate
- Skipped tasks (with reasons if logged)
- Time estimate accuracy (planned vs actual)
- Any patterns from `claude_observations`

Asks Logan: "Anything from last week worth flagging? Any tasks you want carried over?"

**Step 2, Pull this week's calendar.**

Claude reads Google Calendar for the upcoming 7 days. Lists existing obligations: studio sessions, tutoring sessions, free intro calls, personal events (gym, social).

Asks Logan: "Anything coming up next week not on your calendar I should know about?" (Examples Claude prompts: a release? travel? a music video shoot?)

**Step 3, Pull project state.**

For each active project, Claude pulls all tasks scheduled for the upcoming 7 days. Surfaces a summary:

> "Active projects this week:
> - Release 'Untitled 4' (single, T-4w): 6 tasks due, including DistroKid upload (Wed) and pre save link setup (Fri)
> - Mix package for [client]: 2 tasks due, vocal mix revision and final master delivery
> - Tutoring student [name]: next session Thursday, prep task due Wednesday"

Logan confirms or adjusts: "Move the DistroKid upload to Tuesday, I have a session Wednesday." "Skip prep for [student] this week, we agreed to free form."

**Step 4, Pull other working data.**

Claude pulls from Supabase:
- New leads needing follow up (Reddit, contact form, Calendly enquiries)
- Content drafts ready to shoot or edit (independent of any release)
- Anything else flagged for follow up

Logan can scan and confirm: "Yes prioritise these, deprioritise those."

**Step 5, Generate the plan.**

Claude proposes the week. Specific tasks with time blocks, time estimates, descriptions tied to real assets. Organised by day, split by stream. Project tasks blended with recurring and one off work.

Output is shown inline in the conversation as a draft (Markdown table or Claude's native formatting).

**Step 6, Approve or refine.**

Logan approves, adjusts, removes, or adds. Common adjustments:
- "Too much on Tuesday, push the IG edit to Wednesday"
- "Move all artist work to mornings, business to afternoons"
- "Add: write 2 verses for new track Thursday morning"

Claude regenerates affected slots. Final approval before write.

**Step 7, Trend and voice input (content tasks only).**

Before generating any content related task description, Claude asks:
- "What audio are you seeing trending right now? Any saved posts you want me to reference?"
- "Anything you've been wanting to talk about that hasn't fit a post yet?"

This is non negotiable per Design Principle 1.

**Step 8, Post project review (only if a project ended in the past week).**

For each project that completed last week, Claude asks the post project review questions and updates the relevant template (see Project Frameworks section). This is how templates get sharper over time.

**Step 9, Write to Supabase + Google Calendar.**

All approved tasks written. Calendar events created with task ID embedded in the description so two way sync works later.

**Step 10, Save the weekly review.**

A new `weekly_reviews` row is created for the upcoming week. Filled in throughout the week as tasks complete.

### What Claude does not do

- Does not generate generic tasks ("plan content," "do admin").
- Does not invent priorities Logan did not state.
- Does not assume content trends. It asks.
- Does not assume project task content. It uses templates and asks Logan.
- Does not skip Step 1 (last week review). The whole self improvement loop depends on it.
- Does not skip Step 8 when projects have ended. Template self improvement requires it.

---

## Google Calendar Sync (MVP, one way write)

**Auth:** Google OAuth via NextAuth. Same flow as login. Scope: `calendar.events`.

**On task creation with a time block:**
- Create Google Calendar event.
- Title: task title.
- Description: task description, plus a hidden line `[task_id:UUID]` for sync identification.
- Colour: stream specific (artist colour, business colour).

**On task update:**
- If time block changes, update Calendar event.
- If task is deleted, delete Calendar event.
- If task is completed, prefix the event title with ✓ so the calendar shows status at a glance.

**Conflict avoidance during `/plan-week`:**
- Read existing Calendar events for the planning window before suggesting time blocks.
- Never schedule on top of existing events.
- If a busy stretch leaves no room, surface to Logan: "Tuesday is fully booked, push X to Wednesday?"

**v1.1 deferred:** Two way sync, where editing a Calendar event updates the task. This requires push notifications or polling, and the complexity is not worth the risk for MVP. MVP is one way: dashboard is source of truth, Calendar is the display.

---

## Telegram Morning Briefing

**When:** 8am UK time (configurable later).

**Where:** Existing Telegram bot, same chat used for Reddit lead approvals.

**What:**

```
☀ Monday 12 May

ARTIST
• 09:00–10:30  Shoot 3 b-roll clips for IG (45 min each)
• 14:00–15:00  Lyrics, second verse for "Untitled 4"

BUSINESS
• 11:00–12:00  Mix session 3 of 5 on [Client] track
• 16:00–16:30  Reply to 4 new Reddit leads (drafts ready, review and post)

Open dashboard: https://...
```

**Interactivity (MVP):**
- Tap a task to deep link into the dashboard.
- No inline complete or reschedule (deferred to v1.1).

**Implementation:**
- Cron on Hetzner server, daily 8am.
- Pulls today's tasks from Supabase.
- Renders message and sends via Telegram bot API.

**Failure mode:** If the cron fails, briefing simply does not arrive. Logan opens dashboard manually. No silent corruption.

---

## Content Skills Integration

The existing skills are not replaced. They are wired into the task system.

### How tasks reference skills

A task generated by `/plan-week` for content work points at the relevant skill. Example task description:

```
Run /instagram-from-leads to draft 5 posts.
Skill: ~/.claude/commands/instagram-from-leads.md

Output saved to: instagram_drafts table
Linked task: "Shoot Tuesday Reel" (created automatically from draft id)
```

When Logan runs the skill, the resulting Supabase rows (drafts) get linked back to the task via `linked_data` jsonb. Subsequent tasks (shoot, edit, post) get auto created with references to the specific draft.

### Quality gates

Already enforced in the skills via anti AI checks. The dashboard does not duplicate these. Trust the skills.

### Performance feedback

When Logan posts a piece of content and updates `performance` in Supabase, that data feeds the next `/plan-week` (Step 4), where Claude reviews what worked and what did not before generating new content tasks.

### Studio reel for artist account

`/studio-reel` produces cinematic voiceover briefs for `@elceethealchemist`. These are tasks too: the brief is the planning task, the shoot is the next task, the edit is the next task. Same flow as engineer content.

---

## Self Improvement (v1)

**MVP scope:** capture data, surface at next plan. No automated pattern detection in MVP.

**Captured per task:**
- `actual_minutes` vs `est_minutes`
- `completed_at` time of day
- Status transitions (rolled over how many times before completion?)
- `feedback_note` free text

**Captured per week:**
- Completion rate
- Tasks skipped or rolled over
- Logan's free text reflection (Step 1 of `/plan-week`)
- Claude's observations (jsonb, written by Claude during Step 1)

**How it surfaces:**
- During Step 1 of `/plan-week`, Claude reads recent task and review data and points out anything notable. Examples:
  - "Video edit tasks have averaged 1.5x your estimates over 3 weeks. Bump default estimate to 60 min?"
  - "Tasks scheduled after 16:00 have a 40% completion rate. Move admin to mornings?"
  - "Three Reddit lead replies skipped this week. Want to deprioritise or batch them differently?"
- Logan accepts or pushes back. Adjustments are written into the next week's plan and to recurring rule defaults if applicable.

**v1.1 enhancement:** automated pattern detection script runs nightly, populates `claude_observations` automatically. MVP does this in the conversation manually.

---

## Tech Stack and Infrastructure

| Layer | Choice | Rationale |
|---|---|---|
| Frontend | Next.js 16 App Router, TypeScript | Same stack as elceethealchemist.com, Logan and I both familiar |
| Styling | Inline styles + globals.css | Matches the website's pattern, no new conventions |
| Animation | Framer Motion + Lenis | Same as the website |
| Auth | NextAuth, Google provider | Single login that also unlocks Calendar access |
| Database | Supabase | Already running, lead and content data already there |
| Hosting | Vercel | Existing deployment, same project or sibling project |
| Calendar | Google Calendar API via OAuth | Logan's source of truth for time |
| Bot | Telegram bot, existing | Already running for Reddit lead approvals |
| Cron | Hetzner server, existing | Already running daily Reddit cron |
| Skills | Claude Code, existing skill files | No change to skill files, just integration |

**Subdomain:** Suggest `dash.elceethealchemist.com` or `app.elceethealchemist.com`. Decision pending Logan, default to `dash.elceethealchemist.com`.

---

## MVP Scope

What ships in the first build. Estimated 42 to 58 hours of focused work (revised after adding project frameworks).

1. Database schemas (5 tables, including `project_templates`) and migrations
2. Auth flow, Google OAuth + Calendar scope
3. Dashboard, three views, Daily + Weekly + Kanban
4. Manual task add and edit (modal)
5. Manual project create flow (pick template, set anchor, generate task tree)
6. Tap to complete, with optional feedback note
7. Google Calendar one way write sync
8. `/plan-week` skill, Sunday conversation flow (10 steps including project state and post project review)
9. Project framework capture flow (interactive, runs the first time Logan creates a project type without a stored template)
10. Telegram morning briefing, 8am cron
11. Content skills integration (task references, linked_data plumbing)
12. End to end testing and UI polish pass

Project frameworks (Single, EP, Client, Build) are MVP scope but not pre populated. They get captured when Logan first runs each project type, with Claude leading the capture conversation.

---

## Deferred to v1.1

Built once MVP is proven and in daily use.

- Gantt or timeline view (long horizon, projects across weeks)
- Recurring rules engine (cron driven auto generation of routine tasks)
- Two way Calendar sync (edit in Calendar updates task)
- Self improvement automated pattern detection (nightly cron)
- Project view (drill into a project, see all its tasks, edit project metadata)
- Inline Telegram interactions (tap to complete, tap to reschedule)

---

## Deferred to Phase 2

Built when v1.1 is proven and Logan wants to expand.

- Lead pipeline view (Reddit, contact form, Calendly enquiries, with follow up cadence)
- Release tracker (with Spotify API for analytics, release stages, asset checklist)
- Financial dashboard (pie tax integration, spreadsheet ingestion, target tracking)
- Google Drive asset linking (footage folders, lyrics docs, project files)
- Multi user (if Logan ever brings on a manager or assistant)

---

## Open Questions

Resolved by Logan during spec review or first session.

1. **Subdomain:** `dash.elceethealchemist.com` vs `app.elceethealchemist.com` vs other?
2. **Stream colours:** Specific hex values for artist vs business in the UI? Default proposal: artist = warm cream `#f0ede8`, business = sharp white `#fafafa`, on the existing `#080808` dark background.
3. **Telegram briefing time:** 8am default, or different?
4. **Default work hours:** 06:00–22:00 in Week view, or narrower (e.g. 09:00–19:00)?
5. **Recurring rules MVP behaviour:** Table exists, but no engine. Do we hand seed any rules at MVP launch, or wait until v1.1?
6. **First framework to capture:** Likely the Single Release framework, given releases are the priority. Are there any active or upcoming releases that should anchor the first capture session, so the framework is grounded in a real release rather than abstract?

---

## What this spec is not

- Not a UI mockup. Detailed visual design decisions happen during implementation, against the agreed quality bar (matches elceethealchemist.com).
- Not an implementation plan. The implementation plan is written next, after Logan approves this spec.
- Not a marketing document. It is a working contract between Logan and the build.
