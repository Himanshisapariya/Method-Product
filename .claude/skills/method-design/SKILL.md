---
name: method-design
description: >
  Design system reference for the Method Products Shopify theme.
  Covers Tailwind v4 setup, @theme tokens, typography, colors, container system,
  button styles, header/nav, hero banner, and feature-cards section patterns.
  Use when editing css/application.css, any section CSS, or making brand design decisions.
---

# Method Products — Design System Reference

## Stack

- **Tailwind v4.3.2** — `@import "tailwindcss"` in `css/application.css`
- **Build:** `npm run build` → `npx @tailwindcss/cli -i css/application.css -o assets/application.css.liquid --minify -w`
- **Source scanning:** `@source` directives scan `layout/`, `sections/`, `snippets/`, `templates/`, `assets/*.js`
- **No `tailwind.config.js`** — all config via `@theme {}` and `@layer` in `css/application.css`
- **`@apply`** works inside `@layer components`
- Section-scoped CSS in `assets/section-*.css`, loaded via `{{ 'file.css' | asset_url | stylesheet_tag }}`
- Compiled output: `assets/application.css.liquid` — this is what Shopify serves

---

## Tailwind @theme Setup

Colors and fonts are registered in `@theme {}` so they generate utility classes:

```css
@theme {
  --color-ink: #414042;
  --color-ink-soft: #707070;
  --color-paper: #ffffff;
  --color-paper-alt: #fafafa;
  --color-brand-purple: #7800bf;
  --color-brand-purple-deep: #4d0084;
  --color-brand-purple-btn: #5e008f;
  --color-brand-navy: #27323f;
  --color-brand-teal: #007a7d;
  --color-border: #e6e6e6;
  --color-white: #ffffff;

  --font-sans: "Haffer", Helvetica, Arial, sans-serif;
  --font-display: "Haffer XH", Helvetica, Arial, sans-serif;
  --font-display-method: "Haffer XH method", "Haffer XH", Helvetica, Arial, sans-serif;

  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1460px;
}
```

**Resulting utility classes:** `bg-brand-purple`, `text-ink`, `text-brand-navy`, `border-brand-teal`, `font-sans`, `font-display`, `font-display-method`, `md:*`, `lg:*` etc.

Write classes in any scanned liquid/js file → build picks them up automatically.

---

## Fonts

| Variable | Tailwind class | Family | Use |
|---|---|---|---|
| `--font-sans` | `font-sans` | Haffer | Body, UI, nav |
| `--font-display` | `font-display` | Haffer XH | Headings, buttons, display |
| `--font-display-method` | `font-display-method` | Haffer XH method | Brand wordmark only |

Self-hosted on Shopify CDN. `@font-face` defined in `css/application.css`.
Body: `text-transform: lowercase` globally — **everything on this site is lowercase by brand rule.**

---

## Typography Scale

### Heading sizes

| Tag | Mobile | Tablet `768px+` | Desktop `1024px+` | Weight |
|---|---|---|---|---|
| h1 | 40px / 2.5rem | 48px / 3rem | 80px / 5rem | 700 |
| h2 | 32px / 2rem | 40px / 2.5rem | 64px / 4rem | 700 |
| h3 | 24px / 1.5rem | 32px / 2rem | **40px / 2.5rem** | 600 |
| h4 | 20px / 1.25rem | 24px / 1.5rem | 36px / 2.25rem | 700 |
| h5 | 18px / 1.125rem | 22px / 1.375rem | 28px / 1.75rem | 500 |
| h6 | 16px / 1rem | 18px / 1.125rem | 20px / 1.25rem | 500 |

All headings: `font-family: var(--font-display)`, `text-transform: lowercase`, `color: var(--color-ink)`.

### Font-size tokens (CSS vars, not Tailwind utilities)

```
--fs-xs: 0.75rem   (12px)     --fs-4xl: 2rem      (32px)
--fs-sm: 0.875rem  (14px)     --fs-5xl: 2.25rem   (36px)
--fs-base: 1rem    (16px)     --fs-6xl: 2.5rem    (40px)
--fs-lg: 1.125rem  (18px)     --fs-7xl: 4rem      (64px)
--fs-xl: 1.25rem   (20px)     --fs-8xl: 4.375rem  (70px)
--fs-2xl: 1.375rem (22px)     --fs-9xl: 5rem      (80px)
--fs-3xl: 1.5rem   (24px)
```

Use as `font-size: var(--fs-xl)` in component CSS.

### Line-height tokens

