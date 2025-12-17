import { SimulatorBase } from '../simulator-base.js';

class EdgeworthSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            firmAPrice: 10,
            firmBPrice: 10,
            firmACapacity: 60,
            firmBCapacity: 60,
            totalDemand: 100,
            marginalCost: 2,
            round: 0,
            cyclePhase: 'undercut'
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

                .firms-row {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-bottom: 1.5rem;
                }

                .firm-card {
                    background: var(--card, #1e293b);
                    padding: 1.25rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    min-width: 130px;
                }

                .firm-card.firm-a { border: 2px solid #3b82f6; }
                .firm-card.firm-b { border: 2px solid #ef4444; }

                .firm-label {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .price-display {
                    font-size: 1.75rem;
                    font-weight: bold;
                    margin-bottom: 0.25rem;
                }

                .capacity-bar {
                    height: 8px;
                    background: var(--bg, #0f172a);
                    border-radius: 4px;
                    margin: 0.5rem 0;
                    overflow: hidden;
                }

                .capacity-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #22c55e, #16a34a);
                    transition: width 0.3s;
                }

                .capacity-fill.constrained {
                    background: linear-gradient(90deg, #f59e0b, #d97706);
                }

                .firm-stat {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .cycle-indicator {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 0.5rem;
                    margin: 1rem 0;
                    padding: 0.75rem;
                    background: rgba(99, 102, 241, 0.1);
                    border-radius: 0.5rem;
                }

                .cycle-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: var(--muted, #94a3b8);
                }

                .cycle-dot.active { background: #f59e0b; }

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
                    .firms-row {
                        flex-direction: column;
                        align-items: center;
                        gap: 1rem;
                    }
                }
            </style>

            <h4>Edgeworth Capacity Constraints</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">When firms have limited capacity, prices cycle endlessly instead of reaching equilibrium.</p>

            <div class="controls">
                <div class="control-group">
                    <label>Firm A Capacity: <span id="cap-a-val">60</span>%</label>
                    <input type="range" id="cap-a-slider" min="30" max="100" value="60">
                </div>
                <div class="control-group">
                    <label>Firm B Capacity: <span id="cap-b-val">60</span>%</label>
                    <input type="range" id="cap-b-slider" min="30" max="100" value="60">
                </div>
            </div>

            <div class="controls">
                <button id="step-btn">Step Price Cycle</button>
                <button id="auto-btn">Auto Cycle (5 rounds)</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="market-viz">
                <div class="firms-row">
                    <div class="firm-card firm-a">
                        <div class="firm-label">Firm A</div>
                        <div class="price-display" id="price-a">$10</div>
                        <div class="capacity-bar">
                            <div class="capacity-fill" id="cap-fill-a" style="width: 60%"></div>
                        </div>
                        <div class="firm-stat">Capacity: <span id="cap-text-a">60</span> units</div>
                        <div class="firm-stat">Sales: <span id="sales-a">50</span> units</div>
                    </div>
                    <div class="firm-card firm-b">
                        <div class="firm-label">Firm B</div>
                        <div class="price-display" id="price-b">$10</div>
                        <div class="capacity-bar">
                            <div class="capacity-fill" id="cap-fill-b" style="width: 60%"></div>
                        </div>
                        <div class="firm-stat">Capacity: <span id="cap-text-b">60</span> units</div>
                        <div class="firm-stat">Sales: <span id="sales-b">50</span> units</div>
                    </div>
                </div>

                <div class="cycle-indicator">
                    <span>Price Cycle:</span>
                    <div class="cycle-dot" id="dot-undercut"></div>
                    <span>Undercut</span>
                    <div class="cycle-dot" id="dot-floor"></div>
                    <span>Hit Floor</span>
                    <div class="cycle-dot" id="dot-raise"></div>
                    <span>Raise</span>
                    <div class="cycle-dot" id="dot-peak"></div>
                    <span>Peak</span>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="round-num">0</div>
                    <div class="stat-label">Round</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="avg-price">$10</div>
                    <div class="stat-label">Avg Price</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="unserved">0</div>
                    <div class="stat-label">Unserved Demand</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="cycle-count">0</div>
                    <div class="stat-label">Full Cycles</div>
                </div>
            </div>

            <div class="result">
                <p id="edgeworth-result">Adjust capacities and step through to see the price cycle. With capacity constraints, no stable equilibrium exists!</p>
            </div>

            <div class="insight">
                Unlike Bertrand's paradox (P=MC equilibrium), capacity constraints create perpetual price instability. Firms cycle between undercutting and raising prices indefinitely.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#cap-a-slider').addEventListener('input', () => this.updateCapacity());
        this.$('#cap-b-slider').addEventListener('input', () => this.updateCapacity());
        this.$('#step-btn').addEventListener('click', () => this.stepCycle());
        this.$('#auto-btn').addEventListener('click', () => this.autoCycle());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.updateDisplay();
    }

    updateCapacity() {
        this.state.firmACapacity = parseInt(this.$('#cap-a-slider').value);
        this.state.firmBCapacity = parseInt(this.$('#cap-b-slider').value);
        this.$('#cap-a-val').textContent = this.state.firmACapacity;
        this.$('#cap-b-val').textContent = this.state.firmBCapacity;
        this.updateDisplay();
    }

    stepCycle() {
        this.state.round++;
        const mc = this.state.marginalCost;
        const totalCap = this.state.firmACapacity + this.state.firmBCapacity;

        switch (this.state.cyclePhase) {
            case 'undercut':
                this.state.firmAPrice = Math.max(mc + 1, this.state.firmAPrice - 1);
                this.state.firmBPrice = Math.max(mc + 1, this.state.firmBPrice - 1);
                if (this.state.firmAPrice <= mc + 2) {
                    this.state.cyclePhase = 'floor';
                }
                this.$('#edgeworth-result').textContent = 'UNDERCUTTING: Firms lower prices to steal market share...';
                break;

            case 'floor':
                this.state.cyclePhase = 'raise';
                this.$('#edgeworth-result').textContent = 'FLOOR HIT: Prices near marginal cost. But capacity is limited...';
                break;

            case 'raise':
                if (totalCap < this.state.totalDemand) {
                    this.state.firmAPrice = Math.min(10, this.state.firmAPrice + 2);
                    this.state.firmBPrice = Math.min(10, this.state.firmBPrice + 2);
                }
                if (this.state.firmAPrice >= 8) {
                    this.state.cyclePhase = 'peak';
                }
                this.$('#edgeworth-result').textContent = 'RAISING: Limited capacity means firms can raise prices and still sell out!';
                break;

            case 'peak':
                this.state.cyclePhase = 'undercut';
                this.$('#cycle-count').textContent = parseInt(this.$('#cycle-count').textContent) + 1;
                this.$('#edgeworth-result').innerHTML = '<strong style="color: #f59e0b;">CYCLE COMPLETE!</strong> High prices invite undercutting. The cycle begins again. No equilibrium!';
                break;
        }

        this.updateCycleDots();
        this.updateDisplay();

        this.dispatchSimulatorEvent('edgeworth-stepped', {
            round: this.state.round,
            phase: this.state.cyclePhase
        });
    }

    autoCycle() {
        let count = 0;
        const interval = setInterval(() => {
            this.stepCycle();
            count++;
            if (count >= 5) clearInterval(interval);
        }, 600);
    }

    updateCycleDots() {
        this.$$('.cycle-dot').forEach(dot => dot.classList.remove('active'));
        const dotId = '#dot-' + this.state.cyclePhase;
        this.$(dotId).classList.add('active');
    }

    updateDisplay() {
        this.$('#price-a').textContent = '$' + this.state.firmAPrice;
        this.$('#price-b').textContent = '$' + this.state.firmBPrice;

        this.$('#cap-fill-a').style.width = this.state.firmACapacity + '%';
        this.$('#cap-fill-b').style.width = this.state.firmBCapacity + '%';
        this.$('#cap-text-a').textContent = this.state.firmACapacity;
        this.$('#cap-text-b').textContent = this.state.firmBCapacity;

        const totalCap = this.state.firmACapacity + this.state.firmBCapacity;
        const isConstrained = totalCap < this.state.totalDemand;

        this.$('#cap-fill-a').className = 'capacity-fill' + (isConstrained ? ' constrained' : '');
        this.$('#cap-fill-b').className = 'capacity-fill' + (isConstrained ? ' constrained' : '');

        const salesA = Math.min(this.state.firmACapacity, this.state.totalDemand / 2);
        const salesB = Math.min(this.state.firmBCapacity, this.state.totalDemand / 2);
        this.$('#sales-a').textContent = Math.round(salesA);
        this.$('#sales-b').textContent = Math.round(salesB);

        this.$('#round-num').textContent = this.state.round;
        this.$('#avg-price').textContent = '$' + ((this.state.firmAPrice + this.state.firmBPrice) / 2).toFixed(1);
        this.$('#unserved').textContent = Math.max(0, this.state.totalDemand - totalCap);
    }

    reset() {
        this.state = {
            firmAPrice: 10,
            firmBPrice: 10,
            firmACapacity: parseInt(this.$('#cap-a-slider').value),
            firmBCapacity: parseInt(this.$('#cap-b-slider').value),
            totalDemand: 100,
            marginalCost: 2,
            round: 0,
            cyclePhase: 'undercut'
        };
        this.$('#cycle-count').textContent = '0';
        this.$$('.cycle-dot').forEach(dot => dot.classList.remove('active'));
        this.$('#edgeworth-result').textContent = 'Adjust capacities and step through to see the price cycle. With capacity constraints, no stable equilibrium exists!';
        this.updateDisplay();
    }
}

customElements.define('edgeworth-simulator', EdgeworthSimulator);

export { EdgeworthSimulator };
