import { SimulatorBase } from '../simulator-base.js';

class BanknoteSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            year: 2000,
            cashTransactions: 80,
            cashInCirculation: 100,
            digitalPayments: 20,
            largeNotes: 30
        };
        this.history = [];
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .banknote-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .trend-display {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .trend-card {
                    background: var(--card, #1e293b);
                    padding: 1.25rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .trend-card.declining { border-left: 4px solid #ef4444; }
                .trend-card.rising { border-left: 4px solid #22c55e; }

                .trend-icon {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                }

                .trend-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.25rem;
                }

                .trend-value {
                    font-size: 2rem;
                    font-weight: bold;
                }

                .trend-change {
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                }

                .trend-change.down { color: #ef4444; }
                .trend-change.up { color: #22c55e; }

                .chart-area {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-bottom: 1rem;
                }

                .chart-title {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.75rem;
                    text-align: center;
                }

                .bar-chart {
                    display: flex;
                    justify-content: space-around;
                    align-items: flex-end;
                    height: 120px;
                    gap: 0.5rem;
                }

                .chart-bar {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .bar-fill {
                    width: 100%;
                    max-width: 40px;
                    border-radius: 4px 4px 0 0;
                    transition: height 0.5s;
                }

                .bar-fill.cash-usage { background: linear-gradient(180deg, #ef4444, #dc2626); }
                .bar-fill.cash-supply { background: linear-gradient(180deg, #22c55e, #16a34a); }
                .bar-fill.large-notes { background: linear-gradient(180deg, #f59e0b, #d97706); }

                .bar-label {
                    font-size: 0.7rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.5rem;
                    text-align: center;
                }

                .explanation-cards {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 0.75rem;
                    margin-top: 1rem;
                }

                .explain-card {
                    background: var(--card, #1e293b);
                    padding: 0.75rem;
                    border-radius: 0.5rem;
                    font-size: 0.75rem;
                }

                .explain-title {
                    font-weight: bold;
                    margin-bottom: 0.25rem;
                    color: #f59e0b;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
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
                    color: var(--primary, #6366f1);
                }

                .stat-label {
                    font-size: 0.7rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                @media (max-width: 600px) {
                    .trend-display {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Cash Usage vs. Cash Demand</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">Watch the paradox unfold: cash payments decline while demand for physical currency increases.</p>

            <div class="controls">
                <button id="advance-btn">Advance 5 Years</button>
                <button id="fast-btn">Jump to 2025</button>
                <button id="reset-btn">Reset to 2000</button>
            </div>

            <div class="banknote-viz">
                <div class="trend-display">
                    <div class="trend-card declining">
                        <div class="trend-icon">💳</div>
                        <div class="trend-label">Cash Transactions</div>
                        <div class="trend-value" id="cash-trans">80%</div>
                        <div class="trend-change down" id="trans-change">of payments</div>
                    </div>
                    <div class="trend-card rising">
                        <div class="trend-icon">💵</div>
                        <div class="trend-label">Cash in Circulation</div>
                        <div class="trend-value" id="cash-circ">100</div>
                        <div class="trend-change up" id="circ-change">index (2000=100)</div>
                    </div>
                </div>

                <div class="chart-area">
                    <div class="chart-title">Trends Over Time (Index: 2000 = 100)</div>
                    <div class="bar-chart" id="chart">
                        <div class="chart-bar">
                            <div class="bar-fill cash-usage" id="bar-usage" style="height: 80%"></div>
                            <div class="bar-label">Cash<br>Usage</div>
                        </div>
                        <div class="chart-bar">
                            <div class="bar-fill cash-supply" id="bar-supply" style="height: 100%"></div>
                            <div class="bar-label">Cash<br>Supply</div>
                        </div>
                        <div class="chart-bar">
                            <div class="bar-fill large-notes" id="bar-large" style="height: 30%"></div>
                            <div class="bar-label">Large<br>Notes</div>
                        </div>
                    </div>
                </div>

                <div class="explanation-cards">
                    <div class="explain-card">
                        <div class="explain-title">Store of Value</div>
                        People hold cash as savings, especially in uncertain times or low-interest environments.
                    </div>
                    <div class="explain-card">
                        <div class="explain-title">Shadow Economy</div>
                        Tax evasion and illegal transactions prefer untraceable cash, especially large bills.
                    </div>
                    <div class="explain-card">
                        <div class="explain-title">Global Demand</div>
                        USD and EUR held abroad as stable currency in unstable economies.
                    </div>
                    <div class="explain-card">
                        <div class="explain-title">Crisis Hoarding</div>
                        Economic uncertainty drives precautionary cash holdings.
                    </div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="year-display">2000</div>
                    <div class="stat-label">Year</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="digital-pct">20%</div>
                    <div class="stat-label">Digital Pay</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="large-pct">30%</div>
                    <div class="stat-label">Large Notes</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="paradox-strength">Weak</div>
                    <div class="stat-label">Paradox</div>
                </div>
            </div>

            <div class="result">
                <p id="banknote-result">In 2000, cash is king. Most transactions use physical currency. Advance time to see the paradox emerge.</p>
            </div>

            <div class="insight">
                Despite the "cashless society" narrative, global currency in circulation has grown 3-4x since 2000. The paradox: we use cash less but want more of it.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#advance-btn').addEventListener('click', () => this.advanceTime(5));
        this.$('#fast-btn').addEventListener('click', () => this.jumpTo2025());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.updateDisplay();
    }

    advanceTime(years) {
        this.state.year += years;

        this.state.cashTransactions = Math.max(15, this.state.cashTransactions - years * 3);
        this.state.digitalPayments = 100 - this.state.cashTransactions;

        this.state.cashInCirculation = Math.min(350, this.state.cashInCirculation + years * 8);
        this.state.largeNotes = Math.min(80, this.state.largeNotes + years * 3);

        this.updateDisplay();
        this.updateNarrative();

        this.dispatchSimulatorEvent('banknote-advanced', {
            year: this.state.year,
            cashTrans: this.state.cashTransactions,
            cashCirc: this.state.cashInCirculation
        });
    }

    jumpTo2025() {
        this.state = {
            year: 2025,
            cashTransactions: 20,
            cashInCirculation: 300,
            digitalPayments: 80,
            largeNotes: 70
        };
        this.updateDisplay();
        this.$('#banknote-result').innerHTML = '<strong style="color: #ef4444;">FULL PARADOX!</strong> Cash usage collapsed to 20% of transactions, yet physical currency in circulation has TRIPLED. The less we use cash, the more we hoard it!';
    }

    updateNarrative() {
        const paradoxGap = this.state.cashInCirculation - this.state.cashTransactions;

        if (paradoxGap > 200) {
            this.$('#banknote-result').innerHTML = '<strong style="color: #ef4444;">PARADOX PEAK!</strong> Cash payments rare, but currency hoarding at all-time highs. Store of value trumps medium of exchange.';
            this.$('#paradox-strength').textContent = 'Strong';
            this.$('#paradox-strength').style.color = '#ef4444';
        } else if (paradoxGap > 100) {
            this.$('#banknote-result').innerHTML = '<strong style="color: #f59e0b;">PARADOX GROWING!</strong> Digital payments rising fast, but cash in circulation still increasing. The gap widens...';
            this.$('#paradox-strength').textContent = 'Medium';
            this.$('#paradox-strength').style.color = '#f59e0b';
        } else if (paradoxGap > 30) {
            this.$('#banknote-result').textContent = `Year ${this.state.year}: Cash usage declining as cards and apps grow. But strangely, demand for physical cash keeps rising...`;
            this.$('#paradox-strength').textContent = 'Emerging';
            this.$('#paradox-strength').style.color = '#6366f1';
        } else {
            this.$('#banknote-result').textContent = `Year ${this.state.year}: Cash dominates payments. Currency supply matches usage.`;
            this.$('#paradox-strength').textContent = 'Weak';
        }
    }

    updateDisplay() {
        this.$('#cash-trans').textContent = this.state.cashTransactions + '%';
        this.$('#cash-circ').textContent = this.state.cashInCirculation;

        this.$('#trans-change').textContent = this.state.cashTransactions > 50 ? 'of payments (high)' : 'of payments (declining)';
        this.$('#circ-change').textContent = this.state.cashInCirculation > 200 ? 'index (growing!)' : 'index (2000=100)';

        this.$('#bar-usage').style.height = this.state.cashTransactions + '%';
        this.$('#bar-supply').style.height = Math.min(100, this.state.cashInCirculation / 3.5) + '%';
        this.$('#bar-large').style.height = this.state.largeNotes + '%';

        this.$('#year-display').textContent = this.state.year;
        this.$('#digital-pct').textContent = this.state.digitalPayments + '%';
        this.$('#large-pct').textContent = this.state.largeNotes + '%';
    }

    reset() {
        this.state = {
            year: 2000,
            cashTransactions: 80,
            cashInCirculation: 100,
            digitalPayments: 20,
            largeNotes: 30
        };
        this.$('#paradox-strength').textContent = 'Weak';
        this.$('#paradox-strength').style.color = 'var(--primary, #6366f1)';
        this.$('#banknote-result').textContent = 'In 2000, cash is king. Most transactions use physical currency. Advance time to see the paradox emerge.';
        this.updateDisplay();
    }
}

customElements.define('banknote-simulator', BanknoteSimulator);

export { BanknoteSimulator };
