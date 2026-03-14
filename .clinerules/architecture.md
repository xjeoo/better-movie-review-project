# Architecture Guidelines

This document defines the data flow and folder organization for the movie platform.

## 1. Folder Structure (Using `src` Directory)

- `src/app`: Contains only page routes (App Router) and API routes (`src/app/api`). No UI components here.
- `src/components`: All UI components, logically grouped (e.g., `src/components/ui`, `src/components/movies`, `src/components/layout`).
- `src/models`: Mongoose schemas for the database (e.g., `Movie.ts`, `User.ts`, `Watchlist.ts`).
- `src/lib` (or `src/utils`): Helper functions, database connection logic, and third-party integrations.
- `src/types`: Global TypeScript definitions and interfaces.

## 2. Data Fetching

- **In Server Components**: Fetch directly from the database (Mongoose) inside the component (e.g., in `page.tsx`). It's secure, fast, and doesn't expose data or logic to the client.
- **In Client Components**: If data needs to be fetched or mutated after the page loads (e.g., changing watchlist status, pagination, live search), make a `fetch()` request to an API route under `src/app/api/...`.

## 3. Database Rules (MongoDB / Mongoose)

- **Singleton Connection**: In a serverless environment (Next.js), the MongoDB connection must be cached (singleton) to avoid opening dozens of connections on every page refresh. Connection logic lives in `src/lib/mongodb.ts`.
- **Schemas**: Schemas must have clear validations (e.g., `enum` for statuses like 'watched'/'unwatched', `required: true` for critical fields).
- **Querying**: Avoid heavy JOINs (e.g., multiple `.populate()`) unless absolutely necessary; optimize NoSQL schemas based on how the data will be read.

## 4. Error Handling

- API routes must always include `try...catch` blocks.
- API responses must follow a predictable, standardized structure: `{ success: boolean, data?: any, error?: string }`.
