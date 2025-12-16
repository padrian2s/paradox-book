/**
 * Berkson's Paradox Simulator
 * Demonstrates how selection bias creates false correlations
 */
import { SimulatorBase } from '../simulator-base.js';

class BerksonSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    text-align: center;
                    padding: 0.75rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .canvas-container {
                    margin-top: 1rem;
                }

                canvas {
                    width: 100%;
                    border-radius: 0.5rem;
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: repeat(3, 1fr);
                        gap: 0.5rem;
                    }

                    .stat-box {
                        padding: 0.5rem;
                    }

                    .stat-value {
                        font-size: 1.1rem;
                    }

                    .stat-label {
                        font-size: 0.65rem;
                    }
                }
            </style>

            <h4>Hollywood Selection Simulator</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">People have random, independent Talent (T) and Attractiveness (A). Only those with T+A above threshold become famous.</p>

            <div class="controls">
                <div class="control-group">
                    <label>Selection Threshold: <span id="threshold-val">100</span></label>
                    <input type="range" id="threshold" min="50" max="150" value="100">
                </div>
                <button id="generate-btn">Generate Population</button>
            </div>

            <div class="canvas-container">
                <canvas id="berkson-canvas" width="500" height="400"></canvas>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="pop-corr">0.00</div>
                    <div class="stat-label">Population Correlation</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="sel-corr">-0.45</div>
                    <div class="stat-label">Selected Correlation</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="selected-count">0</div>
                    <div class="stat-label">Selected Count</div>
                </div>
            </div>

            <div class="result">
                <p id="explanation">In the full population, Talent and Attractiveness are independent (correlation = 0). But among the selected, they appear negatively correlated!</p>
            </div>

            <div class="insight">
                This explains many spurious correlations: "nice guys finish last" (among people you date), "successful people are jerks" (among those who got promoted).
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#threshold').addEventListener('input', () => this.updateThreshold());
        this.$('#generate-btn').addEventListener('click', () => this.runSimulation());

        this.runSimulation();
    }

    updateThreshold() {
        this.$('#threshold-val').textContent = this.$('#threshold').value;
    }

    runSimulation() {
        const threshold = parseInt(this.$('#threshold').value);
        this.$('#threshold-val').textContent = threshold;

        const canvas = this.$('#berkson-canvas');
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, w, h);

        const population = [];
        const selected = [];

        for (let i = 0; i < 500; i++) {
            const talent = Math.random() * 100;
            const attractiveness = Math.random() * 100;
            population.push({ t: talent, a: attractiveness });

            if (talent + attractiveness >= threshold) {
                selected.push({ t: talent, a: attractiveness });
            }
        }

        // Draw axes
        ctx.strokeStyle = '#64748b';
        ctx.beginPath();
        ctx.moveTo(50, h - 50);
        ctx.lineTo(w - 20, h - 50);
        ctx.moveTo(50, h - 50);
        ctx.lineTo(50, 20);
        ctx.stroke();

        ctx.fillStyle = '#64748b';
        ctx.font = '12px sans-serif';
        ctx.fillText('Talent ->', w - 80, h - 30);
        ctx.save();
        ctx.translate(20, h / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Attractiveness ->', 0, 0);
        ctx.restore();

        // Draw threshold line
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        const x1 = 50;
        const y1 = h - 50 - (threshold - 0) * (h - 70) / 100;
        const x2 = 50 + threshold * (w - 70) / 100;
        const y2 = h - 50;
        ctx.moveTo(x1, Math.max(20, y1));
        ctx.lineTo(Math.min(w - 20, x2), y2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw population (gray)
        population.forEach(p => {
            const x = 50 + p.t * (w - 70) / 100;
            const y = h - 50 - p.a * (h - 70) / 100;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(100, 116, 139, 0.3)';
            ctx.fill();
        });

        // Draw selected (colored)
        selected.forEach(p => {
            const x = 50 + p.t * (w - 70) / 100;
            const y = h - 50 - p.a * (h - 70) / 100;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fillStyle = '#6366f1';
            ctx.fill();
        });

        // Calculate correlations
        const popCorr = this.correlation(population.map(p => p.t), population.map(p => p.a));
        const selCorr = selected.length > 2
            ? this.correlation(selected.map(p => p.t), selected.map(p => p.a))
            : 0;

        this.$('#pop-corr').textContent = popCorr.toFixed(2);
        this.$('#sel-corr').textContent = selCorr.toFixed(2);
        this.$('#sel-corr').style.color = selCorr < -0.2 ? '#ef4444' : 'var(--accent)';
        this.$('#selected-count').textContent = selected.length;
    }

    correlation(x, y) {
        const n = x.length;
        const sumX = x.reduce((a, b) => a + b, 0);
        const sumY = y.reduce((a, b) => a + b, 0);
        const sumXY = x.reduce((total, xi, i) => total + xi * y[i], 0);
        const sumX2 = x.reduce((total, xi) => total + xi * xi, 0);
        const sumY2 = y.reduce((total, yi) => total + yi * yi, 0);

        const num = n * sumXY - sumX * sumY;
        const den = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

        return den === 0 ? 0 : num / den;
    }
}

customElements.define('berkson-simulator', BerksonSimulator);

export { BerksonSimulator };
