/**
 * Paradox of Thrift Simulator
 * Demonstrates how individual savings can paradoxically hurt the collective economy
 */
import { SimulatorBase } from '../simulator-base.js';

class ThriftSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = { gdp: 1000, year: 0, initialGdp: 1000 };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .thrift-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .economy-bar {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .econ-label {
                    width: 80px;
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .econ-bar-fill {
                    height: 24px;
                    background: linear-gradient(90deg, #6366f1, #8b5cf6);
                    border-radius: 0.25rem;
                    transition: width 0.5s ease;
                    min-width: 5px;
                }

                .econ-bar-fill.spending {
                    background: linear-gradient(90deg, #22c55e, #16a34a);
                }

                .econ-bar-fill.savings {
                    background: linear-gradient(90deg, #f59e0b, #d97706);
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
                    color: var(--primary, #6366f1);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                @media (max-width: 600px) {
                    .economy-bar {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.25rem;
                    }
                    .econ-label {
                        width: auto;
                    }
                    .econ-bar-fill {
                        width: 100% !important;
                        max-width: var(--bar-width);
                    }
                }
            </style>

            <h4>Economy Simulation</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Household Savings Rate: <span id="savings-rate-val">20</span>%</label>
                    <input type="range" id="savings-rate" min="0" max="80" value="20">
                </div>
                <button id="simulate-btn">Simulate 10 Years</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="thrift-viz">
                <div class="economy-bar">
                    <div class="econ-label">GDP</div>
                    <div class="econ-bar-fill" id="gdp-bar" style="width: 67%"></div>
                    <span id="gdp-value">$1000B</span>
                </div>
                <div class="economy-bar">
                    <div class="econ-label">Spending</div>
                    <div class="econ-bar-fill spending" id="spending-bar" style="width: 53%"></div>
                    <span id="spending-value">$800B</span>
                </div>
                <div class="economy-bar">
                    <div class="econ-label">Savings</div>
                    <div class="econ-bar-fill savings" id="savings-bar" style="width: 13%"></div>
                    <span id="savings-value">$200B</span>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="thrift-year">0</div>
                    <div class="stat-label">Year</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="gdp-change">0%</div>
                    <div class="stat-label">GDP Change</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="total-savings">$200B</div>
                    <div class="stat-label">Total Savings</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="paradox-active">No</div>
                    <div class="stat-label">Paradox Active</div>
                </div>
            </div>

            <div class="result">
                <p id="thrift-result">Increase the savings rate and simulate to see how individual thrift can hurt the collective economy.</p>
            </div>

            <div class="insight">
                Keynes argued this is why government spending is needed during recessions - someone must spend when everyone else is saving.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#savings-rate').addEventListener('input', () => this.updateDisplay());
        this.$('#simulate-btn').addEventListener('click', () => this.simulate());
        this.$('#reset-btn').addEventListener('click', () => this.reset());

        this.updateDisplay();
    }

    updateDisplay() {
        const rate = this.$('#savings-rate').value;
        this.$('#savings-rate-val').textContent = rate;
    }

    simulate() {
        const savingsRate = parseInt(this.$('#savings-rate').value) / 100;
        let gdp = this.state.gdp;

        for (let i = 0; i < 10; i++) {
            this.state.year++;
            const growthRate = 0.03 - (savingsRate - 0.2) * 0.15;
            gdp = gdp * (1 + growthRate);
        }

        this.state.gdp = Math.round(gdp);
        const spending = Math.round(gdp * (1 - savingsRate));
        const savings = Math.round(gdp * savingsRate);

        this.$('#gdp-bar').style.width = Math.min(100, (gdp / 1500) * 100) + '%';
        this.$('#gdp-value').textContent = '$' + this.state.gdp + 'B';
        this.$('#spending-bar').style.width = Math.min(100, (spending / 1500) * 100) + '%';
        this.$('#spending-value').textContent = '$' + spending + 'B';
        this.$('#savings-bar').style.width = Math.min(50, (savings / 1500) * 100) + '%';
        this.$('#savings-value').textContent = '$' + savings + 'B';

        this.$('#thrift-year').textContent = this.state.year;
        const gdpChange = ((this.state.gdp / this.state.initialGdp - 1) * 100).toFixed(1);
        this.$('#gdp-change').textContent = (gdpChange >= 0 ? '+' : '') + gdpChange + '%';
        this.$('#total-savings').textContent = '$' + savings + 'B';

        const paradoxActive = savingsRate > 0.3 && this.state.gdp < this.state.initialGdp;
        this.$('#paradox-active').textContent = paradoxActive ? 'Yes!' : 'No';
        this.$('#paradox-active').style.color = paradoxActive ? '#ef4444' : '#22c55e';

        if (paradoxActive) {
            this.$('#thrift-result').innerHTML =
                '<strong style="color: #ef4444;">PARADOX IN EFFECT!</strong> Everyone saved more, but GDP fell, so total savings are actually LOWER than if people had spent normally!';
        } else if (savingsRate > 0.5) {
            this.$('#thrift-result').textContent =
                'Very high savings are depressing the economy. Keep simulating to see the full effect.';
        } else {
            this.$('#thrift-result').textContent =
                'Economy is balanced. Try increasing savings above 50% to trigger the paradox.';
        }

        this.dispatchSimulatorEvent('thrift-simulated', {
            gdp: this.state.gdp,
            year: this.state.year,
            savingsRate
        });
    }

    reset() {
        this.state = { gdp: 1000, year: 0, initialGdp: 1000 };
        this.$('#gdp-bar').style.width = '67%';
        this.$('#gdp-value').textContent = '$1000B';
        this.$('#spending-bar').style.width = '53%';
        this.$('#spending-value').textContent = '$800B';
        this.$('#savings-bar').style.width = '13%';
        this.$('#savings-value').textContent = '$200B';
        this.$('#thrift-year').textContent = '0';
        this.$('#gdp-change').textContent = '0%';
        this.$('#total-savings').textContent = '$200B';
        this.$('#paradox-active').textContent = 'No';
        this.$('#paradox-active').style.color = '#22c55e';
        this.$('#thrift-result').textContent = 'Increase the savings rate and simulate to see how individual thrift can hurt the collective economy.';
    }
}

customElements.define('thrift-simulator', ThriftSimulator);

export { ThriftSimulator };
