/**
 * Elephant Brain Paradox Simulator
 * Elephants have 3x more neurons than humans but aren't smarter
 */
import { SimulatorBase } from '../simulator-base.js';

class ElephantBrainSimulator extends SimulatorBase {
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

                .brain-viz {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-top: 1rem;
                    padding: 1rem;
                }

                .brain-icon {
                    text-align: center;
                }

                .brain-emoji {
                    font-size: 3rem;
                }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Brain Comparison</h4>

            <div class="controls">
                <button id="human-btn">Human Brain</button>
                <button id="elephant-btn">Elephant Brain</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="neurons">-</div>
                    <div class="stat-label">Total Neurons</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="cortex">-</div>
                    <div class="stat-label">Cortical Neurons</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="iq">-</div>
                    <div class="stat-label">Cognitive Ability</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Compare brain structure...</p>
            </div>

            <div class="insight">
                It's not total neurons but WHERE they are. The cortex is the thinking part. Elephants have most neurons in the cerebellum (motor control for their massive body). Humans pack more into the cortex.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#human-btn').addEventListener('click', () => this.setBrain('human'));
        this.$('#elephant-btn').addEventListener('click', () => this.setBrain('elephant'));
    }

    setBrain(type) {
        if (type === 'human') {
            this.$('#neurons').textContent = '86B';
            this.$('#cortex').textContent = '16B';
            this.$('#cortex').style.color = '#22c55e';
            this.$('#iq').textContent = 'Highest';
            this.$('#iq').style.color = '#22c55e';
            this.$('#result').innerHTML = `
                <p><strong>Human brain:</strong> 86 billion total neurons</p>
                <p>16 billion in the cerebral cortex (thinking, reasoning, language)</p>
                <p>Cortex neurons are densely packed and highly interconnected.</p>
                <p style="color: var(--accent);">Result: Abstract thought, language, technology, art.</p>
            `;
        } else {
            this.$('#neurons').textContent = '257B';
            this.$('#neurons').style.color = '#22c55e';
            this.$('#cortex').textContent = '5.6B';
            this.$('#cortex').style.color = '#f59e0b';
            this.$('#iq').textContent = 'Lower';
            this.$('#iq').style.color = '#f59e0b';
            this.$('#result').innerHTML = `
                <p><strong>Elephant brain:</strong> 257 billion total neurons - 3X more!</p>
                <p style="color: var(--accent);">THE PARADOX: More neurons, less intelligence?</p>
                <p>Only 5.6 billion in the cortex. The remaining 251 billion?</p>
                <p>In the cerebellum - controlling a 6-ton body with a trunk containing 40,000 muscles.</p>
                <p>Elephants are smart, but their neurons are "spent" on body control.</p>
            `;
        }
    }
}

customElements.define('elephant-brain-simulator', ElephantBrainSimulator);

export { ElephantBrainSimulator };
