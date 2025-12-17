import { SimulatorBase } from '../simulator-base.js';

class LucasParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            selectedCountry: null
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .capital-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .theory-box {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin-bottom: 1.5rem;
                }

                .theory-title {
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                    margin-bottom: 0.5rem;
                }

                .flow-diagram {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 2rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    margin-bottom: 1.5rem;
                }

                .country-block {
                    text-align: center;
                    padding: 1rem;
                }

                .country-emoji {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                }

                .country-label {
                    font-weight: bold;
                    margin-bottom: 0.25rem;
                }

                .country-stat {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .flow-arrows {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                }

                .arrow-expected {
                    font-size: 2rem;
                    color: #22c55e;
                }

                .arrow-actual {
                    font-size: 2rem;
                    color: #ef4444;
                }

                .arrow-text {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .returns-comparison {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1rem;
                    margin-top: 1.5rem;
                }

                .return-card {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }

                .return-card:hover {
                    border-color: var(--primary, #6366f1);
                }

                .return-card.selected {
                    border-color: #f59e0b;
                    background: rgba(245, 158, 11, 0.1);
                }

                .return-flag {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }

                .return-name {
                    font-weight: bold;
                    margin-bottom: 0.25rem;
                }

                .return-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                    color: #22c55e;
                    margin-bottom: 0.25rem;
                }

                .return-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .capital-received {
                    margin-top: 0.5rem;
                    font-size: 0.875rem;
                }

                .factors-list {
                    margin-top: 1.5rem;
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                }

                .factor-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    padding: 0.75rem 0;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }

                .factor-item:last-child {
                    border-bottom: none;
                }

                .factor-icon {
                    font-size: 1.5rem;
                }

                .factor-content {
                    flex: 1;
                }

                .factor-title {
                    font-weight: bold;
                    margin-bottom: 0.25rem;
                }

                .factor-desc {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                @media (max-width: 600px) {
                    .flow-diagram {
                        flex-direction: column;
                        gap: 1rem;
                    }
                    .flow-arrows {
                        transform: rotate(90deg);
                    }
                }
            </style>

            <h4>Global Capital Flows</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">Robert Lucas (1990) asked: Why doesn't capital flow from rich to poor countries?</p>

            <div class="controls">
                <button id="show-theory">Economic Theory</button>
                <button id="show-reality">Reality Check</button>
                <button id="show-why">Why It Happens</button>
            </div>

            <div class="capital-viz">
                <div class="theory-box" id="theory-section">
                    <div class="theory-title">Neoclassical Theory: Diminishing Returns to Capital</div>
                    <p>When capital is scarce, the return on investment is HIGH. When capital is abundant, returns are LOW.</p>
                    <p style="margin-top: 0.5rem;">Therefore, investors in rich countries should send capital to poor countries where it earns higher returns.</p>
                </div>

                <div class="flow-diagram">
                    <div class="country-block">
                        <div class="country-emoji">🏦</div>
                        <div class="country-label">Rich Countries</div>
                        <div class="country-stat">Capital: Abundant</div>
                        <div class="country-stat">Returns: ~4-6%</div>
                    </div>

                    <div class="flow-arrows">
                        <div>
                            <span class="arrow-expected">→→→</span>
                            <div class="arrow-text" style="color: #22c55e;">Expected Flow</div>
                        </div>
                        <div>
                            <span class="arrow-actual">←←←</span>
                            <div class="arrow-text" style="color: #ef4444;">Actual Flow</div>
                        </div>
                    </div>

                    <div class="country-block">
                        <div class="country-emoji">🌍</div>
                        <div class="country-label">Poor Countries</div>
                        <div class="country-stat">Capital: Scarce</div>
                        <div class="country-stat">Returns: ~10-20%?</div>
                    </div>
                </div>

                <div class="returns-comparison" id="returns-section">
                    <div class="return-card" data-country="usa">
                        <div class="return-flag">🇺🇸</div>
                        <div class="return-name">United States</div>
                        <div class="return-value">5%</div>
                        <div class="return-label">Expected Return</div>
                        <div class="capital-received" style="color: #22c55e;">Receives: $500B/year</div>
                    </div>
                    <div class="return-card" data-country="germany">
                        <div class="return-flag">🇩🇪</div>
                        <div class="return-name">Germany</div>
                        <div class="return-value">4%</div>
                        <div class="return-label">Expected Return</div>
                        <div class="capital-received" style="color: #22c55e;">Receives: $200B/year</div>
                    </div>
                    <div class="return-card" data-country="india">
                        <div class="return-flag">🇮🇳</div>
                        <div class="return-name">India</div>
                        <div class="return-value">15%</div>
                        <div class="return-label">Expected Return</div>
                        <div class="capital-received" style="color: #ef4444;">Receives: $50B/year</div>
                    </div>
                    <div class="return-card" data-country="nigeria">
                        <div class="return-flag">🇳🇬</div>
                        <div class="return-name">Nigeria</div>
                        <div class="return-value">25%</div>
                        <div class="return-label">Expected Return</div>
                        <div class="capital-received" style="color: #ef4444;">Receives: $5B/year</div>
                    </div>
                </div>

                <div class="factors-list" id="factors-section" style="display: none;">
                    <div style="font-weight: bold; margin-bottom: 1rem; color: var(--primary, #6366f1);">Why Capital Stays in Rich Countries</div>
                    <div class="factor-item">
                        <div class="factor-icon">⚖️</div>
                        <div class="factor-content">
                            <div class="factor-title">Weak Institutions</div>
                            <div class="factor-desc">Poor countries often lack rule of law, property rights, and contract enforcement. High returns mean nothing if your investment can be seized.</div>
                        </div>
                    </div>
                    <div class="factor-item">
                        <div class="factor-icon">📚</div>
                        <div class="factor-content">
                            <div class="factor-title">Human Capital Gap</div>
                            <div class="factor-desc">Physical capital needs skilled workers to be productive. A factory needs engineers and managers, not just machines.</div>
                        </div>
                    </div>
                    <div class="factor-item">
                        <div class="factor-icon">🔄</div>
                        <div class="factor-content">
                            <div class="factor-title">Missing Complementary Factors</div>
                            <div class="factor-desc">Roads, ports, electricity, supply chains - capital is less productive without infrastructure.</div>
                        </div>
                    </div>
                    <div class="factor-item">
                        <div class="factor-icon">💱</div>
                        <div class="factor-content">
                            <div class="factor-title">Currency Risk</div>
                            <div class="factor-desc">Investments in developing countries face exchange rate volatility and capital controls.</div>
                        </div>
                    </div>
                    <div class="factor-item">
                        <div class="factor-icon">📊</div>
                        <div class="factor-content">
                            <div class="factor-title">Information Asymmetry</div>
                            <div class="factor-desc">Investors know more about opportunities in familiar markets. Distance increases uncertainty.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Click on countries to see the paradox: Higher theoretical returns attract LESS capital. Money flows where it's already abundant.</p>
            </div>

            <div class="insight">
                Lucas calculated that if simple theory were correct, capital should flow to India until returns equalized - implying India should have 58 times more capital than it does. The paradox reveals that "returns" include risk, institutions, and infrastructure - not just scarcity.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#show-theory').addEventListener('click', () => this.showTheory());
        this.$('#show-reality').addEventListener('click', () => this.showReality());
        this.$('#show-why').addEventListener('click', () => this.showWhy());

        this.$$('.return-card').forEach(card => {
            card.addEventListener('click', () => this.selectCountry(card));
        });
    }

    showTheory() {
        this.$('#theory-section').style.display = 'block';
        this.$('#returns-section').style.display = 'grid';
        this.$('#factors-section').style.display = 'none';
        this.$('#result-text').textContent = 'According to theory, capital should flow from rich to poor countries chasing higher returns...';
    }

    showReality() {
        this.$('#theory-section').style.display = 'none';
        this.$('#returns-section').style.display = 'grid';
        this.$('#factors-section').style.display = 'none';
        this.$('#result-text').innerHTML = '<strong style="color: #ef4444;">THE PARADOX:</strong> Capital actually flows the OPPOSITE direction! Poor countries export capital to rich countries (buying US Treasury bonds, for example).';
    }

    showWhy() {
        this.$('#theory-section').style.display = 'none';
        this.$('#returns-section').style.display = 'none';
        this.$('#factors-section').style.display = 'block';
        this.$('#result-text').textContent = 'The paradox is resolved by recognizing that theoretical returns ignore real-world frictions that make poor-country investments risky.';
    }

    selectCountry(card) {
        this.$$('.return-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        const country = card.dataset.country;
        const explanations = {
            usa: 'The US receives massive capital inflows despite low returns. Why? Deep markets, rule of law, dollar safety, and transparent institutions make it the world\'s "safe haven."',
            germany: 'Germany attracts capital as Europe\'s stable anchor. Investors accept 4% returns for German reliability over 15% returns in riskier markets.',
            india: 'India\'s high theoretical returns are offset by bureaucracy, infrastructure gaps, and currency volatility. It receives a fraction of what theory predicts.',
            nigeria: 'Nigeria should be a capital magnet at 25% returns. Instead, Nigerian elites send their capital OUT to London and New York. The risk premium is too high.'
        };

        this.$('#result-text').innerHTML = explanations[country];
    }
}

customElements.define('lucas-paradox-simulator', LucasParadoxSimulator);

export { LucasParadoxSimulator };
