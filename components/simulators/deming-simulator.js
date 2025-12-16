/**
 * Deming Paradox Simulator
 * Operationally rigorous companies often aren't nice places to work
 */
import { SimulatorBase } from '../simulator-base.js';

class DemingSimulator extends SimulatorBase {
    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin: 1rem 0;
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
                    color: var(--primary, #6366f1);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .culture-meter {
                    margin: 1.5rem 0;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                .meter-bar {
                    height: 20px;
                    background: linear-gradient(to right, #22c55e, #f59e0b, #ef4444);
                    border-radius: 10px;
                    position: relative;
                    margin-top: 0.5rem;
                }

                .meter-indicator {
                    position: absolute;
                    top: -5px;
                    width: 30px;
                    height: 30px;
                    background: white;
                    border-radius: 50%;
                    transform: translateX(-50%);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                    transition: left 0.3s ease;
                }

                .meter-labels {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.5rem;
                }

                .company-examples {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .company-tag {
                    padding: 0.25rem 0.75rem;
                    background: var(--card, #1e293b);
                    border-radius: 1rem;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }
            </style>

            <h4>Company Culture Simulator</h4>

            <div class="controls">
                <div class="control-group" style="width: 100%;">
                    <label>Operational Rigor: <span id="deming-val">50%</span></label>
                    <input type="range" id="deming-n" min="0" max="100" value="50" style="width: 100%;">
                </div>
            </div>

            <div class="culture-meter">
                <div style="display: flex; justify-content: space-between;">
                    <span style="color: #22c55e;">Relaxed</span>
                    <span style="color: #ef4444;">Intense</span>
                </div>
                <div class="meter-bar">
                    <div class="meter-indicator" id="meter-indicator" style="left: 50%;"></div>
                </div>
                <div class="meter-labels">
                    <span>Work-life balance</span>
                    <span>Performance culture</span>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="dem-efficiency">Medium</div>
                    <div class="stat-label">Efficiency</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="dem-pleasant">Medium</div>
                    <div class="stat-label">Pleasant to Work</div>
                </div>
            </div>

            <div class="result" id="deming-result">
                <p>Balance operational excellence with human factors.</p>
            </div>

            <div class="company-examples" id="company-examples">
                <span class="company-tag">Most startups</span>
                <span class="company-tag">Mid-size companies</span>
            </div>

            <div class="insight">
                Amazon, Toyota, McKinsey: great at execution, often described as "intense" cultures. The practices that make companies efficient can make them unpleasant.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#deming-n').addEventListener('input', () => this.updateDeming());
        this.updateDeming();
    }

    updateDeming() {
        const n = parseInt(this.$('#deming-n').value);
        this.$('#deming-val').textContent = n + '%';
        this.$('#meter-indicator').style.left = n + '%';

        let eff, pleasant, result, examples;

        if (n < 30) {
            eff = 'Low';
            pleasant = 'High';
            result = '<p style="color: #22c55e;">Relaxed culture: pleasant to work but may lack competitive edge.</p>';
            examples = ['Government agencies', 'Some nonprofits', 'Academia'];
        } else if (n < 60) {
            eff = 'Medium';
            pleasant = 'Medium';
            result = '<p>Balanced approach: reasonable efficiency with acceptable culture.</p>';
            examples = ['Most startups', 'Mid-size companies', 'Mature tech'];
        } else if (n < 85) {
            eff = 'High';
            pleasant = 'Low';
            result = '<p style="color: var(--accent);">High-performance culture: great results but high turnover and burnout risk.</p>';
            examples = ['Amazon', 'Netflix', 'Investment banks'];
        } else {
            eff = 'Very High';
            pleasant = 'Very Low';
            result = '<p style="color: #ef4444;">Extreme rigor: ruthlessly efficient but often described as "brutal" or "cult-like."</p>';
            examples = ['Early Amazon', 'McKinsey', 'Some trading firms'];
        }

        this.$('#dem-efficiency').textContent = eff;
        this.$('#dem-pleasant').textContent = pleasant;
        this.$('#dem-pleasant').style.color = n > 60 ? '#ef4444' : n < 30 ? '#22c55e' : 'var(--primary)';
        this.$('#deming-result').innerHTML = result;

        this.$('#company-examples').innerHTML = examples.map(e =>
            `<span class="company-tag">${e}</span>`
        ).join('');
    }
}

customElements.define('deming-simulator', DemingSimulator);

export { DemingSimulator };
