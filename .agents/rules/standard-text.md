# Standard Text ("st")

When the user says **"st"** (or "standard text"), apply the project's standard body text style.

- Use the `text-st` utility class defined in `src/index.css`.
- `text-st` = Gilroy Medium (weight 500), fixed `0.9375rem` (15px), line-height `1.45`.
- Do NOT use viewport units (`vw`, `vh`), `clamp()`, or percentages for text sizes or body column widths/margins, as they cause layouts to distort on larger/wider screens.
- Remove any conflicting `font-gilroy-*` / `text-[size]` / `leading-*` classes on the element when applying it.
- Color is NOT part of `st`; keep the element's existing color class (default `text-black`).
- Reference usage: About section paragraphs in `src/components/Home.jsx`.
