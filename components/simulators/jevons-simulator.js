/**
 * Jevons Paradox Simulator
 * Demonstrates how increased efficiency can lead to increased total consumption
 */
import { SimulatorBase } from '../simulator-base.js';

class JevonsSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .bar-chart {
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                    height: 150px;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .bar-group {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    flex: 1;
                }

                .bar {
                    width: 40px;
                    background: linear-gradient(180deg, #6366f1, #4f46e5);
                    border-radius: 4px 4px 0 0;
                    transition: height 0.5s ease;
                    min-height: 4px;
                }

                .bar.second {
                    background: linear-gradient(180deg, #8b5cf6, #7c3aed);
                }

                .bar-label {
                    font-size: 0.7rem;
                    color: var(--muted, #94a3b8);
                    text-align: center;
                    margin-top: 0.5rem;
                    line-height: 1.2;
                }

                .result-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0.5rem 0;
                }

                .result-row:first-child {
                    border-bottom: 1px solid rgba(148, 163, 184, 0.2);
                }

                .savings-label {
                    color: var(--muted, #94a3b8);
                }

                #expected {
                    color: #22c55e;
                    font-weight: bold;
                }

                #actual {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                @media (max-width: 600px) {
                    .bar-chart {
                        height: 120px;
                        padding: 0.75rem;
                    }

                    .bar {
                        width: 30px;
                    }

                    .bar-label {
                        font-size: 0.6rem;
                    }
                }
            </style>

            <h4>Fuel Efficiency Simulator</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Initial MPG</label>
                    <input type="number" id="mpg1" value="20" min="10" max="50">
                </div>
                <div class="control-group">
                    <label>Improved MPG</label>
                    <input type="number" id="mpg2" value="40" min="15" max="100">
                </div>
                <div class="control-group">
                    <label>Rebound Effect: <span id="rebound-val">120%</span></label>
                    <input type="range" id="rebound" min="0" max="200" value="120">
                </div>
                <button id="calculate-btn">Calculate Impact</button>
            </div>

            <div class="bar-chart">
                <div class="bar-group">
                    <div class="bar" id="bar1" style="height: 50%;"></div>
                    <div class="bar-label">Miles Driven<br>(Before)</div>
                </div>
                <div class="bar-group">
                    <div class="bar second" id="bar2" style="height: 60%;"></div>
                    <div class="bar-label">Miles Driven<br>(After)</div>
                </div>
                <div class="bar-group">
                    <div class="bar" id="bar3" style="height: 50%;"></div>
                    <div class="bar-label">Fuel Used<br>(Before)</div>
                </div>
                <div class="bar-group">
                    <div class="bar second" id="bar4" style="height: 55%;"></div>
                    <div class="bar-label">Fuel Used<br>(After)</div>
                </div>
            </div>

            <div class="result">
                <div class="result-row">
                    <span class="savings-label">Expected Fuel Savings:</span>
                    <span id="expected">-50%</span>
                </div>
                <div class="result-row">
                    <span class="savings-label">Actual Fuel Change:</span>
                    <span class="result-value" id="actual">+10%</span>
                </div>
            </div>

            <div class="insight">
                When driving costs half as much per mile, people drive more. Energy efficiency improvements often don't reduce consumption as expected.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#rebound').addEventListener('input', () => this.updateReboundLabel());
        this.$('#calculate-btn').addEventListener('click', () => this.calculate());
        this.$('#mpg1').addEventListener('input', () => this.calculate());
        this.$('#mpg2').addEventListener('input', () => this.calculate());

        this.calculate();
    }

    updateReboundLabel() {
        const rebound = this.$('#rebound').value;
        this.$('#rebound-val').textContent = rebound + '%';
    }

    calculate() {
        const mpg1 = parseFloat(this.$('#mpg1').value) || 20;
        const mpg2 = parseFloat(this.$('#mpg2').value) || 40;
        const rebound = parseFloat(this.$('#rebound').value) / 100;

        this.$('#rebound-val').textContent = (rebound * 100) + '%';

        const baseMiles = 12000;
        const efficiencyGain = (mpg2 - mpg1) / mpg1;

        const newMiles = baseMiles * (1 + efficiencyGain * rebound);

        const baseFuel = baseMiles / mpg1;
        const newFuel = newMiles / mpg2;

        const expectedSaving = (1 - mpg1 / mpg2) * 100;
        const actualChange = (newFuel / baseFuel - 1) * 100;

        const maxMiles = Math.max(baseMiles, newMiles);
        const maxFuel = Math.max(baseFuel, newFuel);

        this.$('#bar1').style.height = (baseMiles / maxMiles * 120) + 'px';
        this.$('#bar2').style.height = (newMiles / maxMiles * 120) + 'px';
        this.$('#bar3').style.height = (baseFuel / maxFuel * 120) + 'px';
        this.$('#bar4').style.height = (newFuel / maxFuel * 120) + 'px';

        this.$('#expected').textContent = '-' + expectedSaving.toFixed(0) + '%';
        this.$('#expected').style.color = '#22c55e';

        const actualEl = this.$('#actual');
        actualEl.textContent = (actualChange >= 0 ? '+' : '') + actualChange.toFixed(0) + '%';
        actualEl.style.color = actualChange >= 0 ? '#ef4444' : '#22c55e';
    }
}

customElements.define('jevons-simulator', JevonsSimulator);

export { JevonsSimulator };
