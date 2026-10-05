# 💪 FitLog — Workout Library

A dark, no-nonsense gym companion built for the B14-A6 assignment. Browse a
library of twelve lifts, dig into detailed instructions and specs, and lock
lifts into **Today's Plan** or **Saved for later** — all tracked live in the
navbar and persisted across reloads.


---

## 📖 Description

FitLog lets you pick a lift, lock it into today's plan, and watch the week's
work add up. The home page showcases the full workout library pulled live
from the FitLog API; each workout has its own detail page with equipment,
difficulty, sets/reps, and step-by-step instructions. From there you can add
a lift to **Today's Plan** (capped at five) or **Save it for later**, then
manage everything from the **My Plan** page — mark lifts done, remove them,
and watch the exercises/minutes/calories tally update live.

## 🛠️ Technologies Used

- **Next.js 16** (App Router) — routing, layouts, and page structure
- **React 19** + **TypeScript** — UI and type safety
- **Tailwind CSS 4** — styling and responsive layout
- **lucide-react** — icon set
- **react-hot-toast** — toast notifications
- **FitLog API** (`api.abcz.workers.dev`) — live workout data
- **localStorage** — client-side persistence for Today's Plan and Saved

## ✨ Key Features

1. **Live workout library** — all 12 lifts fetched from the FitLog API and
   rendered as a responsive 4/3/2/1-column card grid, each with an image,
   muscle-group tags, equipment, and a duration/calories/rating stats row.
2. **Sort & search** — a "Sort By" dropdown (Duration, Calories, Rating) and
   a search box that filters by workout name or muscle-group tag.
3. **Detailed workout pages** — a two-column layout with a large hero image,
   a key-specs panel (equipment, difficulty, sets, reps, duration, calories,
   rating), and numbered step-by-step instructions.
4. **Today's Plan & Saved, with live badges** — "Add to today's plan" and
   "Save for later" buttons update the navbar's Plan/Saved pill counters
   instantly and fire a toast notification; the plan is capped at five lifts.
5. **My Plan dashboard** — live Exercises/Minutes/Calories metric cards, tabs
   for Today's Plan vs. Saved, a loading state, an empty state with a CTA
   back to the library, and per-card "View Details," "Mark as Done," and
   "Remove" actions.
6. **Persistent state & graceful edges** — plan/saved data survives a page
   reload via `localStorage`, unknown routes render a custom 404 page, and
   loading states cover both the home page and My Plan while data fetches.
