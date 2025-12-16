/**
 * Eligible Bachelor Paradox Simulator
 * Why do all the good partners seem taken?
 */
import { SimulatorBase } from '../simulator-base.js';

class BachelorSimulator extends SimulatorBase {
    constructor() {
        super();
        this.animationInterval = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .dating-pool {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin: 1.5rem 0;
                    flex-wrap: wrap;
                }

                .pool-section {
                    text-align: center;
                    min-width: 150px;
                }

                .pool-icons {
                    font-size: 2rem;
                    min-height: 3rem;
                    line-height: 1.5;
                    transition: all 0.3s ease;
                }

                .pool-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.5rem;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0.75rem;
                    margin: 1rem 0;
                }

                .stat-box {
                    background: var(--card, #1e293b);
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .stat-label {
                    font-size: 0.625rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .quality-bar {
                    margin: 1rem 0;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                .bar-container {
                    height: 20px;
                    background: var(--card, #1e293b);
                    border-radius: 10px;
                    overflow: hidden;
                    display: flex;
                }

                .bar-taken {
                    background: #22c55e;
                    transition: width 0.5s ease;
                }

                .bar-remaining {
                    background: #ef4444;
                    transition: width 0.5s ease;
                }

                .bar-labels {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    margin-top: 0.5rem;
                }

                .bar-labels span:first-child {
                    color: #22c55e;
                }

                .bar-labels span:last-child {
                    color: #ef4444;
                }
            </style>

            <h4>Dating Market Simulator</h4>

            <div class="controls">
                <button id="run-btn">Run Simulation</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="dating-pool">
                <div class="pool-section">
                    <div class="pool-icons" id="bach-pool">&#x1F464;&#x1F464;&#x1F464;&#x1F464;&#x1F464;</div>
                    <div class="pool-label">Dating Pool</div>
                </div>
                <div class="pool-section">
                    <div class="pool-icons" id="bach-taken">&#x1F491;&#x1F491;&#x1F491;</div>
                    <div class="pool-label">Paired Off</div>
                </div>
            </div>

            <div class="quality-bar">
                <div style="font-size: 0.75rem; color: var(--muted); margin-bottom: 0.5rem;">Average Quality in Pool</div>
                <div class="bar-container">
                    <div class="bar-taken" id="quality-taken" style="width: 60%;"></div>
                    <div class="bar-remaining" id="quality-remaining" style="width: 40%;"></div>
                </div>
                <div class="bar-labels">
                    <span>Best matches paired</span>
                    <span>Harder to match</span>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="stat-remaining">8</div>
                    <div class="stat-label">Still Looking</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="stat-paired">0</div>
                    <div class="stat-label">Paired</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="stat-quality">100%</div>
                    <div class="stat-label">Pool Quality</div>
                </div>
            </div>

            <div class="result" id="bach-result">
                <p>Good partners get selected quickly, leaving the pool with disproportionately difficult matches.</p>
            </div>

            <div class="insight">
                It's not your imagination - the stable marriage problem mathematically guarantees this outcome. The most compatible people pair off first.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#run-btn').addEventListener('click', () => this.runSimulation());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
    }

    runSimulation() {
        this.reset();
        const pool = this.$('#bach-pool');
        const taken = this.$('#bach-taken');

        pool.textContent = '\u{1F464}'.repeat(8);
        taken.textContent = '';

        let remaining = 8;
        let paired = 0;

        this.animationInterval = setInterval(() => {
            if (remaining > 2) {
                remaining -= 2;
                paired += 2;
                pool.textContent = '\u{1F464}'.repeat(remaining);
                taken.textContent = '\u{1F491}'.repeat(paired / 2);

                const qualityPct = Math.max(20, 100 - (paired * 10));
                this.$('#quality-taken').style.width = (100 - qualityPct) + '%';
                this.$('#quality-remaining').style.width = qualityPct + '%';
                this.$('#stat-remaining').textContent = remaining;
                this.$('#stat-paired').textContent = paired;
                this.$('#stat-quality').textContent = qualityPct + '%';
                this.$('#stat-quality').style.color = qualityPct < 50 ? '#ef4444' : 'var(--primary)';
            } else {
                clearInterval(this.animationInterval);
                pool.textContent = '\u{1F464}\u{1F464}';
                this.$('#stat-remaining').textContent = '2';
                this.$('#stat-quality').textContent = '20%';
                this.$('#stat-quality').style.color = '#ef4444';
                this.$('#bach-result').innerHTML = '<p style="color: var(--accent);">The best matches paired quickly. What remains in the pool are the harder-to-match individuals. It\'s not you - it\'s mathematics!</p>';
            }
        }, 600);
    }

    reset() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
        this.$('#bach-pool').textContent = '\u{1F464}'.repeat(5);
        this.$('#bach-taken').textContent = '\u{1F491}'.repeat(3);
        this.$('#quality-taken').style.width = '60%';
        this.$('#quality-remaining').style.width = '40%';
        this.$('#stat-remaining').textContent = '8';
        this.$('#stat-paired').textContent = '0';
        this.$('#stat-quality').textContent = '100%';
        this.$('#stat-quality').style.color = 'var(--primary)';
        this.$('#bach-result').innerHTML = '<p>Good partners get selected quickly, leaving the pool with disproportionately difficult matches.</p>';
    }

    cleanup() {
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
        }
    }
}

customElements.define('bachelor-simulator', BachelorSimulator);

export { BachelorSimulator };
