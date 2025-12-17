import { SimulatorBase } from '../simulator-base.js';

class DeatonSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            year: 1,
            income: [],
            consumption: [],
            predicted: [],
            smoothingFactor: 0.7
        };
        this.generateData();
    }

    generateData() {
        this.state.income = [];
        this.state.consumption = [];
        this.state.predicted = [];

        let baseIncome = 50000;
        let baseConsumption = 45000;

        for (let i = 0; i < 20; i++) {
            const incomeShock = (Math.random() - 0.5) * 20000;
            const income = baseIncome + incomeShock + i * 1000;
            this.state.income.push(income);

            const predictedChange = incomeShock * 0.8;
            this.state.predicted.push(baseConsumption + predictedChange + i * 800);

            const actualChange = incomeShock * (1 - this.state.smoothingFactor) * 0.5;
            baseConsumption = baseConsumption * 0.95 + income * 0.05;
            const consumption = baseConsumption + actualChange + i * 800;
            this.state.consumption.push(consumption);
        }
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .deaton-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .chart-container {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    margin-bottom: 1rem;
                }

                .chart-title {
                    text-align: center;
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.75rem;
                }

                .line-chart {
                    height: 200px;
                    display: flex;
                    align-items: flex-end;
                    gap: 2px;
                    padding: 0 0.5rem;
                }

                .chart-column {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2px;
                    height: 100%;
                    justify-content: flex-end;
                }

                .bar-segment {
                    width: 100%;
                    border-radius: 2px;
                    transition: height 0.3s;
                }

                .bar-income { background: #6366f1; }
                .bar-consumption { background: #22c55e; }
                .bar-predicted { background: #ef4444; opacity: 0.5; }

                .legend {
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    margin-top: 1rem;
                    flex-wrap: wrap;
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.75rem;
                }

                .legend-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 2px;
                }

                .comparison-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .compare-card {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .compare-card.theory { border: 2px solid #ef4444; }
                .compare-card.reality { border: 2px solid #22c55e; }

                .compare-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .compare-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .compare-stat {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .volatility-meter {
                    margin-top: 1rem;
                }

                .meter-labels {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.25rem;
                }

                .meter-bar {
                    height: 24px;
                    background: var(--card, #1e293b);
                    border-radius: 12px;
                    overflow: hidden;
                    position: relative;
                }

                .meter-fill {
                    height: 100%;
                    transition: width 0.5s;
                }

                .meter-marker {
                    position: absolute;
                    top: 0;
                    height: 100%;
                    width: 3px;
                    background: white;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
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
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                @media (max-width: 600px) {
                    .comparison-grid {
                        grid-template-columns: 1fr;
                    }
                    .line-chart {
                        height: 150px;
                    }
                }
            </style>

            <h4>Consumption Smoothing Mystery</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">Lifecycle theory predicts consumption should track income. Reality: consumption is much smoother. Why?</p>

            <div class="controls">
                <div class="control-group">
                    <label>Smoothing Factor: <span id="smooth-val">70</span>%</label>
                    <input type="range" id="smooth-slider" min="0" max="100" value="70">
                </div>
                <button id="generate-btn">New Income Path</button>
                <button id="shock-btn">Income Shock!</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="deaton-viz">
                <div class="chart-container">
                    <div class="chart-title">Income vs. Consumption Over 20 Years</div>
                    <div class="line-chart" id="chart"></div>
                    <div class="legend">
                        <div class="legend-item">
                            <div class="legend-dot" style="background: #6366f1;"></div>
                            <span>Income</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-dot" style="background: #22c55e;"></div>
                            <span>Actual Consumption</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-dot" style="background: #ef4444; opacity: 0.5;"></div>
                            <span>Predicted (Theory)</span>
                        </div>
                    </div>
                </div>

                <div class="comparison-grid">
                    <div class="compare-card theory">
                        <div class="compare-label">Lifecycle/PIH Theory Predicts</div>
                        <div class="compare-title">Consumption Volatility</div>
                        <div class="compare-stat" id="predicted-vol">High</div>
                        <div style="font-size: 0.7rem; color: var(--muted);">Should match income changes</div>
                    </div>
                    <div class="compare-card reality">
                        <div class="compare-label">Observed Reality</div>
                        <div class="compare-title">Consumption Volatility</div>
                        <div class="compare-stat" id="actual-vol">Low</div>
                        <div style="font-size: 0.7rem; color: var(--muted);">Much smoother than income</div>
                    </div>
                </div>

                <div class="volatility-meter">
                    <div class="meter-labels">
                        <span>Smooth</span>
                        <span>Consumption Volatility Ratio</span>
                        <span>Volatile</span>
                    </div>
                    <div class="meter-bar">
                        <div class="meter-fill" id="vol-fill" style="width: 30%; background: linear-gradient(90deg, #22c55e, #f59e0b, #ef4444);"></div>
                        <div class="meter-marker" id="theory-marker" style="left: 80%; background: #ef4444;" title="Theory predicts"></div>
                        <div class="meter-marker" id="actual-marker" style="left: 30%; background: #22c55e;" title="Actual"></div>
                    </div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="income-var">$8K</div>
                    <div class="stat-label">Income Variance</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="cons-var">$3K</div>
                    <div class="stat-label">Consumption Var</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="ratio">0.38</div>
                    <div class="stat-label">Vol. Ratio</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="paradox-status">Yes!</div>
                    <div class="stat-label">Paradox</div>
                </div>
            </div>

            <div class="result">
                <p id="deaton-result">The Deaton Paradox: Consumption is much smoother than lifecycle models predict. People don't fully adjust spending to income changes.</p>
            </div>

            <div class="insight">
                Possible explanations: liquidity constraints, precautionary savings, habit formation, or difficulty distinguishing temporary vs. permanent income changes.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#smooth-slider').addEventListener('input', () => this.updateSmoothing());
        this.$('#generate-btn').addEventListener('click', () => this.regenerate());
        this.$('#shock-btn').addEventListener('click', () => this.incomeShock());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.renderChart();
        this.updateStats();
    }

    updateSmoothing() {
        this.state.smoothingFactor = parseInt(this.$('#smooth-slider').value) / 100;
        this.$('#smooth-val').textContent = Math.round(this.state.smoothingFactor * 100);
        this.generateData();
        this.renderChart();
        this.updateStats();
    }

    regenerate() {
        this.generateData();
        this.renderChart();
        this.updateStats();
        this.$('#deaton-result').textContent = 'New income path generated. Notice how consumption (green) is much smoother than income (purple).';
    }

    incomeShock() {
        const shockYear = 10;
        const shockAmount = 20000;

        for (let i = shockYear; i < 20; i++) {
            this.state.income[i] += shockAmount * (i === shockYear ? 1 : 0.5);
            this.state.predicted[i] += shockAmount * 0.7;
            this.state.consumption[i] += shockAmount * 0.2 * (1 - this.state.smoothingFactor);
        }

        this.renderChart();
        this.updateStats();
        this.$('#deaton-result').innerHTML = '<strong style="color: #f59e0b;">INCOME SHOCK!</strong> Year 10 income jumped. Theory says consumption should jump too, but it barely moves! This is the Deaton Paradox.';
    }

    renderChart() {
        const chart = this.$('#chart');
        chart.innerHTML = '';

        const maxVal = Math.max(...this.state.income, ...this.state.consumption, ...this.state.predicted);
        const minVal = Math.min(...this.state.income, ...this.state.consumption, ...this.state.predicted) * 0.8;
        const range = maxVal - minVal;

        for (let i = 0; i < 20; i++) {
            const col = document.createElement('div');
            col.className = 'chart-column';

            const incomeHeight = ((this.state.income[i] - minVal) / range) * 100;
            const consHeight = ((this.state.consumption[i] - minVal) / range) * 100;

            const incomeBar = document.createElement('div');
            incomeBar.className = 'bar-segment bar-income';
            incomeBar.style.height = incomeHeight + '%';
            incomeBar.style.position = 'absolute';
            incomeBar.style.bottom = '0';
            incomeBar.style.width = '40%';
            incomeBar.style.left = '0';

            const consBar = document.createElement('div');
            consBar.className = 'bar-segment bar-consumption';
            consBar.style.height = consHeight + '%';
            consBar.style.position = 'absolute';
            consBar.style.bottom = '0';
            consBar.style.width = '40%';
            consBar.style.right = '0';

            col.style.position = 'relative';
            col.appendChild(incomeBar);
            col.appendChild(consBar);
            chart.appendChild(col);
        }
    }

    updateStats() {
        const incomeVar = this.calculateVariance(this.state.income);
        const consVar = this.calculateVariance(this.state.consumption);
        const ratio = Math.sqrt(consVar / incomeVar);

        this.$('#income-var').textContent = '$' + Math.round(Math.sqrt(incomeVar) / 1000) + 'K';
        this.$('#cons-var').textContent = '$' + Math.round(Math.sqrt(consVar) / 1000) + 'K';
        this.$('#ratio').textContent = ratio.toFixed(2);

        this.$('#vol-fill').style.width = (ratio * 100) + '%';
        this.$('#actual-marker').style.left = (ratio * 100) + '%';

        const isParadox = ratio < 0.6;
        this.$('#paradox-status').textContent = isParadox ? 'Yes!' : 'No';
        this.$('#paradox-status').style.color = isParadox ? '#ef4444' : '#22c55e';

        this.$('#predicted-vol').textContent = ratio > 0.7 ? 'Matching' : 'High';
        this.$('#actual-vol').textContent = ratio < 0.5 ? 'Very Low' : 'Low';
    }

    calculateVariance(arr) {
        const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
        return arr.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / arr.length;
    }

    reset() {
        this.state.smoothingFactor = 0.7;
        this.$('#smooth-slider').value = 70;
        this.$('#smooth-val').textContent = 70;
        this.generateData();
        this.renderChart();
        this.updateStats();
        this.$('#deaton-result').textContent = 'The Deaton Paradox: Consumption is much smoother than lifecycle models predict. People don\'t fully adjust spending to income changes.';
    }
}

customElements.define('deaton-simulator', DeatonSimulator);

export { DeatonSimulator };
