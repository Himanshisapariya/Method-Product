---
name: method-design
description: >
  Design system reference for the Method Products Shopify theme.
  Covers typography scale, color tokens, Tailwind v4 setup, and hero-banner section patterns.
  Use when editing css/application.css, section CSS, or asking about brand design decisions.
---

# Method Products — Design System

## Stack
- **Tailwind v4** — `@import "tailwindcss"` in `css/application.css`
- `@layer base` / `@layer components` / `@apply` all valid in v4
- Section-scoped CSS lives in `assets/section-*.css`, loaded via `{{ 'file.css' | asset_url | stylesheet_tag }}`

---

## Fonts
| Variable | Family | Use |
|---|---|---|
| `--font-sans` | Haffer | Body, UI, nav |
| `--font-display` | Haffer XH | Headings, buttons, display |
| `--font-display-method` | Haffer XH method | Brand wordmark only |

Self-hosted on Shopify CDN. Defined via `@font-face` in `css/application.css`.

---

## Type Scale

### Heading sizes (mobile → tablet 768px → desktop 1024px)
| Tag | Mobile | Tablet | Desktop |
|-----|--------|--------|---------|
| h1  | 40px / 2.5rem | 48px / 3rem   | 80px / 5rem    |
| h2  | 32px / 2rem   | 40px / 2.5rem | 64px / 4rem    |
| h3  | 24px / 1.5rem | 32px / 2rem   | 48px / 3rem    |
| h4  | 20px / 1.25rem| 24px / 1.5rem | 36px / 2.25rem |
| h5  | 18px / 1.125rem| 22px / 1.375rem| 28px / 1.75rem |
| h6  | 16px / 1rem   | 18px / 1.125rem| 20px / 1.25rem |

**Scale logic:** h2 anchors at 32px/64px (2× ratio). Major third (~1.25–1.33) between levels. Large headings scale 2×, small headings taper.

### Font weights
- h1, h2 → `font-weight: 700`
- h3 → `font-weight: 600`
- h4, h5 → `font-weight: 700`
- All headings: `font-family: var(--font-display)`, `text-transform: lowercase`

### Key font-size tokens
```
--fs-xs: 0.75rem   (12px)
--fs-sm: 0.875rem  (14px)
--fs-base: 1rem    (16px)
--fs-lg: 1.125rem  (18px)
--fs-xl: 1.25rem   (20px — buttons)
--fs-8xl: 4.375rem (70px — hero display)
```

---

## Color Tokens
```css
--color-ink: #414042              /* primary text */
--color-ink-soft: #707070         /* muted/secondary */
--color-paper: #ffffff            /* page bg */
--color-brand-purple: #7800bf     /* primary accent */
--color-brand-purple-deep: #4D0084
--color-brand-purple-btn: #5E008F
--color-brand-navy: #27323f       /* primary button bg */
--color-brand-teal: #007a7d
--color-border: #e6e6e6
```

### Gradients
```css
--gradient-brand: linear-gradient(108.63deg, #d80e80 16.74%, #7800bf 33.38%, #5447d6 51.86%, #287ab8 68.1%, #007a7d 81.13%)
--gradient-masterbrand: linear-gradient(269deg, #00D2B1 -10.17%, #009CDD 17.71%, #9526F0 59.81%, #B408E5 99.27%)
--gradient-hero: linear-gradient(87.89deg, #D638C4 -8.18%, #9138E5 29.6%, #4275E9 62.51%, #00BCE5 85.67%, #0AD6B8 105.17%)
```

Gradient text utility: `class="text-gradient-brand"` — applies brand gradient via `-webkit-background-clip: text`.

---

## Spacing & Layout
```css
--container-max: 1460px
--container-max-sm: 1100px
--container-pad: clamp(1rem, 36px, 2.5rem)   /* 16px on mobile */
--space-section-y: clamp(3rem, 6vw, 6rem)
--radius-pill: 60px     /* buttons */
--radius-pill-full: 999px
--shadow-btn: 0 4px 16px rgba(0,0,0,0.12)
```

---

## Button Classes
| Class | Style |
|---|---|
| `.btn-primary` | Navy bg, white text, gradient on hover |
| `.btn-purple` | Purple bg, white text |
| `.btn-secondary` | Purple-btn bg, wider padding (13px 90px) |
| `.btn-outline` | Transparent, navy border, 46px height |
| `.btn-white` | White bg, ink text |
| `.btn-sm` | 36px height, 14px font |

All buttons: pill radius, 48px height (except outline 46px), `font-family: var(--font-display)`, `font-size: var(--fs-xl)`, `text-transform: lowercase`.

---

## Hero Banner Section (`sections/hero-banner.liquid`)

### Layout pattern
- **Desktop (768px+):** Two-div approach — `.hero-banner__desktop` shown, `.hero-banner__mobile` hidden
- **Mobile (<768px):** `.hero-banner__mobile` shown, `.hero-banner__desktop` hidden
- Uses `@media (max-width: 767px)` to swap (mobile hidden by default, avoids both showing simultaneously)

### Desktop structure
```
.hero-banner (white bg, overflow hidden)
└── .hero-banner__desktop (display: flex, min-height: 520px)
    ├── img.hero-banner__media  → position: absolute; right: 0; width: 58%; height: 100%; object-fit: cover
    ├── ::after pseudo           → white→transparent gradient left 50%, fades image into content
    └── .hero-banner__content   → z-index: 2; max-width: 46%; padding left clamp(2.5rem→5rem)
        ├── .hero-banner__eyebrow   (italic, gradient, 600 weight)
        ├── h1.hero-banner__heading (large, 700, lowercase, dark ink)
        └── a.hero-banner__btn      (dark purple pill #3A1268)
```

### Mobile structure
```
.hero-banner__mobile (flex-col, center-aligned, padding 2rem 1.5rem 0)
├── .hero-banner__eyebrow
├── h1.hero-banner__heading
├── img.hero-banner__media    (max-width: 26rem, below heading)
└── a.hero-banner__btn--full  (full-width pill, margin auto, max-width 22rem)
```

### Schema settings
`eyebrow`, `heading`, `heading_highlight` (gets `.text-gradient-brand`), `button_label`, `button_link`, `desktop_image`, `mobile_image`

### Section CSS file
`assets/section-hero-super-shine.css` — loaded via `stylesheet_tag` at top of liquid file.
