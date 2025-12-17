import { SimulatorBase } from '../simulator-base.js';

class LiberalParadoxSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .scenario-box {
                    background: var(--bg, #0f172a);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .person-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin: 1rem 0;
                }

                .person-card {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .person-card h5 {
                    margin: 0 0 0.5rem 0;
                    color: var(--primary, #6366f1);
                }

                .preference {
                    font-size: 0.875rem;
                    margin: 0.5rem 0;
                }

                .book-display {
                    text-align: center;
                    font-size: 3rem;
                    margin: 1rem 0;
                }

                .outcomes {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0.5rem;
                    margin: 1rem 0;
                }

                .outcome {
                    background: var(--card, #1e293b);
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    font-size: 0.875rem;
                }

                .outcome.active {
                    border: 2px solid var(--accent, #f59e0b);
                }

                .outcome.blocked {
                    opacity: 0.5;
                    text-decoration: line-through;
                }

                .principle-box {
                    background: rgba(99, 102, 241, 0.1);
                    border-left: 3px solid var(--primary, #6366f1);
                    padding: 1rem;
                    margin: 0.5rem 0;
                    font-size: 0.875rem;
                }

                @media (max-width: 768px) {
                    .person-grid, .outcomes {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Sen's Liberal Paradox</h4>

            <div class="scenario-box">
                <div class="book-display">&#128214;</div>
                <p><strong>The Scenario:</strong> There's one copy of a controversial book (e.g., Lady Chatterley's Lover). Three possible outcomes:</p>

                <div class="outcomes">
                    <div class="outcome" id="outcome-a">
                        <strong>A:</strong> Prude reads it
                    </div>
                    <div class="outcome" id="outcome-b">
                        <strong>B:</strong> Lewd reads it
                    </div>
                    <div class="outcome" id="outcome-c">
                        <strong>C:</strong> No one reads it
                    </div>
                </div>

                <div class="person-grid">
                    <div class="person-card">
                        <h5>The Prude</h5>
                        <div class="preference">Preferences: C > A > B</div>
                        <p style="font-size: 0.75rem; color: var(--muted);">
                            Best: No one reads it<br>
                            If someone must: I'll read it (to prevent Lewd's enjoyment)
                        </p>
                    </div>
                    <div class="person-card">
                        <h5>The Lewd</h5>
                        <div class="preference">Preferences: A > B > C</div>
                        <p style="font-size: 0.75rem; color: var(--muted);">
                            Best: Prude reads it (to shock them)<br>
                            Second: I read it<br>
                            Worst: No one reads
                        </p>
                    </div>
                </div>
            </div>

            <div class="controls">
                <button id="liberal-btn">Apply Liberalism</button>
                <button id="pareto-btn">Apply Pareto</button>
                <button id="paradox-btn">Show the Paradox</button>
            </div>

            <div id="principles">
                <div class="principle-box" id="liberal-principle" style="display: none;">
                    <strong>Minimal Liberalism:</strong> Each person should be decisive over at least one personal choice.<br>
                    - Prude decides: "I don't read" (eliminates A)<br>
                    - Lewd decides: "I do read" (eliminates C)
                </div>
                <div class="principle-box" id="pareto-principle" style="display: none;">
                    <strong>Pareto Efficiency:</strong> If everyone prefers X to Y, society should prefer X to Y.<br>
                    - Both prefer A to B (Prude: A>B, Lewd: A>B)<br>
                    - So society should prefer A to B
                </div>
            </div>

            <div class="result">
                <p id="result-text">Click the buttons to see how liberalism and Pareto efficiency conflict.</p>
            </div>

            <div class="insight">
                Amartya Sen (1970): There is no social decision procedure that can simultaneously satisfy both minimal liberalism AND Pareto efficiency. We must sacrifice one or the other!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#liberal-btn').addEventListener('click', () => this.showLiberal());
        this.$('#pareto-btn').addEventListener('click', () => this.showPareto());
        this.$('#paradox-btn').addEventListener('click', () => this.showParadox());
    }

    resetOutcomes() {
        this.$$('.outcome').forEach(o => {
            o.classList.remove('active', 'blocked');
        });
    }

    showLiberal() {
        this.resetOutcomes();
        this.$('#liberal-principle').style.display = 'block';
        this.$('#pareto-principle').style.display = 'none';

        this.$('#outcome-a').classList.add('blocked');
        this.$('#outcome-c').classList.add('blocked');
        this.$('#outcome-b').classList.add('active');

        this.$('#result-text').innerHTML = `
            <strong>Liberalism says:</strong><br>
            - Prude controls whether THEY read: "No" (A eliminated)<br>
            - Lewd controls whether THEY read: "Yes" (C eliminated)<br>
            <span style="color: var(--primary);">Result: B (Lewd reads)</span>
        `;
    }

    showPareto() {
        this.resetOutcomes();
        this.$('#liberal-principle').style.display = 'none';
        this.$('#pareto-principle').style.display = 'block';

        this.$('#outcome-b').classList.add('blocked');
        this.$('#outcome-a').classList.add('active');

        this.$('#result-text').innerHTML = `
            <strong>Pareto Efficiency says:</strong><br>
            Both Prude and Lewd prefer A to B.<br>
            (Prude: shock is better than Lewd enjoying; Lewd: wants to shock Prude)<br>
            <span style="color: var(--accent);">Result: A is Pareto-superior to B</span>
        `;
    }

    showParadox() {
        this.resetOutcomes();
        this.$('#liberal-principle').style.display = 'block';
        this.$('#pareto-principle').style.display = 'block';

        this.$$('.outcome').forEach(o => o.classList.add('blocked'));

        this.$('#result-text').innerHTML = `
            <span style="color: #ef4444;"><strong>THE PARADOX:</strong></span><br><br>
            <strong>Liberalism requires:</strong> B (only outcome respecting both personal choices)<br>
            <strong>Pareto requires:</strong> A > B (both prefer A to B)<br><br>
            <span style="color: var(--accent);">CONFLICT! We cannot satisfy both principles.</span><br><br>
            Either we violate individual liberty (force Prude to read),<br>
            or we choose a Pareto-inferior outcome (B when both prefer A).
        `;
    }
}

customElements.define('liberal-paradox-simulator', LiberalParadoxSimulator);

export { LiberalParadoxSimulator };