```
--lh-none: 1       → display/hero
--lh-tight: 1.15   → h1
--lh-snug: 1.2     → h3
--lh-normal: 1.3   → hero banner
--lh-base: 1.4     → body copy
--lh-relaxed: 1.45 → h4/h5
--lh-loose: 1.56   → subheadings
```

### Special text classes

| Class | Effect |
|---|---|
| `.text-gradient-brand` | Masterbrand gradient fill |
| `.text-gradient-on-em` | Gradient on `<strong><em>` inside headings |
| `.text-primary` | `color: var(--color-brand-purple)` |
| `.hero-heading` | Fluid `24px → 70px`, display font, text-shadow |
| `.display-heading` | Fluid `30px → 80px`, display font |
| `.subheading` | Fluid `24px → 36px`, display font |

---

## Color Tokens

All defined in `@theme {}` (generates utilities) and also available as `var(--*)`:

```css
--color-ink: #414042              /* primary text */
--color-ink-soft: #707070         /* muted/secondary */
--color-paper: #ffffff            /* page background */
--color-paper-alt: #fafafa        /* secondary bg */
--color-brand-purple: #7800bf     /* primary accent */
--color-brand-purple-deep: #4d0084 /* hover state */
--color-brand-purple-btn: #5e008f  /* secondary button bg */
--color-brand-navy: #27323f
--color-brand-teal: #007a7d
--color-border: #e6e6e6
```

### Gradients (CSS vars only, not Tailwind utilities)

```css
--masterbrand-gradient: linear-gradient(269deg, #00D2B1 -10.17%, #009CDD 17.71%, #9526F0 59.81%, #B408E5 99.27%)
--gradient-brand: linear-gradient(108.63deg, #d80e80 16.74%, #7800bf 33.38%, #5447d6 51.86%, #287ab8 68.1%, #007a7d 81.13%)
--gradient-hero: linear-gradient(87.89deg, #D638C4 -8.18%, #9138E5 29.6%, #4275E9 62.51%, #00BCE5 85.67%, #0AD6B8 105.17%)
```

---

## Container System

Mirrors `methodproducts.com` exactly. Side-padding approach (not `max-width + margin: auto`).

```css
/* Width definitions */
--container-width-fullwidth: 0px
--container-width-xs: 640px
--container-width-sm: 1100px
--container-width-md: 1460px
--container-width-lg: 1600px

/* Computed side padding — use on full-width elements */
--container-sm: max(calc((100vw - 1100px) / 2), var(--gutter))
--container-md: max(calc((100vw - 1460px) / 2), var(--gutter))
/* etc. */

--gutter: 36px   /* desktop */
--gutter: 16px   /* mobile (max-width: 768px) */
```

### Container classes (defined in `@layer components`)

| Class | Max content width | Usage |
|---|---|---|
| `.container-fullwidth` | edge-to-edge | full-bleed sections |
| `.container-xs` | 640px | narrow content |
| `.container-sm` | 1100px | feature cards, most sections |
| `.container-md` | 1460px | wide layouts, header |
| `.container-lg` | 1600px | ultra-wide |

**Usage:**
```liquid
<section>
  <div class="container-sm">
    <!-- content max 1100px, centered, guttered -->
  </div>
</section>
```

---

## Button Classes

All buttons: `border-radius: 999px`, `min-height: 48px`, `font-family: var(--font-display)`, `font-size: 20px`, `font-weight: 500`, `text-transform: lowercase`, `max-width: 230px`, `padding: 18px 85px`.

| Class | Style | When to use |
|---|---|---|
| `.btn.btn-primary` | White bg + masterbrand gradient border, purple text | Default CTA — on colored/image backgrounds |
| `.btn.btn-secondary` | Purple bg (`#5e008f`), white text | Dark/solid CTAs |

**Hover states:**
- `btn-primary` hover: light purple bg (`#F5DCFF`) + gradient border
- `btn-secondary` hover: masterbrand gradient bg

**Gradient border technique (btn-primary):**
```css
background:
  linear-gradient(white, white) padding-box,
  var(--masterbrand-gradient) border-box;
border: 1.5px solid transparent;
```

---

## Header & Navigation

Built on Dawn's `header.liquid`. All styles are CSS overrides in `application.css` section 5.

### Visual spec (matches methodproducts.com)
- **Top:** 3px masterbrand gradient border (via `background-clip: border-box` trick)
- **Bottom:** `1px solid var(--color-border)` separator
- **Background:** white
- **Height:** ~64px min
- **Layout:** logo left | nav centered | icons right (grid: `1fr auto 1fr`)

