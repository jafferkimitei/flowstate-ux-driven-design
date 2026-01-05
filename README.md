# FlowState
## Performance as UX
**Frontend Systems · Perceived Performance**

FlowState is an experimental microsite that demonstrates a simple but often misunderstood truth:

> **Performance is not a metric. It’s a feeling.**

This project explores how users *perceive* speed — and how thoughtful UX decisions can outperform raw technical optimizations when it comes to trust, flow, and usability.

---

## Why FlowState Exists

Modern frontend teams obsess over numbers:
- Lighthouse scores
- Time to Interactive
- Bundle size

Yet users don’t experience metrics.
They experience **waiting, reassurance, feedback, and momentum**.

FlowState reframes performance as a **UX system**, not a DevTools report.

---

## Core Thesis

> A fast interface that feels slow is broken.
> A slower interface that feels instant is successful.

FlowState demonstrates how **perceived performance** can be designed intentionally through motion, feedback, anticipation, and progressive disclosure.

---

## Experience Overview

![FlowState Overview](./public/Screen1.jpg)

The interface is intentionally minimal.
Every visual decision exists to support timing, clarity, and user trust — not decoration.

---

## Featured Demos

### 1. Skeleton Timing
Skeletons are not placeholders — they are **promises**.

![Skeleton Timing Demo](./public/screen1.0.jpg)

This demo shows how:
- Skeletons appear *before* data requests
- Content replaces skeletons only after paint
- Timing smooths cognitive transitions

**Outcome:** Waiting feels intentional, not accidental.

---

### 2. Optimistic UI
Users should never wait for permission to feel progress.

![Optimistic UI Demo](./public/screen2.jpg)

This demo illustrates:
- Immediate UI updates on action
- Background reconciliation with the server
- Graceful rollback on failure

**Outcome:** The interface assumes success, creating confidence.

---

### 3. Motion as Feedback
Motion is a language, not decoration.

![Motion as Feedback Demo](./public/screen3.jpg)

This demo explores:
- Sub-100ms interaction feedback
- Motion as state confirmation
- Visual reassurance over loading indicators

**Outcome:** The system feels responsive even under latency.
![Motion as Feedback Demo](./public/screen4.jpg)

---

## Design Philosophy

### Motion
- No animation without purpose
- No decorative transitions
- Custom easing only
- Motion communicates system state

### Visuals
- Minimal
- Editorial
- High contrast
- Negative space as a design tool

### Copy
- Short
- Declarative
- System-oriented
- No marketing language

---

## Technology Stack

- **Next.js (App Router)** — selective rendering and hydration
- **TypeScript** — intentional systems, not experiments
- **GSAP** — timeline-level control over perception
- **Framer Motion** — state-driven layout transitions
- **Modern CSS** — variables, composability, restraint

Tools are chosen for **control**, not trend alignment.

---

## Deployment

FlowState is deployed via Netlify with automated preview deployments on every pull request and guarded production releases on `main`.

All changes are validated in a live environment before shipping.

## Final Note

FlowState is intentionally minimal.

If something feels impressive but unnecessary, it has been removed.

What remains is the experience —
and how it makes latency disappear.

## Check out my blog at https://jafferkimitei.com/blog
