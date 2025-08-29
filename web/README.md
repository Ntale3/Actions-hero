# express-ci-demo

An Express app with routes, tests (Jest + Supertest), linting (ESLint), formatting (Prettier), Dockerfile, and GitHub Actions CI. Great for CI/CD practice.

## Features
- Express routes: `/health`, `/api/v1/hello`, `/api/v1/echo`, `/api/v1/items`
- Jest + Supertest tests
- ESLint (flat config, ESLint 9) + Prettier
- Lefthook pre-commit (lint/format) and pre-push (tests)

## Quick start

```bash
# 1) Install dependencies
npm install

# 2) Copy env and run in dev
cp .env.example .env
npm run dev

# 3) Run tests
npm test

# 4) Lint & format
npm run lint
npm run format

# 5) Start prod
npm start
```

Visit `http://localhost:3000/health`

## API Examples

- `GET /health` → `{ status: "ok", uptime: <number> }`
- `GET /api/v1/hello?name=Ntale` → `{ message: "Hello, Ntale!" }`
- `POST /api/v1/echo` with JSON body → echoes it back `{ received: <body> }`
- `GET /api/v1/items` → list items
- `POST /api/v1/items` `{ "name": "Book" }` → create item
- `GET /api/v1/items/:id` → get item
- `DELETE /api/v1/items/:id` → delete item

## CI/CD

- On push/PR to `main` or `master`, GitHub Actions will:
  - Set up Node (18, 20, 22)
  - Install deps (with cache)
  - Lint
  - Run tests
  - Upload coverage as an artifact

## Repo structure

```
.
├── src/
│   ├── app.js
│   ├── server.js
│   └── routes/
│       ├── echo.js
│       ├── health.js
│       ├── hello.js
│       └── items.js
├── __tests__/app.test.js
├── eslint.config.js
├── jest.config.js
├── lefthook.yml
├── .prettierrc
├── .env.example
└── README.md
```

## Notes
- The `items` endpoints use in-memory storage for demo purposes.
- ESLint uses flat config (ESLint v9). Adjust rules as needed.
- Commit hooks via **lefthook** are optional; remove `prepare` script if you don't want them.
