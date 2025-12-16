/**
 * Low Birth-Weight Paradox Simulator
 * Low birth weight babies of smokers have better survival than non-smokers
 */
import { SimulatorBase } from '../simulator-base.js';

class LowBirthWeightSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

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
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .higher { color: #22c55e; }
                .lower { color: #ef4444; }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Birth Weight Analysis</h4>

            <div class="controls">
                <button id="smoker-btn">Smoker's Baby (Low Weight)</button>
                <button id="nonsmoker-btn">Non-Smoker's Baby (Low Weight)</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="weight">Low</div>
                    <div class="stat-label">Birth Weight</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="survival">-</div>
                    <div class="stat-label">Survival Rate</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Select a scenario to compare...</p>
            </div>

            <div class="insight">
                This is a confounding variable paradox. Smoking commonly causes low birth weight (but baby is otherwise healthy). Other causes of low birth weight (genetic issues, severe illness) are more dangerous. Comparing within the "low weight" group mixes different causes.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#smoker-btn').addEventListener('click', () => this.setScenario('smoker'));
        this.$('#nonsmoker-btn').addEventListener('click', () => this.setScenario('nonsmoker'));
    }

    setScenario(scenario) {
        const survivalEl = this.$('#survival');

        if (scenario === 'smoker') {
            survivalEl.textContent = '95%';
            survivalEl.className = 'stat-value higher';
            this.$('#result').innerHTML = `
                <p><strong>Smoker's low-weight baby:</strong> 95% survival rate</p>
                <p>The baby is small primarily because of smoking. Otherwise healthy.</p>
                <p>Low weight is the main issue, and it's a "simple" cause.</p>
            `;
        } else {
            survivalEl.textContent = '85%';
            survivalEl.className = 'stat-value lower';
            this.$('#result').innerHTML = `
                <p><strong>Non-smoker's low-weight baby:</strong> 85% survival rate</p>
                <p style="color: var(--accent);">PARADOX: Worse survival despite no smoking!</p>
                <p>If a non-smoker's baby is underweight, something else is wrong - genetic defects, placental problems, severe maternal illness. These underlying causes are more dangerous than smoking-induced low weight.</p>
            `;
        }
    }
}

customElements.define('low-birth-weight-simulator', LowBirthWeightSimulator);

export { LowBirthWeightSimulator };
