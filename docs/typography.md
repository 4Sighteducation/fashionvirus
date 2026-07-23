# Typography

Three families cover the entire identity. All from Google Fonts — SIL Open Font License, free for commercial use — and **self-hosted** in the game via [Fontsource](https://fontsource.org/) npm packages rather than depending on Google's CDN.

## Display — Bodoni Moda

The voice of the game. A true Didone: razor-thin hairlines against heavy strokes — the Vogue register. Crucially, those hairlines are exactly what degrades beautifully: blur, grain and misregistration destroy delicate serifs first, so **the rot reads fastest in the most glamorous element**. It's a variable font with an optical-size axis, meaning it's genuinely drawn differently at masthead size versus caption size — a whole typographic wardrobe from one file.

**Use for:** the FASHION VIRUS wordmark, card headlines, the hinge text, big stat values.

## Workhorse — Archivo (plus Archivo Narrow)

A no-nonsense grotesque for everything functional: card body text, buttons, option labels. Archivo Narrow in letterspaced uppercase is the "eyebrow" style — the small `DECISION · MATERIALS` labels — the most fashion-editorial trick in the whole system, and it costs one CSS rule. The pairing logic is deliberate contrast: **the serif is the seduction, the sans is the machine underneath.**

We ship the Archivo variable font with the width axis, so Archivo Narrow is `font-stretch: 62.5%` — no second family needed.

**Use for:** body text, UI chrome, buttons, labels; `.eyebrow` class for the letterspaced uppercase style.

## Mono — Space Mono

For the ledgers, the whispers, the telemetry-flavoured moments, and any "document" the player uncovers — leaked memos, audit lines. Monospace reads as evidence: raw, unstyled, unglamoured truth. It also guarantees aligned columns for numbers. When the restoration ledger replaces the glossy dashboard in Act 2, switching the numerals from Bodoni to Space Mono is a one-line change that says *"the era of image is over, this is bookkeeping now"* — no art required.

**Use for:** the hidden ledger, the restoration ledger, whispers, telemetry, documents.

## Implementation

Fonts are imported in `src/main.tsx`; CSS variables in `src/index.css`:

| Token | Family |
|---|---|
| `--font-display` | Bodoni Moda Variable (wght + opsz axes) |
| `--font-sans` | Archivo Variable (wght + wdth axes) |
| `--font-mono` | Space Mono (400, 700) |
