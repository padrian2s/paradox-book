import { SimulatorBase } from '../simulator-base.js';

class MotivationCrowdingSimulator extends SimulatorBase {
    constructor() {
        super();
        this.scenarios = [
            {
                name: 'Blood Donation',
                baseline: 50,
                withReward: 30,
                explanation: 'Paying for blood donations can reduce donations because it transforms a noble act into a transaction.'
            },
            {
                name: 'Daycare Pickup',
                baseline: 10,
                withReward: 25,
                explanation: 'Fining late parents increased lateness - it became a fee they could pay rather than a social norm to respect.'
            },
            {
                name: 'Student Reading',
                baseline: 40,
                withReward: 25,
                explanation: 'Paying students per book read can decrease long-term reading interest after rewards stop.'
            },
            {
                name: 'Environmental Care',
                baseline: 60,
                withReward: 35,
                explanation: 'Paying people to recycle can undermine their intrinsic motivation to help the environment.'
            }
        ];
        this.currentScenario = 0;
        this.showingReward = false;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .motivation-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .scenario-title {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                    margin-bottom: 1rem;
                    text-align: center;
                }

                .motivation-bars {
                    display: flex;
                    justify-content: center;
                    gap: 3rem;
                    margin: 2rem 0;
                }

                .bar-group {
                    text-align: center;
                }

                .bar-container {
                    width: 80px;
                    height: 200px;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    position: relative;
                    overflow: hidden;
                }

                .bar-fill {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(to top, #6366f1, #8b5cf6);
                    transition: height 0.5s ease;
                    border-radius: 0 0 0.5rem 0.5rem;
                }

                .bar-fill.reward {
                    background: linear-gradient(to top, #ef4444, #f87171);
                }

                .bar-label {
                    margin-top: 0.5rem;
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .bar-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                    margin-top: 0.25rem;
                }

                .reward-badge {
                    display: inline-block;
                    background: #22c55e;
                    color: white;
                    padding: 0.25rem 0.5rem;
                    border-radius: 0.25rem;
                    font-size: 0.75rem;
                    margin-bottom: 0.5rem;
                }

                .crowding-indicator {
                    text-align: center;
                    font-size: 2rem;
                    margin: 1rem 0;
                }

                .scenario-nav {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                .scenario-btn {
                    padding: 0.5rem 1rem;
                    font-size: 0.75rem;
                    background: var(--card, #1e293b) !important;
                }

                .scenario-btn.active {
                    background: var(--primary, #6366f1) !important;
                }

                @media (max-width: 600px) {
                    .motivation-bars {
                        gap: 1.5rem;
                    }
                    .bar-container {
                        width: 60px;
                        height: 150px;
                    }
                }
            </style>

            <h4>The Crowding-Out Effect</h4>

            <div class="motivation-viz">
                <div class="scenario-nav" id="scenario-nav">
                </div>

                <div class="scenario-title" id="scenario-title">Blood Donation</div>

                <div class="motivation-bars">
                    <div class="bar-group">
                        <div class="bar-container">
                            <div class="bar-fill" id="baseline-bar" style="height: 50%;"></div>
                        </div>
                        <div class="bar-label">Intrinsic Only</div>
                        <div class="bar-value" id="baseline-value">50%</div>
                    </div>
                    <div class="bar-group">
                        <div class="reward-badge">+ $20 Reward</div>
                        <div class="bar-container">
                            <div class="bar-fill reward" id="reward-bar" style="height: 0%;"></div>
                        </div>
                        <div class="bar-label">With Payment</div>
                        <div class="bar-value" id="reward-value">?</div>
                    </div>
                </div>

                <div class="crowding-indicator" id="crowding-indicator"></div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="add-reward-btn">Add External Reward</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="result">
                <p id="motivation-result">Click "Add External Reward" to see how adding payment affects participation.</p>
            </div>

            <div class="insight">
                Deci & Ryan's research shows that external rewards can undermine intrinsic motivation by changing how people perceive the activity - from "something I want to do" to "something I'm paid to do."
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#add-reward-btn').addEventListener('click', () => this.addReward());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.renderScenarioNav();
        this.updateDisplay();
    }

    renderScenarioNav() {
        const nav = this.$('#scenario-nav');
        nav.innerHTML = this.scenarios.map((s, i) =>
            `<button class="scenario-btn${i === this.currentScenario ? ' active' : ''}" data-index="${i}">${s.name}</button>`
        ).join('');

        nav.querySelectorAll('.scenario-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentScenario = parseInt(btn.dataset.index);
                this.showingReward = false;
                this.updateScenarioNav();
                this.updateDisplay();
            });
        });
    }

    updateScenarioNav() {
        this.$$('.scenario-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === this.currentScenario);
        });
    }

    updateDisplay() {
        const scenario = this.scenarios[this.currentScenario];
        this.$('#scenario-title').textContent = scenario.name;
        this.$('#baseline-bar').style.height = scenario.baseline + '%';
        this.$('#baseline-value').textContent = scenario.baseline + '%';

        if (this.showingReward) {
            this.$('#reward-bar').style.height = scenario.withReward + '%';
            this.$('#reward-value').textContent = scenario.withReward + '%';

            const decrease = scenario.baseline - scenario.withReward;
            this.$('#crowding-indicator').innerHTML = `<span style="color: #ef4444;">Motivation DECREASED by ${decrease}%</span>`;
        } else {
            this.$('#reward-bar').style.height = '0%';
            this.$('#reward-value').textContent = '?';
            this.$('#crowding-indicator').textContent = '';
        }
    }

    addReward() {
        this.showingReward = true;
        this.updateDisplay();

        const scenario = this.scenarios[this.currentScenario];
        this.$('#motivation-result').innerHTML = `<strong style="color: #ef4444;">CROWDING OUT!</strong> ${scenario.explanation}`;
    }

    reset() {
        this.showingReward = false;
        this.updateDisplay();
        this.$('#motivation-result').textContent = 'Click "Add External Reward" to see how adding payment affects participation.';
    }
}

customElements.define('motivation-crowding-simulator', MotivationCrowdingSimulator);

export { MotivationCrowdingSimulator };
