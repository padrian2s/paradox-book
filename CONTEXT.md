# Paradox Simulators Project

## Overview
An interactive single-page HTML application featuring 49 paradoxes sourced from Hacker News, each with interactive simulators to explore and understand the concepts.

## Data Source
- Paradoxes fetched from HN Algolia API (`https://hn.algolia.com/api/v1/search?query=paradox&tags=story`)
- Pages 0-30 processed
- Points (HN upvotes) preserved for each paradox

## Files
- `index.html` - Main interactive application (~7800 lines)
- `paradoxes.md` - Documentation of 115 paradoxes with descriptions
- `CONTEXT.md` - This file

## Features

### Navigation
13 category sections:
- Mathematical, Physics, Social, Technology, Scientific
- Probability, Infinity, Advanced, Behavior, Economics
- Philosophy, Decisions, Quantum

### Sort by Points
- Toggle between "By Category" and "By Points" views
- Ranked list showing all paradoxes sorted by HN points
- Click any item to jump to its simulator
- Displays total paradox count (49 Paradoxes)

### Interactive Simulators (49 total)
Each paradox card includes:
- Title with HN points badge
- Description
- Interactive simulator with controls
- Results display
- Insight explanation

## Notable Simulators

### Mathematical
- **Potato Paradox** - Visual dehydration calculator
- **Simpson's Paradox** - Medical treatment comparison
- **St. Petersburg Paradox** - Infinite expected value casino
- **Braess' Paradox** - Traffic network with togglable shortcut

### Physics
- **Fermi Paradox** - Drake equation calculator
- **Grandfather Paradox** - Timeline visualizer
- **Twin Paradox** - Relativistic aging calculator
- **Olbers' Paradox** - Universe darkness simulator

### Probability
- **Monty Hall** - Door selection game with statistics
- **Birthday Paradox** - Collision probability calculator
- **Sleeping Beauty** - Credence explorer
- **Two Envelopes** - Expected value paradox

### Decision Theory
- **Newcomb's Paradox** - Predictor box game
- **Parrondo's Paradox** - Two losing games become winning
- **Ellsberg Paradox** - Ambiguity aversion urn experiment

### Logic
- **Liar's Paradox** - Truth value chain explorer
- **Ross-Littlewood** - Infinite ball experiment
- **Ship of Theseus** - Identity replacement tracker

### Economics
- **Dollar Auction** - Escalation trap simulator
- **Paradox of Thrift** - Savings vs spending economy
- **Jevons Paradox** - Efficiency rebound effect

## Technical Stack
- Pure HTML/CSS/JavaScript (no frameworks)
- CSS custom properties for theming
- Canvas for visualizations
- SVG for network diagrams
- Inline styles scoped per component

## Color Scheme
```css
--primary: #6366f1 (indigo)
--secondary: #8b5cf6 (purple)
--accent: #f59e0b (amber)
--bg: #0f172a (dark blue)
--card: #1e293b (slate)
--text: #e2e8f0 (light gray)
--muted: #94a3b8 (gray)
```

## Session History
1. Pages 0-10: Initial 90 paradoxes, 29 simulators
2. Pages 11-20: Added paradoxes 64-90, 12 more simulators
3. Pages 21-30: Added paradoxes 91-115, 8 more simulators
4. Added sort by points feature
5. Fixed Simpson's Paradox (clone ID issue)
6. Added paradox count display
