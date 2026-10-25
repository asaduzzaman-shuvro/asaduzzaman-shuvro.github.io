---
title: S3 Storage Viewer
summary: A Next.js web app for browsing and previewing a private S3 bucket behind a single shared password.
type: open-source
role: Solo developer
tech: [TypeScript, Next.js, React, AWS S3, Prisma, SQLite]
outcomes:
  - Browses bucket folders and previews images, PDFs, JSON, and text inline.
  - Serves files via short-lived presigned URLs — bucket credentials never reach the client.
  - Hardened auth — constant-time password check, per-client rate limiting, Edge + Node dual runtime.
links:
  github: https://github.com/asaduzzaman-shuvro/S3-Viewer
order: 5
draft: false
---

## The problem

I wanted to browse and share the contents of a private S3 bucket without making it
public or handing out AWS credentials — a lightweight, password-protected file explorer.

## What I built

A Next.js 16 (App Router) app that walks a bucket one level at a time, like a file
explorer, and previews files inline:

- **Presigned access** — every file is served through a 5-minute presigned GET URL, so
  bucket credentials stay on the server.
- **Single password gate** — one shared password protects every page and API route, with
  a constant-time login check and per-client rate limiting to resist brute force.
- **Dual runtime** — Edge middleware handles the auth redirect; Node.js handles S3 access.
- **Saved connections** — Prisma + SQLite store S3 connection profiles.

## Why it matters

It shows the backend half of my work: AWS integration, careful auth design, and runtime
trade-offs — the complement to the iOS apps.
