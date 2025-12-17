import { SimulatorBase } from '../simulator-base.js';

class ArrowInfoSimulator extends SimulatorBase {
    constructor() {
        super();
        this.stage = 0;
        this.scenarios = [
            {
                type: 'Trade Secret',
                seller: 'Chemical Company',
                info: 'New formula that doubles efficiency',
                value: '$10M',
                problem: 'To prove the formula works, you must reveal it. Once revealed, why pay?'
            },
            {
                type: 'Business Intelligence',
                seller: 'Market Research Firm',
                info: 'Competitor is about to go bankrupt',
                value: '$5M',
                problem: 'The information IS the product. Sampling destroys the sale.'
            },
            {
                type: 'Software Algorithm',
                seller: 'AI Startup',
                info: 'Algorithm that predicts stock movements',
                value: '$50M',
                problem: 'Demonstrating effectiveness reveals the method.'
            },
            {
                type: 'Medical Discovery',
                seller: 'Research Lab',
                info: 'Cure for rare disease',
                value: '$100M',
                problem: 'Publishing evidence for efficacy teaches competitors how to make it.'
            }
        ];
        this.currentScenario = 0;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .arrow-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .transaction-display {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .party-box {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    min-width: 150px;
                }

                .party-icon {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                }

                .party-label {
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .transaction-arrow {
                    font-size: 2rem;
                    color: var(--muted, #94a3b8);
                }

                .info-card {
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    color: white;
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .info-type {
                    font-size: 0.875rem;
                    opacity: 0.8;
                }

                .info-content {
                    font-size: 1.25rem;
                    font-weight: bold;
                    margin: 0.5rem 0;
                }

                .info-value {
                    color: #fcd34d;
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .paradox-stages {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .stage-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    opacity: 0.3;
                    transition: all 0.5s;
                    border-left: 4px solid transparent;
                }

                .stage-box.active {
                    opacity: 1;
                    border-left-color: var(--primary, #6366f1);
                }

                .stage-box.paradox {
                    background: rgba(239, 68, 68, 0.2);
                    border-left-color: #ef4444;
                }

                .stage-number {
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                    margin-bottom: 0.25rem;
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
                    .transaction-display {
                        flex-direction: column;
                    }
                    .transaction-arrow {
                        transform: rotate(90deg);
                    }
                }
            </style>

            <h4>The Information Sale Dilemma</h4>

            <div class="arrow-viz">
                <div class="scenario-nav" id="scenario-nav">
                </div>

                <div class="transaction-display">
                    <div class="party-box">
                        <div class="party-icon">&#128188;</div>
                        <div class="party-label" id="seller-name">Chemical Company</div>
                        <div>Seller</div>
                    </div>
                    <div class="transaction-arrow" id="arrow">&#8644;</div>
                    <div class="party-box">
                        <div class="party-icon">&#128176;</div>
                        <div class="party-label">Buyer</div>
                        <div>Wants the information</div>
                    </div>
                </div>

                <div class="info-card">
                    <div class="info-type" id="info-type">Trade Secret</div>
                    <div class="info-content" id="info-content">New formula that doubles efficiency</div>
                    <div>Worth: <span class="info-value" id="info-value">$10M</span></div>
                </div>

                <div class="paradox-stages">
                    <div class="stage-box" id="stage-1">
                        <div class="stage-number">Stage 1: The Offer</div>
                        <div>"I have valuable information worth $10M. Want to buy it?"</div>
                    </div>
                    <div class="stage-box" id="stage-2">
                        <div class="stage-number">Stage 2: Buyer's Reasonable Request</div>
                        <div>"How do I know it's worth $10M? Can you prove it?"</div>
                    </div>
                    <div class="stage-box" id="stage-3">
                        <div class="stage-number">Stage 3: The Dilemma</div>
                        <div id="dilemma-text">To prove the formula works, you must reveal it. Once revealed, why pay?</div>
                    </div>
                    <div class="stage-box paradox" id="stage-4">
                        <div class="stage-number" style="color: #ef4444;">Stage 4: Arrow's Paradox</div>
                        <div>Information cannot be evaluated without being transferred, but transfer eliminates the need to pay!</div>
                    </div>
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="next-stage-btn">Next Stage</button>
                <button id="next-scenario-btn">Next Scenario</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="result">
                <p id="arrow-result">Step through the stages to see how information markets face a fundamental problem.</p>
            </div>

            <div class="insight">
                Kenneth Arrow identified this as a fundamental market failure. Solutions include: patents, trade secret law, reputation systems, and staged disclosure with contracts. But the core paradox remains.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#next-stage-btn').addEventListener('click', () => this.nextStage());
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
                this.stage = 0;
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
        this.$('#seller-name').textContent = scenario.seller;
        this.$('#info-type').textContent = scenario.type;
        this.$('#info-content').textContent = scenario.info;
        this.$('#info-value').textContent = scenario.value;
        this.$('#dilemma-text').textContent = scenario.problem;
    }

    nextStage() {
        if (this.stage < 4) {
            this.stage++;
            this.$(`#stage-${this.stage}`).classList.add('active');

            const scenario = this.scenarios[this.currentScenario];

            if (this.stage === 1) {
                this.$('#arrow-result').textContent = 'The seller has information they claim is valuable...';
            } else if (this.stage === 2) {
                this.$('#arrow-result').textContent = 'A rational buyer wants proof before paying. Totally reasonable!';
            } else if (this.stage === 3) {
                this.$('#arrow-result').innerHTML = `<strong>THE PROBLEM:</strong> ${scenario.problem}`;
            } else if (this.stage === 4) {
                this.$('#arrow-result').innerHTML = `<strong style="color: #ef4444;">ARROW'S PARADOX!</strong> The very act of demonstrating value destroys the ability to sell. This is why information markets often fail - and why patents, copyrights, and NDAs exist.`;
            }
        }
    }

    nextScenario() {
        this.currentScenario = (this.currentScenario + 1) % this.scenarios.length;
        this.stage = 0;
        this.updateNav();
        this.reset();
    }

    reset() {
        this.stage = 0;
        this.$$('.stage-box').forEach(box => box.classList.remove('active'));
        this.updateDisplay();
        this.$('#arrow-result').textContent = 'Step through the stages to see how information markets face a fundamental problem.';
    }
}

customElements.define('arrow-info-simulator', ArrowInfoSimulator);

export { ArrowInfoSimulator };
