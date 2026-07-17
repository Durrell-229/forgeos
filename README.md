# ForgeOS — OpenAI Build Week 2026

## Vision

**ForgeOS** is an autonomous software delivery team managed from a chat. A user can give it a product request or report a bug through Telegram; ForgeOS plans the work, changes the codebase, runs quality checks, deploys a preview, and reports the evidence back in the conversation.

> From intent to a tested, deployed, self-correcting application — controlled from chat.

Primary hackathon track: **Developer Tools** (agentic workflows, testing, DevOps, and security).

## The memorable demo

```text
Telegram command
  /forge Create a landing page for padel court reservations
        ↓
ForgeOS orchestrator creates a job and a transparent plan
        ↓
Codex implements the requested change in a Git repository
        ↓
CI runs tests and deploys a Vercel preview
        ↓
Telegram returns the preview URL, test result, and summary
```

Second act:

```text
/fix The booking form is broken on mobile
        ↓
ForgeOS diagnoses → Codex changes code → Playwright validates → preview updates
```

This visible feedback loop is the core "wow" moment.

## MVP scope

Build one real, reliable path rather than every CI/CD feature:

1. A Telegram bot accepts `/forge`, `/status`, `/preview`, and `/fix`.
2. An orchestrator records and displays job state.
3. Codex meaningfully builds or modifies the demo repository.
4. GitHub Actions runs checks.
5. Vercel deploys a preview.
6. The bot returns the preview link, commit/build status, and test evidence.
7. A web dashboard shows the job timeline, plan, diffs, logs, and deployment URL.

Production deploy and rollback can be present as guarded commands (`/approve <id>`, `/rollback`) but should not be needed for the initial demo.

## Architecture

```text
Telegram
   │ webhook
   ▼
ForgeOS API / orchestrator ──► job store + dashboard
   │
   ├──► Codex: plan and implement
   ├──► GitHub: commit + CI
   ├──► Playwright: browser tests
   └──► Vercel: preview deployment
                     │
                     └──► Telegram status + preview URL
```

## Suggested stack

- Dashboard and webhook API: Next.js + TypeScript
- Chat integration: Telegram Bot API
- Coding workflow: Codex + GPT-5.6
- Browser quality checks: Playwright
- CI: GitHub Actions
- Preview hosting: Vercel Hobby (or Netlify Free)
- Job persistence: begin with SQLite/local JSON for demo; upgrade only if needed

## Cost constraints

- Telegram Bot API: free.
- Vercel Hobby: free for personal/non-commercial use, with quotas.
- Netlify Free: alternative free host.
- GitHub Actions: suitable free quota for a small public-project demo.
- Hackathon Codex-credit request is reportedly exhausted. Build around the Free-plan access to GPT-5.6 Terra in Codex and minimize model calls.
- Do not run permanent workers in the MVP. Trigger short jobs only when a chat command arrives.

## OpenAI Build Week requirements to preserve

- Deadline: **July 21, 2026, 5:00 PM PT**.
- Project must meaningfully use **Codex and GPT-5.6**.
- Keep the main Codex build thread. Before submission, run `/feedback` in it and save the Session ID.
- Submission needs a working project, repository URL, README/setup instructions, a chosen track, and a public YouTube demo under three minutes with English narration (or English translation).
- The README and video should specifically explain how Codex accelerated the build and how GPT-5.6 is integrated in ForgeOS.

Official references:

- https://openai.devpost.com/details/faqs
- https://openai.devpost.com/rules
- https://openai.devpost.com/

## Immediate next steps

1. Create the GitHub repository and initialize the Next.js dashboard.
2. Create a Telegram bot through `@BotFather`; store its token only in local environment variables / hosting secrets.
3. Implement `/forge` end-to-end with a mocked job result first.
4. Add real GitHub/Vercel integration and a single Playwright test.
5. Implement `/fix` as the headline self-healing demo.
6. Record screenshots and short clips as we build for the final video.

## Security decisions

- Never expose the Telegram bot token, GitHub token, or deployment secrets in code or chat.
- Restrict privileged commands to the owner's Telegram chat ID.
- Require explicit confirmation before a production deployment or rollback.
- Limit each coding job to an approved repository and command allowlist.
