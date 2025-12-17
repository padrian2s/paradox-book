import { SimulatorBase } from '../simulator-base.js';

class ChainstoreSimulator extends SimulatorBase {
    constructor() {
        super();
        this.markets = 20;
        this.currentMarket = 1;
        this.chainstoreReputation = 'aggressive';
        this.history = [];
        this.chainstoreProfit = 0;
        this.entrantProfits = 0;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .chainstore-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .game-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .stat-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    flex: 1;
                    min-width: 100px;
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .stat-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .market-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
                    gap: 0.5rem;
                    margin: 1rem 0;
                }

                .market-cell {
                    width: 40px;
                    height: 40px;
                    border-radius: 0.25rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    background: var(--card, #1e293b);
                    color: var(--muted, #94a3b8);
                }

                .market-cell.current {
                    background: var(--primary, #6366f1);
                    color: white;
                    animation: pulse 1s infinite;
                }

                .market-cell.monopoly {
                    background: #22c55e;
                    color: white;
                }

                .market-cell.fought {
                    background: #ef4444;
                    color: white;
                }

                .market-cell.shared {
                    background: #f59e0b;
                    color: white;
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                .scenario-box {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .scenario-title {
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                    margin-bottom: 1rem;
                }

                .payoff-matrix {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .payoff-cell {
                    background: var(--bg, #0f172a);
                    padding: 0.75rem;
                    border-radius: 0.25rem;
                    text-align: center;
                }

                .payoff-cell.highlight {
                    border: 2px solid var(--accent, #f59e0b);
                }

                .theory-prediction {
                    background: rgba(239, 68, 68, 0.2);
                    border: 1px solid #ef4444;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                @media (max-width: 600px) {
                    .market-cell {
                        width: 30px;
                        height: 30px;
                        font-size: 0.75rem;
                    }
                }
            </style>

            <h4>The Chainstore Game</h4>

            <div class="chainstore-viz">
                <div class="game-header">
                    <div class="stat-box">
                        <div class="stat-label">Market</div>
                        <div class="stat-value"><span id="current-market">1</span>/20</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label">Chainstore Profit</div>
                        <div class="stat-value">$<span id="chain-profit">0</span></div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label">Entrants Profit</div>
                        <div class="stat-value">$<span id="entrant-profit">0</span></div>
                    </div>
                </div>

                <div class="market-grid" id="market-grid">
                </div>

                <div class="scenario-box">
                    <div class="scenario-title">Market <span id="scenario-market">1</span>: New Entrant Decision</div>
                    <p>A potential competitor is deciding whether to enter this market.</p>

                    <div class="payoff-matrix">
                        <div class="payoff-cell">
                            <strong>Stay Out</strong><br>
                            Chain: $5, Entrant: $0
                        </div>
                        <div class="payoff-cell highlight" id="enter-payoff">
                            <strong>Enter</strong><br>
                            <span id="enter-outcome">Chain: $2, Entrant: $2</span>
                        </div>
                    </div>

                    <div class="theory-prediction">
                        <strong>Backward Induction Says:</strong><br>
                        <span id="theory-text">In market 20, fighting never pays. Knowing this, market 19 entrant enters. Knowing THAT, market 18... all the way back. Entrant should ALWAYS enter!</span>
                    </div>
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="enter-btn">Entrant: ENTER</button>
                <button id="stay-btn">Entrant: STAY OUT</button>
                <button id="reset-btn">Reset Game</button>
            </div>

            <div class="result">
                <p id="chainstore-result">Simulate the sequential entry game. Game theory predicts all entrants should enter, but real chainstores fight to build reputation!</p>
            </div>

            <div class="insight">
                Selten's paradox: Backward induction says the chainstore should never fight (it's costly). But if it never fights, everyone enters! Real firms fight early to deter later entry - rational irrationality.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#enter-btn').addEventListener('click', () => this.entrantEnters());
        this.$('#stay-btn').addEventListener('click', () => this.entrantStaysOut());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.renderMarketGrid();
    }

    renderMarketGrid() {
        const grid = this.$('#market-grid');
        grid.innerHTML = Array.from({ length: this.markets }, (_, i) => {
            const marketNum = i + 1;
            let className = 'market-cell';
            if (marketNum === this.currentMarket) className += ' current';
            else if (marketNum < this.currentMarket) {
                const result = this.history[i];
                if (result === 'monopoly') className += ' monopoly';
                else if (result === 'fought') className += ' fought';
                else if (result === 'shared') className += ' shared';
            }
            return `<div class="${className}">${marketNum}</div>`;
        }).join('');
    }

    entrantEnters() {
        const shouldFight = this.currentMarket <= 15 && Math.random() < 0.7;

        if (shouldFight) {
            this.chainstoreProfit -= 1;
            this.entrantProfits -= 1;
            this.history.push('fought');
            this.$('#chainstore-result').innerHTML = `<strong style="color: #ef4444;">CHAINSTORE FIGHTS!</strong> Both lose money (-$1 each), but the chainstore builds reputation. Theory says this is irrational, but it deters future entry!`;
        } else {
            this.chainstoreProfit += 2;
            this.entrantProfits += 2;
            this.history.push('shared');
            this.$('#chainstore-result').innerHTML = `Market ${this.currentMarket}: Chainstore accommodates. Both earn $2. Rational for this market, but invites more entry!`;
        }

        this.nextMarket();
    }

    entrantStaysOut() {
        this.chainstoreProfit += 5;
        this.history.push('monopoly');
        this.$('#chainstore-result').textContent = `Market ${this.currentMarket}: Entrant stays out. Chainstore earns monopoly profit ($5). Reputation works!`;
        this.nextMarket();
    }

    nextMarket() {
        this.currentMarket++;
        this.$('#current-market').textContent = this.currentMarket;
        this.$('#scenario-market').textContent = this.currentMarket;
        this.$('#chain-profit').textContent = this.chainstoreProfit;
        this.$('#entrant-profit').textContent = this.entrantProfits;
        this.renderMarketGrid();

        if (this.currentMarket > this.markets) {
            this.$('#enter-btn').disabled = true;
            this.$('#stay-btn').disabled = true;
            const fightCount = this.history.filter(h => h === 'fought').length;
            const enterCount = this.history.filter(h => h !== 'monopoly').length;
            this.$('#chainstore-result').innerHTML = `<strong>GAME OVER!</strong> Chainstore fought ${fightCount} times. ${enterCount} entrants entered. Theory predicted ALL would enter, but reputation-building changed behavior!`;
            this.$('#theory-text').textContent = 'THE PARADOX: Backward induction failed! Real behavior involves reputation and deterrence that pure game theory misses.';
        } else {
            const remaining = this.markets - this.currentMarket + 1;
            this.$('#theory-text').textContent = `${remaining} markets left. Backward induction from market 20 still says "enter" - but the chainstore's reputation matters!`;
        }
    }

    reset() {
        this.currentMarket = 1;
        this.chainstoreProfit = 0;
        this.entrantProfits = 0;
        this.history = [];

        this.$('#current-market').textContent = '1';
        this.$('#scenario-market').textContent = '1';
        this.$('#chain-profit').textContent = '0';
        this.$('#entrant-profit').textContent = '0';
        this.$('#enter-btn').disabled = false;
        this.$('#stay-btn').disabled = false;
        this.$('#chainstore-result').textContent = 'Simulate the sequential entry game. Game theory predicts all entrants should enter, but real chainstores fight to build reputation!';
        this.$('#theory-text').textContent = 'In market 20, fighting never pays. Knowing this, market 19 entrant enters. Knowing THAT, market 18... all the way back. Entrant should ALWAYS enter!';
        this.renderMarketGrid();
    }
}

customElements.define('chainstore-simulator', ChainstoreSimulator);

export { ChainstoreSimulator };
