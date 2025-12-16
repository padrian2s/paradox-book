/**
 * Automation Paradox Simulator
 * Demonstrates how reliability leads to skill decay, making rare failures catastrophic
 */
import { SimulatorBase } from '../simulator-base.js';

class AutomationSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = { yearsAutomated: 0, incidents: 0 };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .automation-viz {
                    display: flex;
                    justify-content: space-around;
                    padding: 2rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                    gap: 2rem;
                }

                .pilot-container, .system-container {
                    text-align: center;
                    min-width: 150px;
                }

                .pilot-icon, .system-icon {
                    font-size: 3rem;
                }

                .pilot-label, .system-label {
                    font-weight: bold;
                    margin: 0.5rem 0;
                }

                .skill-bar {
                    width: 150px;
                    height: 20px;
                    background: var(--card, #1e293b);
                    border-radius: 0.25rem;
                    overflow: hidden;
                    margin: 0.5rem auto;
                }

                .skill-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #ef4444, #f59e0b, #22c55e);
                    transition: width 0.5s;
                }

                .skill-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .system-status {
                    padding: 0.5rem 1rem;
                    border-radius: 0.25rem;
                    font-weight: bold;
                    background: #22c55e;
                    color: white;
                    display: inline-block;
                }

                .system-status.failed {
                    background: #ef4444;
                    animation: blink 0.5s infinite;
                }

                @keyframes blink {
                    50% { opacity: 0.5; }
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
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
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .automation-viz {
                        padding: 1rem;
                    }

                    .skill-bar {
                        width: 100%;
                    }
                }
            </style>

            <h4>Skill Decay Simulator</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Automation Level: <span id="auto-level-val">50</span>%</label>
                    <input type="range" id="auto-level" min="0" max="99" value="50">
                </div>
                <button id="fail-btn">Simulate System Failure!</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="automation-viz">
                <div class="pilot-container">
                    <div class="pilot-icon">👨‍✈️</div>
                    <div class="pilot-label">Human Operator</div>
                    <div class="skill-bar">
                        <div class="skill-fill" id="skill-fill" style="width: 50%"></div>
                    </div>
                    <div class="skill-label">Manual Skill: <span id="skill-pct">50%</span></div>
                </div>
                <div class="system-container">
                    <div class="system-icon" id="system-icon">🤖</div>
                    <div class="system-label">Automated System</div>
                    <div class="system-status" id="system-status">OPERATIONAL</div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="years-automated">0</div>
                    <div class="stat-label">Years Automated</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="failure-rate">1%</div>
                    <div class="stat-label">Failure Rate</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="recovery-chance">50%</div>
                    <div class="stat-label">Recovery Chance</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="incidents">0</div>
                    <div class="stat-label">Incidents</div>
                </div>
            </div>

            <div class="result">
                <p id="automation-result">Higher automation = lower manual skill. When the system fails, can the human take over?</p>
            </div>

            <div class="insight">
                This explains many aviation and industrial accidents. Airlines now require pilots to hand-fly periodically to maintain skills, despite automation being more reliable.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#auto-level').addEventListener('input', () => this.updateAutomation());
        this.$('#fail-btn').addEventListener('click', () => this.simulateFailure());
        this.$('#reset-btn').addEventListener('click', () => this.resetAutomation());

        this.updateAutomation();
    }

    updateAutomation() {
        const level = parseInt(this.$('#auto-level').value);
        this.$('#auto-level-val').textContent = level;

        const skill = 100 - level;
        this.$('#skill-fill').style.width = skill + '%';
        this.$('#skill-pct').textContent = skill + '%';

        const failureRate = Math.max(0.1, (100 - level) / 50);
        const recoveryChance = skill;

        this.$('#failure-rate').textContent = failureRate.toFixed(1) + '%';
        this.$('#recovery-chance').textContent = recoveryChance + '%';

        this.$('#automation-result').textContent =
            `Automation: ${level}% | Manual Skill: ${skill}% | When system fails, ${recoveryChance}% chance of successful recovery.`;
    }

    simulateFailure() {
        const level = parseInt(this.$('#auto-level').value);
        const skill = 100 - level;
        this.state.yearsAutomated++;

        this.$('#system-status').textContent = 'FAILED!';
        this.$('#system-status').classList.add('failed');
        this.$('#system-icon').textContent = '💥';

        setTimeout(() => {
            const recovered = Math.random() * 100 < skill;
            if (recovered) {
                this.$('#system-status').textContent = 'RECOVERED';
                this.$('#system-status').classList.remove('failed');
                this.$('#system-icon').textContent = '✅';
                this.$('#automation-result').innerHTML =
                    '<span style="color: #22c55e;">SUCCESS!</span> Human operator had enough skill to recover from the failure.';
            } else {
                this.state.incidents++;
                this.$('#system-icon').textContent = '🔥';
                this.$('#automation-result').innerHTML =
                    '<span style="color: #ef4444;">CATASTROPHIC FAILURE!</span> Human operator skills had atrophied too much to recover.';
            }
            this.$('#years-automated').textContent = this.state.yearsAutomated;
            this.$('#incidents').textContent = this.state.incidents;
        }, 1500);
    }

    resetAutomation() {
        this.state = { yearsAutomated: 0, incidents: 0 };
        this.$('#years-automated').textContent = '0';
        this.$('#incidents').textContent = '0';
        this.$('#system-status').textContent = 'OPERATIONAL';
        this.$('#system-status').classList.remove('failed');
        this.$('#system-icon').textContent = '🤖';
        this.updateAutomation();
    }
}

customElements.define('automation-simulator', AutomationSimulator);

export { AutomationSimulator };
