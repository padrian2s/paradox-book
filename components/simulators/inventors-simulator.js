/**
 * Inventor's Paradox Simulator
 * Sometimes it's easier to solve a more general problem than a specific one
 */
import { SimulatorBase } from '../simulator-base.js';

class InventorsSimulator extends SimulatorBase {
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

                .easy { color: #22c55e; }
                .hard { color: #ef4444; }
                .medium { color: #f59e0b; }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Problem Approach</h4>

            <div class="controls">
                <button id="specific-btn">Solve Specific Problem</button>
                <button id="general-btn">Solve General Problem</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="scope">-</div>
                    <div class="stat-label">Problem Scope</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="ease">-</div>
                    <div class="stat-label">Solution Ease</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="insight">-</div>
                    <div class="stat-label">Insight Gained</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Compare the two approaches...</p>
            </div>

            <div class="insight">
                George Polya: "The more ambitious plan may have more chances of success." By generalizing, you often find patterns and structure that make the solution clear.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#specific-btn').addEventListener('click', () => this.setApproach('specific'));
        this.$('#general-btn').addEventListener('click', () => this.setApproach('general'));
    }

    setApproach(approach) {
        const scopeEl = this.$('#scope');
        const easeEl = this.$('#ease');
        const insightEl = this.$('#insight');

        if (approach === 'specific') {
            scopeEl.textContent = 'Narrow';
            scopeEl.className = 'stat-value';
            easeEl.textContent = 'Hard';
            easeEl.className = 'stat-value hard';
            insightEl.textContent = 'Low';
            insightEl.className = 'stat-value hard';
            this.$('#result').innerHTML = `
                <p><strong>Specific Problem:</strong> "Prove this particular theorem"</p>
                <p>- Limited angles of attack</p>
                <p>- Can get stuck on details</p>
                <p>- Solution may not generalize</p>
                <p>Example: Prove the sum of angles in THIS triangle is 180 degrees.</p>
                <p style="color: #ef4444;">Difficult! Need to measure or use ad-hoc methods.</p>
            `;
        } else {
            scopeEl.textContent = 'Wide';
            scopeEl.className = 'stat-value';
            easeEl.textContent = 'Easier!';
            easeEl.className = 'stat-value easy';
            insightEl.textContent = 'High';
            insightEl.className = 'stat-value easy';
            this.$('#result').innerHTML = `
                <p><strong>General Problem:</strong> "Prove this for ALL cases"</p>
                <p style="color: var(--accent);">THE PARADOX: More ambitious = easier!</p>
                <p>- More structure to work with</p>
                <p>- Can use induction, abstraction</p>
                <p>- Solution reveals deep patterns</p>
                <p>Example: Prove the sum of angles in ANY triangle is 180 degrees.</p>
                <p style="color: #22c55e;">Easier! Use parallel lines and alternate angles - one proof works for all!</p>
            `;
        }
    }
}

customElements.define('inventors-simulator', InventorsSimulator);

export { InventorsSimulator };
