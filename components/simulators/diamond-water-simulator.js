import { SimulatorBase } from '../simulator-base.js';

class DiamondWaterSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            waterUnits: 100,
            diamondUnits: 1,
            waterPrice: 0.01,
            diamondPrice: 5000
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .comparison-viz {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .item-card {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .item-icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }

                .item-name {
                    font-size: 1.25rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .item-stat {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }

                .stat-label {
                    color: var(--muted, #94a3b8);
                    font-size: 0.875rem;
                }

                .stat-value {
                    font-weight: bold;
                }

                .utility-bar {
                    margin-top: 1rem;
                    height: 8px;
                    background: rgba(255,255,255,0.1);
                    border-radius: 4px;
                    overflow: hidden;
                }

                .utility-fill {
                    height: 100%;
                    border-radius: 4px;
                    transition: width 0.5s ease;
                }

                .utility-fill.water {
                    background: linear-gradient(90deg, #3b82f6, #06b6d4);
                }

                .utility-fill.diamond {
                    background: linear-gradient(90deg, #ec4899, #8b5cf6);
                }

                .explanation-box {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .concept {
                    margin-bottom: 1rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }

                .concept:last-child {
                    margin-bottom: 0;
                    padding-bottom: 0;
                    border-bottom: none;
                }

                .concept-title {
                    color: var(--primary, #6366f1);
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                @media (max-width: 600px) {
                    .comparison-viz {
                        grid-template-columns: 1fr;
                        gap: 1rem;
                    }
                }
            </style>

            <h4>The Value Paradox</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">Compare two goods: one essential for life, one purely decorative.</p>

            <div class="controls">
                <button id="scenario-desert">Desert Scenario</button>
                <button id="scenario-normal">Normal Market</button>
                <button id="scenario-marginal">Show Marginal Utility</button>
            </div>

            <div class="comparison-viz">
                <div class="item-card">
                    <div class="item-icon">💧</div>
                    <div class="item-name">Water</div>
                    <div class="item-stat">
                        <span class="stat-label">Total Utility</span>
                        <span class="stat-value" id="water-utility">Infinite</span>
                    </div>
                    <div class="item-stat">
                        <span class="stat-label">Market Price</span>
                        <span class="stat-value" id="water-price">$0.01/gallon</span>
                    </div>
                    <div class="item-stat">
                        <span class="stat-label">Scarcity</span>
                        <span class="stat-value" id="water-scarcity">Abundant</span>
                    </div>
                    <div class="item-stat">
                        <span class="stat-label">Marginal Value</span>
                        <span class="stat-value" id="water-marginal">Very Low</span>
                    </div>
                    <div class="utility-bar">
                        <div class="utility-fill water" id="water-bar" style="width: 15%"></div>
                    </div>
                </div>

                <div class="item-card">
                    <div class="item-icon">💎</div>
                    <div class="item-name">Diamond</div>
                    <div class="item-stat">
                        <span class="stat-label">Total Utility</span>
                        <span class="stat-value" id="diamond-utility">Low</span>
                    </div>
                    <div class="item-stat">
                        <span class="stat-label">Market Price</span>
                        <span class="stat-value" id="diamond-price">$5,000/carat</span>
                    </div>
                    <div class="item-stat">
                        <span class="stat-label">Scarcity</span>
                        <span class="stat-value" id="diamond-scarcity">Rare</span>
                    </div>
                    <div class="item-stat">
                        <span class="stat-label">Marginal Value</span>
                        <span class="stat-value" id="diamond-marginal">Very High</span>
                    </div>
                    <div class="utility-bar">
                        <div class="utility-fill diamond" id="diamond-bar" style="width: 85%"></div>
                    </div>
                </div>
            </div>

            <div class="explanation-box" id="explanation">
                <div class="concept">
                    <div class="concept-title">Total Utility vs. Marginal Utility</div>
                    <p>Water has enormous TOTAL utility (we die without it), but because it's abundant, the MARGINAL utility of one more gallon is low. Diamonds have low total utility but high marginal utility due to scarcity.</p>
                </div>
                <div class="concept">
                    <div class="concept-title">Adam Smith's Solution</div>
                    <p>This paradox puzzled economists until the "marginalist revolution" of the 1870s. Prices reflect marginal utility at the current quantity, not total utility.</p>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Click a scenario to explore how context changes value perception.</p>
            </div>

            <div class="insight">
                The resolution: We don't pay for a good's total importance to us, but for the value of ONE MORE unit given how much we already have.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#scenario-desert').addEventListener('click', () => this.showDesert());
        this.$('#scenario-normal').addEventListener('click', () => this.showNormal());
        this.$('#scenario-marginal').addEventListener('click', () => this.showMarginal());
    }

    showDesert() {
        this.$('#water-price').textContent = '$1,000/gallon';
        this.$('#water-scarcity').textContent = 'Extremely Rare';
        this.$('#water-marginal').textContent = 'Life or Death';
        this.$('#water-bar').style.width = '100%';

        this.$('#diamond-price').textContent = '$0/carat';
        this.$('#diamond-scarcity').textContent = 'Useless Here';
        this.$('#diamond-marginal').textContent = 'Zero';
        this.$('#diamond-bar').style.width = '0%';

        this.$('#result-text').innerHTML = '<strong style="color: #3b82f6;">In the desert, the paradox reverses!</strong> When water is scarce, its marginal utility skyrockets. You would trade all the diamonds in the world for a glass of water.';

        this.dispatchSimulatorEvent('scenario-changed', { scenario: 'desert' });
    }

    showNormal() {
        this.$('#water-price').textContent = '$0.01/gallon';
        this.$('#water-scarcity').textContent = 'Abundant';
        this.$('#water-marginal').textContent = 'Very Low';
        this.$('#water-bar').style.width = '15%';

        this.$('#diamond-price').textContent = '$5,000/carat';
        this.$('#diamond-scarcity').textContent = 'Rare';
        this.$('#diamond-marginal').textContent = 'Very High';
        this.$('#diamond-bar').style.width = '85%';

        this.$('#result-text').innerHTML = 'In normal markets, water is cheap despite being essential. Diamonds command high prices despite being non-essential. <strong>Scarcity determines price, not importance.</strong>';

        this.dispatchSimulatorEvent('scenario-changed', { scenario: 'normal' });
    }

    showMarginal() {
        this.$('#explanation').innerHTML = `
            <div class="concept">
                <div class="concept-title">The Marginal Revolution</div>
                <p>Imagine you have 100 gallons of water. The first gallon is for drinking (essential). The 50th is for bathing (nice). The 100th is for watering decorative plants (optional). Each additional unit has LESS value.</p>
            </div>
            <div class="concept">
                <div class="concept-title">Why Diamonds Cost More</div>
                <p>If you have 0 diamonds, the first one has some value (decoration, status). If you have 10, you still might want the 11th. The marginal utility decreases slowly because you have so few.</p>
            </div>
            <div class="concept">
                <div class="concept-title">The Key Insight</div>
                <p>You pay the marginal value of the LAST unit consumed, not the average value. Water's last unit is cheap because you're already saturated. Diamond's "last" unit is expensive because you have almost none.</p>
            </div>
        `;

        this.$('#result-text').innerHTML = '<strong style="color: #f59e0b;">Marginal utility explains the paradox.</strong> Prices are set at the margin, where supply meets demand.';

        this.dispatchSimulatorEvent('scenario-changed', { scenario: 'marginal' });
    }
}

customElements.define('diamond-water-simulator', DiamondWaterSimulator);

export { DiamondWaterSimulator };
