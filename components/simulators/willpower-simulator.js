/**
 * Willpower Paradox Simulator
 * People with more self-control use it less - they structure life to avoid temptation
 */
import { SimulatorBase } from '../simulator-base.js';

class WillpowerSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .strategy-buttons {
                    display: flex;
                    gap: 0.5rem;
                }

                .strategy-buttons button {
                    flex: 1;
                }

                .strategy-buttons button.active {
                    background: var(--accent, #f59e0b);
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin: 1.5rem 0;
                }

                .stat-box {
                    background: var(--card, #1e293b);
                    padding: 1.25rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .stat-value {
                    font-size: 1.75rem;
                    font-weight: bold;
                    color: var(--text, #e2e8f0);
                }

                .stat-value.good {
                    color: #22c55e;
                }

                .stat-value.bad {
                    color: #ef4444;
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .energy-meter {
                    margin: 1rem 0;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                .energy-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .energy-bar {
                    height: 24px;
                    background: var(--card, #1e293b);
                    border-radius: 12px;
                    overflow: hidden;
                    position: relative;
                }

                .energy-fill {
                    height: 100%;
                    transition: width 0.5s;
                    border-radius: 12px;
                }

                .energy-fill.full {
                    background: linear-gradient(90deg, #22c55e, #3b82f6);
                }

                .energy-fill.depleted {
                    background: linear-gradient(90deg, #ef4444, #f59e0b);
                }

                .temptation-icons {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    font-size: 2rem;
                    margin: 1rem 0;
                    opacity: 0.3;
                    transition: opacity 0.3s;
                }

                .temptation-icons.active {
                    opacity: 1;
                }

                @media (max-width: 600px) {
                    .strategy-buttons {
                        flex-direction: column;
                    }
                }
            </style>

            <h4>Self-Control Strategy Test</h4>

            <div class="controls strategy-buttons">
                <button id="resist-btn">Rely on Willpower</button>
                <button id="avoid-btn">Avoid Temptation</button>
            </div>

            <div class="temptation-icons" id="temptations">
                <span>&#x1F36B;</span>
                <span>&#x1F4F1;</span>
                <span>&#x1F37A;</span>
                <span>&#x1F4FA;</span>
                <span>&#x1F6D2;</span>
            </div>

            <div class="energy-meter">
                <div class="energy-label">Willpower Energy Reserve</div>
                <div class="energy-bar">
                    <div class="energy-fill full" id="energy-fill" style="width: 100%;"></div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="willpower-used">-</div>
                    <div class="stat-label">Willpower Expended</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="success-rate">-</div>
                    <div class="stat-label">Success Rate</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Choose your self-control strategy...</p>
            </div>

            <div class="insight">
                Research shows willpower is a limited resource. The most disciplined people succeed not by resisting more, but by designing their environment to need less resistance.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#resist-btn').addEventListener('click', () => this.setStrategy('resist'));
        this.$('#avoid-btn').addEventListener('click', () => this.setStrategy('avoid'));
    }

    setStrategy(strategy) {
        const energyFill = this.$('#energy-fill');
        const temptations = this.$('#temptations');

        this.$$('.strategy-buttons button').forEach(btn => btn.classList.remove('active'));
        this.$(`#${strategy}-btn`).classList.add('active');

        if (strategy === 'resist') {
            temptations.classList.add('active');
            energyFill.style.width = '20%';
            energyFill.classList.remove('full');
            energyFill.classList.add('depleted');

            this.$('#willpower-used').textContent = 'High';
            this.$('#willpower-used').className = 'stat-value bad';
            this.$('#success-rate').textContent = '60%';
            this.$('#success-rate').className = 'stat-value bad';

            this.$('#result').innerHTML = `
                <p style="color: #ef4444;"><strong>Willpower Depletion Strategy</strong></p>
                <p>Constantly fighting temptation depletes your willpower reserve.</p>
                <p>By evening, you're exhausted - that's when you give in.</p>
                <p style="color: var(--accent);">Studies show each decision erodes self-control for the next one.</p>
            `;
        } else {
            temptations.classList.remove('active');
            energyFill.style.width = '90%';
            energyFill.classList.add('full');
            energyFill.classList.remove('depleted');

            this.$('#willpower-used').textContent = 'Low';
            this.$('#willpower-used').className = 'stat-value good';
            this.$('#success-rate').textContent = '90%';
            this.$('#success-rate').className = 'stat-value good';

            this.$('#result').innerHTML = `
                <p style="color: #22c55e;"><strong>Environmental Design Strategy</strong></p>
                <p>No cookies in the house = no willpower needed to resist them!</p>
                <p>Phone in another room = no temptation to check it.</p>
                <p style="color: var(--accent);">The paradox: those with "most willpower" use it least. They design their lives to minimize temptation exposure.</p>
            `;
        }
    }
}

customElements.define('willpower-simulator', WillpowerSimulator);

export { WillpowerSimulator };
