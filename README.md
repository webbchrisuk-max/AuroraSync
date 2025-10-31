# Aurora Nexus

Multi-page personal finance hub powered by a single `AuroraSync.json`.

## Pages
- `/` – Command Center
- `/monzo/monzo.html` – Monzo Aurora
- `/isa_hub/isa.html` – ISA Hub (IG, Trade212, Tesco)
- `/dividends/planner.html` – Dividend Planner

## Data Source
All pages fetch **`AuroraSync.json`** from repo root. Update that one file to refresh everything.

## Deploy
- Push to `main`
- Enable GitHub Pages: Settings → Pages → Source: `main` (root)