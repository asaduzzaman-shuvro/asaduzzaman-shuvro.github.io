---
title: Building offline-first sync with Multipeer and CloudKit
description: How TripSplit shares expenses between phones with no server — and still backs everything up to the cloud.
pubDate: 2026-06-13
tags: [Swift, SwiftUI, CloudKit, sync]
draft: false
---

Most "split the bill" apps assume a server in the middle. But on a real trip you're often
somewhere with no signal — a mountain trail, a foreign SIM you haven't topped up, a
basement restaurant. So when I built [TripSplit](/projects/tripsplit), I wanted the core
experience to work with zero internet, and treat the cloud as a backup rather than a
requirement.

This post walks through the two halves of that design.

## The peer-to-peer layer

When several people are on the same trip and physically together, their phones can talk
directly. `MultipeerConnectivity` handles discovery and transport over Wi-Fi and
Bluetooth without any account or server. Each device advertises the trip, peers join, and
new expenses propagate as small encoded payloads.

The key decision was to make every expense an **independent, idempotent record** with a
stable identifier, so the same expense arriving twice (or out of order) never
double-counts. Sync becomes a set-union rather than a fragile sequence of deltas.

## The cloud backup layer

When a network *is* available, the same records mirror to the user's private CloudKit
database. Because the records are already designed to merge cleanly, CloudKit is just
another peer that happens to live in the cloud — the merge logic doesn't care where a
record came from.

## What I'd tell my past self

- Design the data model for merge from day one. Retrofitting conflict-free merging onto a
  server-shaped model is painful.
- Treat the network as an enhancement, not a precondition. The app feeling instant offline
  is worth more than any sync cleverness.

<!-- This is a real starter post drawn from the TripSplit work — edit freely or replace. -->
