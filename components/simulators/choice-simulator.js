/**
 * Paradox of Choice Simulator
 * More options should make us happier, but too many choices leads to anxiety
 */
import { SimulatorBase } from '../simulator-base.js';

class ChoiceSimulator extends SimulatorBase {
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

                .high { color: #22c55e; }
                .medium { color: #f59e0b; }
                .low { color: #ef4444; }

                .jam-display {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.25rem;
                    justify-content: center;
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    min-height: 60px;
                }

                .jam {
                    font-size: 1.5rem;
                }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Jam Experiment</h4>
            <p style="color: var(--muted, #94a3b8); margin-bottom: 1rem;">Based on Sheena Iyengar's famous grocery store study</p>

            <div class="controls">
                <div class="control-group" style="width: 100%;">
                    <label>Number of Jam Options: <span id="count-val">6</span></label>
                    <input type="range" id="count" min="2" max="30" value="6" style="width: 100%;">
                </div>
            </div>

            <div class="jam-display" id="jams"></div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="interest">60%</div>
                    <div class="stat-label">Stop to Look</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="buy">30%</div>
                    <div class="stat-label">Actually Buy</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="satisfy">High</div>
                    <div class="stat-label">Satisfaction</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Adjust the number of options to see the paradox...</p>
            </div>

            <div class="insight">
                The study showed: 24 jams attracted 60% of shoppers but only 3% bought. 6 jams attracted 40% but 30% bought! Ten times more purchases with fewer options.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#count').addEventListener('input', () => this.update());
        this.update();
    }

    update() {
        const n = parseInt(this.$('#count').value);
        this.$('#count-val').textContent = n;

        const jamsEl = this.$('#jams');
        jamsEl.innerHTML = '';
        for (let i = 0; i < Math.min(n, 30); i++) {
            const jam = document.createElement('span');
            jam.className = 'jam';
            jam.textContent = 'jar';
            jamsEl.appendChild(jam);
        }

        const interest = Math.min(90, 30 + n * 2);
        const buy = n <= 6 ? 30 : Math.max(3, 35 - n);
        let satisfy, satisfyClass;

        if (n <= 6) {
            satisfy = 'High';
            satisfyClass = 'high';
        } else if (n <= 15) {
            satisfy = 'Medium';
            satisfyClass = 'medium';
        } else {
            satisfy = 'Low';
            satisfyClass = 'low';
        }

        this.$('#interest').textContent = interest + '%';
        this.$('#buy').textContent = buy + '%';
        this.$('#satisfy').textContent = satisfy;
        this.$('#satisfy').className = 'stat-value ' + satisfyClass;

        let explanation;
        if (n <= 6) {
            explanation = `
                <p><strong>${n} options: Optimal range</strong></p>
                <p style="color: #22c55e;">Manageable choices, high purchase rate!</p>
                <p>People can evaluate all options, make confident decisions, and feel satisfied.</p>
            `;
        } else if (n <= 15) {
            explanation = `
                <p><strong>${n} options: Choice overload starting</strong></p>
                <p>More options attract attention but fewer purchases.</p>
                <p>Analysis paralysis begins. "What if there's a better one?"</p>
            `;
        } else {
            explanation = `
                <p><strong>${n} options: Full paradox!</strong></p>
                <p style="color: var(--accent);">THE PARADOX: More choice = less happiness!</p>
                <p>- Overwhelming comparison effort</p>
                <p>- Fear of missing out on the "best" option</p>
                <p>- Post-decision regret ("Should I have picked the other one?")</p>
                <p>- Many walk away without choosing at all</p>
                <p>- Those who do choose feel less satisfied</p>
            `;
        }
        this.$('#result').innerHTML = explanation;
    }
}

customElements.define('choice-simulator', ChoiceSimulator);

export { ChoiceSimulator };
