import { SimulatorBase } from '../simulator-base.js';

class WollheimSimulator extends SimulatorBase {
    constructor() {
        super();
        this.scenarios = [
            {
                policy: 'Smoking Ban',
                personalView: 'I think smoking should be allowed',
                democraticVote: 'Majority voted for ban',
                action: 'I advocate for the smoking ban',
                explanation: 'As a democrat, I support what the majority decided, even though I personally disagree.'
            },
            {
                policy: 'Tax Increase',
                personalView: 'I believe taxes should be lower',
                democraticVote: 'Majority voted to raise taxes',
                action: 'I support the tax increase',
                explanation: 'Democratic commitment means accepting outcomes I personally oppose.'
            },
            {
                policy: 'Immigration Policy',
                personalView: 'I favor open borders',
                democraticVote: 'Majority voted for restrictions',
                action: 'I advocate for restrictions',
                explanation: 'My belief in democracy overrides my personal policy preference.'
            },
            {
                policy: 'Speed Limits',
                personalView: 'I think limits should be higher',
                democraticVote: 'Majority voted for lower limits',
                action: 'I support lower speed limits',
                explanation: 'A true democrat respects the democratic process above personal views.'
            }
        ];
        this.currentScenario = 0;
        this.step = 0;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .wollheim-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .scenario-header {
                    text-align: center;
                    margin-bottom: 1.5rem;
                }

                .policy-name {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .belief-cards {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .belief-card {
                    flex: 1;
                    min-width: 200px;
                    max-width: 250px;
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    opacity: 0.3;
                    transition: all 0.5s;
                }

                .belief-card.visible {
                    opacity: 1;
                }

                .belief-card.personal {
                    border-top: 4px solid #f59e0b;
                }

                .belief-card.democratic {
                    border-top: 4px solid #6366f1;
                }

                .belief-card.action {
                    border-top: 4px solid #22c55e;
                }

                .card-icon {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }

                .card-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    color: var(--muted, #94a3b8);
                }

                .card-content {
                    font-size: 0.875rem;
                }

                .paradox-arrow {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    color: #ef4444;
                    margin: 1rem 0;
                    opacity: 0;
                    transition: opacity 0.5s;
                }

                .paradox-arrow.visible {
                    opacity: 1;
                }

                .scenario-nav {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                .nav-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: var(--card, #1e293b);
                    cursor: pointer;
                }

                .nav-dot.active {
                    background: var(--primary, #6366f1);
                }

                @media (max-width: 600px) {
                    .belief-cards {
                        flex-direction: column;
                        align-items: center;
                    }
                    .belief-card {
                        max-width: 100%;
                    }
                }
            </style>

            <h4>The Democratic Dilemma</h4>

            <div class="wollheim-viz">
                <div class="scenario-nav" id="scenario-nav">
                </div>

                <div class="scenario-header">
                    <div class="policy-name" id="policy-name">Smoking Ban</div>
                </div>

                <div class="belief-cards">
                    <div class="belief-card personal" id="personal-card">
                        <div class="card-icon">&#129300;</div>
                        <div class="card-title">Personal Belief</div>
                        <div class="card-content" id="personal-view">I think smoking should be allowed</div>
                    </div>
                    <div class="belief-card democratic" id="democratic-card">
                        <div class="card-icon">&#128499;</div>
                        <div class="card-title">Democratic Process</div>
                        <div class="card-content" id="democratic-vote">Majority voted for ban</div>
                    </div>
                </div>

                <div class="paradox-arrow" id="paradox-arrow">&#8595; BUT &#8595;</div>

                <div class="belief-cards">
                    <div class="belief-card action" id="action-card">
                        <div class="card-icon">&#128227;</div>
                        <div class="card-title">My Action as Democrat</div>
                        <div class="card-content" id="action-text">I advocate for the smoking ban</div>
                    </div>
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="step-btn">Show Next Step</button>
                <button id="next-scenario-btn">Next Scenario</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="result">
                <p id="wollheim-result">Step through to see how a democrat can rationally advocate for policies they personally oppose.</p>
            </div>

            <div class="insight">
                Richard Wollheim asked: How can it be rational to advocate for X while believing not-X is better? The democrat holds two logically conflicting positions simultaneously.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#step-btn').addEventListener('click', () => this.nextStep());
        this.$('#next-scenario-btn').addEventListener('click', () => this.nextScenario());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.renderNav();
        this.updateDisplay();
    }

    renderNav() {
        const nav = this.$('#scenario-nav');
        nav.innerHTML = this.scenarios.map((_, i) =>
            `<div class="nav-dot${i === this.currentScenario ? ' active' : ''}" data-index="${i}"></div>`
        ).join('');

        nav.querySelectorAll('.nav-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                this.currentScenario = parseInt(dot.dataset.index);
                this.step = 0;
                this.updateNav();
                this.reset();
            });
        });
    }

    updateNav() {
        this.$$('.nav-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentScenario);
        });
    }

    updateDisplay() {
        const scenario = this.scenarios[this.currentScenario];
        this.$('#policy-name').textContent = scenario.policy;
        this.$('#personal-view').textContent = scenario.personalView;
        this.$('#democratic-vote').textContent = scenario.democraticVote;
        this.$('#action-text').textContent = scenario.action;
    }

    nextStep() {
        this.step++;

        if (this.step === 1) {
            this.$('#personal-card').classList.add('visible');
            this.$('#wollheim-result').textContent = 'First: The individual has a personal belief about the policy.';
        } else if (this.step === 2) {
            this.$('#democratic-card').classList.add('visible');
            this.$('#wollheim-result').textContent = 'Second: The democratic process produces a different outcome.';
        } else if (this.step === 3) {
            this.$('#paradox-arrow').classList.add('visible');
            this.$('#action-card').classList.add('visible');

            const scenario = this.scenarios[this.currentScenario];
            this.$('#wollheim-result').innerHTML = `<strong style="color: #ef4444;">THE PARADOX!</strong> ${scenario.explanation}<br><br>The democrat simultaneously believes "Policy X is wrong" AND "Policy X should be implemented."`;
        }
    }

    nextScenario() {
        this.currentScenario = (this.currentScenario + 1) % this.scenarios.length;
        this.step = 0;
        this.updateNav();
        this.reset();
    }

    reset() {
        this.step = 0;
        this.$('#personal-card').classList.remove('visible');
        this.$('#democratic-card').classList.remove('visible');
        this.$('#paradox-arrow').classList.remove('visible');
        this.$('#action-card').classList.remove('visible');
        this.updateDisplay();
        this.$('#wollheim-result').textContent = 'Step through to see how a democrat can rationally advocate for policies they personally oppose.';
    }
}

customElements.define('wollheim-simulator', WollheimSimulator);

export { WollheimSimulator };
