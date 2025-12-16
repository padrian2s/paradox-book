/**
 * Heat Death Paradox Simulator
 * If the universe were infinitely old, it would have reached maximum entropy
 */
import { SimulatorBase } from '../simulator-base.js';

class HeatDeathSimulator extends SimulatorBase {
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

                .model-buttons button {
                    flex: 1;
                }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Universe Age Model</h4>

            <div class="controls model-buttons">
                <button id="finite-btn">Finite Age (13.8 Gyr)</button>
                <button id="infinite-btn">Infinite Age</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="entropy">45%</div>
                    <div class="stat-label">Entropy</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="stars">Yes</div>
                    <div class="stat-label">Stars?</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Finite age explains why we're not at heat death yet.</p>
            </div>

            <div class="insight">
                The fact that stars still burn, structures still form, and we exist to observe - all prove the universe had a beginning. An eternal universe would be cold, dark, and dead.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#finite-btn').addEventListener('click', () => this.setModel('finite'));
        this.$('#infinite-btn').addEventListener('click', () => this.setModel('infinite'));
    }

    setModel(model) {
        if (model === 'finite') {
            this.$('#entropy').textContent = '45%';
            this.$('#entropy').style.color = 'var(--accent, #f59e0b)';
            this.$('#stars').textContent = 'Yes';
            this.$('#stars').style.color = '#22c55e';
            this.$('#result').innerHTML = `
                <p>Universe is 13.8 billion years old - not enough time to reach maximum entropy.</p>
                <p>Stars still burn, galaxies still form, life can exist!</p>
            `;
        } else {
            this.$('#entropy').textContent = '100%';
            this.$('#entropy').style.color = '#ef4444';
            this.$('#stars').textContent = 'No';
            this.$('#stars').style.color = '#ef4444';
            this.$('#result').innerHTML = `
                <p style="color: #ef4444;">HEAT DEATH: Maximum entropy reached.</p>
                <p>No stars, no planets, no temperature differences, no life.</p>
                <p>Just a cold, dark, uniform void for eternity.</p>
                <p><strong>But we exist - so the universe cannot be infinitely old!</strong></p>
            `;
        }
    }
}

customElements.define('heat-death-simulator', HeatDeathSimulator);

export { HeatDeathSimulator };
