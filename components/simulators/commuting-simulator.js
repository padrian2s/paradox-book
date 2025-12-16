/**
 * Commuting Paradox Simulator
 * Long commutes lower life satisfaction, yet millions choose to commute
 */
import { SimulatorBase } from '../simulator-base.js';

class CommutingSimulator extends SimulatorBase {
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

                .commute-bar {
                    height: 20px;
                    background: var(--bg, #0f172a);
                    border-radius: 10px;
                    overflow: hidden;
                    margin: 1rem 0;
                }

                .commute-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #22c55e, #f59e0b, #ef4444);
                    transition: width 0.3s;
                    border-radius: 10px;
                }

                @media (max-width: 600px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Commute Impact Calculator</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Daily One-Way Commute: <span id="commute-val">30</span> min</label>
                    <input type="range" id="commute-slider" min="0" max="120" value="30">
                </div>
            </div>

            <div class="commute-bar">
                <div class="commute-fill" id="commute-fill" style="width: 25%;"></div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="hours-year">130 hrs</div>
                    <div class="stat-label">Hours Lost/Year</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="salary-offset">+$5K</div>
                    <div class="stat-label">Typical Salary Offset</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value good" id="happiness">Great</div>
                    <div class="stat-label">Life Satisfaction</div>
                </div>
            </div>

            <div class="result" id="result">
                <p>Research shows commuting is the activity that makes people <strong>least happy</strong> in their day.</p>
            </div>

            <div class="insight">
                To offset a 1-hour commute's unhappiness, you'd need a 40% salary increase. Most people dramatically underestimate commuting's impact on wellbeing.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#commute-slider').addEventListener('input', () => this.calculate());
        this.calculate();
    }

    calculate() {
        const minutes = parseInt(this.$('#commute-slider').value);
        this.$('#commute-val').textContent = minutes;

        const hoursPerYear = Math.round(minutes * 2 * 260 / 60);
        const salaryOffset = minutes > 60 ? '+$15K' : minutes > 30 ? '+$8K' : minutes > 0 ? '+$3K' : '$0';

        let happiness, happinessClass, result;
        if (minutes === 0) {
            happiness = 'Great';
            happinessClass = 'good';
            result = '<p style="color: #22c55e;"><strong>No commute!</strong> Remote work or living close to work maximizes life satisfaction.</p>';
        } else if (minutes <= 20) {
            happiness = 'Good';
            happinessClass = 'good';
            result = '<p>Short commute. Minimal impact on wellbeing. Can even be enjoyable "transition time."</p>';
        } else if (minutes <= 40) {
            happiness = 'Okay';
            happinessClass = 'warn';
            result = '<p>Moderate commute. Research shows declining life satisfaction starts here.</p>';
        } else if (minutes <= 60) {
            happiness = 'Lower';
            happinessClass = 'warn';
            result = '<p style="color: var(--accent);">Long commute. Associated with higher stress, less exercise, and strained relationships.</p>';
        } else {
            happiness = 'Poor';
            happinessClass = 'bad';
            result = `<p style="color: #ef4444;"><strong>Very long commute!</strong> Studies link 60+ min commutes to:</p>
                <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
                    <li>Higher divorce rates</li>
                    <li>Increased obesity risk</li>
                    <li>Depression and anxiety</li>
                    <li>Less time with family</li>
                </ul>
                <p>The extra salary rarely compensates for the quality-of-life loss.</p>`;
        }

        this.$('#hours-year').textContent = hoursPerYear + ' hrs';
        this.$('#salary-offset').textContent = salaryOffset;
        this.$('#happiness').textContent = happiness;
        this.$('#happiness').className = 'stat-value ' + happinessClass;
        this.$('#result').innerHTML = result;
        this.$('#commute-fill').style.width = (minutes / 120 * 100) + '%';
    }
}

customElements.define('commuting-simulator', CommutingSimulator);

export { CommutingSimulator };
