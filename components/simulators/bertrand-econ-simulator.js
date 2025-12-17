import { SimulatorBase } from '../simulator-base.js';

class BertrandEconSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            firmAPrice: 10,
            firmBPrice: 10,
            marginalCost: 5,
            round: 0,
            history: []
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

                .firms-container {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-bottom: 1.5rem;
                }

                .firm-box {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    min-width: 140px;
                }

                .firm-box.firm-a {
                    border: 2px solid #3b82f6;
                }

                .firm-box.firm-b {
                    border: 2px solid #ef4444;
                }

                .firm-name {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                    font-size: 1.1rem;
                }

                .firm-price {
                    font-size: 2rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .firm-profit {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .profit-positive { color: #22c55e; }
                .profit-zero { color: #f59e0b; }
                .profit-negative { color: #ef4444; }

                .equilibrium-arrow {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 1rem 0;
                    font-size: 2rem;
                    color: var(--muted, #94a3b8);
                }

                .cost-line {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem;
                    background: rgba(239, 68, 68, 0.1);
                    border-radius: 0.25rem;
                    margin-top: 1rem;
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
                    .firms-container {
                        flex-direction: column;
                        align-items: center;
                        gap: 1rem;
                    }
                    .firm-price {
                        font-size: 1.5rem;
                    }
                }
            </style>

            <h4>Bertrand Duopoly Competition</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">Two firms compete on price. Consumers buy from whoever is cheapest. Watch prices race to marginal cost.</p>

            <div class="controls">
                <div class="control-group">
                    <label>Marginal Cost: $<span id="mc-val">5</span></label>
                    <input type="range" id="mc-slider" min="1" max="9" value="5">
                </div>
                <button id="compete-btn">One Round of Competition</button>
                <button id="equilibrium-btn">Jump to Equilibrium</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="market-viz">
                <div class="firms-container">
                    <div class="firm-box firm-a">
                        <div class="firm-name">Firm A</div>
                        <div class="firm-price" id="price-a">$10</div>
                        <div class="firm-profit" id="profit-a">Profit: $50</div>
                    </div>
                    <div class="firm-box firm-b">
                        <div class="firm-name">Firm B</div>
                        <div class="firm-price" id="price-b">$10</div>
                        <div class="firm-profit" id="profit-b">Profit: $50</div>
                    </div>
                </div>

                <div class="equilibrium-arrow" id="arrow-display">
                    Prices converging...
                </div>

                <div class="cost-line">
                    <span>Marginal Cost:</span>
                    <strong id="mc-display">$5</strong>
                    <span>(minimum possible price)</span>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="round-num">0</div>
                    <div class="stat-label">Round</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="total-profit">$100</div>
                    <div class="stat-label">Industry Profit</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="consumer-surplus">$0</div>
                    <div class="stat-label">Consumer Surplus</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="equilibrium-status">No</div>
                    <div class="stat-label">At Equilibrium</div>
                </div>
            </div>

            <div class="result">
                <p id="competition-result">Click "One Round of Competition" to see how firms undercut each other until profits vanish!</p>
            </div>

            <div class="insight">
                The Bertrand Paradox shows that with just two firms, competition can be as fierce as perfect competition. Nash equilibrium is price = marginal cost = zero profits.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#mc-slider').addEventListener('input', () => this.updateMC());
        this.$('#compete-btn').addEventListener('click', () => this.compete());
        this.$('#equilibrium-btn').addEventListener('click', () => this.jumpToEquilibrium());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.updateDisplay();
    }

    updateMC() {
        this.state.marginalCost = parseInt(this.$('#mc-slider').value);
        this.$('#mc-val').textContent = this.state.marginalCost;
        this.$('#mc-display').textContent = '$' + this.state.marginalCost;
    }

    compete() {
        const mc = this.state.marginalCost;

        if (this.state.firmAPrice <= mc && this.state.firmBPrice <= mc) {
            this.$('#competition-result').innerHTML = '<strong style="color: #f59e0b;">EQUILIBRIUM REACHED!</strong> Both firms are at marginal cost. Neither can profit by changing price.';
            return;
        }

        this.state.round++;

        if (this.state.firmAPrice > this.state.firmBPrice) {
            this.state.firmAPrice = Math.max(mc, this.state.firmBPrice - 0.5);
        } else if (this.state.firmBPrice > this.state.firmAPrice) {
            this.state.firmBPrice = Math.max(mc, this.state.firmAPrice - 0.5);
        } else {
            this.state.firmAPrice = Math.max(mc, this.state.firmAPrice - 0.5);
            this.state.firmBPrice = Math.max(mc, this.state.firmBPrice - 0.5);
        }

        this.updateDisplay();

        if (this.state.firmAPrice <= mc && this.state.firmBPrice <= mc) {
            this.$('#competition-result').innerHTML = '<strong style="color: #ef4444;">PARADOX!</strong> Competition drove prices to marginal cost. Both firms make ZERO profit despite being a duopoly!';
            this.$('#equilibrium-status').textContent = 'Yes!';
            this.$('#equilibrium-status').style.color = '#22c55e';
        } else {
            this.$('#competition-result').textContent = `Round ${this.state.round}: Firms undercut each other. The price war continues...`;
        }

        this.dispatchSimulatorEvent('bertrand-competed', {
            round: this.state.round,
            priceA: this.state.firmAPrice,
            priceB: this.state.firmBPrice
        });
    }

    jumpToEquilibrium() {
        const mc = this.state.marginalCost;
        this.state.firmAPrice = mc;
        this.state.firmBPrice = mc;
        this.state.round = 10;
        this.updateDisplay();
        this.$('#competition-result').innerHTML = '<strong style="color: #ef4444;">NASH EQUILIBRIUM!</strong> Price = Marginal Cost. Zero economic profit for both firms. This is the paradox: a duopoly behaves like perfect competition!';
        this.$('#equilibrium-status').textContent = 'Yes!';
        this.$('#equilibrium-status').style.color = '#22c55e';
    }

    updateDisplay() {
        const mc = this.state.marginalCost;
        const marketSize = 10;

        this.$('#price-a').textContent = '$' + this.state.firmAPrice.toFixed(1);
        this.$('#price-b').textContent = '$' + this.state.firmBPrice.toFixed(1);

        let profitA = 0, profitB = 0;
        if (this.state.firmAPrice < this.state.firmBPrice) {
            profitA = (this.state.firmAPrice - mc) * marketSize;
        } else if (this.state.firmBPrice < this.state.firmAPrice) {
            profitB = (this.state.firmBPrice - mc) * marketSize;
        } else {
            profitA = (this.state.firmAPrice - mc) * marketSize / 2;
            profitB = (this.state.firmBPrice - mc) * marketSize / 2;
        }

        this.$('#profit-a').textContent = 'Profit: $' + profitA.toFixed(0);
        this.$('#profit-b').textContent = 'Profit: $' + profitB.toFixed(0);

        this.$('#profit-a').className = 'firm-profit ' + (profitA > 0 ? 'profit-positive' : profitA === 0 ? 'profit-zero' : 'profit-negative');
        this.$('#profit-b').className = 'firm-profit ' + (profitB > 0 ? 'profit-positive' : profitB === 0 ? 'profit-zero' : 'profit-negative');

        this.$('#round-num').textContent = this.state.round;
        this.$('#total-profit').textContent = '$' + (profitA + profitB).toFixed(0);

        const monopolyPrice = 10;
        const currentPrice = Math.min(this.state.firmAPrice, this.state.firmBPrice);
        const consumerSurplus = (monopolyPrice - currentPrice) * marketSize;
        this.$('#consumer-surplus').textContent = '$' + consumerSurplus.toFixed(0);

        if (this.state.firmAPrice <= mc && this.state.firmBPrice <= mc) {
            this.$('#arrow-display').textContent = 'EQUILIBRIUM: P = MC';
            this.$('#arrow-display').style.color = '#22c55e';
        } else {
            this.$('#arrow-display').textContent = 'Prices converging...';
            this.$('#arrow-display').style.color = 'var(--muted, #94a3b8)';
        }
    }

    reset() {
        this.state = {
            firmAPrice: 10,
            firmBPrice: 10,
            marginalCost: parseInt(this.$('#mc-slider').value),
            round: 0,
            history: []
        };
        this.$('#equilibrium-status').textContent = 'No';
        this.$('#equilibrium-status').style.color = 'var(--primary, #6366f1)';
        this.$('#competition-result').textContent = 'Click "One Round of Competition" to see how firms undercut each other until profits vanish!';
        this.updateDisplay();
    }
}

customElements.define('bertrand-econ-simulator', BertrandEconSimulator);

export { BertrandEconSimulator };
