import { SimulatorBase } from '../simulator-base.js';

class GibsonSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            year: 1880,
            priceLevel: 100,
            inflation: 0,
            interestRate: 4,
            expectedCorrelation: 'positive',
            phase: 'gold-standard'
        };
        this.history = [];
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .gibson-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .era-tabs {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                }

                .era-tab {
                    flex: 1;
                    padding: 0.75rem;
                    background: var(--card, #1e293b);
                    border: 2px solid transparent;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    text-align: center;
                    font-size: 0.8rem;
                }

                .era-tab:hover { border-color: var(--primary, #6366f1); }
                .era-tab.active { border-color: #22c55e; background: rgba(34, 197, 94, 0.1); }

                .correlation-display {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .corr-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .corr-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .corr-value {
                    font-size: 1.75rem;
                    font-weight: bold;
                }

                .corr-value.positive { color: #22c55e; }
                .corr-value.negative { color: #ef4444; }
                .corr-value.neutral { color: #f59e0b; }

                .theory-comparison {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin: 1rem 0;
                }

                .theory-card {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                }

                .theory-card.expected { border: 2px solid #6366f1; }
                .theory-card.observed { border: 2px solid #f59e0b; }

                .theory-title {
                    font-size: 0.875rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .theory-content {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .correlation-visual {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .var-box {
                    text-align: center;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                }

                .var-box.prices { background: rgba(99, 102, 241, 0.2); border: 1px solid #6366f1; }
                .var-box.rates { background: rgba(245, 158, 11, 0.2); border: 1px solid #f59e0b; }
                .var-box.inflation { background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; }

                .var-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .var-label {
                    font-size: 0.7rem;
                    color: var(--muted, #94a3b8);
                }

                .correlation-arrow {
                    font-size: 1.5rem;
                }

                .correlation-arrow.positive { color: #22c55e; }
                .correlation-arrow.negative { color: #ef4444; }

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
                    .correlation-display {
                        grid-template-columns: 1fr;
                    }
                    .theory-comparison {
                        grid-template-columns: 1fr;
                    }
                    .correlation-visual {
                        flex-direction: column;
                    }
                    .correlation-arrow {
                        transform: rotate(90deg);
                    }
                }
            </style>

            <h4>Interest Rates vs. Prices Puzzle</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">Economic theory says interest rates correlate with inflation. Gibson found they correlate with price LEVELS instead!</p>

            <div class="gibson-viz">
                <div class="era-tabs">
                    <div class="era-tab active" data-era="gold-standard">Gold Standard<br>(1880-1914)</div>
                    <div class="era-tab" data-era="interwar">Interwar<br>(1918-1939)</div>
                    <div class="era-tab" data-era="postwar">Post-WWII<br>(1945-1970)</div>
                    <div class="era-tab" data-era="modern">Modern Era<br>(1980-now)</div>
                </div>

                <div class="correlation-display">
                    <div class="corr-box">
                        <div class="corr-label">Price Level</div>
                        <div class="corr-value neutral" id="price-val">100</div>
                    </div>
                    <div class="corr-box">
                        <div class="corr-label">Interest Rate</div>
                        <div class="corr-value neutral" id="rate-val">4.0%</div>
                    </div>
                    <div class="corr-box">
                        <div class="corr-label">Inflation</div>
                        <div class="corr-value neutral" id="inflation-val">0%</div>
                    </div>
                </div>

                <div class="correlation-visual">
                    <div class="var-box prices">
                        <div class="var-value" id="price-display">100</div>
                        <div class="var-label">Price Level</div>
                    </div>
                    <div class="correlation-arrow positive" id="gibson-arrow">+</div>
                    <div class="var-box rates">
                        <div class="var-value" id="rate-display">4%</div>
                        <div class="var-label">Interest Rate</div>
                    </div>
                    <div class="correlation-arrow negative" id="fisher-arrow" style="opacity: 0.3;">?</div>
                    <div class="var-box inflation">
                        <div class="var-value" id="infl-display">0%</div>
                        <div class="var-label">Inflation</div>
                    </div>
                </div>

                <div class="theory-comparison">
                    <div class="theory-card expected">
                        <div class="theory-title">Fisher Effect (Expected)</div>
                        <div class="theory-content">
                            Interest rates should correlate with <strong>inflation</strong> (rate of price change). Higher expected inflation = higher nominal rates.
                        </div>
                    </div>
                    <div class="theory-card observed">
                        <div class="theory-title">Gibson's Paradox (Observed)</div>
                        <div class="theory-content">
                            Interest rates actually correlate with <strong>price level</strong> (absolute prices). High prices = high rates, regardless of inflation direction.
                        </div>
                    </div>
                </div>
            </div>

            <div class="controls">
                <button id="simulate-btn">Simulate Decade</button>
                <button id="shock-btn">Price Shock</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="year-display">1880</div>
                    <div class="stat-label">Year</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="gibson-corr">+0.8</div>
                    <div class="stat-label">Gibson Corr</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="fisher-corr">+0.1</div>
                    <div class="stat-label">Fisher Corr</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="paradox-status">Active</div>
                    <div class="stat-label">Paradox</div>
                </div>
            </div>

            <div class="result">
                <p id="gibson-result">Select an era to see how the Gibson Paradox manifested. The correlation between prices and interest rates puzzled economists for over a century.</p>
            </div>

            <div class="insight">
                Keynes called it "one of the most completely established empirical facts in the whole field of quantitative economics." Yet no fully satisfying explanation exists.
            </div>
        `;
    }

    setupEventListeners() {
        this.$$('.era-tab').forEach(tab => {
            tab.addEventListener('click', () => this.selectEra(tab.dataset.era));
        });
        this.$('#simulate-btn').addEventListener('click', () => this.simulateDecade());
        this.$('#shock-btn').addEventListener('click', () => this.priceShock());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.updateDisplay();
    }

    selectEra(era) {
        this.state.phase = era;
        this.$$('.era-tab').forEach(tab => tab.classList.remove('active'));
        this.$(`.era-tab[data-era="${era}"]`).classList.add('active');

        const eraData = {
            'gold-standard': { year: 1880, price: 100, rate: 4, inflation: 0, gibsonCorr: 0.8, fisherCorr: 0.1 },
            'interwar': { year: 1920, price: 200, rate: 5, inflation: -2, gibsonCorr: 0.7, fisherCorr: 0.2 },
            'postwar': { year: 1950, price: 250, rate: 3, inflation: 2, gibsonCorr: 0.6, fisherCorr: 0.3 },
            'modern': { year: 1990, price: 400, rate: 6, inflation: 3, gibsonCorr: 0.3, fisherCorr: 0.7 }
        };

        const data = eraData[era];
        this.state.year = data.year;
        this.state.priceLevel = data.price;
        this.state.interestRate = data.rate;
        this.state.inflation = data.inflation;

        this.$('#gibson-corr').textContent = '+' + data.gibsonCorr.toFixed(1);
        this.$('#fisher-corr').textContent = '+' + data.fisherCorr.toFixed(1);

        this.updateDisplay();
        this.updateNarrative(era);
    }

    simulateDecade() {
        this.state.year += 10;

        const priceChange = (Math.random() - 0.3) * 30;
        this.state.priceLevel = Math.max(50, this.state.priceLevel + priceChange);
        this.state.inflation = priceChange / 10;

        if (this.state.phase === 'gold-standard' || this.state.phase === 'interwar') {
            this.state.interestRate = 2 + (this.state.priceLevel / 50);
        } else {
            this.state.interestRate = 2 + this.state.inflation * 0.8 + (this.state.priceLevel / 100) * 0.3;
        }

        this.state.interestRate = Math.max(0.5, Math.min(15, this.state.interestRate));

        this.updateDisplay();

        const isParadox = this.state.phase !== 'modern';
        this.$('#gibson-result').textContent = isParadox
            ? `Year ${this.state.year}: Prices ${priceChange > 0 ? 'rose' : 'fell'}, and interest rates ${this.state.interestRate > 4 ? 'high' : 'low'}. Price-rate correlation persists!`
            : `Year ${this.state.year}: Modern era shows weaker Gibson effect as Fisher effect becomes dominant.`;

        this.dispatchSimulatorEvent('gibson-simulated', {
            year: this.state.year,
            priceLevel: this.state.priceLevel,
            rate: this.state.interestRate
        });
    }

    priceShock() {
        const shock = 50;
        this.state.priceLevel += shock;
        this.state.inflation = 5;

        if (this.state.phase === 'gold-standard' || this.state.phase === 'interwar') {
            this.state.interestRate += 1.5;
        } else {
            this.state.interestRate += 0.5;
        }

        this.updateDisplay();
        this.$('#gibson-result').innerHTML = '<strong style="color: #f59e0b;">PRICE SHOCK!</strong> Prices jumped. Watch: interest rates follow the price LEVEL, not just the inflation rate. This is Gibson\'s Paradox!';
    }

    updateNarrative(era) {
        const narratives = {
            'gold-standard': 'Under the gold standard, the Gibson Paradox was strongest. Prices and rates moved together over long cycles, defying the Fisher Effect.',
            'interwar': 'The interwar period saw deflation and volatile prices. Yet the price-rate correlation remained strong, puzzling economists.',
            'postwar': 'After WWII, the paradox weakened as central banks began actively managing inflation expectations.',
            'modern': 'In the modern era, the Fisher Effect dominates as markets focus on inflation expectations. Gibson\'s Paradox has largely disappeared.'
        };
        this.$('#gibson-result').textContent = narratives[era];

        const isParadox = era !== 'modern';
        this.$('#paradox-status').textContent = isParadox ? 'Active' : 'Weak';
        this.$('#paradox-status').style.color = isParadox ? '#ef4444' : '#22c55e';
    }

    updateDisplay() {
        this.$('#price-val').textContent = Math.round(this.state.priceLevel);
        this.$('#rate-val').textContent = this.state.interestRate.toFixed(1) + '%';
        this.$('#inflation-val').textContent = (this.state.inflation >= 0 ? '+' : '') + this.state.inflation.toFixed(1) + '%';

        this.$('#price-display').textContent = Math.round(this.state.priceLevel);
        this.$('#rate-display').textContent = this.state.interestRate.toFixed(1) + '%';
        this.$('#infl-display').textContent = (this.state.inflation >= 0 ? '+' : '') + this.state.inflation.toFixed(1) + '%';

        this.$('#year-display').textContent = this.state.year;

        const isParadox = this.state.phase !== 'modern';
        this.$('#gibson-arrow').textContent = isParadox ? '+' : '~';
        this.$('#gibson-arrow').style.opacity = isParadox ? '1' : '0.3';
        this.$('#fisher-arrow').style.opacity = isParadox ? '0.3' : '1';
    }

    reset() {
        this.selectEra('gold-standard');
    }
}

customElements.define('gibson-simulator', GibsonSimulator);

export { GibsonSimulator };
