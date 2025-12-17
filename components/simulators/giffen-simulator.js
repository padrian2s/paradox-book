import { SimulatorBase } from '../simulator-base.js';

class GiffenSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            breadPrice: 1.00,
            income: 10,
            breadUnits: 8,
            meatUnits: 1
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .budget-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .household {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .household-icon {
                    font-size: 2.5rem;
                }

                .household-info {
                    flex: 1;
                }

                .household-budget {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #22c55e;
                }

                .goods-comparison {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .good-card {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .good-icon {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }

                .good-name {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .good-price {
                    color: var(--muted, #94a3b8);
                    font-size: 0.875rem;
                    margin-bottom: 0.5rem;
                }

                .good-quantity {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .calories-bar {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .calories-label {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                }

                .calories-track {
                    height: 20px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 10px;
                    overflow: hidden;
                }

                .calories-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #ef4444, #22c55e);
                    border-radius: 10px;
                    transition: width 0.5s ease;
                }

                .demand-curve {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .curve-point {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem;
                    margin: 0.25rem 0;
                    border-radius: 0.25rem;
                }

                .curve-point.active {
                    background: rgba(99, 102, 241, 0.2);
                }

                .curve-point.normal {
                    color: #22c55e;
                }

                .curve-point.giffen {
                    color: #ef4444;
                }

                @media (max-width: 600px) {
                    .goods-comparison {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Giffen Good Simulation</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">A poor household must choose between bread (cheap, filling) and meat (expensive, nutritious).</p>

            <div class="controls">
                <div class="control-group">
                    <label>Bread Price: $<span id="bread-price-val">1.00</span></label>
                    <input type="range" id="bread-price" min="50" max="200" value="100">
                </div>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="budget-viz">
                <div class="household">
                    <div class="household-icon">👨‍👩‍👧</div>
                    <div class="household-info">
                        <div>Poor Household</div>
                        <div class="household-budget">Weekly Budget: $<span id="budget">10</span></div>
                    </div>
                </div>

                <div class="goods-comparison">
                    <div class="good-card">
                        <div class="good-icon">🍞</div>
                        <div class="good-name">Bread</div>
                        <div class="good-price">$<span id="bread-unit-price">1.00</span>/loaf (200 cal)</div>
                        <div class="good-quantity"><span id="bread-qty">8</span> loaves</div>
                    </div>
                    <div class="good-card">
                        <div class="good-icon">🥩</div>
                        <div class="good-name">Meat</div>
                        <div class="good-price">$2.00/lb (300 cal)</div>
                        <div class="good-quantity"><span id="meat-qty">1</span> lb</div>
                    </div>
                </div>

                <div class="calories-bar">
                    <div class="calories-label">
                        <span>Daily Calories</span>
                        <span id="calories">1,900</span> / 2,000 required
                    </div>
                    <div class="calories-track">
                        <div class="calories-fill" id="calories-bar" style="width: 95%"></div>
                    </div>
                </div>

                <div class="demand-curve">
                    <div style="font-weight: bold; margin-bottom: 0.5rem;">Bread Demand vs Price</div>
                    <div class="curve-point normal" id="point-low">
                        <span>$0.50:</span> <span id="demand-low">6 loaves</span> (Normal: lower price = less bread needed)
                    </div>
                    <div class="curve-point active" id="point-mid">
                        <span>$1.00:</span> <span id="demand-mid">8 loaves</span> (Current)
                    </div>
                    <div class="curve-point giffen" id="point-high">
                        <span>$1.50:</span> <span id="demand-high">10 loaves</span> (GIFFEN: higher price = MORE bread!)
                    </div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Adjust the bread price to see the Giffen Good effect in action.</p>
            </div>

            <div class="insight">
                Named after Sir Robert Giffen who observed this during the Irish Potato Famine. When staple food prices rose, the poor bought MORE of it because they could no longer afford ANY meat - they substituted entirely to the cheaper staple despite its price increase.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#bread-price').addEventListener('input', () => this.updateSimulation());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.updateSimulation();
    }

    updateSimulation() {
        const priceSlider = parseInt(this.$('#bread-price').value);
        const breadPrice = priceSlider / 100;
        this.$('#bread-price-val').textContent = breadPrice.toFixed(2);
        this.$('#bread-unit-price').textContent = breadPrice.toFixed(2);

        const income = 10;
        const meatPrice = 2;

        let breadQty, meatQty, explanation;

        if (breadPrice <= 0.75) {
            meatQty = 2;
            breadQty = Math.floor((income - meatQty * meatPrice) / breadPrice);
            explanation = `<strong style="color: #22c55e;">Normal demand:</strong> Bread is so cheap that the household can afford more meat. They buy LESS bread because they can diversify.`;
            this.$('#point-low').classList.add('active');
            this.$('#point-mid').classList.remove('active');
            this.$('#point-high').classList.remove('active');
        } else if (breadPrice <= 1.25) {
            meatQty = 1;
            breadQty = Math.floor((income - meatQty * meatPrice) / breadPrice);
            explanation = `At this price, the household balances bread and meat. They can afford some variety.`;
            this.$('#point-low').classList.remove('active');
            this.$('#point-mid').classList.add('active');
            this.$('#point-high').classList.remove('active');
        } else {
            meatQty = 0;
            breadQty = Math.floor(income / breadPrice);
            explanation = `<strong style="color: #ef4444;">GIFFEN EFFECT!</strong> Bread is now so expensive that the household cannot afford ANY meat. They must spend their entire budget on bread to get enough calories. Despite the price increase, they buy MORE bread!`;
            this.$('#point-low').classList.remove('active');
            this.$('#point-mid').classList.remove('active');
            this.$('#point-high').classList.add('active');
        }

        this.$('#bread-qty').textContent = breadQty;
        this.$('#meat-qty').textContent = meatQty;

        const calories = breadQty * 200 + meatQty * 300;
        this.$('#calories').textContent = calories.toLocaleString();
        this.$('#calories-bar').style.width = Math.min(100, (calories / 2000) * 100) + '%';

        if (breadPrice <= 0.75) {
            this.$('#demand-low').textContent = breadQty + ' loaves';
        } else if (breadPrice <= 1.25) {
            this.$('#demand-mid').textContent = breadQty + ' loaves';
        } else {
            this.$('#demand-high').textContent = breadQty + ' loaves';
        }

        this.$('#result-text').innerHTML = explanation;

        this.dispatchSimulatorEvent('giffen-updated', {
            breadPrice,
            breadQty,
            meatQty,
            calories
        });
    }

    reset() {
        this.$('#bread-price').value = 100;
        this.updateSimulation();
    }
}

customElements.define('giffen-simulator', GiffenSimulator);

export { GiffenSimulator };
