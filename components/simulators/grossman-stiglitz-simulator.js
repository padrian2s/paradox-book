import { SimulatorBase } from '../simulator-base.js';

class GrossmanStiglitzSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            informedTraders: 50,
            informationCost: 10,
            trueValue: 100,
            marketPrice: 100,
            round: 0
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .market-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .efficiency-meter {
                    margin-bottom: 1.5rem;
                }

                .meter-label {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                    font-size: 0.875rem;
                }

                .meter-bar {
                    height: 24px;
                    background: var(--card, #1e293b);
                    border-radius: 12px;
                    overflow: hidden;
                }

                .meter-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #ef4444, #f59e0b, #22c55e);
                    transition: width 0.5s ease;
                }

                .trader-split {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin: 1.5rem 0;
                }

                .trader-group {
                    text-align: center;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    min-width: 120px;
                }

                .trader-group.informed { border: 2px solid #22c55e; }
                .trader-group.uninformed { border: 2px solid #6366f1; }

                .trader-count {
                    font-size: 2rem;
                    font-weight: bold;
                    margin: 0.5rem 0;
                }

                .trader-profit {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .profit-positive { color: #22c55e; }
                .profit-negative { color: #ef4444; }

                .price-display {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    padding: 1rem;
                    background: rgba(99, 102, 241, 0.1);
                    border-radius: 0.5rem;
                }

                .price-box {
                    text-align: center;
                }

                .price-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .price-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
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
                    .trader-split, .price-display {
                        flex-direction: column;
                        gap: 1rem;
                    }
                }
            </style>

            <h4>Information & Market Efficiency</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">If markets are efficient, why pay for information? But without information gathering, markets can't be efficient!</p>

            <div class="controls">
                <div class="control-group">
                    <label>Informed Traders: <span id="informed-val">50</span>%</label>
                    <input type="range" id="informed-slider" min="0" max="100" value="50">
                </div>
                <div class="control-group">
                    <label>Information Cost: $<span id="cost-val">10</span></label>
                    <input type="range" id="cost-slider" min="1" max="30" value="10">
                </div>
            </div>

            <div class="controls">
                <button id="simulate-btn">Simulate Trading Round</button>
                <button id="equilibrium-btn">Find Equilibrium</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="market-viz">
                <div class="efficiency-meter">
                    <div class="meter-label">
                        <span>Inefficient</span>
                        <span>Market Efficiency</span>
                        <span>Perfectly Efficient</span>
                    </div>
                    <div class="meter-bar">
                        <div class="meter-fill" id="efficiency-fill" style="width: 50%"></div>
                    </div>
                </div>

                <div class="trader-split">
                    <div class="trader-group informed">
                        <div>Informed Traders</div>
                        <div class="trader-count" id="informed-count">50%</div>
                        <div class="trader-profit" id="informed-profit">Profit: $0</div>
                    </div>
                    <div class="trader-group uninformed">
                        <div>Uninformed Traders</div>
                        <div class="trader-count" id="uninformed-count">50%</div>
                        <div class="trader-profit" id="uninformed-profit">Profit: $0</div>
                    </div>
                </div>

                <div class="price-display">
                    <div class="price-box">
                        <div class="price-value" id="true-value">$100</div>
                        <div class="price-label">True Value</div>
                    </div>
                    <div class="price-box">
                        <div class="price-value" id="market-price">$100</div>
                        <div class="price-label">Market Price</div>
                    </div>
                    <div class="price-box">
                        <div class="price-value" id="price-gap">$0</div>
                        <div class="price-label">Price Gap</div>
                    </div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="round-num">0</div>
                    <div class="stat-label">Round</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="info-return">0%</div>
                    <div class="stat-label">Info Return</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="equilibrium-pct">?</div>
                    <div class="stat-label">Equilibrium %</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="paradox-status">No</div>
                    <div class="stat-label">Paradox Active</div>
                </div>
            </div>

            <div class="result">
                <p id="gs-result">Adjust the percentage of informed traders and information cost. Watch how market efficiency and incentives interact!</p>
            </div>

            <div class="insight">
                The Grossman-Stiglitz Paradox: Markets can never be perfectly efficient because that would eliminate the incentive to gather information. Some inefficiency is necessary!
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#informed-slider').addEventListener('input', () => this.updateSliders());
        this.$('#cost-slider').addEventListener('input', () => this.updateSliders());
        this.$('#simulate-btn').addEventListener('click', () => this.simulate());
        this.$('#equilibrium-btn').addEventListener('click', () => this.findEquilibrium());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.updateDisplay();
    }

    updateSliders() {
        this.state.informedTraders = parseInt(this.$('#informed-slider').value);
        this.state.informationCost = parseInt(this.$('#cost-slider').value);
        this.$('#informed-val').textContent = this.state.informedTraders;
        this.$('#cost-val').textContent = this.state.informationCost;
        this.updateDisplay();
    }

    simulate() {
        this.state.round++;

        this.state.trueValue = 80 + Math.random() * 40;

        const efficiency = this.state.informedTraders / 100;
        const noise = (1 - efficiency) * (Math.random() * 20 - 10);
        this.state.marketPrice = this.state.trueValue * efficiency + 100 * (1 - efficiency) + noise;

        this.updateDisplay();

        const priceGap = Math.abs(this.state.trueValue - this.state.marketPrice);
        const informedGain = priceGap - this.state.informationCost;

        if (this.state.informedTraders >= 95) {
            this.$('#gs-result').innerHTML = '<strong style="color: #ef4444;">PARADOX!</strong> Market is nearly efficient, but informed traders lose money after costs. Why would anyone gather information?';
            this.$('#paradox-status').textContent = 'Yes!';
            this.$('#paradox-status').style.color = '#ef4444';
        } else if (this.state.informedTraders <= 5) {
            this.$('#gs-result').innerHTML = '<strong style="color: #f59e0b;">INEFFICIENT!</strong> Few informed traders means big price gaps. Huge profit opportunity for information gatherers!';
            this.$('#paradox-status').textContent = 'No';
            this.$('#paradox-status').style.color = '#22c55e';
        } else if (Math.abs(informedGain) < 2) {
            this.$('#gs-result').innerHTML = '<strong style="color: #22c55e;">EQUILIBRIUM!</strong> Informed traders earn just enough to cover costs. Market is partially efficient.';
        } else {
            this.$('#gs-result').textContent = `Round ${this.state.round}: Price gap is $${priceGap.toFixed(1)}. Information ${informedGain > 0 ? 'profitable' : 'unprofitable'}.`;
        }

        this.dispatchSimulatorEvent('gs-simulated', {
            round: this.state.round,
            efficiency: efficiency,
            priceGap: priceGap
        });
    }

    findEquilibrium() {
        const cost = this.state.informationCost;
        const equilibriumPct = Math.max(10, Math.min(90, 100 - cost * 3));

        this.state.informedTraders = equilibriumPct;
        this.$('#informed-slider').value = equilibriumPct;
        this.$('#informed-val').textContent = equilibriumPct;

        this.$('#equilibrium-pct').textContent = equilibriumPct + '%';

        this.simulate();

        this.$('#gs-result').innerHTML = `<strong style="color: #22c55e;">EQUILIBRIUM FOUND!</strong> At ${equilibriumPct}% informed traders, the cost of information ($${cost}) roughly equals the trading advantage. This is the Grossman-Stiglitz equilibrium: markets are efficient, but not perfectly so.`;
    }

    updateDisplay() {
        const efficiency = this.state.informedTraders / 100;
        const priceGap = Math.abs(this.state.trueValue - this.state.marketPrice);
        const informedGain = priceGap - this.state.informationCost;
        const uninformedGain = -priceGap * 0.3;

        this.$('#efficiency-fill').style.width = (efficiency * 100) + '%';
        this.$('#informed-count').textContent = this.state.informedTraders + '%';
        this.$('#uninformed-count').textContent = (100 - this.state.informedTraders) + '%';

        this.$('#informed-profit').textContent = 'Profit: $' + informedGain.toFixed(1);
        this.$('#informed-profit').className = 'trader-profit ' + (informedGain >= 0 ? 'profit-positive' : 'profit-negative');

        this.$('#uninformed-profit').textContent = 'Profit: $' + uninformedGain.toFixed(1);
        this.$('#uninformed-profit').className = 'trader-profit ' + (uninformedGain >= 0 ? 'profit-positive' : 'profit-negative');

        this.$('#true-value').textContent = '$' + this.state.trueValue.toFixed(0);
        this.$('#market-price').textContent = '$' + this.state.marketPrice.toFixed(0);
        this.$('#price-gap').textContent = '$' + priceGap.toFixed(1);

        this.$('#round-num').textContent = this.state.round;

        const infoReturn = this.state.informedTraders > 0 ? ((informedGain / this.state.informationCost) * 100) : 0;
        this.$('#info-return').textContent = infoReturn.toFixed(0) + '%';
    }

    reset() {
        this.state = {
            informedTraders: 50,
            informationCost: 10,
            trueValue: 100,
            marketPrice: 100,
            round: 0
        };
        this.$('#informed-slider').value = 50;
        this.$('#cost-slider').value = 10;
        this.$('#informed-val').textContent = 50;
        this.$('#cost-val').textContent = 10;
        this.$('#equilibrium-pct').textContent = '?';
        this.$('#paradox-status').textContent = 'No';
        this.$('#paradox-status').style.color = 'var(--primary, #6366f1)';
        this.$('#gs-result').textContent = 'Adjust the percentage of informed traders and information cost. Watch how market efficiency and incentives interact!';
        this.updateDisplay();
    }
}

customElements.define('grossman-stiglitz-simulator', GrossmanStiglitzSimulator);

export { GrossmanStiglitzSimulator };
