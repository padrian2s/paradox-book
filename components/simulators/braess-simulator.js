/**
 * Braess' Paradox Simulator
 * Demonstrates how adding a road can increase travel time for everyone
 */
import { SimulatorBase } from '../simulator-base.js';

class BraessSimulator extends SimulatorBase {
    constructor() {
        super();
        this.shortcutEnabled = false;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .network-container {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    min-height: 280px;
                }

                .network-container svg {
                    width: 100%;
                    height: 280px;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stats-grid.with-shortcut {
                    grid-template-columns: repeat(4, 1fr);
                }

                .stat-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .time-worse {
                    color: #ef4444 !important;
                }

                @media (max-width: 768px) {
                    .network-container {
                        min-height: 220px;
                    }

                    .network-container svg {
                        height: 220px;
                    }

                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 0.5rem;
                    }

                    .stats-grid.with-shortcut {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .stat-box {
                        padding: 0.75rem;
                    }

                    .stat-value {
                        font-size: 1.1rem;
                    }

                    .stat-label {
                        font-size: 0.65rem;
                    }
                }
            </style>

            <h4>Traffic Network Simulator</h4>
            <p style="color: var(--muted, #94a3b8); margin-bottom: 1rem;">4000 cars must travel from A to B. Routes have time = (cars/100) or fixed 45 min.</p>

            <div class="controls">
                <button id="toggle-btn">Add Shortcut Road</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="network-container">
                <svg id="network-svg"></svg>
            </div>

            <div class="stats-grid" id="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="route1">2000</div>
                    <div class="stat-label">Route A-X-B</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="route2">2000</div>
                    <div class="stat-label">Route A-Y-B</div>
                </div>
                <div class="stat-box" id="route3-box" style="display: none;">
                    <div class="stat-value" id="route3">0</div>
                    <div class="stat-label">Route A-X-Y-B</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="travel-time">65 min</div>
                    <div class="stat-label">Travel Time</div>
                </div>
            </div>

            <div class="result">
                <p id="explanation">Without shortcut: Each route has 2000 cars. Time = 20 + 45 = 65 min (Nash equilibrium).</p>
            </div>

            <div class="insight">
                Selfish routing leads to a Nash equilibrium that's worse for everyone. This is why highway planners sometimes close roads to improve traffic!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#toggle-btn').addEventListener('click', () => this.toggleShortcut());
        this.$('#reset-btn').addEventListener('click', () => this.reset());

        this.drawNetwork();

        const resizeObserver = new ResizeObserver(() => this.drawNetwork());
        resizeObserver.observe(this.$('.network-container'));
    }

    drawNetwork() {
        const svg = this.$('#network-svg');
        const container = this.$('.network-container');
        const w = container.clientWidth || 400;
        const h = 280;

        const nodes = {
            A: { x: 50, y: h / 2 },
            X: { x: w / 2, y: 60 },
            Y: { x: w / 2, y: h - 60 },
            B: { x: w - 50, y: h / 2 }
        };

        let html = '';

        const edges = [
            { from: 'A', to: 'X', label: 'T/100', variable: true },
            { from: 'X', to: 'B', label: '45 min', variable: false },
            { from: 'A', to: 'Y', label: '45 min', variable: false },
            { from: 'Y', to: 'B', label: 'T/100', variable: true }
        ];

        if (this.shortcutEnabled) {
            edges.push({ from: 'X', to: 'Y', label: '0 min', variable: false, shortcut: true });
        }

        edges.forEach(e => {
            const x1 = nodes[e.from].x, y1 = nodes[e.from].y;
            const x2 = nodes[e.to].x, y2 = nodes[e.to].y;
            const color = e.shortcut ? '#f59e0b' : (e.variable ? '#6366f1' : '#64748b');
            const strokeWidth = e.shortcut ? 4 : 2;

            html += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${strokeWidth}"/>`;

            const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
            const offset = e.from === 'A' ? -15 : 15;
            html += `<text x="${mx}" y="${my + offset}" fill="${color}" font-size="12" text-anchor="middle">${e.label}</text>`;
        });

        Object.entries(nodes).forEach(([name, pos]) => {
            html += `<circle cx="${pos.x}" cy="${pos.y}" r="25" fill="${name === 'A' || name === 'B' ? '#6366f1' : '#8b5cf6'}"/>`;
            html += `<text x="${pos.x}" y="${pos.y + 5}" fill="white" font-size="16" font-weight="bold" text-anchor="middle">${name}</text>`;
        });

        svg.innerHTML = html;
        this.updateStats();
    }

    updateStats() {
        const statsGrid = this.$('#stats-grid');
        const timeEl = this.$('#travel-time');

        if (!this.shortcutEnabled) {
            this.$('#route1').textContent = '2000';
            this.$('#route2').textContent = '2000';
            timeEl.textContent = '65 min';
            timeEl.classList.remove('time-worse');
            this.$('#route3-box').style.display = 'none';
            statsGrid.classList.remove('with-shortcut');
            this.$('#explanation').textContent =
                'Without shortcut: Each route has 2000 cars. Time = 20 + 45 = 65 min (Nash equilibrium).';
        } else {
            this.$('#route1').textContent = '0';
            this.$('#route2').textContent = '0';
            this.$('#route3').textContent = '4000';
            timeEl.textContent = '80 min';
            timeEl.classList.add('time-worse');
            this.$('#route3-box').style.display = 'block';
            statsGrid.classList.add('with-shortcut');
            this.$('#explanation').textContent =
                'With shortcut: Everyone takes A-X-Y-B (Nash equilibrium). Time = 40 + 0 + 40 = 80 min. WORSE for everyone!';
        }
    }

    toggleShortcut() {
        this.shortcutEnabled = !this.shortcutEnabled;
        this.$('#toggle-btn').textContent = this.shortcutEnabled ? 'Remove Shortcut Road' : 'Add Shortcut Road';
        this.drawNetwork();
    }

    reset() {
        this.shortcutEnabled = false;
        this.$('#toggle-btn').textContent = 'Add Shortcut Road';
        this.drawNetwork();
    }
}

customElements.define('braess-simulator', BraessSimulator);

export { BraessSimulator };
