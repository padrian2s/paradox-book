/**
 * Clothesline Paradox Simulator
 * Using a clothesline reduces GDP even though it's more efficient
 */
import { SimulatorBase } from '../simulator-base.js';

class ClotheslineSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

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
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .stat-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .good { color: #22c55e; }
                .bad { color: #ef4444; }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Economic Impact</h4>

            <div class="controls">
                <button id="dryer-btn">Use Electric Dryer</button>
                <button id="line-btn">Use Clothesline</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="energy">-</div>
                    <div class="stat-label">Energy Used</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="gdp">-</div>
                    <div class="stat-label">GDP Impact</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="env">-</div>
                    <div class="stat-label">Environment</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Compare the economic measurement...</p>
            </div>

            <div class="insight">
                GDP measures activity, not well-being. Sustainable behavior can look like economic decline. A society that pollutes less "produces" less by GDP.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#dryer-btn').addEventListener('click', () => this.setMethod('dryer'));
        this.$('#line-btn').addEventListener('click', () => this.setMethod('line'));
    }

    setMethod(method) {
        const energyEl = this.$('#energy');
        const gdpEl = this.$('#gdp');
        const envEl = this.$('#env');

        if (method === 'dryer') {
            energyEl.textContent = '3 kWh';
            energyEl.className = 'stat-value bad';
            gdpEl.textContent = '+$0.50';
            gdpEl.className = 'stat-value good';
            envEl.textContent = '1.5 kg CO2';
            envEl.className = 'stat-value bad';
            this.$('#result').innerHTML = `
                <p>Electric dryer: Uses electricity, emits CO2, but <strong>increases GDP!</strong></p>
                <p>You're paying for energy, supporting power companies, "contributing to the economy."</p>
            `;
        } else {
            energyEl.textContent = '0 kWh';
            energyEl.className = 'stat-value good';
            gdpEl.textContent = '$0.00';
            gdpEl.className = 'stat-value bad';
            envEl.textContent = '0 kg CO2';
            envEl.className = 'stat-value good';
            this.$('#result').innerHTML = `
                <p>Clothesline: Free solar energy, zero emissions, but <strong>reduces GDP!</strong></p>
                <p>No transaction occurred. By economic metrics, you're "less productive."</p>
                <p style="color: var(--accent);">THE PARADOX: The better choice looks worse!</p>
            `;
        }
    }
}

customElements.define('clothesline-simulator', ClotheslineSimulator);

export { ClotheslineSimulator };
