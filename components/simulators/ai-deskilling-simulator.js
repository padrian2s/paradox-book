/**
 * AI Deskilling Paradox Simulator
 * Demonstrates how AI reliance degrades human skills needed when AI fails
 */
import { SimulatorBase } from '../simulator-base.js';

class AIDeskillSimulator extends SimulatorBase {
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
                    background: var(--bg, #0f172a);
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

                .skill-viz {
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    padding: 1.5rem;
                    margin-top: 1rem;
                }

                .skill-bars {
                    display: flex;
                    gap: 2rem;
                    align-items: flex-end;
                    height: 150px;
                    justify-content: center;
                }

                .skill-bar-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                }

                .skill-bar {
                    width: 60px;
                    background: var(--card, #1e293b);
                    border-radius: 0.25rem;
                    position: relative;
                    overflow: hidden;
                }

                .skill-fill {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    transition: height 0.5s, background 0.5s;
                }

                .human-skill {
                    background: linear-gradient(to top, #22c55e, #84cc16);
                }

                .ai-skill {
                    background: linear-gradient(to top, #6366f1, #8b5cf6);
                }

                .bar-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    text-align: center;
                }

                .danger-zone {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: rgba(239, 68, 68, 0.1);
                    border-radius: 0.5rem;
                    display: none;
                }

                .danger-zone.active {
                    display: block;
                }

                .failure-scenario {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-top: 0.5rem;
                }

                .failure-icon {
                    font-size: 2rem;
                }

                @media (max-width: 768px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }

                    .skill-bars {
                        gap: 1rem;
                    }

                    .skill-bar {
                        width: 40px;
                    }
                }
            </style>

            <h4>Skill Degradation Over Time</h4>

            <div class="controls">
                <div class="control-group">
                    <label>AI Reliance: <span id="deskill-val">50</span>%</label>
                    <input type="range" id="deskill-r" min="0" max="100" value="50">
                </div>
                <button id="failure-btn">Simulate AI Failure</button>
            </div>

            <div class="skill-viz">
                <div class="skill-bars">
                    <div class="skill-bar-container">
                        <div class="skill-bar" style="height: 120px;">
                            <div class="skill-fill human-skill" id="human-bar" style="height: 50%;"></div>
                        </div>
                        <div class="bar-label">Human<br>Skill</div>
                    </div>
                    <div class="skill-bar-container">
                        <div class="skill-bar" style="height: 120px;">
                            <div class="skill-fill ai-skill" id="ai-bar" style="height: 50%;"></div>
                        </div>
                        <div class="bar-label">AI<br>Capability</div>
                    </div>
                </div>

                <div class="danger-zone" id="danger-zone">
                    <div class="failure-scenario">
                        <span class="failure-icon">⚠️</span>
                        <span id="failure-text">AI system offline! Human skill insufficient to compensate.</span>
                    </div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="deskill-human">50%</div>
                    <div class="stat-label">Human Skill</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="deskill-ai">50%</div>
                    <div class="stat-label">AI Capability</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="deskill-risk" style="color: #22c55e;">Low</div>
                    <div class="stat-label">Failure Risk</div>
                </div>
            </div>

            <div class="result">
                <p id="deskill-result">Balanced reliance maintains human capability.</p>
            </div>

            <div class="insight">
                The paradox: The more we rely on AI, the less capable we become at the tasks AI handles - creating catastrophic vulnerability when AI inevitably fails.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#deskill-r').addEventListener('input', () => this.updateDeskill());
        this.$('#failure-btn').addEventListener('click', () => this.simulateFailure());
        this.updateDeskill();
    }

    updateDeskill() {
        const reliance = parseInt(this.$('#deskill-r').value);
        const humanSkill = Math.round(100 - reliance * 0.8);
        const aiCapability = reliance;

        this.$('#deskill-val').textContent = reliance;
        this.$('#deskill-human').textContent = humanSkill + '%';
        this.$('#deskill-ai').textContent = aiCapability + '%';
        this.$('#human-bar').style.height = humanSkill + '%';
        this.$('#ai-bar').style.height = aiCapability + '%';

        let risk, riskColor;
        if (reliance > 80) {
            risk = 'Critical!';
            riskColor = '#ef4444';
        } else if (reliance > 60) {
            risk = 'High';
            riskColor = '#f59e0b';
        } else if (reliance > 30) {
            risk = 'Medium';
            riskColor = '#eab308';
        } else {
            risk = 'Low';
            riskColor = '#22c55e';
        }

        this.$('#deskill-risk').textContent = risk;
        this.$('#deskill-risk').style.color = riskColor;

        this.$('#danger-zone').classList.remove('active');

        if (reliance > 80) {
            this.$('#deskill-result').innerHTML = '<span style="color: #ef4444;">DANGER: If AI fails now, humans can\'t compensate!</span>';
        } else {
            this.$('#deskill-result').textContent = 'Current balance: ' + (reliance > 50 ? 'AI-dependent' : 'Human-capable');
        }
    }

    simulateFailure() {
        const reliance = parseInt(this.$('#deskill-r').value);
        const humanSkill = 100 - reliance * 0.8;

        this.$('#danger-zone').classList.add('active');

        if (humanSkill < 30) {
            this.$('#failure-text').textContent = 'CRITICAL: AI offline! Human skill at ' + Math.round(humanSkill) + '% - unable to perform basic tasks. System failure imminent.';
            this.$('#danger-zone').style.background = 'rgba(239, 68, 68, 0.2)';
        } else if (humanSkill < 60) {
            this.$('#failure-text').textContent = 'WARNING: AI offline! Human skill at ' + Math.round(humanSkill) + '% - significant degradation in performance. Manual operation difficult.';
            this.$('#danger-zone').style.background = 'rgba(245, 158, 11, 0.2)';
        } else {
            this.$('#failure-text').textContent = 'AI offline. Human skill at ' + Math.round(humanSkill) + '% - able to maintain operations manually.';
            this.$('#danger-zone').style.background = 'rgba(34, 197, 94, 0.2)';
        }
    }
}

customElements.define('ai-deskilling-simulator', AIDeskillSimulator);

export { AIDeskillSimulator };
