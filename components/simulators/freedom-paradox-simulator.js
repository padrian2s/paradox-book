import { SimulatorBase } from '../simulator-base.js';

class FreedomParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            freedomLevel: 50,
            year: 0
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .society-viz {
                    background: var(--bg, #0f172a);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .freedom-meter {
                    height: 30px;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    overflow: hidden;
                    position: relative;
                }

                .freedom-fill {
                    height: 100%;
                    transition: width 0.5s, background 0.5s;
                    border-radius: 0.5rem;
                }

                .freedom-labels {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 0.5rem;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .agents-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4px;
                    margin-top: 1rem;
                    min-height: 60px;
                }

                .agent {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    transition: all 0.3s;
                }

                .agent.free {
                    background: #22c55e;
                }

                .agent.oppressor {
                    background: #ef4444;
                }

                .agent.oppressed {
                    background: #94a3b8;
                }

                .stats-row {
                    display: flex;
                    justify-content: space-around;
                    margin-top: 1rem;
                    text-align: center;
                }

                .stat {
                    padding: 0.5rem;
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }
            </style>

            <h4>Freedom in Society Simulation</h4>

            <div class="controls">
                <div class="control-group">
                    <label>Freedom Policy</label>
                    <select id="policy">
                        <option value="unlimited">Unlimited Freedom</option>
                        <option value="balanced" selected>Balanced (Laws exist)</option>
                        <option value="restricted">Highly Restricted</option>
                    </select>
                </div>
                <button id="simulate-btn">Simulate 20 Years</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="society-viz">
                <strong>Effective Freedom Level</strong>
                <div class="freedom-meter">
                    <div class="freedom-fill" id="freedom-fill" style="width: 50%; background: #22c55e;"></div>
                </div>
                <div class="freedom-labels">
                    <span>No Freedom</span>
                    <span>Maximum Freedom</span>
                </div>

                <div class="agents-container" id="agents"></div>

                <div class="stats-row">
                    <div class="stat">
                        <div class="stat-value" id="free-count" style="color: #22c55e;">0</div>
                        <div class="stat-label">Free Citizens</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value" id="oppressor-count" style="color: #ef4444;">0</div>
                        <div class="stat-label">Oppressors</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value" id="oppressed-count" style="color: #94a3b8;">0</div>
                        <div class="stat-label">Oppressed</div>
                    </div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Choose a freedom policy and simulate to see the paradox.</p>
            </div>

            <div class="insight">
                "Freedom for the wolves has often meant death to the sheep." - Isaiah Berlin. True freedom requires limiting the freedom to oppress others.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#simulate-btn').addEventListener('click', () => this.simulate());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.renderAgents(40, 5, 5);
    }

    renderAgents(free, oppressors, oppressed) {
        const container = this.$('#agents');
        container.innerHTML = '';

        for (let i = 0; i < free; i++) {
            const agent = document.createElement('div');
            agent.className = 'agent free';
            container.appendChild(agent);
        }
        for (let i = 0; i < oppressors; i++) {
            const agent = document.createElement('div');
            agent.className = 'agent oppressor';
            container.appendChild(agent);
        }
        for (let i = 0; i < oppressed; i++) {
            const agent = document.createElement('div');
            agent.className = 'agent oppressed';
            container.appendChild(agent);
        }

        this.$('#free-count').textContent = free;
        this.$('#oppressor-count').textContent = oppressors;
        this.$('#oppressed-count').textContent = oppressed;
    }

    simulate() {
        const policy = this.$('#policy').value;
        let free, oppressors, oppressed, freedomLevel, resultText;

        if (policy === 'unlimited') {
            free = 10;
            oppressors = 15;
            oppressed = 25;
            freedomLevel = 20;
            resultText = `<span style="color: #ef4444;">Unlimited freedom leads to tyranny!</span><br>
                Without laws, the strong oppress the weak. Most people have LESS effective freedom.`;
        } else if (policy === 'balanced') {
            free = 42;
            oppressors = 3;
            oppressed = 5;
            freedomLevel = 75;
            resultText = `<span style="color: #22c55e;">Balanced approach maximizes freedom!</span><br>
                Laws prevent oppression. Most people enjoy substantial freedom.`;
        } else {
            free = 20;
            oppressors = 0;
            oppressed = 30;
            freedomLevel = 35;
            resultText = `<span style="color: var(--accent);">Over-restriction reduces freedom for everyone.</span><br>
                No oppressors, but the state itself limits everyone's freedom.`;
        }

        this.renderAgents(free, oppressors, oppressed);

        const fillEl = this.$('#freedom-fill');
        fillEl.style.width = freedomLevel + '%';
        fillEl.style.background = freedomLevel > 60 ? '#22c55e' : freedomLevel > 30 ? '#f59e0b' : '#ef4444';

        this.$('#result-text').innerHTML = resultText;
    }

    reset() {
        this.renderAgents(40, 5, 5);
        const fillEl = this.$('#freedom-fill');
        fillEl.style.width = '50%';
        fillEl.style.background = '#22c55e';
        this.$('#result-text').textContent = 'Choose a freedom policy and simulate to see the paradox.';
    }
}

customElements.define('freedom-paradox-simulator', FreedomParadoxSimulator);

export { FreedomParadoxSimulator };
