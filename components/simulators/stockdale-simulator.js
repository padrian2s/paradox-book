/**
 * Stockdale Paradox Simulator
 * Demonstrates the balance between faith and confronting brutal reality
 */
import { SimulatorBase } from '../simulator-base.js';

class StockdaleSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stockdale-viz {
                    padding: 2rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .mindset-spectrum {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .spectrum-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    width: 80px;
                }

                .spectrum-label.right {
                    text-align: right;
                }

                .spectrum-bar {
                    flex: 1;
                    height: 40px;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    position: relative;
                    display: flex;
                    overflow: hidden;
                }

                .spectrum-zone {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.65rem;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .spectrum-zone.pessimist {
                    background: rgba(239, 68, 68, 0.3);
                    color: #fca5a5;
                }

                .spectrum-zone.optimal {
                    background: rgba(34, 197, 94, 0.3);
                    color: #86efac;
                }

                .spectrum-zone.optimist {
                    background: rgba(59, 130, 246, 0.3);
                    color: #93c5fd;
                }

                .spectrum-marker {
                    position: absolute;
                    top: -5px;
                    width: 10px;
                    height: 50px;
                    background: var(--accent, #f59e0b);
                    border-radius: 2px;
                    transform: translateX(-50%);
                    transition: left 0.3s ease;
                    z-index: 10;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
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

                @media (max-width: 768px) {
                    .stockdale-viz {
                        padding: 1rem;
                    }

                    .mindset-spectrum {
                        flex-direction: column;
                        gap: 0.5rem;
                    }

                    .spectrum-label {
                        width: 100%;
                        text-align: center;
                    }

                    .spectrum-label.right {
                        text-align: center;
                        order: 2;
                    }

                    .spectrum-bar {
                        width: 100%;
                        height: 30px;
                    }

                    .spectrum-zone {
                        font-size: 0.5rem;
                    }

                    .stats-grid {
                        gap: 0.5rem;
                    }

                    .stat-box {
                        padding: 0.5rem;
                    }

                    .stat-value {
                        font-size: 1.25rem;
                    }
                }
            </style>

            <h4>Survival Strategy Simulator</h4>

            <div class="stockdale-viz">
                <div class="mindset-spectrum">
                    <div class="spectrum-label left">Pure Pessimist</div>
                    <div class="spectrum-bar">
                        <div class="spectrum-marker" id="stockdale-marker" style="left: 50%"></div>
                        <div class="spectrum-zone pessimist">Gives up</div>
                        <div class="spectrum-zone optimal">Stockdale Zone</div>
                        <div class="spectrum-zone optimist">Denial</div>
                    </div>
                    <div class="spectrum-label right">Pure Optimist</div>
                </div>

                <div class="controls" style="margin-top: 1.5rem;">
                    <div class="control-group">
                        <label>Faith in Success: <span id="faith-val">50</span>%</label>
                        <input type="range" id="faith-slider" min="0" max="100" value="50">
                    </div>
                    <div class="control-group">
                        <label>Confronting Reality: <span id="reality-val">50</span>%</label>
                        <input type="range" id="reality-slider" min="0" max="100" value="50">
                    </div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="survival-chance">50%</div>
                    <div class="stat-label">Survival Chance</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="mindset-type">Balanced</div>
                    <div class="stat-label">Mindset Type</div>
                </div>
            </div>

            <div class="result">
                <p id="stockdale-result">Adjust the sliders to find the optimal mindset balance...</p>
            </div>

            <div class="insight">
                Admiral Stockdale survived 7+ years as a POW. He noticed optimists ("We'll be out by Christmas") broke when dates passed. Realists who confronted facts while maintaining long-term faith survived.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#faith-slider').addEventListener('input', () => this.updateStockdale());
        this.$('#reality-slider').addEventListener('input', () => this.updateStockdale());

        this.updateStockdale();
    }

    updateStockdale() {
        const faith = parseInt(this.$('#faith-slider').value);
        const reality = parseInt(this.$('#reality-slider').value);

        this.$('#faith-val').textContent = faith;
        this.$('#reality-val').textContent = reality;

        const position = faith;
        this.$('#stockdale-marker').style.left = position + '%';

        let survival = 0;
        let mindset = '';

        if (faith < 30 && reality > 70) {
            survival = 20;
            mindset = 'Pessimist';
        } else if (faith > 70 && reality < 30) {
            survival = 30;
            mindset = 'Delusional Optimist';
        } else if (faith > 50 && reality > 50) {
            survival = Math.min(95, 50 + (faith + reality - 100) / 2);
            mindset = 'Stockdale Zone!';
        } else {
            const score = (faith + reality) / 2;
            survival = 40 + score / 5;
            mindset = 'Unbalanced';
        }

        this.$('#survival-chance').textContent = Math.round(survival) + '%';
        this.$('#mindset-type').textContent = mindset;

        let result = '';
        if (mindset === 'Stockdale Zone!') {
            result = '<span style="color: #22c55e;">OPTIMAL!</span> You believe you will prevail AND confront brutal facts. This is the survivor\'s mindset.';
        } else if (mindset === 'Pessimist') {
            result = 'You see reality but have no hope. Without faith in eventual success, you may give up too soon.';
        } else if (mindset === 'Delusional Optimist') {
            result = 'Pure optimism without reality. "We\'ll be out by Christmas!" When Christmas passes, your spirit breaks.';
        } else {
            result = 'Find balance: high faith in ultimate success + honest confrontation of current problems.';
        }
        this.$('#stockdale-result').innerHTML = result;
    }
}

customElements.define('stockdale-simulator', StockdaleSimulator);

export { StockdaleSimulator };
