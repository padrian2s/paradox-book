/**
 * Paradox of Hedonism Simulator
 * Directly pursuing pleasure often leads to unhappiness
 */
import { SimulatorBase } from '../simulator-base.js';

class HedonismSimulator extends SimulatorBase {
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

                .found { color: #22c55e; }
                .lost { color: #ef4444; }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Happiness Pursuit</h4>

            <div class="controls">
                <button id="direct-btn">Chase Happiness</button>
                <button id="indirect-btn">Pursue Meaning</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="effort">-</div>
                    <div class="stat-label">Effort on Happiness</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="found">-</div>
                    <div class="stat-label">Happiness Found</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Choose your approach to happiness...</p>
            </div>

            <div class="insight">
                "Happiness is like a butterfly: the more you chase it, the more it will evade you. But if you turn your attention to other things, it will come and softly sit on your shoulder." - Viktor Frankl
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#direct-btn').addEventListener('click', () => this.setApproach('direct'));
        this.$('#indirect-btn').addEventListener('click', () => this.setApproach('indirect'));
    }

    setApproach(approach) {
        const effortEl = this.$('#effort');
        const foundEl = this.$('#found');

        if (approach === 'direct') {
            effortEl.textContent = '100%';
            foundEl.textContent = 'Elusive';
            foundEl.className = 'stat-value lost';
            this.$('#result').innerHTML = `
                <p><strong>Direct pursuit of happiness:</strong></p>
                <p style="color: #ef4444;">THE PARADOX: More effort, less happiness!</p>
                <p>- Constantly monitoring "Am I happy yet?" prevents flow states</p>
                <p>- Hedonic treadmill: pleasure fades, requiring ever more stimulation</p>
                <p>- Self-focus increases anxiety and rumination</p>
                <p>- Comparing to others' happiness breeds dissatisfaction</p>
                <p>- Treating happiness as a goal creates pressure and disappointment</p>
            `;
        } else {
            effortEl.textContent = '0%';
            foundEl.textContent = 'Found!';
            foundEl.className = 'stat-value found';
            this.$('#result').innerHTML = `
                <p><strong>Pursuing meaning instead:</strong></p>
                <p style="color: #22c55e;">Happiness arrives as a byproduct!</p>
                <p>- Engaging work creates flow states (intrinsic satisfaction)</p>
                <p>- Helping others activates reward circuits</p>
                <p>- Deep relationships provide lasting fulfillment</p>
                <p>- Growth and mastery build self-efficacy</p>
                <p>- Purpose provides resilience against hardship</p>
                <p>When you stop watching for happiness, it sneaks up on you.</p>
            `;
        }
    }
}

customElements.define('hedonism-simulator', HedonismSimulator);

export { HedonismSimulator };
