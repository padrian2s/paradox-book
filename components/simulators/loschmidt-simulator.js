/**
 * Loschmidt's Paradox Simulator
 * Time-reversible microscopic laws vs irreversible macroscopic entropy
 */
import { SimulatorBase } from '../simulator-base.js';

class LoschmidtSimulator extends SimulatorBase {
    constructor() {
        super();
        this.particles = [];
        this.isRunning = false;
        this.isReversed = false;
        this.history = [];
        this.animationId = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .container-box {
                    height: 200px;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    position: relative;
                    overflow: hidden;
                }

                .divider {
                    position: absolute;
                    left: 50%;
                    top: 0;
                    bottom: 0;
                    width: 2px;
                    background: var(--muted, #94a3b8);
                    opacity: 0.3;
                }

                .particle {
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    background: var(--primary, #6366f1);
                    border-radius: 50%;
                }

                .time-arrow {
                    position: absolute;
                    top: 10px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 1.5rem;
                    color: var(--accent, #f59e0b);
                    transition: transform 0.3s;
                }

                .time-arrow.reversed {
                    transform: translateX(-50%) scaleX(-1);
                }

                .stats-container {
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
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .entropy-display {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .entropy-bar {
                    height: 24px;
                    background: var(--bg, #0f172a);
                    border-radius: 0.25rem;
                    overflow: hidden;
                    margin-top: 0.5rem;
                }

                .entropy-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #22c55e, #f59e0b, #ef4444);
                    transition: width 0.3s;
                }

                .law-display {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 1rem;
                    gap: 1rem;
                    flex-wrap: wrap;
                }

                .law-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    flex: 1;
                    min-width: 150px;
                }

                .law-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    font-size: 0.9rem;
                }

                .law-status {
                    font-size: 0.85rem;
                }

                .reversible { color: #22c55e; }
                .irreversible { color: #ef4444; }

                @media (max-width: 600px) {
                    .stats-container {
                        grid-template-columns: 1fr;
                    }

                    .law-display {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>Time Reversibility vs Entropy</h4>

            <div class="controls">
                <button id="start-btn">Start</button>
                <button id="reverse-btn">Reverse Time</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="container-box" id="container">
                <div class="divider"></div>
                <div class="time-arrow" id="time-arrow">&#x27A1;</div>
            </div>

            <div class="stats-container">
                <div class="stat-box">
                    <div class="stat-value" id="left-count">20</div>
                    <div class="stat-label">Left Side</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="right-count">0</div>
                    <div class="stat-label">Right Side</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="time-direction">Forward</div>
                    <div class="stat-label">Time Direction</div>
                </div>
            </div>

            <div class="entropy-display">
                <div style="display: flex; justify-content: space-between;">
                    <span>System Entropy</span>
                    <span id="entropy-value">Low</span>
                </div>
                <div class="entropy-bar">
                    <div class="entropy-fill" id="entropy-bar" style="width: 10%"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--muted); margin-top: 0.25rem;">
                    <span>Ordered</span>
                    <span>Disordered</span>
                </div>
            </div>

            <div class="law-display">
                <div class="law-box">
                    <div class="law-title">Microscopic Laws</div>
                    <div class="law-status reversible" id="micro-status">Time-Reversible</div>
                    <div style="font-size: 0.75rem; color: var(--muted); margin-top: 0.5rem;">
                        Each collision is reversible
                    </div>
                </div>
                <div class="law-box">
                    <div class="law-title">Second Law</div>
                    <div class="law-status" id="macro-status">Entropy Increases</div>
                    <div style="font-size: 0.75rem; color: var(--muted); margin-top: 0.5rem;">
                        Overall disorder grows
                    </div>
                </div>
            </div>

            <div class="result" id="result">
                <p>All particles start on the left. Watch them spread out (entropy increases).</p>
                <p>Then reverse time - microscopically legal, but practically impossible!</p>
            </div>

            <div class="insight">
                Every molecular collision is time-reversible. Yet we never see gas spontaneously concentrate in one corner. Loschmidt asked: if the laws allow reversal, why does entropy always increase? The answer involves statistics - reversed states are astronomically unlikely.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#start-btn').addEventListener('click', () => this.start());
        this.$('#reverse-btn').addEventListener('click', () => this.reverseTime());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    connectedCallback() {
        super.connectedCallback();
        this.initParticles();
    }

    initParticles() {
        const container = this.$('#container');
        const existingParticles = container.querySelectorAll('.particle');
        existingParticles.forEach(p => p.remove());

        this.particles = [];
        this.history = [];

        for (let i = 0; i < 20; i++) {
            const particle = {
                element: document.createElement('div'),
                x: 20 + Math.random() * 100,
                y: 40 + Math.random() * 140,
                vx: (Math.random() - 0.5) * 3,
                vy: (Math.random() - 0.5) * 3
            };

            particle.element.className = 'particle';
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
            container.appendChild(particle.element);

            this.particles.push(particle);
        }

        this.updateStats();
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.isReversed = false;
        this.$('#time-direction').textContent = 'Forward';
        this.$('#time-arrow').classList.remove('reversed');

        this.animate();
    }

    animate() {
        const containerWidth = 300;
        const containerHeight = 200;

        if (!this.isReversed) {
            this.history.push(this.particles.map(p => ({ x: p.x, y: p.y, vx: p.vx, vy: p.vy })));
            if (this.history.length > 500) {
                this.history.shift();
            }
        }

        this.particles.forEach(p => {
            if (this.isReversed && this.history.length > 0) {
                return;
            }

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 4) { p.x = 4; p.vx *= -1; }
            if (p.x > containerWidth - 12) { p.x = containerWidth - 12; p.vx *= -1; }
            if (p.y < 4) { p.y = 4; p.vy *= -1; }
            if (p.y > containerHeight - 12) { p.y = containerHeight - 12; p.vy *= -1; }

            p.element.style.left = p.x + 'px';
            p.element.style.top = p.y + 'px';
        });

        if (this.isReversed && this.history.length > 0) {
            const state = this.history.pop();
            this.particles.forEach((p, i) => {
                p.x = state[i].x;
                p.y = state[i].y;
                p.vx = state[i].vx;
                p.vy = state[i].vy;
                p.element.style.left = p.x + 'px';
                p.element.style.top = p.y + 'px';
            });

            if (this.history.length === 0) {
                this.isRunning = false;
                this.$('#result').innerHTML = `
                    <p style="color: #22c55e;"><strong>Time reversal complete!</strong></p>
                    <p>The particles returned to their initial state - perfectly legal physically.</p>
                    <p style="color: var(--accent);">But in reality, this would require knowing every particle's exact velocity to impossible precision!</p>
                `;
                return;
            }
        }

        this.updateStats();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    reverseTime() {
        if (!this.isRunning || this.history.length === 0) {
            this.$('#result').innerHTML = `
                <p style="color: #ef4444;">Start the simulation first to build up history!</p>
            `;
            return;
        }

        this.isReversed = true;
        this.$('#time-direction').textContent = 'Reversed';
        this.$('#time-arrow').classList.add('reversed');

        this.particles.forEach(p => {
            p.vx *= -1;
            p.vy *= -1;
        });

        this.$('#result').innerHTML = `
            <p style="color: var(--accent);"><strong>Time reversed!</strong></p>
            <p>Watching entropy decrease - impossible in practice!</p>
            <p>Microscopic laws allow this, but statistics make it virtually impossible.</p>
        `;
    }

    updateStats() {
        const midpoint = 150;
        let leftCount = 0;
        let rightCount = 0;

        this.particles.forEach(p => {
            if (p.x < midpoint) leftCount++;
            else rightCount++;
        });

        this.$('#left-count').textContent = leftCount;
        this.$('#right-count').textContent = rightCount;

        const imbalance = Math.abs(leftCount - rightCount);
        const maxImbalance = this.particles.length;
        const entropy = ((maxImbalance - imbalance) / maxImbalance) * 100;

        this.$('#entropy-bar').style.width = entropy + '%';

        if (entropy < 30) {
            this.$('#entropy-value').textContent = 'Low';
            this.$('#macro-status').textContent = 'Entropy Low';
            this.$('#macro-status').className = 'law-status reversible';
        } else if (entropy < 70) {
            this.$('#entropy-value').textContent = 'Medium';
            this.$('#macro-status').textContent = 'Entropy Increasing';
            this.$('#macro-status').className = 'law-status';
            this.$('#macro-status').style.color = '#f59e0b';
        } else {
            this.$('#entropy-value').textContent = 'High';
            this.$('#macro-status').textContent = 'Maximum Entropy';
            this.$('#macro-status').className = 'law-status irreversible';
        }
    }

    reset() {
        cancelAnimationFrame(this.animationId);
        this.isRunning = false;
        this.isReversed = false;
        this.$('#time-direction').textContent = 'Forward';
        this.$('#time-arrow').classList.remove('reversed');

        this.initParticles();

        this.$('#result').innerHTML = `
            <p>All particles start on the left. Watch them spread out (entropy increases).</p>
            <p>Then reverse time - microscopically legal, but practically impossible!</p>
        `;
    }

    cleanup() {
        cancelAnimationFrame(this.animationId);
    }
}

customElements.define('loschmidt-simulator', LoschmidtSimulator);

export { LoschmidtSimulator };
