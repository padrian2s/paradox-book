/**
 * Ross-Littlewood Paradox Simulator
 * Demonstrates the infinite ball experiment: add 10 balls, remove 1, repeat infinitely
 */
import { SimulatorBase } from '../simulator-base.js';

class RossSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = { step: 0, added: 0, removed: 0 };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .ross-viz {
                    display: flex;
                    justify-content: space-around;
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                    gap: 2rem;
                }

                .vase-container {
                    text-align: center;
                }

                .vase {
                    width: 120px;
                    height: 160px;
                    background: linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.2) 30%, rgba(59, 130, 246, 0.4) 100%);
                    border: 3px solid #3b82f6;
                    border-radius: 0 0 40% 40%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto;
                }

                .ball-count {
                    font-size: 2rem;
                    font-weight: bold;
                    color: #3b82f6;
                }

                .step-display {
                    margin-top: 1rem;
                }

                .step-label {
                    font-weight: bold;
                }

                .step-action {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .removed-balls {
                    text-align: center;
                }

                .removed-label {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .removed-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px;
                    max-width: 200px;
                    justify-content: center;
                }

                .removed-ball {
                    width: 24px;
                    height: 24px;
                    background: #ef4444;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.625rem;
                    color: white;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
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

            <h4>Infinite Ball Experiment</h4>

            <div class="ross-viz">
                <div class="vase-container">
                    <div class="vase">
                        <div class="ball-count" id="ball-count">0</div>
                    </div>
                    <div class="step-display">
                        <div class="step-label">Step <span id="ross-step">0</span></div>
                        <div class="step-action" id="step-action">Click to begin...</div>
                    </div>
                </div>
                <div class="removed-balls">
                    <div class="removed-label">Removed Balls</div>
                    <div class="removed-list" id="removed-list"></div>
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="btn-step">Next Step</button>
                <button id="btn-auto">Auto (10 steps)</button>
                <button id="btn-infinity">Skip to Infinity</button>
                <button id="btn-reset">Reset</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="ross-added">0</div>
                    <div class="stat-label">Total Added</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="ross-removed">0</div>
                    <div class="stat-label">Total Removed</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="ross-in-vase">0</div>
                    <div class="stat-label">In Vase</div>
                </div>
            </div>

            <div class="result">
                <p id="ross-result">At step n, we add balls 10n-9 to 10n, and remove ball n. Every ball gets removed eventually!</p>
            </div>

            <div class="insight">
                Ball 1 is removed at step 1. Ball 2 at step 2. Ball k at step k. For ANY ball number k, it's removed at step k. So at infinity, all balls are gone!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#btn-step').addEventListener('click', () => this.rossStep());
        this.$('#btn-auto').addEventListener('click', () => this.rossAuto());
        this.$('#btn-infinity').addEventListener('click', () => this.rossInfinity());
        this.$('#btn-reset').addEventListener('click', () => this.resetRoss());
    }

    rossStep() {
        this.state.step++;
        const n = this.state.step;

        this.state.added += 10;
        this.state.removed++;

        const inVase = this.state.added - this.state.removed;

        this.$('#ross-step').textContent = n;
        this.$('#ball-count').textContent = inVase;
        this.$('#step-action').textContent = `Added balls ${10*n-9}-${10*n}, removed ball ${n}`;

        const removedList = this.$('#removed-list');
        if (n <= 20) {
            const ball = document.createElement('div');
            ball.className = 'removed-ball';
            ball.textContent = n;
            removedList.appendChild(ball);
        }

        this.updateRossStats();
    }

    rossAuto() {
        for (let i = 0; i < 10; i++) {
            this.rossStep();
        }
    }

    rossInfinity() {
        this.$('#ross-step').textContent = '\u221E';
        this.$('#ball-count').textContent = '0';
        this.$('#step-action').textContent = 'All balls have been removed!';
        this.$('#ross-added').textContent = '\u221E';
        this.$('#ross-removed').textContent = '\u221E';
        this.$('#ross-in-vase').textContent = '0';

        this.$('#ross-result').innerHTML =
            '<strong style="color: #f59e0b;">AT INFINITY: ZERO BALLS!</strong> Every ball number k was removed at step k. Ball 1 at step 1, ball 2 at step 2... No ball survives!';
    }

    updateRossStats() {
        this.$('#ross-added').textContent = this.state.added;
        this.$('#ross-removed').textContent = this.state.removed;
        this.$('#ross-in-vase').textContent = this.state.added - this.state.removed;
    }

    resetRoss() {
        this.state = { step: 0, added: 0, removed: 0 };
        this.$('#ross-step').textContent = '0';
        this.$('#ball-count').textContent = '0';
        this.$('#step-action').textContent = 'Click to begin...';
        this.$('#removed-list').innerHTML = '';
        this.updateRossStats();
        this.$('#ross-result').textContent = 'At step n, we add balls 10n-9 to 10n, and remove ball n. Every ball gets removed eventually!';
    }
}

customElements.define('ross-simulator', RossSimulator);

export { RossSimulator };
