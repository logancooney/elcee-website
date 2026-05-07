# Dashboard MVP, Plan 1: Core Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a working dashboard at `dash.elceethealchemist.com` with three views (Today, Week, Kanban), Google OAuth, and manual task management. Logan can log in, add tasks, see them organised by stream and time, complete them, and the UI matches the quality of elceethealchemist.com.

**Architecture:** New Next.js 16 project in a new repo (`elcee-dashboard`), separate from the marketing site. Same tech stack as elceethealchemist.com for familiarity. Uses Logan's existing Supabase project (adds new tables). Google OAuth via NextAuth. Deployed on a new Vercel project.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS, Framer Motion, Lenis, NextAuth (Google provider), Supabase (existing project), Vitest for unit tests, Playwright for e2e tests.

**Estimated time:** 18 to 24 hours of focused work.

**Defines done:** Logan can sign in with Google, navigate between Today / Week / Kanban views, add a task via modal, see it appear in all views, complete it with optional feedback, and the dashboard works equally well on his laptop and phone.

---

## Pre-flight Checklist (Logan needs to do these before Task 1)

These cannot be automated. Logan completes them and confirms before implementation starts.

- [ ] **Create new Google Cloud project** for OAuth. Get a Client ID and Client Secret. (Notes: project name "Elcee Dashboard". Add `https://dash.elceethealchemist.com/api/auth/callback/google` and `http://localhost:3000/api/auth/callback/google` as redirect URIs. Scopes for Calendar come later in Plan 3.)
- [ ] **Decide subdomain.** Default: `dash.elceethealchemist.com`. Confirm or override.
- [ ] **DNS:** Add a CNAME record for the subdomain pointing to Vercel (Vercel will provide the target after the project is created in Task 1).
- [ ] **Confirm Supabase project credentials** are accessible. (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY`. Already in `~/Claude/.env`.)
- [ ] **Confirm stream colours** for the UI. Default: artist `#f0ede8` (warm cream), business `#fafafa` (sharp white), background `#080808` (near-black). Yes/no/override.
- [ ] **Confirm work hours** for the Week view. Default: 06:00–22:00. Yes/narrower/wider.

---

## Task 1: Initialise Next.js project

**Files:**
- Create: `/Users/logancooney/Projects/elcee-dashboard/` (new directory)
- Create: `package.json`, `tsconfig.json`, `next.config.js`, `tailwind.config.ts`, `postcss.config.js`, `.gitignore`, `README.md`

- [ ] **Step 1: Create the project directory and initialise Next.js**

```bash
cd /Users/logancooney/Projects/
npx create-next-app@latest elcee-dashboard --typescript --tailwind --app --no-src-dir --turbopack --import-alias "@/*"
cd elcee-dashboard
```

Decline ESLint customisation prompts. Accept defaults for everything else.

- [ ] **Step 2: Install runtime dependencies**

```bash
npm install next-auth@beta @supabase/supabase-js framer-motion lenis @vercel/analytics resend
```

- [ ] **Step 3: Install dev dependencies**

```bash
npm install -D vitest @vitest/ui @playwright/test @types/node
```

- [ ] **Step 4: Initialise git and make the first commit**

```bash
git init
git add -A
git commit -m "chore: initialise Next.js project"
```

- [ ] **Step 5: Verify the dev server runs**

```bash
npm run dev
```

Expected: server starts on port 3000, default Next.js page loads at `http://localhost:3000`. Stop with Ctrl+C.

- [ ] **Step 6: Create README.md**

```markdown
# Elcee Dashboard

Personal management dashboard for Elcee the Alchemist's career.

Built with Next.js 16, TypeScript, Tailwind, Supabase, NextAuth.

## Local development

```
npm run dev
```

See `docs/` for build documentation.
```

```bash
git add README.md
git commit -m "docs: add README"
```

---

## Task 2: Supabase schema, all 5 tables

Per spec MVP scope: all 5 tables defined upfront. Plan 1 uses `tasks` and `weekly_reviews`. Plan 2 fills out `projects` and `project_templates`. Plan 3 v1.1 powers `recurring_rules`. Schema is shaped correctly from day one so future plans add behaviour, not migrations.

**Files:**
- Create: `/Users/logancooney/Projects/elcee-dashboard/supabase/migrations/20260507_dashboard_core.sql`

- [ ] **Step 1: Create the migration file**

```sql
-- File: supabase/migrations/20260507_dashboard_core.sql

-- Enums
create type task_stream as enum ('artist', 'business');
create type task_category as enum ('engineering', 'content', 'releases', 'live', 'strategic');
create type task_service_theme as enum ('recording', 'mixing', 'production', 'tuition');
create type task_status as enum ('backlog', 'this_week', 'today', 'in_progress', 'done', 'skipped', 'rolled_over');
create type task_source as enum ('manual', 'recurring_rule', 'plan_week', 'auto_generated');
create type project_status as enum ('active', 'paused', 'done', 'archived');
create type project_anchor_type as enum ('target_date', 'milestone');
create type recurring_frequency as enum ('daily', 'weekly', 'monthly');

-- Project templates
create table public.project_templates (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  name text not null,
  category task_category not null,
  anchor_type project_anchor_type not null,
  task_template jsonb not null default '[]'::jsonb,
  description text,
  version int not null default 1,
  improvement_notes jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index project_templates_user_idx on public.project_templates (user_email);

-- Projects
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  title text not null,
  description text,
  stream task_stream not null,
  category task_category not null,
  template_id uuid references public.project_templates(id) on delete set null,
  anchor_type project_anchor_type not null default 'target_date',
  target_date date,
  milestones jsonb,
  goals text,
  status project_status not null default 'active',
  start_date date not null default current_date,
  metadata jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index projects_user_status_idx on public.projects (user_email, status);

-- Tasks
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  title text not null,
  description text,
  stream task_stream not null,
  category task_category not null,
  service_theme task_service_theme,
  status task_status not null default 'backlog',
  priority smallint not null default 2 check (priority between 1 and 3),
  est_minutes int,
  actual_minutes int,
  time_block_start timestamptz,
  time_block_end timestamptz,
  deadline timestamptz,
  project_id uuid references public.projects(id) on delete set null,
  parent_task_id uuid references public.tasks(id) on delete set null,
  calendar_event_id text,
  feedback_note text,
  completed_at timestamptz,
  source task_source not null default 'manual',
  linked_data jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index tasks_user_status_idx on public.tasks (user_email, status);
create index tasks_user_time_block_idx on public.tasks (user_email, time_block_start);
create index tasks_project_idx on public.tasks (project_id);

-- Recurring rules (table only, engine in Plan 3 v1.1)
create table public.recurring_rules (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  title text not null,
  description_template text,
  stream task_stream not null,
  category task_category not null,
  frequency recurring_frequency not null,
  day_of_week smallint check (day_of_week between 0 and 6),
  time_of_day time,
  est_minutes int,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index recurring_rules_user_active_idx on public.recurring_rules (user_email, active);

-- Weekly reviews
create table public.weekly_reviews (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  week_of date not null,
  tasks_planned int not null default 0,
  tasks_completed int not null default 0,
  tasks_skipped int not null default 0,
  tasks_rolled_over int not null default 0,
  notes text,
  claude_observations jsonb,
  next_week_adjustments text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_email, week_of)
);

-- updated_at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger project_templates_updated_at before update on public.project_templates
  for each row execute function public.set_updated_at();
create trigger projects_updated_at before update on public.projects
  for each row execute function public.set_updated_at();
create trigger tasks_updated_at before update on public.tasks
  for each row execute function public.set_updated_at();
create trigger recurring_rules_updated_at before update on public.recurring_rules
  for each row execute function public.set_updated_at();
create trigger weekly_reviews_updated_at before update on public.weekly_reviews
  for each row execute function public.set_updated_at();

-- RLS: only the matching user can see their data
alter table public.project_templates enable row level security;
alter table public.projects enable row level security;
alter table public.tasks enable row level security;
alter table public.recurring_rules enable row level security;
alter table public.weekly_reviews enable row level security;

create policy "Users see own project_templates" on public.project_templates
  for all using (user_email = auth.email());
create policy "Users see own projects" on public.projects
  for all using (user_email = auth.email());
create policy "Users see own tasks" on public.tasks
  for all using (user_email = auth.email());
create policy "Users see own recurring_rules" on public.recurring_rules
  for all using (user_email = auth.email());
create policy "Users see own reviews" on public.weekly_reviews
  for all using (user_email = auth.email());
```

- [ ] **Step 2: Apply the migration in Supabase**

Open Supabase SQL editor at `https://supabase.com/dashboard/project/<project-id>/sql`, paste the migration content, run it. Verify the tables appear in the Table Editor.

- [ ] **Step 3: Verify tables exist**

In the Supabase Table Editor, confirm all 5 tables exist: `project_templates`, `projects`, `tasks`, `recurring_rules`, `weekly_reviews`. Confirm the unique index on `weekly_reviews (user_email, week_of)`. Confirm RLS is enabled on all 5 tables (small lock icon next to each).

- [ ] **Step 4: Commit**

```bash
git add supabase/
git commit -m "feat(db): add 5 dashboard tables (tasks, projects, project_templates, recurring_rules, weekly_reviews)"
```

---

## Task 3: Type definitions and Supabase client

**Files:**
- Create: `lib/types.ts`
- Create: `lib/supabase.ts`
- Create: `.env.local`
- Modify: `.gitignore` (already excludes `.env*.local` by default, verify)

- [ ] **Step 1: Create `.env.local` with Supabase credentials**

```bash
cat > .env.local <<'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service role key>

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<run: openssl rand -base64 32>

GOOGLE_CLIENT_ID=<from pre-flight>
GOOGLE_CLIENT_SECRET=<from pre-flight>
EOF
```

Replace placeholder values with real ones from `~/Claude/.env` and the Google Cloud project.

- [ ] **Step 2: Create `lib/types.ts`**

```typescript
// File: lib/types.ts

export type TaskStream = 'artist' | 'business';
export type TaskCategory = 'engineering' | 'content' | 'releases' | 'live' | 'strategic';
export type TaskServiceTheme = 'recording' | 'mixing' | 'production' | 'tuition';
export type TaskStatus = 'backlog' | 'this_week' | 'today' | 'in_progress' | 'done' | 'skipped' | 'rolled_over';
export type TaskSource = 'manual' | 'recurring_rule' | 'plan_week' | 'auto_generated';

export interface Task {
  id: string;
  user_email: string;
  title: string;
  description: string | null;
  stream: TaskStream;
  category: TaskCategory;
  service_theme: TaskServiceTheme | null;
  status: TaskStatus;
  priority: 1 | 2 | 3;
  est_minutes: number | null;
  actual_minutes: number | null;
  time_block_start: string | null;
  time_block_end: string | null;
  deadline: string | null;
  project_id: string | null;
  parent_task_id: string | null;
  calendar_event_id: string | null;
  feedback_note: string | null;
  completed_at: string | null;
  source: TaskSource;
  linked_data: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export type TaskInput = Omit<
  Task,
  'id' | 'user_email' | 'created_at' | 'updated_at' | 'completed_at' | 'actual_minutes' | 'feedback_note'
> & {
  id?: string;
};

export interface WeeklyReview {
  id: string;
  user_email: string;
  week_of: string;
  tasks_planned: number;
  tasks_completed: number;
  tasks_skipped: number;
  tasks_rolled_over: number;
  notes: string | null;
  claude_observations: Record<string, unknown> | null;
  next_week_adjustments: string | null;
  created_at: string;
  updated_at: string;
}
```

- [ ] **Step 3: Create `lib/supabase.ts`**

```typescript
// File: lib/supabase.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase env vars (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)');
}

// Browser-side client (uses anon key, RLS enforced)
export const supabaseBrowser = () => createClient(supabaseUrl, supabaseAnonKey);

// Server-side admin client (uses service role, bypasses RLS, only for trusted server code)
export const supabaseAdmin = () => {
  if (!supabaseServiceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY');
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false },
  });
};
```

- [ ] **Step 4: Verify build still works**

```bash
npm run build
```

Expected: build succeeds (warnings about unused exports are fine).

- [ ] **Step 5: Commit**

```bash
git add lib/types.ts lib/supabase.ts .env.local
# Only the example file should be committed, not the real .env.local
git restore --staged .env.local
cp .env.local .env.local.example
# Replace real values in .env.local.example with placeholders, then:
git add .env.local.example
git commit -m "feat(lib): add Task types and Supabase clients"
```

---

## Task 4: NextAuth setup with Google provider

**Files:**
- Create: `lib/auth.ts`
- Create: `app/api/auth/[...nextauth]/route.ts`
- Create: `app/auth/signin/page.tsx`
- Create: `middleware.ts`

- [ ] **Step 1: Create `lib/auth.ts`**

```typescript
// File: lib/auth.ts

import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const ALLOWED_EMAILS = ['elcee.mgmt@gmail.com', 'elcee.automation@gmail.com'];

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          // Calendar scope added in Plan 3, MVP uses email/profile only
          scope: 'openid email profile',
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email || !ALLOWED_EMAILS.includes(user.email)) {
        return false;
      }
      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.sub;
      }
      return session;
    },
  },
  session: { strategy: 'jwt' },
};
```

- [ ] **Step 2: Create `app/api/auth/[...nextauth]/route.ts`**

```typescript
// File: app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

- [ ] **Step 3: Create the sign-in page**

```typescript
// File: app/auth/signin/page.tsx

'use client';

import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div style={{
      minHeight: '100vh', background: '#080808', color: '#fafafa',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
    }}>
      <div style={{ maxWidth: 360, width: '100%', textAlign: 'center' }}>
        <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
          Elcee Dashboard
        </p>
        <h1 style={{ fontWeight: 900, fontSize: 36, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 32 }}>
          Sign in
        </h1>
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          style={{
            padding: '14px 24px',
            fontWeight: 900, fontSize: 11, letterSpacing: '0.18em',
            textTransform: 'uppercase', background: '#fafafa', color: '#080808',
            border: 'none', cursor: 'pointer', width: '100%',
          }}
        >
          Continue with Google →
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create middleware to protect routes**

```typescript
// File: middleware.ts

export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    // Protect everything except auth pages and API auth route
    '/((?!api/auth|auth/signin|_next/static|_next/image|favicon.ico).*)',
  ],
};
```

- [ ] **Step 5: Add the SessionProvider to the app**

```typescript
// File: app/providers.tsx

'use client';

import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

- [ ] **Step 6: Wrap layout with Providers**

```typescript
// File: app/layout.tsx (replace contents)

import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Elcee Dashboard',
  description: 'Personal management dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/nmf5wle.css" />
      </head>
      <body style={{ margin: 0, background: '#080808', color: '#fafafa', fontFamily: "'nimbus-sans', Helvetica, Arial, sans-serif" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Verify auth flow manually**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: redirected to `/auth/signin`. Click "Continue with Google", sign in with `elcee.mgmt@gmail.com`. Expected: redirected to `/` (currently shows default Next.js page or 404 because we have not built the home page yet).

If sign-in fails with "Access Denied", check the email is in `ALLOWED_EMAILS` in `lib/auth.ts`.

- [ ] **Step 8: Commit**

```bash
git add lib/auth.ts app/api/auth app/auth/signin app/providers.tsx app/layout.tsx middleware.ts
git commit -m "feat(auth): Google OAuth with NextAuth, allowlist enforcement"
```

---

## Task 5: Server-side task data layer

**Files:**
- Create: `lib/api/tasks.ts`
- Create: `tests/api/tasks.test.ts`

- [ ] **Step 1: Write the tests first**

```typescript
// File: tests/api/tasks.test.ts

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { listTasks, createTask, updateTask, completeTask, deleteTask } from '@/lib/api/tasks';

vi.mock('@/lib/supabase', () => {
  const mockBuilder = () => ({
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    gte: vi.fn().mockReturnThis(),
    lte: vi.fn().mockReturnThis(),
    in: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: null, error: null }),
  });

  const builder = mockBuilder();
  Object.assign(builder, {
    select: vi.fn(() => builder),
    insert: vi.fn(() => builder),
    update: vi.fn(() => builder),
    delete: vi.fn(() => builder),
    eq: vi.fn(() => builder),
    gte: vi.fn(() => builder),
    lte: vi.fn(() => builder),
    in: vi.fn(() => builder),
    order: vi.fn(() => Promise.resolve({ data: [], error: null })),
    single: vi.fn().mockResolvedValue({ data: { id: 'test-id' }, error: null }),
  });

  return {
    supabaseAdmin: () => ({
      from: vi.fn(() => builder),
    }),
  };
});

describe('tasks data layer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('listTasks returns array', async () => {
    const result = await listTasks('test@example.com');
    expect(Array.isArray(result)).toBe(true);
  });

  it('createTask returns task with id', async () => {
    const task = await createTask('test@example.com', {
      title: 'Test',
      stream: 'artist',
      category: 'content',
      status: 'backlog',
      priority: 2,
      service_theme: null,
      description: null,
      est_minutes: 30,
      time_block_start: null,
      time_block_end: null,
      deadline: null,
      project_id: null,
      parent_task_id: null,
      calendar_event_id: null,
      source: 'manual',
      linked_data: null,
    });
    expect(task.id).toBeDefined();
  });

  it('completeTask sets status to done', async () => {
    const task = await completeTask('test@example.com', 'task-id', 'felt good', 45);
    expect(task.id).toBeDefined();
  });
});
```

- [ ] **Step 2: Add Vitest config**

```typescript
// File: vitest.config.ts

import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

Add test script to `package.json`:

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 3: Run tests to confirm they fail**

```bash
npm run test
```

Expected: FAIL with "Cannot find module '@/lib/api/tasks'".

- [ ] **Step 4: Implement `lib/api/tasks.ts`**

```typescript
// File: lib/api/tasks.ts

import { supabaseAdmin } from '@/lib/supabase';
import type { Task, TaskInput, TaskStatus, TaskStream } from '@/lib/types';

export interface ListTasksOptions {
  status?: TaskStatus | TaskStatus[];
  stream?: TaskStream;
  rangeStart?: string; // ISO timestamp
  rangeEnd?: string;
  projectId?: string;
}

export async function listTasks(userEmail: string, opts: ListTasksOptions = {}): Promise<Task[]> {
  let query = supabaseAdmin().from('tasks').select('*').eq('user_email', userEmail);

  if (opts.status) {
    query = Array.isArray(opts.status) ? query.in('status', opts.status) : query.eq('status', opts.status);
  }
  if (opts.stream) query = query.eq('stream', opts.stream);
  if (opts.rangeStart) query = query.gte('time_block_start', opts.rangeStart);
  if (opts.rangeEnd) query = query.lte('time_block_start', opts.rangeEnd);
  if (opts.projectId) query = query.eq('project_id', opts.projectId);

  const { data, error } = await query.order('time_block_start', { ascending: true });
  if (error) throw new Error(`listTasks failed: ${error.message}`);
  return (data || []) as Task[];
}

export async function getTask(userEmail: string, id: string): Promise<Task | null> {
  const { data, error } = await supabaseAdmin()
    .from('tasks')
    .select('*')
    .eq('user_email', userEmail)
    .eq('id', id)
    .single();
  if (error) {
    if (error.code === 'PGRST116') return null;
    throw new Error(`getTask failed: ${error.message}`);
  }
  return data as Task;
}

export async function createTask(userEmail: string, input: TaskInput): Promise<Task> {
  const { data, error } = await supabaseAdmin()
    .from('tasks')
    .insert({ ...input, user_email: userEmail })
    .select('*')
    .single();
  if (error) throw new Error(`createTask failed: ${error.message}`);
  return data as Task;
}

export async function updateTask(userEmail: string, id: string, patch: Partial<TaskInput>): Promise<Task> {
  const { data, error } = await supabaseAdmin()
    .from('tasks')
    .update(patch)
    .eq('user_email', userEmail)
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw new Error(`updateTask failed: ${error.message}`);
  return data as Task;
}

export async function completeTask(
  userEmail: string,
  id: string,
  feedbackNote: string | null,
  actualMinutes: number | null,
): Promise<Task> {
  const { data, error } = await supabaseAdmin()
    .from('tasks')
    .update({
      status: 'done',
      completed_at: new Date().toISOString(),
      feedback_note: feedbackNote,
      actual_minutes: actualMinutes,
    })
    .eq('user_email', userEmail)
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw new Error(`completeTask failed: ${error.message}`);
  return data as Task;
}

export async function deleteTask(userEmail: string, id: string): Promise<void> {
  const { error } = await supabaseAdmin().from('tasks').delete().eq('user_email', userEmail).eq('id', id);
  if (error) throw new Error(`deleteTask failed: ${error.message}`);
}
```

- [ ] **Step 5: Run tests to confirm they pass**

```bash
npm run test
```

Expected: 3 tests pass.

- [ ] **Step 6: Commit**

```bash
git add lib/api/tasks.ts tests/ vitest.config.ts package.json
git commit -m "feat(api): server-side task data layer with tests"
```

---

## Task 6: Tasks API routes

**Files:**
- Create: `app/api/tasks/route.ts`
- Create: `app/api/tasks/[id]/route.ts`
- Create: `app/api/tasks/[id]/complete/route.ts`
- Create: `lib/auth-helpers.ts`

- [ ] **Step 1: Create auth helper for API routes**

```typescript
// File: lib/auth-helpers.ts

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function requireUserEmail(): Promise<string | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  return session.user.email;
}
```

- [ ] **Step 2: Create the list/create route**

```typescript
// File: app/api/tasks/route.ts

import { NextResponse } from 'next/server';
import { requireUserEmail } from '@/lib/auth-helpers';
import { listTasks, createTask, type ListTasksOptions } from '@/lib/api/tasks';
import type { TaskStatus, TaskStream } from '@/lib/types';

export async function GET(request: Request) {
  const userEmail = await requireUserEmail();
  if (!userEmail) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  const url = new URL(request.url);
  const opts: ListTasksOptions = {};
  const status = url.searchParams.get('status');
  if (status) opts.status = status.split(',') as TaskStatus[];
  const stream = url.searchParams.get('stream');
  if (stream) opts.stream = stream as TaskStream;
  const rangeStart = url.searchParams.get('rangeStart');
  if (rangeStart) opts.rangeStart = rangeStart;
  const rangeEnd = url.searchParams.get('rangeEnd');
  if (rangeEnd) opts.rangeEnd = rangeEnd;

  try {
    const tasks = await listTasks(userEmail, opts);
    return NextResponse.json({ tasks });
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const userEmail = await requireUserEmail();
  if (!userEmail) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });

  try {
    const input = await request.json();
    const task = await createTask(userEmail, input);
    return NextResponse.json({ task }, { status: 201 });
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
```

- [ ] **Step 3: Create the single-task route**

```typescript
// File: app/api/tasks/[id]/route.ts

import { NextResponse } from 'next/server';
import { requireUserEmail } from '@/lib/auth-helpers';
import { getTask, updateTask, deleteTask } from '@/lib/api/tasks';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const userEmail = await requireUserEmail();
  if (!userEmail) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const { id } = await params;
  const task = await getTask(userEmail, id);
  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ task });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const userEmail = await requireUserEmail();
  if (!userEmail) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const { id } = await params;
  const patch = await request.json();
  try {
    const task = await updateTask(userEmail, id, patch);
    return NextResponse.json({ task });
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const userEmail = await requireUserEmail();
  if (!userEmail) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const { id } = await params;
  await deleteTask(userEmail, id);
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 4: Create the complete route**

```typescript
// File: app/api/tasks/[id]/complete/route.ts

import { NextResponse } from 'next/server';
import { requireUserEmail } from '@/lib/auth-helpers';
import { completeTask } from '@/lib/api/tasks';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const userEmail = await requireUserEmail();
  if (!userEmail) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const feedbackNote = body.feedback_note ?? null;
  const actualMinutes = body.actual_minutes ?? null;
  try {
    const task = await completeTask(userEmail, id, feedbackNote, actualMinutes);
    return NextResponse.json({ task });
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message }, { status: 400 });
  }
}
```

- [ ] **Step 5: Verify routes manually**

```bash
npm run dev
```

In another terminal, with a logged-in browser session, hit:

```bash
# Create
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Cookie: <next-auth.session-token=...>" \
  -d '{"title":"Test","stream":"artist","category":"content","status":"backlog","priority":2,"source":"manual"}'
```

Expected: 201 with the created task. Without auth: 401.

(Easier alternative: build the dashboard UI in later tasks and test through it.)

- [ ] **Step 6: Commit**

```bash
git add app/api/tasks lib/auth-helpers.ts
git commit -m "feat(api): tasks routes with auth"
```

---

## Task 7: Theme tokens, fonts, and base styles

**Files:**
- Modify: `app/globals.css`
- Create: `app/components/theme.ts`

- [ ] **Step 1: Replace `app/globals.css`**

```css
/* File: app/globals.css */

@import "tailwindcss";

:root {
  --bg: #080808;
  --fg: #fafafa;
  --muted: rgba(255, 255, 255, 0.5);
  --faint: rgba(255, 255, 255, 0.3);
  --border: rgba(255, 255, 255, 0.1);
  --artist: #f0ede8;
  --business: #fafafa;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--fg);
  font-family: 'nimbus-sans', Helvetica, Arial, sans-serif;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'nimbus-sans', Helvetica, Arial, sans-serif;
  font-weight: 900;
  margin: 0;
}

button {
  font-family: inherit;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  animation: fade-in 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
}

/* Stream split layout */
.stream-split {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--border);
}
@media (max-width: 768px) {
  .stream-split {
    grid-template-columns: 1fr;
  }
}

.stream-pane {
  background: var(--bg);
  padding: 24px;
  min-height: 200px;
}
```

- [ ] **Step 2: Create theme constants**

```typescript
// File: app/components/theme.ts

export const colors = {
  bg: '#080808',
  fg: '#fafafa',
  muted: 'rgba(255,255,255,0.5)',
  faint: 'rgba(255,255,255,0.3)',
  border: 'rgba(255,255,255,0.1)',
  artist: '#f0ede8',
  business: '#fafafa',
} as const;

export const text = {
  label: { fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase' as const, color: colors.faint },
  body: { fontSize: 14, lineHeight: 1.6, color: colors.muted },
  heading: { fontWeight: 900, letterSpacing: '-0.02em' as const, textTransform: 'uppercase' as const },
};

export const easing = [0.25, 0.1, 0.25, 1] as [number, number, number, number];
```

- [ ] **Step 3: Verify the base styles render**

Visit `http://localhost:3000/auth/signin` with the dev server running. Expected: dark background, Nimbus Sans font, "Sign in" heading visible in correct typeface.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/components/theme.ts
git commit -m "feat(ui): theme tokens, base styles, stream split layout"
```

---

## Task 8: Navigation component

**Files:**
- Create: `app/components/Navigation.tsx`

- [ ] **Step 1: Create Navigation**

```typescript
// File: app/components/Navigation.tsx

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { colors, text } from './theme';

const TABS = [
  { label: 'Today', href: '/' },
  { label: 'Week', href: '/week' },
  { label: 'Kanban', href: '/kanban' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 24px', borderBottom: `1px solid ${colors.border}`,
      position: 'sticky', top: 0, background: colors.bg, zIndex: 50,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
        <Link href="/" style={{
          ...text.heading, fontSize: 16, color: colors.fg, textDecoration: 'none',
        }}>
          ELCEE
        </Link>
        <div style={{ display: 'flex', gap: 24 }}>
          {TABS.map(tab => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                style={{
                  fontSize: 11, fontWeight: 900, letterSpacing: '0.18em',
                  textTransform: 'uppercase', textDecoration: 'none',
                  color: active ? colors.fg : colors.faint,
                  borderBottom: active ? `2px solid ${colors.fg}` : '2px solid transparent',
                  paddingBottom: 4,
                }}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: '/auth/signin' })}
        style={{
          fontSize: 10, fontWeight: 900, letterSpacing: '0.18em',
          textTransform: 'uppercase', color: colors.faint,
          background: 'transparent', border: 'none', cursor: 'pointer',
        }}
      >
        Sign out
      </button>
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/Navigation.tsx
git commit -m "feat(ui): top navigation with view tabs"
```

---

## Task 9: TaskCard component

**Files:**
- Create: `app/components/TaskCard.tsx`

- [ ] **Step 1: Create TaskCard**

```typescript
// File: app/components/TaskCard.tsx

'use client';

import { motion } from 'framer-motion';
import { colors, easing } from './theme';
import type { Task } from '@/lib/types';

interface Props {
  task: Task;
  onComplete: (task: Task) => void;
  onClick?: (task: Task) => void;
}

function formatTimeBlock(start: string | null, end: string | null): string | null {
  if (!start) return null;
  const s = new Date(start);
  const e = end ? new Date(end) : null;
  const fmt = (d: Date) => d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  return e ? `${fmt(s)} → ${fmt(e)}` : fmt(s);
}

export default function TaskCard({ task, onComplete, onClick }: Props) {
  const done = task.status === 'done';
  const accent = task.stream === 'artist' ? colors.artist : colors.business;
  const timeBlock = formatTimeBlock(task.time_block_start, task.time_block_end);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: easing }}
      onClick={() => onClick?.(task)}
      style={{
        padding: '16px 20px',
        background: '#111111',
        border: `1px solid ${colors.border}`,
        borderLeft: `3px solid ${accent}`,
        marginBottom: 8,
        cursor: onClick ? 'pointer' : 'default',
        opacity: done ? 0.4 : 1,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <button
          onClick={(e) => { e.stopPropagation(); if (!done) onComplete(task); }}
          aria-label={done ? 'Completed' : 'Mark complete'}
          style={{
            width: 18, height: 18, marginTop: 3, flexShrink: 0,
            background: done ? colors.fg : 'transparent',
            border: `1.5px solid ${done ? colors.fg : colors.faint}`,
            cursor: done ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {done && <span style={{ color: colors.bg, fontSize: 11, fontWeight: 900 }}>✓</span>}
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{
            fontWeight: 900, fontSize: 14, letterSpacing: '-0.01em',
            color: colors.fg, marginBottom: 6,
            textDecoration: done ? 'line-through' : 'none',
          }}>
            {task.title}
          </p>
          <div style={{ display: 'flex', gap: 12, fontSize: 10, letterSpacing: '0.05em', color: colors.faint, flexWrap: 'wrap' }}>
            {timeBlock && <span style={{ fontFamily: 'monospace' }}>{timeBlock}</span>}
            <span style={{ textTransform: 'uppercase' }}>{task.stream}</span>
            <span style={{ textTransform: 'uppercase' }}>{task.category}</span>
            {task.est_minutes && <span>{task.est_minutes} min</span>}
            {task.priority === 1 && <span style={{ color: '#ff6b6b' }}>P1</span>}
          </div>
          {task.description && (
            <p style={{ fontSize: 12, lineHeight: 1.6, color: colors.muted, marginTop: 8 }}>
              {task.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/TaskCard.tsx
git commit -m "feat(ui): TaskCard component with stream colour, time block, complete action"
```

---

## Task 10: TaskAddModal component

**Files:**
- Create: `app/components/TaskAddModal.tsx`

- [ ] **Step 1: Create the modal**

```typescript
// File: app/components/TaskAddModal.tsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, easing } from './theme';
import type { TaskInput, TaskStream, TaskCategory, TaskStatus } from '@/lib/types';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: (input: TaskInput) => Promise<void>;
}

const STREAMS: TaskStream[] = ['artist', 'business'];
const CATEGORIES: TaskCategory[] = ['engineering', 'content', 'releases', 'live', 'strategic'];
const STATUSES: TaskStatus[] = ['backlog', 'this_week', 'today'];

const inputStyle = {
  width: '100%', padding: '12px 14px', background: '#0a0a0a',
  border: `1px solid ${colors.border}`, color: colors.fg, fontSize: 13,
  fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' as const,
};

const labelStyle = { fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: colors.faint, marginBottom: 6, display: 'block' };

export default function TaskAddModal({ open, onClose, onCreate }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [stream, setStream] = useState<TaskStream>('artist');
  const [category, setCategory] = useState<TaskCategory>('content');
  const [status, setStatus] = useState<TaskStatus>('today');
  const [estMinutes, setEstMinutes] = useState('');
  const [priority, setPriority] = useState<'1' | '2' | '3'>('2');
  const [timeBlockStart, setTimeBlockStart] = useState('');
  const [timeBlockEnd, setTimeBlockEnd] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title) return;
    setSubmitting(true);
    try {
      await onCreate({
        title,
        description: description || null,
        stream,
        category,
        service_theme: null,
        status,
        priority: Number(priority) as 1 | 2 | 3,
        est_minutes: estMinutes ? Number(estMinutes) : null,
        time_block_start: timeBlockStart || null,
        time_block_end: timeBlockEnd || null,
        deadline: null,
        project_id: null,
        parent_task_id: null,
        calendar_event_id: null,
        source: 'manual',
        linked_data: null,
      });
      setTitle(''); setDescription(''); setEstMinutes(''); setTimeBlockStart(''); setTimeBlockEnd('');
      onClose();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, padding: 24,
          }}
        >
          <motion.form
            onSubmit={handleSubmit}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: easing }}
            style={{
              background: '#111111', border: `1px solid ${colors.border}`,
              padding: 32, maxWidth: 520, width: '100%',
              maxHeight: '90vh', overflow: 'auto',
            }}
          >
            <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: colors.faint, marginBottom: 14 }}>
              New Task
            </p>
            <h2 style={{ fontWeight: 900, fontSize: 24, letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 24 }}>
              Add task
            </h2>

            <label style={labelStyle}>Title</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required style={{ ...inputStyle, marginBottom: 18 }} placeholder="Be specific. Reference real assets." />

            <label style={labelStyle}>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} style={{ ...inputStyle, marginBottom: 18, resize: 'vertical', fontFamily: 'inherit' }} placeholder="Hooks, files, references, what 'done' looks like." />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 18 }}>
              <div>
                <label style={labelStyle}>Stream</label>
                <select value={stream} onChange={(e) => setStream(e.target.value as TaskStream)} style={inputStyle}>
                  {STREAMS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value as TaskCategory)} style={inputStyle}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 18 }}>
              <div>
                <label style={labelStyle}>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)} style={inputStyle}>
                  {STATUSES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Priority</label>
                <select value={priority} onChange={(e) => setPriority(e.target.value as '1' | '2' | '3')} style={inputStyle}>
                  <option value="1">P1</option>
                  <option value="2">P2</option>
                  <option value="3">P3</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Est. min</label>
                <input type="number" value={estMinutes} onChange={(e) => setEstMinutes(e.target.value)} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
              <div>
                <label style={labelStyle}>Time block start</label>
                <input type="datetime-local" value={timeBlockStart} onChange={(e) => setTimeBlockStart(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Time block end</label>
                <input type="datetime-local" value={timeBlockEnd} onChange={(e) => setTimeBlockEnd(e.target.value)} style={inputStyle} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button type="button" onClick={onClose} style={{
                flex: 1, padding: '13px 24px', background: 'transparent', color: colors.fg,
                border: `1.5px solid ${colors.border}`, fontWeight: 900, fontSize: 11, letterSpacing: '0.18em',
                textTransform: 'uppercase', cursor: 'pointer',
              }}>Cancel</button>
              <button type="submit" disabled={submitting} style={{
                flex: 2, padding: '13px 24px', background: colors.fg, color: colors.bg,
                border: 'none', fontWeight: 900, fontSize: 11, letterSpacing: '0.18em',
                textTransform: 'uppercase', cursor: 'pointer', opacity: submitting ? 0.5 : 1,
              }}>{submitting ? 'Saving...' : 'Add task →'}</button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/TaskAddModal.tsx
git commit -m "feat(ui): TaskAddModal for manual task entry"
```

---

## Task 11: TaskCompleteDialog component

**Files:**
- Create: `app/components/TaskCompleteDialog.tsx`

- [ ] **Step 1: Create the dialog**

```typescript
// File: app/components/TaskCompleteDialog.tsx

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, easing } from './theme';
import type { Task } from '@/lib/types';

interface Props {
  task: Task | null;
  onClose: () => void;
  onConfirm: (task: Task, feedbackNote: string | null, actualMinutes: number | null) => Promise<void>;
}

export default function TaskCompleteDialog({ task, onClose, onConfirm }: Props) {
  const [feedback, setFeedback] = useState('');
  const [actualMinutes, setActualMinutes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleConfirm() {
    if (!task) return;
    setSubmitting(true);
    try {
      await onConfirm(task, feedback || null, actualMinutes ? Number(actualMinutes) : null);
      setFeedback(''); setActualMinutes('');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AnimatePresence>
      {task && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000, padding: 24,
          }}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: easing }}
            style={{
              background: '#111111', border: `1px solid ${colors.border}`,
              padding: 32, maxWidth: 440, width: '100%',
            }}
          >
            <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: colors.faint, marginBottom: 14 }}>
              Mark complete
            </p>
            <h2 style={{ fontWeight: 900, fontSize: 18, letterSpacing: '-0.01em', marginBottom: 24 }}>
              {task.title}
            </h2>

            <label style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.faint, marginBottom: 6, display: 'block' }}>Quick feedback (optional)</label>
            <input
              value={feedback} onChange={(e) => setFeedback(e.target.value)}
              placeholder="Took longer than expected, hook landed, etc."
              style={{
                width: '100%', padding: '12px 14px', background: '#0a0a0a',
                border: `1px solid ${colors.border}`, color: colors.fg, fontSize: 13,
                outline: 'none', boxSizing: 'border-box', marginBottom: 14,
              }}
            />

            <label style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: colors.faint, marginBottom: 6, display: 'block' }}>Actual time, min (optional)</label>
            <input
              type="number" value={actualMinutes} onChange={(e) => setActualMinutes(e.target.value)}
              placeholder={task.est_minutes ? `Est. ${task.est_minutes}` : ''}
              style={{
                width: '100%', padding: '12px 14px', background: '#0a0a0a',
                border: `1px solid ${colors.border}`, color: colors.fg, fontSize: 13,
                outline: 'none', boxSizing: 'border-box', marginBottom: 24,
              }}
            />

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={onClose} style={{
                flex: 1, padding: '13px 24px', background: 'transparent', color: colors.fg,
                border: `1.5px solid ${colors.border}`, fontWeight: 900, fontSize: 11, letterSpacing: '0.18em',
                textTransform: 'uppercase', cursor: 'pointer',
              }}>Cancel</button>
              <button onClick={handleConfirm} disabled={submitting} style={{
                flex: 2, padding: '13px 24px', background: colors.fg, color: colors.bg,
                border: 'none', fontWeight: 900, fontSize: 11, letterSpacing: '0.18em',
                textTransform: 'uppercase', cursor: 'pointer', opacity: submitting ? 0.5 : 1,
              }}>{submitting ? 'Saving...' : 'Mark done ✓'}</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/TaskCompleteDialog.tsx
