import { SimulatorBase } from '../simulator-base.js';

class AntitrustSimulator extends SimulatorBase {
    constructor() {
        super();
        this.scenarios = [
            {
                name: 'Efficiency Merger',
                before: { firms: 3, price: 100, efficiency: 70 },
                intervention: 'Block merger for being "anti-competitive"',
                afterBlocked: { firms: 3, price: 100, efficiency: 70 },
                afterAllowed: { firms: 2, price: 90, efficiency: 95 },
                explanation: 'Blocking the merger preserved competition but prevented cost savings that would have lowered prices.'
            },
            {
                name: 'Predatory Pricing',
                before: { firms: 2, price: 80, efficiency: 80 },
                intervention: 'Sue dominant firm for "predatory" low prices',
                afterBlocked: { firms: 2, price: 100, efficiency: 80 },
                afterAllowed: { firms: 2, price: 80, efficiency: 80 },
                explanation: 'Punishing low prices directly raised prices. The "predator" was just efficient!'
            },
            {
                name: 'Vertical Integration',
                before: { firms: 4, price: 120, efficiency: 60 },
                intervention: 'Break up vertical integration',
                afterBlocked: { firms: 6, price: 130, efficiency: 50 },
                afterAllowed: { firms: 4, price: 100, efficiency: 85 },
                explanation: 'More firms but higher costs. Integration eliminated double marginalization.'
            },
            {
                name: 'Resale Price Maintenance',
                before: { firms: 5, price: 90, efficiency: 75 },
                intervention: 'Ban minimum prices as "price fixing"',
                afterBlocked: { firms: 5, price: 85, efficiency: 40 },
                afterAllowed: { firms: 5, price: 90, efficiency: 75 },
                explanation: 'Lower prices but destroyed service quality. Minimum prices supported valuable retailer services.'
            }
        ];
        this.currentScenario = 0;
        this.showingResult = false;
        this.choice = null;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .antitrust-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .scenario-header {
                    text-align: center;
                    margin-bottom: 1rem;
                }

                .scenario-name {
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .market-state {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin: 1rem 0;
                }

                .state-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .state-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .state-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .state-value.price { color: #ef4444; }
                .state-value.firms { color: #6366f1; }
                .state-value.efficiency { color: #22c55e; }

                .intervention-box {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid #ef4444;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    margin: 1rem 0;
                }

                .comparison-container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .outcome-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    opacity: 0.5;
                    transition: all 0.3s;
                }

                .outcome-box.selected {
                    opacity: 1;
                    border: 2px solid var(--primary, #6366f1);
                }

                .outcome-box.winner {
                    border-color: #22c55e;
                }

                .outcome-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    text-align: center;
                }

                .outcome-title.blocked { color: #ef4444; }
                .outcome-title.allowed { color: #22c55e; }

                .scenario-nav {
                    display: flex;
                    justify-content: center;
                    gap: 0.5rem;
                    margin-bottom: 1rem;
                }

                .nav-btn {
                    padding: 0.5rem 0.75rem;
                    font-size: 0.7rem;
                    background: var(--card, #1e293b) !important;
                }

                .nav-btn.active {
                    background: var(--primary, #6366f1) !important;
                }

                @media (max-width: 600px) {
                    .market-state {
                        grid-template-columns: 1fr;
                    }
                    .comparison-container {
                        grid-template-columns: 1fr;
                    }
                    .scenario-nav {
                        flex-wrap: wrap;
                    }
                }
            </style>

            <h4>Antitrust Intervention Simulator</h4>

            <div class="antitrust-viz">
                <div class="scenario-nav" id="scenario-nav">
                </div>

                <div class="scenario-header">
                    <div class="scenario-name" id="scenario-name">Efficiency Merger</div>
                </div>

                <h5>Current Market State:</h5>
                <div class="market-state">
                    <div class="state-box">
                        <div class="state-label">Number of Firms</div>
                        <div class="state-value firms" id="before-firms">3</div>
                    </div>
                    <div class="state-box">
                        <div class="state-label">Price Level</div>
                        <div class="state-value price">$<span id="before-price">100</span></div>
                    </div>
                    <div class="state-box">
                        <div class="state-label">Efficiency</div>
                        <div class="state-value efficiency"><span id="before-efficiency">70</span>%</div>
                    </div>
                </div>

                <div class="intervention-box">
                    <strong>Proposed Antitrust Action:</strong><br>
                    <span id="intervention-text">Block merger for being "anti-competitive"</span>
                </div>

                <div class="comparison-container" id="comparison">
                    <div class="outcome-box" id="blocked-outcome">
                        <div class="outcome-title blocked">If BLOCKED:</div>
                        <div class="state-label">Firms: <span id="blocked-firms">3</span></div>
                        <div class="state-label">Price: $<span id="blocked-price">100</span></div>
                        <div class="state-label">Efficiency: <span id="blocked-efficiency">70</span>%</div>
                    </div>
                    <div class="outcome-box" id="allowed-outcome">
                        <div class="outcome-title allowed">If ALLOWED:</div>
                        <div class="state-label">Firms: <span id="allowed-firms">2</span></div>
                        <div class="state-label">Price: $<span id="allowed-price">90</span></div>
                        <div class="state-label">Efficiency: <span id="allowed-efficiency">95</span>%</div>
                    </div>
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="block-btn">BLOCK (Enforce Antitrust)</button>
                <button id="allow-btn">ALLOW (No Intervention)</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="result">
                <p id="antitrust-result">Choose whether to enforce antitrust action. See if intervention helps or hurts consumers!</p>
            </div>

            <div class="insight">
                Robert Bork argued that many antitrust actions, designed to protect "competition," actually protect competitors at consumers' expense. The goal should be consumer welfare, not competitor count.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#block-btn').addEventListener('click', () => this.makeChoice('block'));
        this.$('#allow-btn').addEventListener('click', () => this.makeChoice('allow'));
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.renderScenarioNav();
        this.updateDisplay();
    }

    renderScenarioNav() {
        const nav = this.$('#scenario-nav');
        nav.innerHTML = this.scenarios.map((s, i) =>
            `<button class="nav-btn${i === this.currentScenario ? ' active' : ''}" data-index="${i}">${s.name}</button>`
        ).join('');

        nav.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentScenario = parseInt(btn.dataset.index);
                this.showingResult = false;
                this.choice = null;
                this.updateScenarioNav();
                this.updateDisplay();
                this.reset();
            });
        });
    }

    updateScenarioNav() {
        this.$$('.nav-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === this.currentScenario);
        });
    }

    updateDisplay() {
        const scenario = this.scenarios[this.currentScenario];
        this.$('#scenario-name').textContent = scenario.name;
        this.$('#before-firms').textContent = scenario.before.firms;
        this.$('#before-price').textContent = scenario.before.price;
        this.$('#before-efficiency').textContent = scenario.before.efficiency;
        this.$('#intervention-text').textContent = scenario.intervention;

        this.$('#blocked-firms').textContent = scenario.afterBlocked.firms;
        this.$('#blocked-price').textContent = scenario.afterBlocked.price;
        this.$('#blocked-efficiency').textContent = scenario.afterBlocked.efficiency;

        this.$('#allowed-firms').textContent = scenario.afterAllowed.firms;
        this.$('#allowed-price').textContent = scenario.afterAllowed.price;
        this.$('#allowed-efficiency').textContent = scenario.afterAllowed.efficiency;
    }

    makeChoice(choice) {
        this.choice = choice;
        const scenario = this.scenarios[this.currentScenario];

        this.$('#blocked-outcome').classList.remove('selected', 'winner');
        this.$('#allowed-outcome').classList.remove('selected', 'winner');

        if (choice === 'block') {
            this.$('#blocked-outcome').classList.add('selected');
        } else {
            this.$('#allowed-outcome').classList.add('selected');
        }

        const blockedPrice = scenario.afterBlocked.price;
        const allowedPrice = scenario.afterAllowed.price;
        const betterForConsumers = allowedPrice < blockedPrice ? 'allow' : 'block';

        if (betterForConsumers === 'allow') {
            this.$('#allowed-outcome').classList.add('winner');
        } else {
            this.$('#blocked-outcome').classList.add('winner');
        }

        if (choice === 'block' && betterForConsumers === 'allow') {
            this.$('#antitrust-result').innerHTML = `<strong style="color: #ef4444;">THE PARADOX!</strong> ${scenario.explanation}<br><br>Antitrust enforcement RAISED prices from $${allowedPrice} to $${blockedPrice}!`;
        } else if (choice === 'allow' && betterForConsumers === 'allow') {
            this.$('#antitrust-result').innerHTML = `<strong style="color: #22c55e;">CORRECT!</strong> ${scenario.explanation}<br><br>Allowing the practice kept prices lower at $${allowedPrice}.`;
        } else if (choice === 'block' && betterForConsumers === 'block') {
            this.$('#antitrust-result').innerHTML = `<strong style="color: #22c55e;">CORRECT!</strong> This intervention actually helped consumers by keeping prices at $${blockedPrice}.`;
        } else {
            this.$('#antitrust-result').innerHTML = `<strong style="color: #ef4444;">OOPS!</strong> Not intervening allowed prices to rise to $${allowedPrice}. Sometimes antitrust works!`;
        }
    }

    reset() {
        this.choice = null;
        this.$('#blocked-outcome').classList.remove('selected', 'winner');
        this.$('#allowed-outcome').classList.remove('selected', 'winner');
        this.updateDisplay();
        this.$('#antitrust-result').textContent = 'Choose whether to enforce antitrust action. See if intervention helps or hurts consumers!';
    }
}

customElements.define('antitrust-simulator', AntitrustSimulator);

export { AntitrustSimulator };
