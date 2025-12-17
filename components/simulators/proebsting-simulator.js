import { SimulatorBase } from '../simulator-base.js';

class ProebstingSimulator extends SimulatorBase {
    constructor() {
        super();
        this.bankroll = 1000;
        this.initialBankroll = 1000;
        this.rounds = 0;
        this.history = [];
        this.kellyFraction = 0.25;
        this.edge = 0.1;
        this.oddsHistory = [];
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .proebsting-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .bankroll-display {
                    text-align: center;
                    margin-bottom: 1.5rem;
                }

                .bankroll-value {
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .bankroll-change {
                    font-size: 1rem;
                    margin-top: 0.25rem;
                }

                .bankroll-change.positive { color: #22c55e; }
                .bankroll-change.negative { color: #ef4444; }

                .betting-scenario {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-bottom: 1rem;
                }

                .scenario-title {
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                    margin-bottom: 0.5rem;
                }

                .odds-display {
                    display: flex;
                    justify-content: space-around;
                    margin: 1rem 0;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }

                .odds-item {
                    text-align: center;
                    padding: 0.5rem 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.25rem;
                }

                .odds-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .odds-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                }

                .kelly-bet {
                    text-align: center;
                    padding: 1rem;
                    background: rgba(99, 102, 241, 0.2);
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .bet-amount {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .history-section {
                    max-height: 150px;
                    overflow-y: auto;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    padding: 0.5rem;
                }

                .history-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.25rem 0.5rem;
                    font-size: 0.75rem;
                    border-bottom: 1px solid var(--bg, #0f172a);
                }

                .history-item.win { color: #22c55e; }
                .history-item.loss { color: #ef4444; }

                .warning-box {
                    background: rgba(239, 68, 68, 0.2);
                    border: 1px solid #ef4444;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                    text-align: center;
                    display: none;
                }

                .warning-box.visible {
                    display: block;
                }

                @media (max-width: 600px) {
                    .bankroll-value {
                        font-size: 2rem;
                    }
                }
            </style>

            <h4>Kelly Criterion Betting Trap</h4>

            <div class="proebsting-viz">
                <div class="bankroll-display">
                    <div class="bankroll-value">$<span id="bankroll">1000</span></div>
                    <div class="bankroll-change" id="bankroll-change"></div>
                </div>

                <div class="betting-scenario">
                    <div class="scenario-title">Current Bet Opportunity</div>
                    <div class="odds-display">
                        <div class="odds-item">
                            <div class="odds-label">True Win Prob</div>
                            <div class="odds-value" id="true-prob">55%</div>
                        </div>
                        <div class="odds-item">
                            <div class="odds-label">Offered Odds</div>
                            <div class="odds-value" id="offered-odds">1:1</div>
                        </div>
                        <div class="odds-item">
                            <div class="odds-label">Edge</div>
                            <div class="odds-value" id="edge">+10%</div>
                        </div>
                    </div>
                    <div class="kelly-bet">
                        <div>Kelly Criterion Bet:</div>
                        <div class="bet-amount">$<span id="kelly-bet">250</span> (<span id="kelly-pct">25</span>%)</div>
                    </div>
                </div>

                <div class="warning-box" id="warning-box">
                    <strong>PROEBSTING'S PARADOX!</strong><br>
                    The bookie offered better odds on the same bet. Kelly says bet more!<br>
                    But now you're overexposed to a single outcome.
                </div>

                <div class="history-section" id="history">
                    <div style="text-align: center; color: var(--muted, #94a3b8);">Betting history will appear here</div>
                </div>
            </div>

            <div class="controls" style="margin-top: 1rem;">
                <button id="bet-btn">Place Kelly Bet</button>
                <button id="better-odds-btn">Bookie Offers Better Odds!</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="result">
                <p id="proebsting-result">The Kelly Criterion is optimal for repeated bets with fixed odds. But what if the odds change mid-bet?</p>
            </div>

            <div class="insight">
                Proebsting showed that if a bookie offers improving odds on a bet you've already made, Kelly says to bet more - but this can lead to ruin even with a positive edge!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#bet-btn').addEventListener('click', () => this.placeBet());
        this.$('#better-odds-btn').addEventListener('click', () => this.offerBetterOdds());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.updateDisplay();
    }

    updateDisplay() {
        this.$('#bankroll').textContent = Math.round(this.bankroll);
        const kellyBet = Math.round(this.bankroll * this.kellyFraction);
        this.$('#kelly-bet').textContent = kellyBet;
        this.$('#kelly-pct').textContent = Math.round(this.kellyFraction * 100);
    }

    placeBet() {
        const betAmount = this.bankroll * this.kellyFraction;
        const win = Math.random() < 0.55;

        if (win) {
            this.bankroll += betAmount;
            this.history.push({ type: 'win', amount: betAmount, bankroll: this.bankroll });
            this.$('#bankroll-change').textContent = `+$${Math.round(betAmount)}`;
            this.$('#bankroll-change').className = 'bankroll-change positive';
        } else {
            this.bankroll -= betAmount;
            this.history.push({ type: 'loss', amount: betAmount, bankroll: this.bankroll });
            this.$('#bankroll-change').textContent = `-$${Math.round(betAmount)}`;
            this.$('#bankroll-change').className = 'bankroll-change negative';
        }

        this.rounds++;
        this.updateDisplay();
        this.updateHistory();

        if (this.bankroll < 10) {
            this.$('#proebsting-result').innerHTML = '<strong style="color: #ef4444;">RUIN!</strong> Despite having a positive edge, you went broke. The Kelly Criterion failed when odds changed dynamically.';
        }
    }

    offerBetterOdds() {
        const currentOdds = 1;
        const newOdds = currentOdds + 0.5;
        this.$('#offered-odds').textContent = `${newOdds}:1`;

        const newKelly = (0.55 * (newOdds + 1) - 1) / newOdds;
        this.kellyFraction = Math.min(0.9, this.kellyFraction + newKelly);

        this.$('#warning-box').classList.add('visible');
        this.updateDisplay();

        this.$('#proebsting-result').innerHTML = `<strong style="color: #ef4444;">THE TRAP!</strong> Better odds mean Kelly says bet ${Math.round(this.kellyFraction * 100)}% of your bankroll! But you already have exposure from previous bets. If you lose, you lose EVERYTHING bet on this outcome.`;

        this.oddsHistory.push(newOdds);

        if (this.oddsHistory.length > 2) {
            this.$('#proebsting-result').innerHTML += '<br><br>Keep clicking for better odds - watch how Kelly leads you to over-leverage!';
        }
    }

    updateHistory() {
        const historyEl = this.$('#history');
        historyEl.innerHTML = this.history.slice(-10).reverse().map(h =>
            `<div class="history-item ${h.type}">
                <span>Round ${this.history.indexOf(h) + 1}</span>
                <span>${h.type === 'win' ? '+' : '-'}$${Math.round(h.amount)}</span>
                <span>$${Math.round(h.bankroll)}</span>
            </div>`
        ).join('');
    }

    reset() {
        this.bankroll = 1000;
        this.rounds = 0;
        this.history = [];
        this.kellyFraction = 0.25;
        this.oddsHistory = [];

        this.$('#offered-odds').textContent = '1:1';
        this.$('#warning-box').classList.remove('visible');
        this.$('#bankroll-change').textContent = '';
        this.$('#history').innerHTML = '<div style="text-align: center; color: var(--muted, #94a3b8);">Betting history will appear here</div>';
        this.$('#proebsting-result').textContent = 'The Kelly Criterion is optimal for repeated bets with fixed odds. But what if the odds change mid-bet?';
        this.updateDisplay();
    }
}

customElements.define('proebsting-simulator', ProebstingSimulator);

export { ProebstingSimulator };
