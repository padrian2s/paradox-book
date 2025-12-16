/**
 * Olbers' Paradox Simulator
 * Demonstrates why the night sky is dark in a finite-age universe
 */
import { SimulatorBase } from '../simulator-base.js';

class OlbersSimulator extends SimulatorBase {
    constructor() {
        super();
        this.canvas = null;
        this.ctx = null;
        this.animationFrame = null;
        this.stars = [];
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .sky-container {
                    position: relative;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    margin: 1rem 0;
                }

                canvas {
                    display: block;
                    width: 100%;
                    height: 250px;
                    background: #000;
                    border-radius: 0.5rem;
                }

                .sky-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    padding: 0.5rem;
                    display: flex;
                    justify-content: space-between;
                    pointer-events: none;
                }

                .sky-label {
                    background: rgba(0, 0, 0, 0.7);
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.25rem;
                    font-size: 0.75rem;
                    color: white;
                }

                .parameters-row {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .parameter-card {
                    background: var(--bg, #0f172a);
                    padding: 1rem;
                    border-radius: 0.5rem;
                }

                .parameter-card label {
                    display: block;
                    font-size: 0.875rem;
                    color: var(--text, #e2e8f0);
                    margin-bottom: 0.5rem;
                }

                .parameter-card input[type="range"] {
                    width: 100%;
                }

                .parameter-value {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 0.25rem;
                    font-size: 0.75rem;
                }

                .parameter-value .current {
                    color: var(--accent, #f59e0b);
                    font-weight: bold;
                }

                .parameter-value .range {
                    color: var(--muted, #94a3b8);
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 0.75rem;
                    margin-top: 1rem;
                }

                .stat-card {
                    background: var(--card, #1e293b);
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .brightness-meter {
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    overflow: hidden;
                    height: 30px;
                    margin-top: 1rem;
                    position: relative;
                }

                .brightness-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #1e293b, #fef08a, #fbbf24, #fff);
                    transition: width 0.5s ease;
                }

                .brightness-label {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-weight: bold;
                    font-size: 0.875rem;
                    text-shadow: 0 0 4px black;
                }

                .scenario-buttons {
                    display: flex;
                    gap: 0.5rem;
                    flex-wrap: wrap;
                    margin-bottom: 1rem;
                }

                .scenario-buttons button {
                    flex: 1;
                    min-width: 120px;
                    font-size: 0.875rem;
                }

                .scenario-buttons button.infinite {
                    background: #dc2626;
                }

                .scenario-buttons button.expanding {
                    background: #7c3aed;
                }

                @media (max-width: 768px) {
                    .parameters-row {
                        grid-template-columns: 1fr;
                    }
                    canvas {
                        height: 200px;
                    }
                }
            </style>

            <h4>Night Sky Simulator</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">Why is the night sky dark if the universe contains infinite stars?</p>

            <div class="scenario-buttons">
                <button id="realistic-btn">Our Universe (13.8B years)</button>
                <button id="ancient-btn">Very Old (500B years)</button>
                <button id="infinite-btn" class="infinite">Infinite & Static</button>
                <button id="expanding-btn" class="expanding">Show Redshift</button>
            </div>

            <div class="parameters-row">
                <div class="parameter-card">
                    <label>Universe Age (billions of years)</label>
                    <input type="range" id="universe-age" min="1" max="1000" value="13.8">
                    <div class="parameter-value">
                        <span class="current" id="age-val">13.8 B</span>
                        <span class="range">1B - 1000B years</span>
                    </div>
                </div>
                <div class="parameter-card">
                    <label>Star Density</label>
                    <input type="range" id="star-density" min="1" max="100" value="20">
                    <div class="parameter-value">
                        <span class="current" id="density-val">20%</span>
                        <span class="range">1% - 100%</span>
                    </div>
                </div>
                <div class="parameter-card">
                    <label>Show Expansion Redshift</label>
                    <input type="range" id="redshift" min="0" max="100" value="0">
                    <div class="parameter-value">
                        <span class="current" id="redshift-val">0%</span>
                        <span class="range">Light stretching</span>
                    </div>
                </div>
            </div>

            <div class="controls" style="justify-content: center;">
                <button id="generate-btn">Generate Sky</button>
                <button id="animate-btn">Animate Light Travel</button>
            </div>

            <div class="sky-container">
                <canvas id="sky-canvas" width="800" height="250"></canvas>
                <div class="sky-overlay">
                    <span class="sky-label" id="light-distance">Light traveled: 13.8B ly</span>
                    <span class="sky-label" id="visible-pct">Visible universe</span>
                </div>
            </div>

            <div class="brightness-meter">
                <div class="brightness-fill" id="brightness-fill" style="width: 5%"></div>
                <span class="brightness-label" id="brightness-label">Dark Sky</span>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-value" id="star-count">0</div>
                    <div class="stat-label">Visible Stars</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="coverage">0%</div>
                    <div class="stat-label">Sky Coverage</div>
                </div>
                <div class="stat-card">
                    <div class="stat-value" id="brightness">0%</div>
                    <div class="stat-label">Brightness</div>
                </div>
            </div>

            <div class="result">
                <p id="explanation">In a finite-age universe, light from distant stars hasn't reached us yet.</p>
            </div>

            <div class="insight">
                The dark night sky proves the universe is NOT infinitely old. Light has a speed limit, and distant stars' light hasn't had time to reach us. Additionally, cosmic expansion redshifts distant light out of the visible spectrum.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#universe-age').addEventListener('input', () => this.updateValues());
        this.$('#star-density').addEventListener('input', () => this.updateValues());
        this.$('#redshift').addEventListener('input', () => this.updateValues());

        this.$('#generate-btn').addEventListener('click', () => this.generateSky());
        this.$('#animate-btn').addEventListener('click', () => this.animateLightTravel());

        this.$('#realistic-btn').addEventListener('click', () => this.applyScenario('realistic'));
        this.$('#ancient-btn').addEventListener('click', () => this.applyScenario('ancient'));
        this.$('#infinite-btn').addEventListener('click', () => this.applyScenario('infinite'));
        this.$('#expanding-btn').addEventListener('click', () => this.applyScenario('expanding'));

        this.canvas = this.$('#sky-canvas');
        this.ctx = this.canvas.getContext('2d');

        this.generateSky();
    }

    applyScenario(scenario) {
        const scenarios = {
            realistic: { age: 13.8, density: 20, redshift: 30 },
            ancient: { age: 500, density: 60, redshift: 0 },
            infinite: { age: 1000, density: 100, redshift: 0 },
            expanding: { age: 13.8, density: 50, redshift: 80 }
        };

        const s = scenarios[scenario];
        this.$('#universe-age').value = s.age;
        this.$('#star-density').value = s.density;
        this.$('#redshift').value = s.redshift;

        this.updateValues();
        this.generateSky();
    }

    updateValues() {
        const age = parseFloat(this.$('#universe-age').value);
        const density = parseFloat(this.$('#star-density').value);
        const redshift = parseFloat(this.$('#redshift').value);

        this.$('#age-val').textContent = age + ' B';
        this.$('#density-val').textContent = density + '%';
        this.$('#redshift-val').textContent = redshift + '%';
    }

    generateSky() {
        const age = parseFloat(this.$('#universe-age').value);
        const density = parseFloat(this.$('#star-density').value);
        const redshift = parseFloat(this.$('#redshift').value);

        const canvas = this.canvas;
        const ctx = this.ctx;
        const width = canvas.width;
        const height = canvas.height;

        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, width, height);

        const visibleFraction = Math.min(age / 100, 1);
        const baseStars = Math.floor((width * height / 100) * (density / 100) * visibleFraction);
        const numStars = Math.min(baseStars, 5000);

        this.stars = [];
        let totalBrightness = 0;

        for (let i = 0; i < numStars; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const distance = Math.random();
            const baseSize = 0.5 + Math.random() * 2;
            const baseBrightness = 0.3 + Math.random() * 0.7;

            let r = 255, g = 255, b = 255;

            if (redshift > 0) {
                const shiftAmount = distance * (redshift / 100);
                r = Math.max(100, 255 - shiftAmount * 100);
                g = Math.max(50, 255 - shiftAmount * 200);
                b = Math.max(0, 255 - shiftAmount * 255);

                if (shiftAmount > 0.8) {
                    continue;
                }
            }

            const effectiveBrightness = baseBrightness * (1 - (redshift / 100) * distance * 0.5);
            totalBrightness += effectiveBrightness * baseSize;

            ctx.beginPath();
            ctx.arc(x, y, baseSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${effectiveBrightness})`;
            ctx.fill();

            if (baseSize > 1.5) {
                ctx.beginPath();
                ctx.arc(x, y, baseSize * 2, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(x, y, 0, x, y, baseSize * 2);
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${effectiveBrightness * 0.3})`);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = gradient;
                ctx.fill();
            }

            this.stars.push({ x, y, size: baseSize, brightness: effectiveBrightness, r, g, b });
        }

        if (age > 500 && density > 80 && redshift < 20) {
            const glowIntensity = Math.min(((age - 500) / 500) * (density / 100) * (1 - redshift / 100), 1);
            ctx.fillStyle = `rgba(255, 255, 200, ${glowIntensity * 0.8})`;
            ctx.fillRect(0, 0, width, height);
        }

        const maxBrightness = (width * height / 100) * 3;
        const brightnessPercent = Math.min((totalBrightness / maxBrightness) * 100, 100);
        const coveragePercent = Math.min((numStars / (width * height / 50)) * 100, 100);

        this.$('#star-count').textContent = numStars.toLocaleString();
        this.$('#coverage').textContent = coveragePercent.toFixed(1) + '%';
        this.$('#brightness').textContent = brightnessPercent.toFixed(1) + '%';

        this.$('#brightness-fill').style.width = brightnessPercent + '%';

        let brightnessLabel = 'Dark Sky';
        if (brightnessPercent > 80) brightnessLabel = 'Blazing Bright!';
        else if (brightnessPercent > 50) brightnessLabel = 'Very Bright';
        else if (brightnessPercent > 20) brightnessLabel = 'Moderately Bright';
        else if (brightnessPercent > 5) brightnessLabel = 'Dim';
        this.$('#brightness-label').textContent = brightnessLabel;

        this.$('#light-distance').textContent = `Light traveled: ${age}B ly`;

        if (age > 500 && density > 80 && redshift < 20) {
            this.$('#explanation').textContent =
                'In an infinite, static universe, every line of sight eventually hits a star. The sky would be as bright as the surface of a star!';
        } else if (redshift > 50) {
            this.$('#explanation').textContent =
                `With ${redshift}% redshift effect, distant starlight is stretched into infrared and beyond, invisible to our eyes. Expansion dims the sky.`;
        } else {
            this.$('#explanation').textContent =
                `At ${age}B years old, light has only traveled ${age} billion light-years. Stars beyond this "cosmic horizon" remain invisible to us.`;
        }
    }

    animateLightTravel() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }

        const canvas = this.canvas;
        const ctx = this.ctx;
        const width = canvas.width;
        const height = canvas.height;

        let currentAge = 0;
        const targetAge = parseFloat(this.$('#universe-age').value);
        const density = parseFloat(this.$('#star-density').value);
        const redshift = parseFloat(this.$('#redshift').value);

        const allPossibleStars = [];
        const maxStars = Math.floor((width * height / 100) * (density / 100));
        for (let i = 0; i < Math.min(maxStars, 3000); i++) {
            allPossibleStars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                distance: Math.random() * 100,
                size: 0.5 + Math.random() * 2,
                brightness: 0.3 + Math.random() * 0.7
            });
        }

        const animate = () => {
            currentAge += targetAge / 60;
            if (currentAge > targetAge) currentAge = targetAge;

            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, width, height);

            let visibleCount = 0;
            allPossibleStars.forEach(star => {
                if (star.distance <= currentAge) {
                    visibleCount++;

                    let r = 255, g = 255, b = 255;
                    const shiftAmount = (star.distance / 100) * (redshift / 100);

                    if (redshift > 0) {
                        r = Math.max(100, 255 - shiftAmount * 100);
                        g = Math.max(50, 255 - shiftAmount * 200);
                        b = Math.max(0, 255 - shiftAmount * 255);
                    }

                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${star.brightness})`;
                    ctx.fill();
                }
            });

            this.$('#star-count').textContent = visibleCount.toLocaleString();
            this.$('#light-distance').textContent = `Light traveled: ${currentAge.toFixed(1)}B ly`;

            if (currentAge < targetAge) {
                this.animationFrame = requestAnimationFrame(animate);
            } else {
                this.generateSky();
            }
        };

        animate();
    }

    cleanup() {
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

customElements.define('olbers-simulator', OlbersSimulator);

export { OlbersSimulator };
