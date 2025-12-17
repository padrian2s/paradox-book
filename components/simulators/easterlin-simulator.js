import { SimulatorBase } from '../simulator-base.js';

class EasterlinSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            income: 50000,
            baselineHappiness: 5
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .happiness-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .income-display {
                    text-align: center;
                    margin-bottom: 1.5rem;
                }

                .income-value {
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: #22c55e;
                }

                .happiness-meter {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .happiness-label {
                    width: 100px;
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .happiness-bar {
                    flex: 1;
                    height: 30px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 15px;
                    overflow: hidden;
                }

                .happiness-fill {
                    height: 100%;
                    border-radius: 15px;
                    transition: width 0.5s ease;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    padding-right: 1rem;
                    font-weight: bold;
                }

                .happiness-fill.low {
                    background: linear-gradient(90deg, #ef4444, #f59e0b);
                }

                .happiness-fill.mid {
                    background: linear-gradient(90deg, #f59e0b, #22c55e);
                }

                .happiness-fill.high {
                    background: linear-gradient(90deg, #22c55e, #22c55e);
                }

                .factors-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 1rem;
                    margin-top: 1.5rem;
                }

                .factor-card {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .factor-icon {
                    font-size: 1.5rem;
                    margin-bottom: 0.5rem;
                }

                .factor-name {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.25rem;
                }

                .factor-status {
                    font-weight: bold;
                }

                .factor-status.met {
                    color: #22c55e;
                }

                .factor-status.unmet {
                    color: #ef4444;
                }

                .chart-container {
                    margin-top: 1.5rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .chart-title {
                    font-weight: bold;
                    margin-bottom: 1rem;
                }

                .chart-bar {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                }

                .chart-label {
                    width: 80px;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .chart-fill {
                    height: 20px;
                    background: var(--primary, #6366f1);
                    border-radius: 4px;
                    transition: width 0.5s ease;
                }

                .chart-fill.current {
                    background: #f59e0b;
                }

                .threshold-line {
                    margin-top: 1rem;
                    padding: 0.75rem;
                    background: rgba(245, 158, 11, 0.1);
                    border-left: 3px solid #f59e0b;
                    font-size: 0.875rem;
                }

                @media (max-width: 600px) {
                    .happiness-meter {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                    .happiness-label {
                        width: auto;
                    }
                    .happiness-bar {
                        width: 100%;
                    }
                }
            </style>

            <h4>Income vs. Happiness</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">Richard Easterlin found that beyond a certain income, happiness plateaus.</p>

            <div class="controls">
                <div class="control-group">
                    <label>Annual Income</label>
                    <input type="range" id="income-slider" min="10000" max="500000" step="5000" value="50000">
                </div>
                <button id="show-countries">Compare Countries</button>
            </div>

            <div class="happiness-viz">
                <div class="income-display">
                    <div class="income-value">$<span id="income-val">50,000</span></div>
                    <div style="color: var(--muted);">Annual Household Income</div>
                </div>

                <div class="happiness-meter">
                    <div class="happiness-label">Happiness</div>
                    <div class="happiness-bar">
                        <div class="happiness-fill mid" id="happiness-fill" style="width: 65%">
                            <span id="happiness-score">6.5</span>/10
                        </div>
                    </div>
                </div>

                <div class="factors-grid">
                    <div class="factor-card">
                        <div class="factor-icon">🏠</div>
                        <div class="factor-name">Basic Shelter</div>
                        <div class="factor-status met" id="factor-shelter">Met</div>
                    </div>
                    <div class="factor-card">
                        <div class="factor-icon">🍽️</div>
                        <div class="factor-name">Food Security</div>
                        <div class="factor-status met" id="factor-food">Met</div>
                    </div>
                    <div class="factor-card">
                        <div class="factor-icon">🏥</div>
                        <div class="factor-name">Healthcare</div>
                        <div class="factor-status met" id="factor-health">Met</div>
                    </div>
                    <div class="factor-card">
                        <div class="factor-icon">🚗</div>
                        <div class="factor-name">Transportation</div>
                        <div class="factor-status met" id="factor-transport">Met</div>
                    </div>
                    <div class="factor-card">
                        <div class="factor-icon">✈️</div>
                        <div class="factor-name">Luxury Travel</div>
                        <div class="factor-status unmet" id="factor-luxury">Unmet</div>
                    </div>
                    <div class="factor-card">
                        <div class="factor-icon">🏝️</div>
                        <div class="factor-name">Second Home</div>
                        <div class="factor-status unmet" id="factor-second">Unmet</div>
                    </div>
                </div>

                <div class="chart-container" id="chart-section">
                    <div class="chart-title">Happiness by Income Level</div>
                    <div class="chart-bar">
                        <span class="chart-label">$25K</span>
                        <div class="chart-fill" style="width: 45%"></div>
                        <span>4.5</span>
                    </div>
                    <div class="chart-bar">
                        <span class="chart-label">$50K</span>
                        <div class="chart-fill" style="width: 65%"></div>
                        <span>6.5</span>
                    </div>
                    <div class="chart-bar">
                        <span class="chart-label">$75K</span>
                        <div class="chart-fill" style="width: 72%"></div>
                        <span>7.2</span>
                    </div>
                    <div class="chart-bar">
                        <span class="chart-label">$100K</span>
                        <div class="chart-fill" style="width: 75%"></div>
                        <span>7.5</span>
                    </div>
                    <div class="chart-bar">
                        <span class="chart-label">$200K</span>
                        <div class="chart-fill" style="width: 77%"></div>
                        <span>7.7</span>
                    </div>
                    <div class="chart-bar">
                        <span class="chart-label">$500K</span>
                        <div class="chart-fill" style="width: 78%"></div>
                        <span>7.8</span>
                    </div>
                    <div class="threshold-line">
                        The happiness curve flattens around $75,000. Beyond this point, each additional dollar buys very little additional happiness.
                    </div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Move the slider to see how income affects happiness - and where the paradox kicks in.</p>
            </div>

            <div class="insight">
                Easterlin's research shows that once basic needs are met, factors like relationships, purpose, and health matter far more than additional income. We adapt to wealth (hedonic adaptation), always wanting more.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#income-slider').addEventListener('input', () => this.updateHappiness());
        this.$('#show-countries').addEventListener('click', () => this.showCountries());
        this.updateHappiness();
    }

    updateHappiness() {
        const income = parseInt(this.$('#income-slider').value);
        this.$('#income-val').textContent = income.toLocaleString();

        let happiness;
        if (income < 25000) {
            happiness = 3 + (income / 25000) * 2;
        } else if (income < 75000) {
            happiness = 5 + ((income - 25000) / 50000) * 2.5;
        } else if (income < 150000) {
            happiness = 7.5 + ((income - 75000) / 75000) * 0.3;
        } else {
            happiness = 7.8 + Math.min(0.2, (income - 150000) / 1000000);
        }

        happiness = Math.min(10, happiness);
        this.$('#happiness-score').textContent = happiness.toFixed(1);
        this.$('#happiness-fill').style.width = (happiness * 10) + '%';

        if (happiness < 5) {
            this.$('#happiness-fill').className = 'happiness-fill low';
        } else if (happiness < 7.5) {
            this.$('#happiness-fill').className = 'happiness-fill mid';
        } else {
            this.$('#happiness-fill').className = 'happiness-fill high';
        }

        this.updateFactors(income);
        this.updateExplanation(income, happiness);
    }

    updateFactors(income) {
        const setStatus = (id, met) => {
            const el = this.$(`#${id}`);
            el.textContent = met ? 'Met' : 'Unmet';
            el.className = 'factor-status ' + (met ? 'met' : 'unmet');
        };

        setStatus('factor-shelter', income >= 20000);
        setStatus('factor-food', income >= 15000);
        setStatus('factor-health', income >= 30000);
        setStatus('factor-transport', income >= 35000);
        setStatus('factor-luxury', income >= 100000);
        setStatus('factor-second', income >= 300000);
    }

    updateExplanation(income, happiness) {
        let text;
        if (income < 30000) {
            text = `At $${income.toLocaleString()}, basic needs are strained. More money here would significantly improve wellbeing.`;
        } else if (income < 75000) {
            text = `At $${income.toLocaleString()}, you're in the "sweet spot" where income still correlates with happiness gains.`;
        } else if (income < 150000) {
            text = `<strong style="color: #f59e0b;">PARADOX ZONE:</strong> At $${income.toLocaleString()}, you're beyond the threshold. Happiness gains are now minimal despite significant income increases.`;
        } else {
            text = `<strong style="color: #f59e0b;">DEEP IN THE PARADOX:</strong> At $${income.toLocaleString()}, you're 3-6x the threshold but only marginally happier. The extra money buys luxury, not joy.`;
        }
        this.$('#result-text').innerHTML = text;
    }

    showCountries() {
        this.$('#chart-section').innerHTML = `
            <div class="chart-title">Happiness vs. GDP per Capita by Country</div>
            <div class="chart-bar">
                <span class="chart-label">Costa Rica</span>
                <div class="chart-fill" style="width: 73%; background: #22c55e;"></div>
                <span>7.3 ($12K)</span>
            </div>
            <div class="chart-bar">
                <span class="chart-label">Denmark</span>
                <div class="chart-fill" style="width: 76%; background: #6366f1;"></div>
                <span>7.6 ($60K)</span>
            </div>
            <div class="chart-bar">
                <span class="chart-label">USA</span>
                <div class="chart-fill" style="width: 70%; background: #6366f1;"></div>
                <span>7.0 ($65K)</span>
            </div>
            <div class="chart-bar">
                <span class="chart-label">Japan</span>
                <div class="chart-fill" style="width: 62%; background: #6366f1;"></div>
                <span>6.2 ($40K)</span>
            </div>
            <div class="chart-bar">
                <span class="chart-label">Qatar</span>
                <div class="chart-fill" style="width: 64%; background: #f59e0b;"></div>
                <span>6.4 ($100K)</span>
            </div>
            <div class="threshold-line">
                Costa Rica ($12K GDP/capita) is nearly as happy as Denmark ($60K). Qatar ($100K) is less happy than many poorer nations. National wealth doesn't guarantee national happiness.
            </div>
        `;
    }
}

customElements.define('easterlin-simulator', EasterlinSimulator);

export { EasterlinSimulator };
