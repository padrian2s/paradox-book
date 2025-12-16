/**
 * Preparedness Paradox Simulator
 * Demonstrates how successful disaster preparation looks like overreaction
 */
import { SimulatorBase } from '../simulator-base.js';

class PreparednessSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = { disastersHandled: 0, totalPrevented: 0 };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .preparedness-viz {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    padding: 2rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                    gap: 2rem;
                }

                .disaster-container, .outcome-container {
                    text-align: center;
                    min-width: 120px;
                }

                .disaster-icon, .outcome-icon {
                    font-size: 4rem;
                    transition: all 0.3s;
                }

                .disaster-label, .outcome-label {
                    font-weight: bold;
                    margin-top: 0.5rem;
                }

                .threat-level {
                    color: var(--muted, #94a3b8);
                    font-size: 0.875rem;
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
                    font-size: 1.25rem;
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

                    .preparedness-viz {
                        padding: 1rem;
                    }
                }
            </style>

            <h4>Disaster Preparation Simulator</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Preparation Level: <span id="prep-level-val">50</span>%</label>
                    <input type="range" id="prep-level" min="0" max="100" value="50">
                </div>
                <button id="trigger-btn">Trigger Disaster Event</button>
                <button id="reset-btn">Reset Stats</button>
            </div>

            <div class="preparedness-viz">
                <div class="disaster-container">
                    <div class="disaster-icon" id="disaster-icon">🌪️</div>
                    <div class="disaster-label">Incoming Disaster</div>
                    <div class="threat-level" id="threat-level">Threat: Medium</div>
                </div>
                <div class="outcome-container">
                    <div class="outcome-icon" id="outcome-icon">❓</div>
                    <div class="outcome-label" id="outcome-label">Outcome Unknown</div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="prep-cost">$5B</div>
                    <div class="stat-label">Preparation Cost</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="damage-prevented">$0B</div>
                    <div class="stat-label">Damage Prevented</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="public-perception">Neutral</div>
                    <div class="stat-label">Public Perception</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="disasters-handled">0</div>
                    <div class="stat-label">Disasters Handled</div>
                </div>
            </div>

            <div class="result">
                <p id="preparedness-result">High preparation = low visible damage = "Why did we waste all that money?"</p>
            </div>

            <div class="insight">
                COVID-19 responses that worked (New Zealand, Taiwan) were criticized as overreactions. Failed responses were obvious disasters. Success is invisible.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#prep-level').addEventListener('input', () => this.updatePreparedness());
        this.$('#trigger-btn').addEventListener('click', () => this.triggerDisaster());
        this.$('#reset-btn').addEventListener('click', () => this.resetPreparedness());

        this.updatePreparedness();
    }

    updatePreparedness() {
        const level = this.$('#prep-level').value;
        this.$('#prep-level-val').textContent = level;
        this.$('#prep-cost').textContent = '$' + Math.round(level / 10) + 'B';
    }

    triggerDisaster() {
        const prepLevel = parseInt(this.$('#prep-level').value);
        this.state.disastersHandled++;

        const baseDamage = Math.floor(Math.random() * 50) + 50;
        const actualDamage = Math.max(0, baseDamage * (100 - prepLevel) / 100);
        const prevented = baseDamage - actualDamage;
        this.state.totalPrevented += prevented;

        this.$('#disaster-icon').textContent = '💥';
        this.$('#outcome-icon').textContent = actualDamage < 10 ? '✅' : actualDamage < 30 ? '⚠️' : '💀';

        let perception = '';
        if (prepLevel > 70 && actualDamage < 10) {
            perception = '"Overreaction!"';
            this.$('#outcome-label').textContent = 'Minor Impact';
        } else if (prepLevel < 30 && actualDamage > 30) {
            perception = '"Unprepared!"';
            this.$('#outcome-label').textContent = 'Major Disaster';
        } else {
            perception = 'Mixed';
            this.$('#outcome-label').textContent = 'Moderate Impact';
        }

        this.$('#damage-prevented').textContent = '$' + Math.round(prevented) + 'B';
        this.$('#public-perception').textContent = perception;
        this.$('#disasters-handled').textContent = this.state.disastersHandled;

        if (prepLevel > 70 && actualDamage < 10) {
            this.$('#preparedness-result').innerHTML =
                `<strong style="color: #f59e0b;">PARADOX!</strong> Preparation worked perfectly (prevented $${Math.round(prevented)}B damage), but outcome looks like the $${Math.round(prepLevel/10)}B spent was wasted.`;
        } else if (prepLevel < 30) {
            this.$('#preparedness-result').innerHTML =
                `<strong style="color: #ef4444;">DISASTER!</strong> $${Math.round(actualDamage)}B in damages. Everyone asks "Why weren't we prepared?"`;
        } else {
            this.$('#preparedness-result').textContent =
                `Preparation prevented $${Math.round(prevented)}B of the potential $${baseDamage}B damage.`;
        }

        setTimeout(() => {
            this.$('#disaster-icon').textContent = '🌪️';
        }, 2000);
    }

    resetPreparedness() {
        this.state = { disastersHandled: 0, totalPrevented: 0 };
        this.$('#damage-prevented').textContent = '$0B';
        this.$('#public-perception').textContent = 'Neutral';
        this.$('#disasters-handled').textContent = '0';
        this.$('#outcome-icon').textContent = '❓';
        this.$('#outcome-label').textContent = 'Outcome Unknown';
        this.$('#preparedness-result').textContent = 'High preparation = low visible damage = "Why did we waste all that money?"';
    }
}

customElements.define('preparedness-simulator', PreparednessSimulator);

export { PreparednessSimulator };
