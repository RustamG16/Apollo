---
name: design-analytics
description: Connect an approved redesign to measurable user behavior through a baseline, design hypothesis, minimal event-property contract, guardrails, experiment or comparison method, and readout plan. Use when a page has a business goal and analytics access or implementation is in scope.
---

# Design Analytics

Measure whether the redesign helps the intended behavior, not whether visitors triggered decorative interactions.

## Define the hypothesis

Use this form:

> Because we changed **design mechanism** for **audience**, we expect **behavior** to move from **known baseline** toward **target/direction** within **window**, without harming **guardrail**.

If no trustworthy baseline exists, say so and define a pre-change collection window or a qualitative validation plan.

## Select minimal metrics

Choose:

- one primary outcome metric tied to the page goal;
- one or two leading indicators;
- guardrails for errors, exits, performance, accessibility, or downstream quality;
- diagnostic segments only when they can change a decision.

Avoid vanity metrics, event spam, and tracking every animation.

## Write the event contract

For each event define the exact trigger, required properties, identity/anonymous rules, consent/privacy note, duplicate prevention, and the decision it supports. Reuse an existing naming taxonomy.

## Plan the comparison

Choose a method appropriate to traffic and risk: controlled experiment, phased rollout, pre/post with seasonality caveats, or moderated/qualitative validation. Record observation window, sample limitations, segments, guardrails, and decision rule.

## Output and permissions

Write `08-metrics.md` from the system template. Treat connected PostHog or other analytics as read-only unless the user explicitly approves external changes. Never invent metrics, baselines, statistical certainty, or consent status.

