# CareerCraft

An open-source job board with an AI resume tailor. Anyone can browse jobs and posts. After a free sign-up
(email + password) you can publish jobs and posts, and tailor your resume to any job description in a design you
choose or one you upload.

## Features

- **Public job board and posts**: paginated, readable without an account.
- **Accounts**: email and password. Registration is required to post a job, write a post, or use the resume builder.
- **AI resume builder**: upload your current resume (PDF or image), paste a job description and add notes about
  yourself. OpenAI returns a print-ready HTML resume that only uses facts you provided.
- **Designs**: three built-in templates, or upload any resume and the model copies its layout, fonts and colours.
- **Delivery**: preview in the dashboard, download the HTML, open it to print or save as PDF, or email it to
  yourself through Gmail SMTP.
- **Media**: logos and cover images are stored on Cloudinary.

## Tech stack

| Concern    | Choice                                  |
| ---------- | --------------------------------------- |
| Framework  | Next.js 15 (App Router) + React 19      |
| Language   | TypeScript                              |
| Styling    | Tailwind CSS v4                         |
| Database   | PostgreSQL via `pg` (plain SQL)         |
| Auth       | bcrypt + signed JWT in an httpOnly cookie (`jose`) |
| AI         | OpenAI Chat Completions                 |
| Email      | Nodemailer with Gmail SMTP              |
| Media      | Cloudinary                              |

## Getting started

### Prerequisites

- Node.js 20.6 or newer
- A PostgreSQL 13+ database
- An OpenAI API key
- A Gmail account with 2-Step Verification and an [App password](https://myaccount.google.com/apppasswords)
- A Cloudinary account

### Setup

```bash
git clone <your-fork-url> careercraft
cd careercraft
npm install
cp .env.example .env.local   # then fill in every value
npm run db:migrate           # creates the tables (safe to re-run)
npm run dev
```

Open <http://localhost:3000>.

### Environment variables

| Variable             | Purpose                                                                 |
| -------------------- | ----------------------------------------------------------------------- |
| `DATABASE_URL`       | Postgres connection string. Hosted databases usually need `?sslmode=require`. |
| `AUTH_SECRET`        | Secret for signing session cookies. Generate with `openssl rand -base64 32`. |
| `OPENAI_API_KEY`     | OpenAI key.                                                             |
| `OPENAI_MODEL`       | Optional. Must accept PDF and image input. Defaults to `gpt-4o`.        |
| `GMAIL_USER`         | Gmail address used to send resumes.                                     |
| `GMAIL_APP_PASSWORD` | The Google App password (not your normal password).                     |
| `CLOUDINARY_URL`     | `cloudinary://API_KEY:API_SECRET@CLOUD_NAME`                            |

Never commit `.env.local`. It is already in `.gitignore`.

## Project structure

```
db/schema.sql            Database schema (users, jobs, posts, resumes)
scripts/migrate.mjs      Applies the schema: npm run db:migrate
src/
  app/                   Routes (App Router)
    page.tsx             Landing page
    jobs/, posts/        Public lists and detail pages, plus /new (auth required)
    login/, register/    Authentication pages
    dashboard/           Resume list, builder and resume viewer (auth required)
    api/resumes/[id]/    Serves a user's resume HTML for preview and download
  actions/               Server Actions: the only write path (auth, jobs, posts, resumes)
  components/            UI components
  hooks/                 Client hooks (useServerForm)
  lib/
    repositories/        All SQL lives here, one file per table
    openai.ts            Resume generation (prompt + attachments)
    templates.ts         Built-in resume designs
    mailer.ts            Gmail SMTP
    cloudinary.ts        Image uploads
    session.ts, token.ts Cookie session and JWT helpers
  middleware.ts          Redirects unauthenticated users away from protected routes
```

How the layers fit together:

1. **Pages** are Server Components that read data through **repositories**.
2. **Forms** are small client components that call **Server Actions** through `useServerForm`.
3. **Server Actions** validate input, check the session, call a repository (and OpenAI, Cloudinary or the mailer
   when needed), then redirect.
4. **Repositories** are the only code that writes SQL, and every query is parameterised.

## How resume generation works

1. The user submits a job description, optional notes, an optional resume file and a design choice.
2. `lib/openai.ts` sends the files and text to OpenAI with a strict system prompt: use only provided facts,
   tailor to the job, output one self-contained HTML document.
3. The HTML is saved in the `resumes` table and shown in the dashboard inside a sandboxed iframe.
4. `/api/resumes/[id]` serves the HTML with `Content-Security-Policy: script-src 'none'`, so model output can
   never run scripts on your origin.

Resumes are delivered as HTML. Use **Open to print or save as PDF** and your browser's print dialog to get a PDF.

## Security notes

- Passwords are hashed with bcrypt. Sessions are signed, httpOnly, `SameSite=Lax` cookies.
- Resumes are only readable by their owner. Emails are only sent to the signed-in user's own address.
- Uploads are limited to images or PDFs under 4 MB.
- There is no rate limiting yet. Add one before exposing the resume builder to the public, because each generation
  costs OpenAI credits.

## Deployment

Works on any Node host. On Vercel, set the environment variables in the project settings; the resume builder page
declares `maxDuration = 120` because generation can take a while. Run `npm run db:migrate` once against your
production database.

## Contributing

Pull requests are welcome. Please keep changes small and focused, run `npm run lint` and `npm run build` before
opening one, and put new SQL in a repository file.

Ideas for first contributions:

- PDF export (for example with a headless browser)
- Rate limiting and per-user generation limits
- Edit and delete for jobs and posts
- Search and filters on the jobs list
- Password reset by email
- Tests for the repositories and server actions

## License

MIT. See [LICENSE](./LICENSE).