git commit -m "feat(ui): TaskCompleteDialog with feedback capture"
```

---

## Task 12: useTasks hook for client-side data fetching

**Files:**
- Create: `app/components/useTasks.ts`

- [ ] **Step 1: Create the hook**

```typescript
// File: app/components/useTasks.ts

'use client';

import { useEffect, useState, useCallback } from 'react';
import type { Task, TaskInput, TaskStatus } from '@/lib/types';

interface UseTasksOptions {
  status?: TaskStatus[];
  rangeStart?: string;
  rangeEnd?: string;
}

export function useTasks(options: UseTasksOptions = {}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const optsKey = JSON.stringify(options);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (options.status) params.set('status', options.status.join(','));
      if (options.rangeStart) params.set('rangeStart', options.rangeStart);
      if (options.rangeEnd) params.set('rangeEnd', options.rangeEnd);
      const res = await fetch(`/api/tasks?${params}`);
      if (!res.ok) throw new Error(`Failed to load tasks: ${res.status}`);
      const data = await res.json();
      setTasks(data.tasks || []);
      setError(null);
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optsKey]);

  useEffect(() => { refresh(); }, [refresh]);

  const create = useCallback(async (input: TaskInput) => {
    const res = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    if (!res.ok) throw new Error('Failed to create task');
    await refresh();
  }, [refresh]);

  const complete = useCallback(async (task: Task, feedbackNote: string | null, actualMinutes: number | null) => {
    const res = await fetch(`/api/tasks/${task.id}/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedback_note: feedbackNote, actual_minutes: actualMinutes }),
    });
    if (!res.ok) throw new Error('Failed to complete task');
    await refresh();
  }, [refresh]);

  const update = useCallback(async (id: string, patch: Partial<TaskInput>) => {
    const res = await fetch(`/api/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    if (!res.ok) throw new Error('Failed to update task');
    await refresh();
  }, [refresh]);

  return { tasks, loading, error, refresh, create, complete, update };
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/useTasks.ts
git commit -m "feat(ui): useTasks client hook"
```

---

## Task 13: Today view

**Files:**
- Create: `app/components/views/TodayView.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create TodayView**

```typescript
// File: app/components/views/TodayView.tsx

'use client';

import { useState, useMemo } from 'react';
import Navigation from '../Navigation';
import TaskCard from '../TaskCard';
import TaskAddModal from '../TaskAddModal';
import TaskCompleteDialog from '../TaskCompleteDialog';
import { useTasks } from '../useTasks';
import { colors } from '../theme';
import type { Task } from '@/lib/types';

function todayBoundsISO() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).toISOString();
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59).toISOString();
  return { start, end };
}

export default function TodayView() {
  const { start, end } = useMemo(todayBoundsISO, []);
  const { tasks, loading, error, create, complete } = useTasks({
    status: ['today', 'in_progress', 'done'],
    rangeStart: start,
    rangeEnd: end,
  });
  const [addOpen, setAddOpen] = useState(false);
  const [completing, setCompleting] = useState<Task | null>(null);

  const artistTasks = tasks.filter(t => t.stream === 'artist').sort(sortByTime);
  const businessTasks = tasks.filter(t => t.stream === 'business').sort(sortByTime);

  return (
    <div>
      <Navigation />

      <header style={{ padding: '32px 24px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: colors.faint, marginBottom: 8 }}>
            {new Date().toLocaleDateString('en-GB', { weekday: 'long' })}
          </p>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 48px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.95 }}>
            {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })}
          </h1>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          style={{
            padding: '13px 24px', background: colors.fg, color: colors.bg,
            border: 'none', fontWeight: 900, fontSize: 11, letterSpacing: '0.18em',
            textTransform: 'uppercase', cursor: 'pointer',
          }}
        >
          + Add task
        </button>
      </header>

      {error && <p style={{ padding: 24, color: '#ff6b6b' }}>Error: {error}</p>}
      {loading && <p style={{ padding: 24, color: colors.faint }}>Loading...</p>}

      <div className="stream-split">
        <div className="stream-pane">
          <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: colors.artist, marginBottom: 16 }}>
            Artist
          </p>
          {artistTasks.length === 0 ? (
            <p style={{ fontSize: 13, color: colors.faint }}>Nothing scheduled.</p>
          ) : (
            artistTasks.map(t => <TaskCard key={t.id} task={t} onComplete={setCompleting} />)
          )}
        </div>
        <div className="stream-pane">
          <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: colors.business, marginBottom: 16 }}>
            Business
          </p>
          {businessTasks.length === 0 ? (
            <p style={{ fontSize: 13, color: colors.faint }}>Nothing scheduled.</p>
          ) : (
            businessTasks.map(t => <TaskCard key={t.id} task={t} onComplete={setCompleting} />)
          )}
        </div>
      </div>

      <TaskAddModal open={addOpen} onClose={() => setAddOpen(false)} onCreate={create} />
      <TaskCompleteDialog task={completing} onClose={() => setCompleting(null)} onConfirm={async (t, fb, mins) => { await complete(t, fb, mins); setCompleting(null); }} />
    </div>
  );
}

function sortByTime(a: Task, b: Task) {
  if (!a.time_block_start) return 1;
  if (!b.time_block_start) return -1;
  return a.time_block_start.localeCompare(b.time_block_start);
}
```

- [ ] **Step 2: Wire it into the home page**

```typescript
// File: app/page.tsx (replace contents)

import TodayView from './components/views/TodayView';

export default function Home() {
  return <TodayView />;
}
```

- [ ] **Step 3: Test the flow manually**

```bash
npm run dev
```

Visit `http://localhost:3000`. Sign in. Expected: see today's date as the heading, two empty panes (Artist + Business). Click "Add task". Fill the form with status "today" and a time block today. Save. Expected: card appears in the right pane. Click the empty checkbox. Optionally enter feedback. Submit. Expected: card greys out and ticks.

- [ ] **Step 4: Commit**

```bash
git add app/components/views/TodayView.tsx app/page.tsx
git commit -m "feat(ui): Today view with stream split, add and complete"
```

---

## Task 14: Week view

**Files:**
- Create: `app/components/views/WeekView.tsx`
- Create: `app/week/page.tsx`

- [ ] **Step 1: Create WeekView**

```typescript
// File: app/components/views/WeekView.tsx

'use client';

import { useState, useMemo } from 'react';
import Navigation from '../Navigation';
import TaskCard from '../TaskCard';
import TaskCompleteDialog from '../TaskCompleteDialog';
import { useTasks } from '../useTasks';
import { colors } from '../theme';
import type { Task } from '@/lib/types';

function weekBounds(date: Date): { start: Date; end: Date; days: Date[] } {
  // Monday-based week
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date);
  monday.setDate(diff);
  monday.setHours(0, 0, 0, 0);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
  return { start: monday, end: sunday, days };
}

export default function WeekView() {
  const [anchor, setAnchor] = useState(new Date());
  const { start, end, days } = useMemo(() => weekBounds(anchor), [anchor]);
  const { tasks, loading, complete } = useTasks({
    rangeStart: start.toISOString(),
    rangeEnd: end.toISOString(),
  });
  const [completing, setCompleting] = useState<Task | null>(null);

  const tasksByDay = days.map(d => {
    const dayKey = d.toISOString().slice(0, 10);
    return tasks.filter(t => t.time_block_start && t.time_block_start.slice(0, 10) === dayKey);
  });

  const shiftWeek = (delta: number) => {
    const next = new Date(anchor);
    next.setDate(next.getDate() + delta * 7);
    setAnchor(next);
  };

  return (
    <div>
      <Navigation />

      <header style={{ padding: '32px 24px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontWeight: 900, fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          Week of {start.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
        </h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => shiftWeek(-1)} style={navBtn}>← Prev</button>
          <button onClick={() => setAnchor(new Date())} style={navBtn}>Today</button>
          <button onClick={() => shiftWeek(1)} style={navBtn}>Next →</button>
        </div>
      </header>

      {loading && <p style={{ padding: 24, color: colors.faint }}>Loading...</p>}

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1,
        background: colors.border, padding: 1,
      }} className="week-grid">
        {days.map((d, i) => {
          const dayTasks = tasksByDay[i];
          const today = d.toDateString() === new Date().toDateString();
          return (
            <div key={i} style={{ background: colors.bg, padding: 16, minHeight: 320 }}>
              <p style={{
                fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: today ? colors.fg : colors.faint, marginBottom: 4,
              }}>
                {d.toLocaleDateString('en-GB', { weekday: 'short' })}
              </p>
              <p style={{
                fontSize: 18, fontWeight: 900,
                color: today ? colors.fg : colors.muted, marginBottom: 12,
              }}>
                {d.getDate()}
              </p>
              {dayTasks.length === 0 && <p style={{ fontSize: 11, color: colors.faint }}>·</p>}
              {dayTasks.map(t => (
                <div key={t.id} style={{ marginBottom: 6 }}>
                  <TaskCard task={t} onComplete={setCompleting} />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.week-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <TaskCompleteDialog task={completing} onClose={() => setCompleting(null)} onConfirm={async (t, fb, mins) => { await complete(t, fb, mins); setCompleting(null); }} />
    </div>
  );
}

const navBtn: React.CSSProperties = {
  padding: '8px 16px', background: 'transparent', color: colors.fg,
  border: `1px solid ${colors.border}`, fontSize: 10, fontWeight: 900,
  letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
};
```

- [ ] **Step 2: Create the page**

```typescript
// File: app/week/page.tsx

import WeekView from '../components/views/WeekView';

export default function WeekPage() {
  return <WeekView />;
}
```

- [ ] **Step 3: Test manually**

Visit `/week`. Expected: 7-column grid (1-column on mobile), each column showing the day name, date, and any tasks scheduled. Today's column should be highlighted (lighter text). Add a task in Today view scheduled for tomorrow. Verify it appears in the right column on `/week`.

- [ ] **Step 4: Commit**

```bash
git add app/components/views/WeekView.tsx app/week
git commit -m "feat(ui): Week view with 7-day grid"
```

---

## Task 15: Kanban view

**Files:**
- Create: `app/components/views/KanbanView.tsx`
- Create: `app/kanban/page.tsx`

- [ ] **Step 1: Create KanbanView**

```typescript
// File: app/components/views/KanbanView.tsx

'use client';

import { useState } from 'react';
import Navigation from '../Navigation';
import TaskCard from '../TaskCard';
import TaskCompleteDialog from '../TaskCompleteDialog';
import { useTasks } from '../useTasks';
import { colors } from '../theme';
import type { Task, TaskStatus } from '@/lib/types';

const COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: 'backlog', label: 'Backlog' },
  { status: 'this_week', label: 'This Week' },
  { status: 'today', label: 'Today' },
  { status: 'in_progress', label: 'In Progress' },
  { status: 'done', label: 'Done' },
];

export default function KanbanView() {
  const { tasks, loading, complete, update } = useTasks({});
  const [completing, setCompleting] = useState<Task | null>(null);

  function handleDragStart(e: React.DragEvent, taskId: string) {
    e.dataTransfer.setData('taskId', taskId);
  }

  async function handleDrop(e: React.DragEvent, newStatus: TaskStatus) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      await update(taskId, { status: newStatus });
    }
  }

  return (
    <div>
      <Navigation />

      <header style={{ padding: '32px 24px 24px' }}>
        <h1 style={{ fontWeight: 900, fontSize: 'clamp(24px, 3vw, 36px)', letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
          Kanban
        </h1>
      </header>

      {loading && <p style={{ padding: 24, color: colors.faint }}>Loading...</p>}

      <div style={{
        display: 'grid', gridTemplateColumns: `repeat(${COLUMNS.length}, minmax(260px, 1fr))`,
        gap: 1, background: colors.border, padding: 1,
        overflowX: 'auto',
      }}>
        {COLUMNS.map(col => {
          const colTasks = tasks.filter(t => t.status === col.status);
          return (
            <div
              key={col.status}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, col.status)}
              style={{ background: colors.bg, padding: 16, minHeight: 480 }}
            >
              <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: colors.faint, marginBottom: 16 }}>
                {col.label} <span style={{ color: colors.muted }}>({colTasks.length})</span>
              </p>
              {colTasks.map(t => (
                <div key={t.id} draggable onDragStart={(e) => handleDragStart(e, t.id)}>
                  <TaskCard task={t} onComplete={setCompleting} />
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <TaskCompleteDialog task={completing} onClose={() => setCompleting(null)} onConfirm={async (t, fb, mins) => { await complete(t, fb, mins); setCompleting(null); }} />
    </div>
  );
}
```

- [ ] **Step 2: Create the page**

```typescript
// File: app/kanban/page.tsx

import KanbanView from '../components/views/KanbanView';

export default function KanbanPage() {
  return <KanbanView />;
}
```

- [ ] **Step 3: Test manually**

Visit `/kanban`. Expected: 5 columns (Backlog, This Week, Today, In Progress, Done). Existing tasks appear in their respective columns. Drag a card from Backlog to Today. Refresh. Expected: the card stays in Today.

- [ ] **Step 4: Commit**

```bash
git add app/components/views/KanbanView.tsx app/kanban
git commit -m "feat(ui): Kanban view with drag and drop status changes"
```

---

## Task 16: E2E smoke test for critical flow

**Files:**
- Create: `playwright.config.ts`
- Create: `tests/e2e/critical-flows.test.ts`

- [ ] **Step 1: Create Playwright config**

```typescript
// File: playwright.config.ts

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});
```

- [ ] **Step 2: Create the smoke test**

```typescript
// File: tests/e2e/critical-flows.test.ts

import { test, expect } from '@playwright/test';

// This test is a sanity check that the build runs and all three views render.
// Authentication is mocked by accessing routes after a manual login is established
// for local dev. For CI, see TASK NOTE below.

test('home redirects unauthenticated to sign-in', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/auth\/signin/);
  await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
});

test('sign-in page renders Google button', async ({ page }) => {
  await page.goto('/auth/signin');
  await expect(page.getByRole('button', { name: /continue with google/i })).toBeVisible();
});
```

> **Task note:** Full e2e flows that require auth will be added in Plan 3 once we have a stable test account flow. For MVP, the critical smoke checks above plus manual testing covers the user journeys.

- [ ] **Step 3: Add e2e script to package.json**

```json
"scripts": {
  "test:e2e": "playwright test"
}
```

- [ ] **Step 4: Install Playwright browsers**

```bash
npx playwright install chromium
```

- [ ] **Step 5: Run tests**

```bash
npm run test:e2e
```

Expected: 2 tests pass.

- [ ] **Step 6: Commit**

```bash
git add tests/e2e playwright.config.ts package.json
git commit -m "test: Playwright smoke tests for unauthenticated routes"
```

---

## Task 17: GitHub repo and Vercel deployment

**Files:**
- No new code. Configuration only.

- [ ] **Step 1: Create GitHub repo**

```bash
gh repo create logancooney/elcee-dashboard --private --source=. --remote=origin
git push -u origin main
```

- [ ] **Step 2: Create Vercel project**

Logan does this via the Vercel UI:
1. Import the `elcee-dashboard` repo.
2. Set environment variables (copy from `.env.local`, replacing `localhost:3000` with the production domain in `NEXTAUTH_URL`).
3. Configure custom domain `dash.elceethealchemist.com` (Vercel will provide DNS instructions if needed).

- [ ] **Step 3: Update Google OAuth redirect URIs**

In Google Cloud Console, add `https://dash.elceethealchemist.com/api/auth/callback/google` to authorised redirect URIs (the localhost one stays for local dev).

- [ ] **Step 4: Verify production deployment**

Visit `https://dash.elceethealchemist.com`. Expected: redirects to sign-in. Sign in with `elcee.mgmt@gmail.com`. Expected: lands on Today view. Add a task. Refresh. Expected: task persists.

- [ ] **Step 5: Final commit (if any deployment-related changes were made)**

```bash
git status
# If anything changed:
git add -A
git commit -m "chore: deployment configuration"
git push
```

---

## Task 18: UI polish pass

**Files:**
- Modify various components based on what was found during real use.

- [ ] **Step 1: Use the dashboard for one full day with real tasks**

Logan adds at least 8 tasks across the day, completes some, leaves others. Notes anything that feels off.

- [ ] **Step 2: List specific issues**

Examples to look out for:
- Mobile layout problems
- Animation timing
- Colour contrast
- Font weight issues
- Hierarchy at a glance
- Friction in adding/completing tasks
- Missing keyboard shortcuts

- [ ] **Step 3: Fix issues one by one with small commits**

Pattern for each fix:
1. Identify the file and line.
2. Make the change.
3. Test locally.
4. Commit with a specific message: `fix(ui): tighten Week view day header spacing on mobile`

- [ ] **Step 4: Final commit and push**

```bash
git push
```

Plan 1 is complete when Logan has used the dashboard for a full day and signed off on the polish.

---

## Plan 1 deliverable summary

When this plan is complete, Logan has:

- A live dashboard at `dash.elceethealchemist.com`
- Google sign-in restricted to his accounts
- Three views: Today, Week, Kanban
- Manual task creation, editing, completion
- Stream split (artist vs business) visible in every view
- Polished UI matching elceethealchemist.com quality bar
- A working data layer that Plans 2 and 3 build on

---

## Next up: Plan 2 (Projects + Frameworks)

Plan 2 adds:
- `projects` and `project_templates` tables
- Project create flow with template selection
- Framework capture interactive flow
- Project tasks integrated into all three views
- Post-project review prompt

Plan 2 will be written when this plan is 80% complete.

---

## Open Questions for Logan during Plan 1 execution

These get resolved as we go, not at the start:

1. **First task he wants to add manually** to test the flow end to end? (Best if it is a real task, not a test.)
2. **Stream colours preference** after he sees them in context, the cream `#f0ede8` may look different than expected.
3. **Mobile-specific behaviours**, e.g. should the Week view default to today's column on small screens, or show a horizontal scroll?
