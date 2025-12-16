/**
 * Transparency Paradox Simulator
 * More workplace transparency can reduce innovation
 */
import { SimulatorBase } from '../simulator-base.js';

class TransparencySimulator extends SimulatorBase {
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

                .output-bar {
                    height: 30px;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    overflow: hidden;
                    display: flex;
                    margin-top: 1rem;
                }

                .bar-visible {
                    background: var(--primary, #6366f1);
                    height: 100%;
                    transition: width 0.3s;
                }

                .bar-hidden {
                    background: var(--secondary, #8b5cf6);
                    height: 100%;
                    transition: width 0.3s;
                }

                .legend {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Workplace Monitoring Simulator</h4>

            <div class="controls">
                <div class="control-group" style="width: 100%;">
                    <label>Monitoring Level: <span id="level-val">50%</span></label>
                    <input type="range" id="level" min="0" max="100" value="50" style="width: 100%;">
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="visible">50%</div>
                    <div class="stat-label">Visible Work</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="hidden">30%</div>
                    <div class="stat-label">Hidden Innovation</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="total">80%</div>
                    <div class="stat-label">Total Output</div>
                </div>
            </div>

            <div class="output-bar">
                <div class="bar-visible" id="bar-visible"></div>
                <div class="bar-hidden" id="bar-hidden"></div>
            </div>
            <div class="legend">
                <span>Visible Work</span>
                <span>Hidden Innovation</span>
            </div>

            <div class="result" id="result">
                <p>Adjust monitoring level to see its effect on productivity...</p>
            </div>

            <div class="insight">
                Optimal productivity often requires some privacy. The most innovative work happens when people feel free to experiment without judgment.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#level').addEventListener('input', () => this.update());
        this.update();
    }

    update() {
        const level = parseInt(this.$('#level').value);
        this.$('#level-val').textContent = level + '%';

        const visible = 30 + level * 0.5;
        const hidden = Math.max(5, 50 - level * 0.45);
        const total = visible + hidden;

        this.$('#visible').textContent = visible.toFixed(0) + '%';
        this.$('#hidden').textContent = hidden.toFixed(0) + '%';
        this.$('#total').textContent = total.toFixed(0) + '%';

        this.$('#bar-visible').style.width = visible + '%';
        this.$('#bar-hidden').style.width = hidden + '%';

        let explanation;
        if (level < 30) {
            explanation = 'Low monitoring: Employees experiment freely. Innovation thrives but some slack off.';
        } else if (level < 70) {
            explanation = 'Moderate monitoring: Balance of accountability and freedom. Near-optimal total output.';
        } else {
            explanation = 'High monitoring: Everyone looks busy, but creative risk-taking disappears. Innovation dies in the shadows.';
        }
        this.$('#result').innerHTML = '<p>' + explanation + '</p>';
    }
}

customElements.define('transparency-simulator', TransparencySimulator);

export { TransparencySimulator };
