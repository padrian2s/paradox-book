/**
 * Triangle Dissection Paradox Simulator
 * Demonstrates the missing square puzzle visual illusion
 */
import { SimulatorBase } from '../simulator-base.js';

class TriangleSimulator extends SimulatorBase {
    constructor() {
        super();
        this.config = 'A';
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .triangle-viz {
                    display: flex;
                    justify-content: center;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                #triangle-canvas {
                    border: 1px solid var(--card, #1e293b);
                    border-radius: 0.25rem;
                    max-width: 100%;
                    height: auto;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stat-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }

                    .stat-value {
                        font-size: 1rem;
                    }
                }
            </style>

            <h4>Missing Square Puzzle</h4>

            <div class="controls">
                <button id="toggle-btn">Toggle Configuration</button>
                <button id="reveal-btn">Reveal the Trick</button>
            </div>

            <div class="triangle-viz">
                <canvas id="triangle-canvas" width="400" height="200"></canvas>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="triangle-config">Config A</div>
                    <div class="stat-label">Configuration</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="triangle-area">32 sq</div>
                    <div class="stat-label">Apparent Area</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="triangle-extra">+1 sq?</div>
                    <div class="stat-label">Extra Square</div>
                </div>
            </div>

            <div class="result">
                <p id="triangle-result">Both configurations use the same pieces but one has an extra square! Click "Reveal the Trick" to see why.</p>
            </div>

            <div class="insight">
                The "hypotenuse" is not actually straight - it's slightly bowed. The two triangles have different slopes (2/5 vs 3/8), creating a thin gap that accounts for the "extra" area.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#toggle-btn').addEventListener('click', () => this.toggleTriangleDissection());
        this.$('#reveal-btn').addEventListener('click', () => this.showTriangleTrick());

        this.drawTriangle(false);
    }

    toggleTriangleDissection() {
        this.config = this.config === 'A' ? 'B' : 'A';
        this.drawTriangle(false);
    }

    showTriangleTrick() {
        this.drawTriangle(true);
    }

    drawTriangle(showTrick) {
        const canvas = this.$('#triangle-canvas');
        const ctx = canvas.getContext('2d');
        const w = canvas.width, h = canvas.height;

        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, w, h);

        const scale = 15;
        const offsetX = 50;
        const offsetY = 30;

        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 13; i++) {
            ctx.beginPath();
            ctx.moveTo(offsetX + i * scale, offsetY);
            ctx.lineTo(offsetX + i * scale, offsetY + 5 * scale);
            ctx.stroke();
        }
        for (let i = 0; i <= 5; i++) {
            ctx.beginPath();
            ctx.moveTo(offsetX, offsetY + i * scale);
            ctx.lineTo(offsetX + 13 * scale, offsetY + i * scale);
            ctx.stroke();
        }

        const colors = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b'];

        if (this.config === 'A') {
            ctx.fillStyle = colors[0];
            ctx.beginPath();
            ctx.moveTo(offsetX, offsetY + 5 * scale);
            ctx.lineTo(offsetX + 5 * scale, offsetY + 5 * scale);
            ctx.lineTo(offsetX + 5 * scale, offsetY + 3 * scale);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = colors[1];
            ctx.beginPath();
            ctx.moveTo(offsetX + 5 * scale, offsetY + 3 * scale);
            ctx.lineTo(offsetX + 13 * scale, offsetY);
            ctx.lineTo(offsetX + 13 * scale, offsetY + 3 * scale);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = colors[2];
            ctx.fillRect(offsetX + 5 * scale, offsetY + 3 * scale, 3 * scale, 2 * scale);

            ctx.fillStyle = colors[3];
            ctx.fillRect(offsetX + 8 * scale, offsetY + 3 * scale, 5 * scale, 2 * scale);

            this.$('#triangle-config').textContent = 'Config A';
            this.$('#triangle-area').textContent = '32 sq';
            this.$('#triangle-extra').textContent = 'Full';
        } else {
            ctx.fillStyle = colors[0];
            ctx.beginPath();
            ctx.moveTo(offsetX, offsetY + 5 * scale);
            ctx.lineTo(offsetX + 5 * scale, offsetY + 5 * scale);
            ctx.lineTo(offsetX + 5 * scale, offsetY + 3 * scale);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = colors[1];
            ctx.beginPath();
            ctx.moveTo(offsetX + 5 * scale, offsetY + 2 * scale);
            ctx.lineTo(offsetX + 13 * scale, offsetY);
            ctx.lineTo(offsetX + 13 * scale, offsetY + 2 * scale);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = colors[2];
            ctx.fillRect(offsetX + 5 * scale, offsetY + 2 * scale, 3 * scale, 3 * scale);

            ctx.fillStyle = colors[3];
            ctx.fillRect(offsetX + 8 * scale, offsetY + 2 * scale, 5 * scale, 2 * scale);

            ctx.fillStyle = '#fbbf24';
            ctx.fillRect(offsetX + 5 * scale + 1, offsetY + 2 * scale + scale - 2, scale * 3 - 2, 4);

            this.$('#triangle-config').textContent = 'Config B';
            this.$('#triangle-area').textContent = '32 sq';
            this.$('#triangle-extra').textContent = '+1 sq gap!';
        }

        if (showTrick) {
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(offsetX, offsetY + 5 * scale);
            ctx.lineTo(offsetX + 13 * scale, offsetY);
            ctx.stroke();
            ctx.setLineDash([]);

            this.$('#triangle-result').innerHTML =
                '<strong style="color: #fbbf24;">THE TRICK:</strong> The white dashed line shows the true hypotenuse. The colored pieces don\'t form a straight line - they bow slightly, creating/hiding a tiny gap!';
        }
    }
}

customElements.define('triangle-simulator', TriangleSimulator);

export { TriangleSimulator };
