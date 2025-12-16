/**
 * Dating App Paradox Simulator
 * Apps designed to help find love make it harder - infinite options = impossible choices
 */
import { SimulatorBase } from '../simulator-base.js';

class DatingAppSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin: 1.5rem 0;
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
                    color: var(--text, #e2e8f0);
                }

                .stat-value.good {
                    color: #22c55e;
                }

                .stat-value.warn {
                    color: #f59e0b;
                }

                .stat-value.bad {
                    color: #ef4444;
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .matches-display {
                    text-align: center;
                    font-size: 2rem;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                    letter-spacing: 0.1em;
                    word-break: break-all;
                    max-height: 100px;
                    overflow: hidden;
                }

                .fomo-meter {
                    margin: 1rem 0;
                }

                .fomo-label {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.25rem;
                }

                .fomo-bar {
                    height: 12px;
                    background: var(--card, #1e293b);
                    border-radius: 6px;
                    overflow: hidden;
                }

                .fomo-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #22c55e, #f59e0b, #ef4444);
                    transition: width 0.3s;
                    border-radius: 6px;
                }
            </style>

            <h4>Dating Pool Size Effect</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Available Matches: <span id="matches-val">10</span></label>
                    <input type="range" id="matches-slider" min="1" max="1000" value="10">
                </div>
            </div>

            <div class="matches-display" id="matches-display">
                &#x1F464;&#x1F464;&#x1F464;&#x1F464;&#x1F464;&#x1F464;&#x1F464;&#x1F464;&#x1F464;&#x1F464;
            </div>

            <div class="fomo-meter">
                <div class="fomo-label">
                    <span>FOMO Level</span>
                    <span id="fomo-level">Low</span>
                </div>
                <div class="fomo-bar">
                    <div class="fomo-fill" id="fomo-fill" style="width: 10%;"></div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value good" id="commitment">High</div>
                    <div class="stat-label">Commitment Likelihood</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value good" id="satisfaction">High</div>
                    <div class="stat-label">Relationship Satisfaction</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>With a small dating pool, you commit and appreciate what you have.</p>
            </div>

            <div class="insight">
                The "paradox of choice" meets dating: more options don't make us happier. They make us wonder if we settled too early.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#matches-slider').addEventListener('input', () => this.calculate());
        this.calculate();
    }

    calculate() {
        const matches = parseInt(this.$('#matches-slider').value);
        this.$('#matches-val').textContent = matches;

        const icons = Math.min(matches, 100);
        this.$('#matches-display').textContent = '\u{1F464}'.repeat(icons) + (matches > 100 ? '...' : '');

        let commitment, commitmentClass, satisfaction, satisfactionClass, fomo, fomoPercent, result;

        if (matches <= 10) {
            commitment = 'High';
            commitmentClass = 'good';
            satisfaction = 'High';
            satisfactionClass = 'good';
            fomo = 'Low';
            fomoPercent = 10;
            result = '<p style="color: #22c55e;"><strong>Small pool:</strong> You invest in connections, give people a fair chance, and appreciate your match.</p>';
        } else if (matches <= 50) {
            commitment = 'Medium';
            commitmentClass = 'warn';
            satisfaction = 'Medium';
            satisfactionClass = 'warn';
            fomo = 'Moderate';
            fomoPercent = 40;
            result = '<p>Growing pool. You start comparing more, investing less per person.</p>';
        } else if (matches <= 200) {
            commitment = 'Low';
            commitmentClass = 'warn';
            satisfaction = 'Low';
            satisfactionClass = 'warn';
            fomo = 'High';
            fomoPercent = 70;
            result = `<p style="color: var(--accent);"><strong>Large pool:</strong> Every match feels replaceable.</p>
                <p>"Why commit when someone better might be a swipe away?"</p>`;
        } else {
            commitment = 'Very Low';
            commitmentClass = 'bad';
            satisfaction = 'Very Low';
            satisfactionClass = 'bad';
            fomo = 'Paralyzing';
            fomoPercent = 95;
            result = `<p style="color: #ef4444;"><strong>Infinite options = infinite doubt</strong></p>
                <p>Analysis paralysis sets in. You swipe endlessly but connect with no one.</p>
                <p>Every relationship has a "grass is greener" shadow hanging over it.</p>`;
        }

        this.$('#commitment').textContent = commitment;
        this.$('#commitment').className = 'stat-value ' + commitmentClass;
        this.$('#satisfaction').textContent = satisfaction;
        this.$('#satisfaction').className = 'stat-value ' + satisfactionClass;
        this.$('#fomo-level').textContent = fomo;
        this.$('#fomo-fill').style.width = fomoPercent + '%';
        this.$('#result').innerHTML = result;
    }
}

customElements.define('dating-app-simulator', DatingAppSimulator);

export { DatingAppSimulator };
