/**
 * Paradox of Meritocracy Simulator
 * Organizations that embrace meritocracy often become less fair
 */
import { SimulatorBase } from '../simulator-base.js';

class MeritocracySimulator extends SimulatorBase {
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

                .gap-high { color: #ef4444; }
                .gap-medium { color: #f59e0b; }
                .gap-low { color: #22c55e; }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Organizational Bias Simulator</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Organization Type:</label>
                    <select id="merit-type">
                        <option value="explicit">Explicitly Meritocratic</option>
                        <option value="neutral">No Stated Values</option>
                        <option value="aware">Bias-Aware Training</option>
                    </select>
                </div>
                <button id="run-btn">Run Bonus Allocation</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="male-bonus">$0</div>
                    <div class="stat-label">Avg Male Bonus</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="female-bonus">$0</div>
                    <div class="stat-label">Avg Female Bonus</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="gap">0%</div>
                    <div class="stat-label">Gender Gap</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Select organization type and run simulation...</p>
            </div>

            <div class="insight">
                Research shows managers in "meritocratic" companies give larger bonuses to men, assuming any gap must reflect merit. Awareness of bias reduces it.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#run-btn').addEventListener('click', () => this.runSimulation());
        this.$('#merit-type').addEventListener('change', () => this.reset());
    }

    runSimulation() {
        const type = this.$('#merit-type').value;
        let maleBonus, femaleBonus, explanation;

        switch(type) {
            case 'explicit':
                maleBonus = 12000 + Math.random() * 2000;
                femaleBonus = 9000 + Math.random() * 1500;
                explanation = 'PARADOX CONFIRMED: In explicitly meritocratic orgs, managers assume any gap reflects merit differences. Men receive 25% higher bonuses on average.';
                break;
            case 'neutral':
                maleBonus = 10500 + Math.random() * 1500;
                femaleBonus = 9500 + Math.random() * 1500;
                explanation = 'Without meritocracy claims, managers are slightly more careful. Gap is smaller but still exists due to implicit bias.';
                break;
            case 'aware':
                maleBonus = 10000 + Math.random() * 1500;
                femaleBonus = 10000 + Math.random() * 1500;
                explanation = 'Bias-awareness training makes managers question their assumptions. Bonuses are more equitable.';
                break;
        }

        const gap = ((maleBonus - femaleBonus) / maleBonus * 100);

        this.$('#male-bonus').textContent = '$' + maleBonus.toFixed(0);
        this.$('#female-bonus').textContent = '$' + femaleBonus.toFixed(0);
        this.$('#gap').textContent = gap.toFixed(1) + '%';

        const gapEl = this.$('#gap');
        gapEl.className = 'stat-value';
        if (gap > 10) {
            gapEl.classList.add('gap-high');
        } else if (gap > 5) {
            gapEl.classList.add('gap-medium');
        } else {
            gapEl.classList.add('gap-low');
        }

        this.$('#result').innerHTML = '<p>' + explanation + '</p>';
    }

    reset() {
        this.$('#male-bonus').textContent = '$0';
        this.$('#female-bonus').textContent = '$0';
        this.$('#gap').textContent = '0%';
        this.$('#gap').className = 'stat-value';
        this.$('#result').innerHTML = '<p>Click "Run Bonus Allocation" to simulate...</p>';
    }
}

customElements.define('meritocracy-simulator', MeritocracySimulator);

export { MeritocracySimulator };
