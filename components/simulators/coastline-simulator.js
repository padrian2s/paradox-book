/**
 * Coastline Paradox Simulator
 * Demonstrates how the length of a coastline depends on the ruler size
 */
import { SimulatorBase } from '../simulator-base.js';

class CoastlineSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .canvas-container {
                    margin-top: 1rem;
                }

                canvas {
                    width: 100%;
                    border-radius: 0.5rem;
                    background: #1e3a5f;
                }

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
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
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
                        font-size: 1rem;
                    }

                    .stat-label {
                        font-size: 0.6rem;
                    }
                }
            </style>

            <h4>Fractal Coastline Measurer</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Ruler Size: <span id="ruler-val">50</span> km</label>
                    <input type="range" id="ruler" min="5" max="100" value="50">
                </div>
            </div>

            <div class="canvas-container">
                <canvas id="coastline-canvas" width="600" height="300"></canvas>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="length">0 km</div>
                    <div class="stat-label">Measured Length</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="segments">0</div>
                    <div class="stat-label">Ruler Segments</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="dimension">1.25</div>
                    <div class="stat-label">Fractal Dimension</div>
                </div>
            </div>

            <div class="result">
                <p id="explanation">Britain's coast is ~12,400 km with a 50km ruler, but ~17,800 km with a 10km ruler. There's no "true" length!</p>
            </div>

            <div class="insight">
                Benoit Mandelbrot used coastlines to introduce fractal geometry. Real coastlines have fractal dimension ~1.2, meaning they're "more than a line but less than a plane."
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#ruler').addEventListener('input', () => this.measureCoastline());

        this.measureCoastline();
    }

    measureCoastline() {
        const rulerSize = parseInt(this.$('#ruler').value);
        this.$('#ruler-val').textContent = rulerSize;

        const canvas = this.$('#coastline-canvas');
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;

        ctx.fillStyle = '#1e3a5f';
        ctx.fillRect(0, 0, w, h);

        // Generate fractal coastline
        const points = this.generateCoastline(w, h, rulerSize);

        // Draw land
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.moveTo(0, h);
        points.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();

        // Measure with ruler
        let totalLength = 0;
        let segments = 0;

        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.beginPath();

        let i = 0;
        while (i < points.length - 1) {
            let j = i + 1;
            let dist = 0;

            // Find point approximately rulerSize away
            while (j < points.length && dist < rulerSize * 3) {
                const dx = points[j].x - points[i].x;
                const dy = points[j].y - points[i].y;
                dist = Math.sqrt(dx * dx + dy * dy);
                j++;
            }

            if (j < points.length) {
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j - 1].x, points[j - 1].y);
                totalLength += dist;
                segments++;
                i = j - 1;
            } else {
                break;
            }
        }
        ctx.stroke();

        // Scale to "km"
        const scaledLength = Math.round(totalLength * (200 / rulerSize));

        this.$('#length').textContent = scaledLength.toLocaleString() + ' km';
        this.$('#segments').textContent = segments;

        this.$('#explanation').textContent =
            `With a ${rulerSize}km ruler, the coast measures ~${scaledLength.toLocaleString()}km. Smaller rulers reveal more detail!`;
    }

    generateCoastline(w, h, detail) {
        const roughness = 0.5;
        const iterations = Math.max(3, Math.floor(7 - detail / 20));

        // Start with basic line
        let line = [
            { x: 0, y: h * 0.5 },
            { x: w, y: h * 0.5 }
        ];

        // Midpoint displacement
        for (let iter = 0; iter < iterations; iter++) {
            const newLine = [];
            for (let i = 0; i < line.length - 1; i++) {
                newLine.push(line[i]);
                const midX = (line[i].x + line[i + 1].x) / 2;
                const midY = (line[i].y + line[i + 1].y) / 2;
                const displacement = (Math.random() - 0.5) * h * roughness / Math.pow(2, iter);
                newLine.push({ x: midX, y: midY + displacement });
            }
            newLine.push(line[line.length - 1]);
            line = newLine;
        }

        return line;
    }
}

customElements.define('coastline-simulator', CoastlineSimulator);

export { CoastlineSimulator };