### Nav links
- Font: `font-display`, `1rem` (16px), `font-weight: 500`, lowercase
- Color: `var(--color-ink)` → hover `var(--color-brand-purple-deep)`
- Padding: `0.5rem 1.25rem` per item

### Icons (search / account / cart)
- Color: `var(--color-brand-purple)`
- Size: `22px`, `fill: currentColor` (SVGs are fill-based, NOT stroke)
- Do NOT set `stroke-width` — these are filled SVGs
- Container: `display: flex; gap: 0.25rem; align-items: center`

### Cart count badge
- `1.25rem` circle, white bg, purple border (`1.5px`)
- `font-size: 0.625rem`, `font-weight: 700`
- Positioned `top: 0; right: 0` on `.header__icon--cart`

### Header width override
```css
.header.page-width {
  max-width: 100% !important;
  padding-inline: var(--container-md) !important;
}
```

---

## Feature Cards Section (`sections/feature-cards.liquid`)

### Layout (matches methodproducts.com second section exactly)

**Desktop:**
- Container: `.container-md` wrapping `<section>`, grid `md:grid-cols-2 gap-8`
- Card: `rounded-[2rem]`, `overflow-hidden`, `position: relative` — no fixed height, height defined by image
- **Image:** block element with `aspect-square object-cover` — defines card height (~534px at 1100px width)
- **Content:** `position: absolute; top: 64px; bottom: 64px; left: 40px; right: auto` — `max-w-[360px]`, left-aligned, vertically centered (`justify-center`)

**Mobile:**
- Card: single column, portrait image `aspect-[10/21] object-bottom`
- Content: `position: absolute; inset: 0; justify-start; items-center; text-center; pt-8 px-4`

### Badge pill style
```html
<div class="inline-flex items-center justify-center px-4 py-[0.45rem] mb-5
            border-2 border-[var(--color-brand-purple)] rounded-full
            bg-white/90 font-bold leading-none text-[var(--color-brand-purple)] text-sm">
  new
</div>
```

### Section heading
Uses `<h3>` (not h2) — at 40px desktop. Classes: `text-center mb-8 md:mb-12`.

---

## Hero Banner Section (`sections/hero-banner.liquid`)

CSS file: `assets/section-hero-super-shine.css`

### Desktop structure
```
.hero-banner__desktop (flex, min-height: 720px, overflow hidden)
├── img.hero-banner__media → absolute inset-0, w-full h-full object-cover
└── .hero-banner__content  → z-index: 2, max-width: 620px, margin-left: clamp(2rem, 8vw, 14rem)
    ├── .hero-banner__eyebrow  (.text-gradient-brand, font-bold)
    ├── h2.hero-banner__heading
    └── a.btn.btn-secondary
```

### Mobile structure (shown `<768px`)
```
.hero-banner__mobile
└── .hero-banner__mobile-image-wrapper (position: relative)
    ├── img.hero-banner__media (block, w-full, h-auto)
    └── .hero-banner__mobile-content (absolute inset-0, flex-col, center, text-center, pt-40px px-20px)
```

### Schema settings
`eyebrow`, `heading`, `heading_highlight` (gets `.text-gradient-brand`), `button_label`, `button_link`, `desktop_image`, `mobile_image`

### Key rule
Do NOT add `container-site` or any container class to `.hero-banner__content` — it has its own `margin-left` positioning. Adding container classes breaks the layout by adding unexpected padding.

---

## Announcement / Utility Bar

```css
.utility-bar {
  background: linear-gradient(116.22deg, #d80e80 16.5%, #7800bf 35.6%, #5447d6 56.81%, #287ab8 75.46%, #007a7d 90.42%);
}
```

Min height `5.6rem`. Text: `font-display`, white, lowercase, centered. Arrow icons and social links hidden (`display: none`).

---

## Key Rules & Gotchas

1. **Everything lowercase** — `text-transform: lowercase` on `body`. Don't fight it.
2. **Filled SVG icons** — Dawn's icon SVGs use `fill="currentColor"`. Setting `stroke-width` does nothing. Use `fill: currentColor`.
3. **Container class on hero content = broken** — hero positions itself via `margin-left: clamp(...)`. Don't wrap its content in a container class.
4. **@theme vs :root** — Colors/fonts in `@theme {}` generate Tailwind utilities AND CSS vars. Gradients/motion/spacing stay in `:root` since they don't need utility classes.
5. **Rebuild required** — New Tailwind classes won't appear in compiled output until `npm run build` is run.
6. **Dawn overrides need `!important`** — Dawn theme CSS loads after `application.css.liquid`. Header, cart, search component styles require `!important` to win.
