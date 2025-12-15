# Paradox Simulators Project

## Overview
An interactive single-page HTML application featuring 105 paradoxes sourced from Hacker News, each with interactive simulators to explore and understand the concepts.

## Data Source
- Paradoxes fetched from HN Algolia API (`https://hn.algolia.com/api/v1/search?query=paradox&tags=story`)
- Pages 0-35 processed (API limit reached at ~1000 results)
- Points (HN upvotes) preserved for each paradox
- Additional paradoxes implemented from paradoxes.md documentation

## Files
- `index.html` - Main interactive application (~10,300 lines)
- `paradoxes.md` - Documentation of 125 paradoxes with descriptions
- `CONTEXT.md` - This file

## Features

### Navigation
18 category sections:
- Mathematical, Physics, Social, Technology, Scientific
- Probability, Infinity, Advanced, Behavior, Economics
- Philosophy, Decisions, Quantum, Logic
- More Physics, More Tech, More Social, More Logic, More Economics

### Sort by Points
- Toggle between "By Category" and "By Points" views
- Ranked list showing all paradoxes sorted by HN points
- Click any item to jump to its simulator
- Displays total paradox count (104 Paradoxes)

### Interactive Simulators (105 total)
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
- **Banach-Tarski** - Sphere duplication animation

### Physics
- **Fermi Paradox** - Drake equation calculator
- **Grandfather Paradox** - Timeline visualizer
- **Twin Paradox** - Relativistic aging calculator
- **Olbers' Paradox** - Universe darkness simulator
- **Black Hole Information** - Information loss explorer
- **Dome Paradox** - Norton's dome animation

### Probability
- **Monty Hall** - Door selection game with statistics
- **Birthday Paradox** - Collision probability calculator
- **Sleeping Beauty** - Halfer/thirder debate explorer
- **Two Envelopes** - Expected value paradox
- **Allais Paradox** - Certainty effect gamble choices

### Decision Theory
- **Newcomb's Paradox** - Predictor box game
- **Parrondo's Paradox** - Two losing games become winning
- **Ellsberg Paradox** - Ambiguity aversion urn experiment

### Logic & Math
- **Liar's Paradox** - Truth value chain explorer
- **Ross-Littlewood** - Infinite ball experiment
- **Ship of Theseus** - Identity replacement tracker
- **Sorites Paradox** - Heap grain removal slider
- **Grelling-Nelson** - Autological/heterological word tester
- **Curry's Paradox** - Self-referential proof generator
- **Berry Paradox** - Definability contradiction explorer
- **Drinker Paradox** - Pub logic scenarios

### Economics & Medical
- **Dollar Auction** - Escalation trap simulator
- **Paradox of Thrift** - Savings vs spending economy
- **Jevons Paradox** - Efficiency rebound effect
- **Commuting Paradox** - Life satisfaction calculator
- **Clothesline Paradox** - GDP vs sustainability comparison
- **Obesity-Hunger** - Food budget nutrition explorer
- **Full-Fat Paradox** - Dairy health comparison
- **Elephant Brain** - Neuron distribution comparison

### Technology
- **Python Paradox** - Language choice hiring impact
- **Static Site Paradox** - Complexity comparison
- **Captcha Paradox** - AI training feedback loop
- **AI Deskilling** - Automation dependency explorer
- **Vibe Coding Paradox** - AI amplification of care vs dysfunction

### Psychology & Social
- **Violence Paradox** - Historical violence rates
- **Paradox of Choice** - Option overload satisfaction
- **Willpower Paradox** - Resistance vs avoidance strategy
- **Dating App Paradox** - Choice overload in dating

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
7. Pages 31-35: Added paradoxes 116-125, 10 more simulators (Logic section)
8. Implemented all remaining paradoxes from paradoxes.md:
   - Chunk 1 (More Physics): Black Hole Information, Archer's, Hydrostatic, Faint Sun, EPR, Heat Death, Banach-Tarski, Two Capacitor (8 simulators)
   - Chunk 2 (More Tech): Python, Static Site, Open Source, Captcha, Generative AI, AI Deskilling, Miserable Programmer (7 simulators)
   - Chunk 3 (More Social): Sleeping Beauty, Unexpected Hanging, Choice, Willpower, Hedonism, Dating App, Hispanic, Violence (8 simulators)
   - Chunk 4 (More Logic): Sorites, Dome, Bootstrap, Bonini's, Polanyi's, Grelling-Nelson, Curry's, Berry, Allais, Inventor's, Drinker (11 simulators)
   - Chunk 5 (More Economics): Commuting, Free-Time, Eligible Bachelor, Deming, Karl Popper, Clothesline, Obesity-Hunger, Low Birth-Weight, Full-Fat, Elephant Brain (10 simulators)

9. Added Vibe Coding Paradox (AI amplifies both excellence and dysfunction)
10. Fixed mobile responsive CSS for better usability on phones/tablets

**Total: 105 interactive paradox simulators**
