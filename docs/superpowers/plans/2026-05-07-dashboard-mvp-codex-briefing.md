# Codex Briefing — Dashboard MVP Plan 1

Copy this entire prompt to Codex when starting the build session. It briefs Codex on the project, conventions, and execution rules.

---

## Prompt to paste into Codex

```
You are executing an implementation plan for a personal management dashboard for Logan (Elcee the Alchemist), an independent rap artist and recording engineer in Manchester. The full plan is at:

/Users/logancooney/Projects/elcee-website/docs/superpowers/plans/2026-05-07-dashboard-mvp-plan-1-core.md

Read the plan top to bottom before starting. The plan has 18 tasks. Each task has bite-sized steps. Work through tasks in order. After each task: commit, then move to the next.

The architectural spec is at:

/Users/logancooney/Projects/elcee-website/docs/superpowers/specs/2026-05-07-career-management-dashboard-design.md

Read this if you hit architectural questions during execution.

CONVENTIONS (must be followed):
- English English always in user-visible text (colour, realise, centre)
- Never em dashes in copy or UI text, use commas or full stops
- Never hyphens joining words where avoidable
- No marketing-speak in copy. No "dive into", "delve", "game-changer", "leverage", "foster", "nuanced"

EXISTING INFRASTRUCTURE (do not rebuild):
- Supabase project (URL and keys in ~/Claude/.env)
- Vercel account (already deploys elceethealchemist.com)
- Telegram bot, Hetzner server (referenced by Plan 3, not Plan 1)

PRE-FLIGHT (Logan handles, may already be done):
- Google OAuth credentials in Google Cloud Console
- Subdomain decision: dash.elceethealchemist.com
- Sign-in allowlist: only elcee.mgmt@gmail.com
- Subagent-driven execution chosen, but in this session you are the executor

EXECUTION RULES:
- Work through tasks sequentially. Do not skip ahead.
- Each step in a task is a discrete action. Commit after each task, not each step.
- If a step fails, retry once. If it fails again, stop and ask Logan.
- If you hit ambiguity (a design decision the plan does not specify), stop and ask Logan. Do not guess.
- Do not modify the plan. If the plan has an error, flag it to Logan and wait for confirmation before changing.
- For UI tasks, match the aesthetic of elceethealchemist.com: dark theme (#080808), Nimbus Sans font, sharp geometry, restrained animations, no SaaS rounded corners.

START WITH: Task 1, "Initialise Next.js project". Read its steps, run them, commit, then move to Task 2.

Confirm you have read the plan, understood the conventions, and you are ready to start Task 1.
```

---

## Things to brief Codex on per session (if context resets)

If you start a fresh Codex session mid-build, prepend this short reminder:

```
Continuing the dashboard build. Plan: /Users/logancooney/Projects/elcee-website/docs/superpowers/plans/2026-05-07-dashboard-mvp-plan-1-core.md

Conventions: English English in copy, no em dashes, no hyphens joining words, match elceethealchemist.com aesthetic.

Resume from the next unchecked task in the plan. Read the previous task's commit message to confirm where we left off.
```

---

## When to escalate back to Claude/Opus

Codex should hand back to Logan (and Logan can consult Claude) when:

1. **Design decision needed:** UI choices not covered in the plan, e.g. "what should the empty state of the Kanban look like?"
2. **Plan error or ambiguity:** "Step 3 says X but Step 5 expects Y, which is right?"
3. **Unexpected technical blocker:** "Supabase RLS is rejecting queries that should work, the policy uses auth.email() but NextAuth does not populate it" (this is a real one to watch for, see Risk Note below).
4. **Quality concern:** "This UI looks generic, the spec says it should match elceethealchemist.com, do you want me to iterate?"
5. **Off-plan work needed:** "This task assumes a file exists that does not, should I create it or escalate?"

---

## Known risk notes for the build

These are gotchas to flag if they come up:

1. **Supabase RLS + NextAuth interaction.** The migration uses `auth.email()` in the RLS policy. This works for Supabase Auth but NOT for NextAuth out of the box. Since the API routes use the service role key (which bypasses RLS), the policies are defensive only. If Codex sees RLS-related errors, the fix is either: a) confirm queries are going through the service role client (`supabaseAdmin()`), or b) escalate.

2. **Next.js 16 App Router params are async.** The plan correctly uses `params: Promise<{ id: string }>` with `await params`. If Codex copies older Next.js patterns from training data, it may use sync params, which will fail.

3. **NextAuth v5 (beta) is installed.** API differs slightly from v4. The plan uses v5 patterns. Codex should not "fix" code by reverting to v4 patterns.

4. **Tailwind v4 syntax.** `@import "tailwindcss";` in globals.css is correct for Tailwind v4 (which Next.js 16's create-next-app installs). Codex should not change this to v3 `@tailwind base; @tailwind components;` directives.

5. **The migration runs in Supabase, not via a CLI.** Logan applies the SQL manually in the Supabase dashboard. Codex should not try to run `supabase db push` or similar.
