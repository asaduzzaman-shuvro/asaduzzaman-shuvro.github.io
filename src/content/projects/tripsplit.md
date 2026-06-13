---
title: TripSplit
summary: A SwiftUI app for splitting group and trip expenses, with offline peer-to-peer sync and CloudKit backup.
type: open-source
role: Solo developer
tech: [Swift, SwiftUI, CloudKit, MultipeerConnectivity, MVVM]
outcomes:
  - Settles "who owes whom" with a minimal-transaction settlement algorithm.
  - Syncs between nearby devices over Multipeer with no server, and backs up to CloudKit.
  - Clean MVVM architecture — Models, Services, ViewModels, and Views cleanly separated.
links:
  github: https://github.com/asaduzzaman-shuvro/TripSplitter
order: 1
draft: false
---

## The problem

Splitting expenses on a group trip is fiddly: everyone pays for different things, and
working out the fewest payments that settle everyone up is error-prone on paper.

## What I built

TripSplit lets a group create a shared trip, log expenses against any subset of members,
and instantly see a settlement plan that minimizes the number of transactions. The
interesting part is the sync model:

- **Offline-first peer-to-peer** — devices on the same trip discover each other over
  `MultipeerConnectivity` and exchange expenses directly, so the app works with no
  internet at all.
- **CloudKit backup** — when a network is available, data is mirrored to the user's
  private CloudKit database so nothing is lost across devices.

## Architecture

The codebase follows a strict MVVM split: `Models/` (pure data), `Services/`
(`CloudKitService`, `MultipeerService`, `PersistenceService`, `SyncService`),
`ViewModels/`, and `Views/`. Utilities like the settlement calculator and invite-code
generator are isolated and unit-test-friendly.

<!-- TODO: add screenshots to src/content/projects/ and reference them in `gallery`. -->
