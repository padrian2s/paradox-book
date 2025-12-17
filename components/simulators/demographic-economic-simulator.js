import { SimulatorBase } from '../simulator-base.js';

class DemographicEconomicSimulator extends SimulatorBase {
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

                .demo-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .paradox-display {
                    background: var(--card, #1e293b);
                    padding: 2rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    margin-bottom: 1.5rem;
                }

                .paradox-title {
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.5rem;
                }

                .paradox-statement {
                    font-size: 1.25rem;
                    font-weight: bold;
                    margin-bottom: 1rem;
                }

                .paradox-compare {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    flex-wrap: wrap;
                }

                .compare-item {
                    text-align: center;
                }

                .compare-icon {
                    font-size: 2.5rem;
                    margin-bottom: 0.5rem;
                }

                .compare-label {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .compare-value {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .compare-value.high {
                    color: #22c55e;
                }

                .compare-value.low {
                    color: #ef4444;
                }

                .countries-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                    gap: 1rem;
                    margin-top: 1.5rem;
                }

                .country-card {
                    background: var(--card, #1e293b);
                    padding: 1.25rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }

                .country-card:hover {
                    border-color: var(--primary, #6366f1);
                }

                .country-card.selected {
                    border-color: #f59e0b;
                    background: rgba(245, 158, 11, 0.1);
                }

                .country-flag {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }

                .country-name {
                    font-weight: bold;
                    margin-bottom: 0.75rem;
                }

                .country-stat {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.25rem 0;
                    font-size: 0.8rem;
                }

                .stat-label {
                    color: var(--muted, #94a3b8);
                }

                .factors-section {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin-top: 1.5rem;
                }

                .factors-title {
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                    margin-bottom: 1rem;
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
                    font-size: 1.25rem;
                }

                .factor-content {
                    flex: 1;
                }

                .factor-name {
                    font-weight: bold;
                    margin-bottom: 0.25rem;
                }

                .factor-desc {
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .chart-section {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin-top: 1.5rem;
                }

                .chart-title {
                    font-weight: bold;
                    margin-bottom: 1rem;
                }

                .chart-bar-row {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 0.75rem;
                }

                .chart-label {
                    width: 100px;
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .chart-bar-container {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .chart-bar {
                    height: 24px;
                    border-radius: 4px;
                    transition: width 0.5s ease;
                }

                .chart-bar.gdp {
                    background: linear-gradient(90deg, #22c55e, #16a34a);
                }

                .chart-bar.fertility {
                    background: linear-gradient(90deg, #6366f1, #4f46e5);
                }

                @media (max-width: 600px) {
                    .paradox-compare {
                        flex-direction: column;
                        gap: 1rem;
                    }
                }
            </style>

            <h4>Wealth vs. Fertility</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">The richer a nation gets, the fewer children it has. Why?</p>

            <div class="controls">
                <button id="show-paradox">The Paradox</button>
                <button id="show-data">Compare Countries</button>
                <button id="show-why">Why It Happens</button>
            </div>

            <div class="demo-viz">
                <div class="paradox-display" id="paradox-section">
                    <div class="paradox-title">The Demographic-Economic Paradox</div>
                    <div class="paradox-statement">Countries that can afford the MOST children have the FEWEST</div>
                    <div class="paradox-compare">
                        <div class="compare-item">
                            <div class="compare-icon">💰</div>
                            <div class="compare-label">Rich Nations</div>
                            <div class="compare-value high">$50K+ GDP/capita</div>
                            <div class="compare-value low">1.6 children</div>
                        </div>
                        <div class="compare-item">
                            <div class="compare-icon" style="font-size: 1.5rem;">vs</div>
                        </div>
                        <div class="compare-item">
                            <div class="compare-icon">🏚️</div>
                            <div class="compare-label">Poor Nations</div>
                            <div class="compare-value low">$2K GDP/capita</div>
                            <div class="compare-value high">5+ children</div>
                        </div>
                    </div>
                </div>

                <div class="countries-grid" id="countries-section">
                    <div class="country-card" data-country="niger">
                        <div class="country-flag">🇳🇪</div>
                        <div class="country-name">Niger</div>
                        <div class="country-stat">
                            <span class="stat-label">GDP/capita</span>
                            <span style="color: #ef4444;">$560</span>
                        </div>
                        <div class="country-stat">
                            <span class="stat-label">Fertility</span>
                            <span style="color: #22c55e;">6.9 children</span>
                        </div>
                    </div>
                    <div class="country-card" data-country="nigeria">
                        <div class="country-flag">🇳🇬</div>
                        <div class="country-name">Nigeria</div>
                        <div class="country-stat">
                            <span class="stat-label">GDP/capita</span>
                            <span style="color: #ef4444;">$2,100</span>
                        </div>
                        <div class="country-stat">
                            <span class="stat-label">Fertility</span>
                            <span style="color: #22c55e;">5.2 children</span>
                        </div>
                    </div>
                    <div class="country-card" data-country="india">
                        <div class="country-flag">🇮🇳</div>
                        <div class="country-name">India</div>
                        <div class="country-stat">
                            <span class="stat-label">GDP/capita</span>
                            <span style="color: #f59e0b;">$2,400</span>
                        </div>
                        <div class="country-stat">
                            <span class="stat-label">Fertility</span>
                            <span style="color: #f59e0b;">2.0 children</span>
                        </div>
                    </div>
                    <div class="country-card" data-country="usa">
                        <div class="country-flag">🇺🇸</div>
                        <div class="country-name">USA</div>
                        <div class="country-stat">
                            <span class="stat-label">GDP/capita</span>
                            <span style="color: #22c55e;">$76,000</span>
                        </div>
                        <div class="country-stat">
                            <span class="stat-label">Fertility</span>
                            <span style="color: #ef4444;">1.7 children</span>
                        </div>
                    </div>
                    <div class="country-card" data-country="japan">
                        <div class="country-flag">🇯🇵</div>
                        <div class="country-name">Japan</div>
                        <div class="country-stat">
                            <span class="stat-label">GDP/capita</span>
                            <span style="color: #22c55e;">$34,000</span>
                        </div>
                        <div class="country-stat">
                            <span class="stat-label">Fertility</span>
                            <span style="color: #ef4444;">1.2 children</span>
                        </div>
                    </div>
                    <div class="country-card" data-country="korea">
                        <div class="country-flag">🇰🇷</div>
                        <div class="country-name">South Korea</div>
                        <div class="country-stat">
                            <span class="stat-label">GDP/capita</span>
                            <span style="color: #22c55e;">$32,000</span>
                        </div>
                        <div class="country-stat">
                            <span class="stat-label">Fertility</span>
                            <span style="color: #ef4444;">0.78 children</span>
                        </div>
                    </div>
                </div>

                <div class="factors-section" id="factors-section" style="display: none;">
                    <div class="factors-title">Why Wealth Reduces Fertility</div>
                    <div class="factor-item">
                        <div class="factor-icon">💼</div>
                        <div class="factor-content">
                            <div class="factor-name">Opportunity Cost</div>
                            <div class="factor-desc">In rich economies, women earn more. Each child means more foregone income. The cost of children rises with prosperity.</div>
                        </div>
                    </div>
                    <div class="factor-item">
                        <div class="factor-icon">🏥</div>
                        <div class="factor-content">
                            <div class="factor-name">Lower Child Mortality</div>
                            <div class="factor-desc">When children reliably survive, you don't need "insurance" births. Quality replaces quantity.</div>
                        </div>
                    </div>
                    <div class="factor-item">
                        <div class="factor-icon">🎓</div>
                        <div class="factor-content">
                            <div class="factor-name">Education Investment</div>
                            <div class="factor-desc">Modern economies reward education. Parents invest heavily in fewer children rather than spread resources thin.</div>
                        </div>
                    </div>
                    <div class="factor-item">
                        <div class="factor-icon">👴</div>
                        <div class="factor-content">
                            <div class="factor-name">Social Safety Nets</div>
                            <div class="factor-desc">Pensions and social security replace children as old-age insurance. You don't need kids to support you.</div>
                        </div>
                    </div>
                    <div class="factor-item">
                        <div class="factor-icon">💊</div>
                        <div class="factor-content">
                            <div class="factor-name">Contraception Access</div>
                            <div class="factor-desc">Wealthy nations have better access to family planning. Fertility becomes a choice, not a default.</div>
                        </div>
                    </div>
                    <div class="factor-item">
                        <div class="factor-icon">🏙️</div>
                        <div class="factor-content">
                            <div class="factor-name">Urbanization</div>
                            <div class="factor-desc">Cities make children expensive (housing, childcare). Rural settings make children economically productive.</div>
                        </div>
                    </div>
                </div>

                <div class="chart-section" id="chart-section" style="display: none;">
                    <div class="chart-title">The Inverse Relationship</div>
                    <div class="chart-bar-row">
                        <span class="chart-label">Niger</span>
                        <div class="chart-bar-container">
                            <div class="chart-bar gdp" style="width: 2%"></div>
                            <div class="chart-bar fertility" style="width: 98%"></div>
                        </div>
                    </div>
                    <div class="chart-bar-row">
                        <span class="chart-label">Nigeria</span>
                        <div class="chart-bar-container">
                            <div class="chart-bar gdp" style="width: 5%"></div>
                            <div class="chart-bar fertility" style="width: 75%"></div>
                        </div>
                    </div>
                    <div class="chart-bar-row">
                        <span class="chart-label">India</span>
                        <div class="chart-bar-container">
                            <div class="chart-bar gdp" style="width: 6%"></div>
                            <div class="chart-bar fertility" style="width: 29%"></div>
                        </div>
                    </div>
                    <div class="chart-bar-row">
                        <span class="chart-label">USA</span>
                        <div class="chart-bar-container">
                            <div class="chart-bar gdp" style="width: 100%"></div>
                            <div class="chart-bar fertility" style="width: 25%"></div>
                        </div>
                    </div>
                    <div class="chart-bar-row">
                        <span class="chart-label">Japan</span>
                        <div class="chart-bar-container">
                            <div class="chart-bar gdp" style="width: 45%"></div>
                            <div class="chart-bar fertility" style="width: 17%"></div>
                        </div>
                    </div>
                    <div class="chart-bar-row">
                        <span class="chart-label">S. Korea</span>
                        <div class="chart-bar-container">
                            <div class="chart-bar gdp" style="width: 42%"></div>
                            <div class="chart-bar fertility" style="width: 11%"></div>
                        </div>
                    </div>
                    <div style="margin-top: 1rem; font-size: 0.75rem; color: var(--muted);">
                        <span style="color: #22c55e;">Green = GDP per capita</span> |
                        <span style="color: #6366f1;">Purple = Fertility rate</span>
                    </div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Click on countries to explore the paradox: the wealthiest nations have the lowest birth rates.</p>
            </div>

            <div class="insight">
                This paradox has profound implications: wealthy nations face aging populations and shrinking workforces. Immigration and productivity gains must offset declining births - or societies must fundamentally restructure around smaller populations.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#show-paradox').addEventListener('click', () => this.showParadox());
        this.$('#show-data').addEventListener('click', () => this.showData());
        this.$('#show-why').addEventListener('click', () => this.showWhy());

        this.$$('.country-card').forEach(card => {
            card.addEventListener('click', () => this.selectCountry(card));
        });
    }

    showParadox() {
        this.$('#paradox-section').style.display = 'block';
        this.$('#countries-section').style.display = 'none';
        this.$('#factors-section').style.display = 'none';
        this.$('#chart-section').style.display = 'none';
        this.$('#result-text').textContent = 'Intuitively, wealth should enable more children. The paradox: it does the opposite.';
    }

    showData() {
        this.$('#paradox-section').style.display = 'none';
        this.$('#countries-section').style.display = 'grid';
        this.$('#factors-section').style.display = 'none';
        this.$('#chart-section').style.display = 'block';
        this.$('#result-text').textContent = 'Click on countries to see the inverse relationship between wealth and fertility.';
    }

    showWhy() {
        this.$('#paradox-section').style.display = 'none';
        this.$('#countries-section').style.display = 'none';
        this.$('#factors-section').style.display = 'block';
        this.$('#chart-section').style.display = 'none';
        this.$('#result-text').textContent = 'Multiple factors explain why prosperity reduces fertility. Children shift from economic assets to economic costs.';
    }

    selectCountry(card) {
        this.$$('.country-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        const country = card.dataset.country;
        const explanations = {
            niger: 'Niger: World\'s highest fertility rate (6.9) but one of lowest GDPs ($560). Children provide farm labor and old-age security. Most women lack access to education and contraception.',
            nigeria: 'Nigeria: High fertility (5.2) despite being Africa\'s largest economy. Cultural preference for large families persists even as urbanization increases.',
            india: 'India: Now at replacement rate (2.0) after dramatic decline. Education of women and economic development transformed family planning in one generation.',
            usa: 'USA: Below replacement (1.7) despite being world\'s wealthiest large nation. Career demands, housing costs, and lifestyle choices compete with family formation.',
            japan: 'Japan: Severe population decline (1.2). Work culture, cramped housing, and changing gender roles create "demographic time bomb." Population shrinking 500,000/year.',
            korea: '<strong style="color: #ef4444;">South Korea: World\'s lowest fertility (0.78).</strong> Extreme competition for education, brutal work culture, and expensive housing make children nearly impossible. Population could halve by 2100.'
        };

        this.$('#result-text').innerHTML = explanations[country];
    }
}

customElements.define('demographic-economic-simulator', DemographicEconomicSimulator);

export { DemographicEconomicSimulator };
