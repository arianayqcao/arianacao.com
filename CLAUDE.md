@AGENTS.md

## Stack
- Next.js 14+ with TypeScript
- Tailwind CSS (check package.json for version)
- App router (app/ directory)

## Code style
- Semantic HTML always: <header>, <nav>, <main>, <section>, <footer>
- No div soup — only use <div> when there's no semantic alternative
- BEM-style class names or Tailwind only, no inline styles

## Accessibility
- All images need descriptive alt text (not just alt="image")
- Interactive elements (buttons, links) need aria-label if icon-only
- Use aria-current="page" on active nav links
- Headings in correct order (h1 → h2 → h3, never skip levels)
- Color contrast AA minimum
- Focus states visible on all interactive elements

## Design tokens
- All spacing, type sizes, colors, radii, and transitions live in tokens.css as CSS custom properties
- Always use var(--token-name) — never hardcode px values, hex colors, or font sizes
- If a value doesn't have a token yet, add it to tokens.css first, then use it
- If you generate something without a token available, add a comment: /* TODO: tokenize */

## Layout & grid
- 12-column grid, 16px gutter, 16px margin
- Desktop max content width: 1200px centered inside 1440px frame
- Mobile: 390px, 4-column grid
- All spacing in multiples of 4px — use spacing tokens (--space-1 through --space-32)

## Typography scale
- Type tokens: --text-xxs (8px) --text-xs (12px) --text-sm (14px) --text-md (16px)
  --text-lg (20px) --text-xl (24px) --text-2xl (32px) --text-3xl (48px) --text-4xl (64px)
- Base size is 1rem (16px) — never override with px on body or html
- Use utility classes: .text-lead, .text-meta, .text-label for common patterns

## Figma handoff
- Ignore wrapper/organizational frames - don't generate divs for those
- Top-level content frames map to: <header>, <main>, <footer>
- Match spacing and typography exactly from the design using tokens
- Desktop 1440px, mobile 390px
- Export image assets from Figma as WebP where possible, fallback PNG
- Do not generate a div for the outermost Figma canvas frame
