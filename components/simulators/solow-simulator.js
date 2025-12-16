/**
 * Solow Paradox Simulator
 * You can see computers everywhere except in the productivity statistics
 */
import { SimulatorBase } from '../simulator-base.js';

class SolowSimulator extends SimulatorBase {
    constructor() {
        super();
        this.animationFrame = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .chart-container {
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                canvas {
                    width: 100%;
                    display: block;
                }

                .legend {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-top: 1rem;
                    font-size: 0.875rem;
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .legend-color {
                    width: 20px;
                    height: 4px;
                    border-radius: 2px;
                }

                .legend-color.it {
                    background: var(--primary, #6366f1);
                }

                .legend-color.prod {
                    background: var(--accent, #f59e0b);
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin: 1rem 0;
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
                }

                .stat-value.it {
                    color: var(--primary, #6366f1);
                }

                .stat-value.prod {
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .explanations {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .explanation-item {
                    padding: 0.5rem 0;
                    border-bottom: 1px solid var(--bg, #0f172a);
                    font-size: 0.875rem;
                }

                .explanation-item:last-child {
                    border-bottom: none;
                }
            </style>

            <h4>IT Investment vs Productivity</h4>

            <div class="chart-container">
                <canvas id="solow-canvas" width="600" height="250"></canvas>
            </div>

            <div class="legend">
                <div class="legend-item">
                    <div class="legend-color it"></div>
                    <span>IT Spending</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color prod"></div>
                    <span>Productivity</span>
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="animate-btn">Animate Chart</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value it">+2000%</div>
                    <div class="stat-label">IT Spending Growth (1980-2020)</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value prod">+50%</div>
                    <div class="stat-label">Productivity Growth (same period)</div>
                </div>
            </div>

            <div class="result">
                <p>"You can see the computer age everywhere but in the productivity statistics." - Robert Solow, 1987</p>
            </div>

            <div class="explanations">
                <div style="font-weight: bold; margin-bottom: 0.5rem; color: var(--text);">Possible Explanations:</div>
                <div class="explanation-item">&#x1F4CA; <strong>Measurement problems:</strong> Digital value is hard to measure in GDP</div>
                <div class="explanation-item">&#x23F3; <strong>Lag time:</strong> Benefits take decades to materialize</div>
                <div class="explanation-item">&#x1F4F1; <strong>Distractions:</strong> Email, social media offset gains</div>
                <div class="explanation-item">&#x1F916; <strong>Task displacement:</strong> Computers replace easy tasks, leaving hard ones</div>
            </div>

            <div class="insight">
                The paradox may be resolving: recent AI advances show promise for genuine productivity gains, but we're still waiting for the statistics to reflect it.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#animate-btn').addEventListener('click', () => this.drawChart());
        setTimeout(() => this.drawStaticChart(), 100);
    }

    drawStaticChart() {
        const canvas = this.$('#solow-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, w, h);

        this.drawAxes(ctx, w, h);
    }

    drawAxes(ctx, w, h) {
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(50, 20);
        ctx.lineTo(50, h - 30);
        ctx.lineTo(w - 20, h - 30);
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px sans-serif';
        ctx.fillText('1980', 50, h - 10);
        ctx.fillText('2000', w / 2, h - 10);
        ctx.fillText('2020', w - 50, h - 10);
    }

    drawChart() {
        const canvas = this.$('#solow-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, w, h);
        this.drawAxes(ctx, w, h);

        const itData = [];
        for (let i = 0; i <= 40; i++) {
            itData.push(Math.pow(1.08, i) / Math.pow(1.08, 40) * (h - 80));
        }

        const prodData = [];
        for (let i = 0; i <= 40; i++) {
            prodData.push((1 + i * 0.0125) / 1.5 * (h - 80) * 0.3);
        }

        let frame = 0;
        const animate = () => {
            if (frame > 40) return;

            ctx.strokeStyle = '#6366f1';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(50, h - 30 - itData[0]);
            for (let i = 1; i <= frame; i++) {
                const x = 50 + (i / 40) * (w - 70);
                ctx.lineTo(x, h - 30 - itData[i]);
            }
            ctx.stroke();

            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(50, h - 30 - prodData[0]);
            for (let i = 1; i <= frame; i++) {
                const x = 50 + (i / 40) * (w - 70);
                ctx.lineTo(x, h - 30 - prodData[i]);
            }
            ctx.stroke();

            frame++;
            this.animationFrame = requestAnimationFrame(animate);
        };

        animate();
    }

    cleanup() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

customElements.define('solow-simulator', SolowSimulator);

export { SolowSimulator };
