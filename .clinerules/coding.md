# Coding Guidelines

This document defines the coding standards for the movie review platform.
Stack: Next.js (App Router), React, TypeScript, Tailwind CSS.

## 1. TypeScript & Typing

- **No `any`**: The use of the `any` type is strictly forbidden. If a type is temporarily unknown, use `unknown` and perform type checking.
- **Interfaces vs. Types**: Use `interface` for objects and models, and `type` for unions or simple aliases.
- **Naming**: Name interfaces clearly (e.g., `IMovie` or simply `Movie`). Name Props interfaces with the corresponding suffix (e.g., `MovieCardProps`).

## 2. React & Next.js Components

- **Server by Default**: All components must be Server Components by default.
- **Client Components**: Add the `"use client"` directive only at the "leaf" components that strictly require interactivity (onClick, useState, useEffect, browser hooks).
- **No Class Components**: Use Functional Components exclusively (`const ComponentName = () => {}`).

## 3. Tailwind CSS Styling

- **No standard `.css` files** (except `globals.css` for base settings).
- **Class Ordering**: Keep classes logically ordered: Layout (flex, grid) -> Spacing (p, m) -> Typography (text, font) -> Colors (bg, text) -> Effects (shadow, hover, transition).
- **Avoid Arbitrary Values**: Avoid arbitrary values like `w-[321px]` as much as possible. Stick to the standard Tailwind scale.

## 4. Clean Code

- Name all variables and functions in English, using `camelCase`.
- Extract complex logic into separate helper functions or custom hooks (e.g., `useWatchlist.ts`).
- Leave comments only to explain "Why" (intent), not "What" (mechanics). Clean code explains _what_ it does on its own.
