import { SimulatorBase } from '../simulator-base.js';

class MandevilleSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            greed: 50,
            vanity: 50,
            economicOutput: 100,
            employment: 100
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .mandeville-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .quote-box {
                    background: var(--card, #1e293b);
                    padding: 2rem;
                    border-radius: 0.5rem;
                    text-align: center;
                    margin-bottom: 1.5rem;
                    border-left: 4px solid var(--primary, #6366f1);
                }

                .quote-text {
                    font-size: 1.25rem;
                    font-style: italic;
                    margin-bottom: 1rem;
                }

                .quote-attr {
                    color: var(--muted, #94a3b8);
                }

                .vices-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .vice-card {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                }

                .vice-header {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                }

                .vice-icon {
                    font-size: 2rem;
                }

                .vice-name {
                    font-weight: bold;
                    font-size: 1.125rem;
                }

                .vice-slider {
                    margin-bottom: 1rem;
                }

                .vice-slider label {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                    font-size: 0.875rem;
                    color: var(--muted, #94a3b8);
                }

                .vice-effects {
                    font-size: 0.875rem;
                }

                .effect-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }

                .effect-item:last-child {
                    border-bottom: none;
                }

                .effect-positive {
                    color: #22c55e;
                }

                .effect-negative {
                    color: #ef4444;
                }

                .economy-display {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin-bottom: 1.5rem;
                }

                .economy-title {
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                    margin-bottom: 1rem;
                }

                .economy-metrics {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 1rem;
                }

                .metric-box {
                    text-align: center;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                .metric-value {
                    font-size: 2rem;
                    font-weight: bold;
                }

                .metric-value.high {
                    color: #22c55e;
                }

                .metric-value.medium {
                    color: #f59e0b;
                }

                .metric-value.low {
                    color: #ef4444;
                }

                .metric-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                .examples-section {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                }

                .examples-title {
                    font-weight: bold;
                    margin-bottom: 1rem;
                }

                .example-item {
                    display: flex;
                    gap: 1rem;
                    padding: 1rem 0;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }

                .example-item:last-child {
                    border-bottom: none;
                }

                .example-vice {
                    background: rgba(239, 68, 68, 0.1);
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    border-left: 3px solid #ef4444;
                    min-width: 120px;
                }

                .example-benefit {
                    background: rgba(34, 197, 94, 0.1);
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    border-left: 3px solid #22c55e;
                    flex: 1;
                }

                .example-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    margin-bottom: 0.25rem;
                }

                @media (max-width: 600px) {
                    .example-item {
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                }
            </style>

            <h4>The Fable of the Bees (1714)</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">Bernard Mandeville's scandalous claim: private vices create public benefits.</p>

            <div class="controls">
                <button id="show-sim">Simulate Economy</button>
                <button id="show-examples">Real Examples</button>
                <button id="virtuous-society">Try Virtuous Society</button>
            </div>

            <div class="mandeville-viz">
                <div class="quote-box">
                    <div class="quote-text">"Private Vices, Publick Benefits"</div>
                    <div class="quote-attr">- Subtitle of "The Fable of the Bees" by Bernard Mandeville, 1714</div>
                </div>

                <div class="vices-grid" id="vices-section">
                    <div class="vice-card">
                        <div class="vice-header">
                            <div class="vice-icon">💰</div>
                            <div class="vice-name">Greed</div>
                        </div>
                        <div class="vice-slider">
                            <label>
                                <span>Level</span>
                                <span id="greed-val">50%</span>
                            </label>
                            <input type="range" id="greed-slider" min="0" max="100" value="50" style="width: 100%;">
                        </div>
                        <div class="vice-effects">
                            <div class="effect-item">
                                <span>Investment</span>
                                <span class="effect-positive" id="greed-invest">+25%</span>
                            </div>
                            <div class="effect-item">
                                <span>Innovation</span>
                                <span class="effect-positive" id="greed-innovate">+25%</span>
                            </div>
                            <div class="effect-item">
                                <span>Inequality</span>
                                <span class="effect-negative" id="greed-inequality">+25%</span>
                            </div>
                        </div>
                    </div>

                    <div class="vice-card">
                        <div class="vice-header">
                            <div class="vice-icon">👑</div>
                            <div class="vice-name">Vanity</div>
                        </div>
                        <div class="vice-slider">
                            <label>
                                <span>Level</span>
                                <span id="vanity-val">50%</span>
                            </label>
                            <input type="range" id="vanity-slider" min="0" max="100" value="50" style="width: 100%;">
                        </div>
                        <div class="vice-effects">
                            <div class="effect-item">
                                <span>Luxury Spending</span>
                                <span class="effect-positive" id="vanity-luxury">+25%</span>
                            </div>
                            <div class="effect-item">
                                <span>Employment</span>
                                <span class="effect-positive" id="vanity-jobs">+25%</span>
                            </div>
                            <div class="effect-item">
                                <span>Waste</span>
                                <span class="effect-negative" id="vanity-waste">+25%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="economy-display" id="economy-section">
                    <div class="economy-title">Economic Output</div>
                    <div class="economy-metrics">
                        <div class="metric-box">
                            <div class="metric-value high" id="gdp-metric">100</div>
                            <div class="metric-label">GDP Index</div>
                        </div>
                        <div class="metric-box">
                            <div class="metric-value high" id="jobs-metric">100</div>
                            <div class="metric-label">Employment</div>
                        </div>
                        <div class="metric-box">
                            <div class="metric-value medium" id="innovation-metric">100</div>
                            <div class="metric-label">Innovation</div>
                        </div>
                        <div class="metric-box">
                            <div class="metric-value medium" id="inequality-metric">50</div>
                            <div class="metric-label">Inequality</div>
                        </div>
                    </div>
                </div>

                <div class="examples-section" id="examples-section" style="display: none;">
                    <div class="examples-title">Private Vices -> Public Benefits</div>
                    <div class="example-item">
                        <div class="example-vice">
                            <div class="example-label">Vice</div>
                            <strong>Greed</strong>
                        </div>
                        <div class="example-benefit">
                            <div class="example-label">Public Benefit</div>
                            Entrepreneurs risk capital, create jobs, and innovate products that improve lives
                        </div>
                    </div>
                    <div class="example-item">
                        <div class="example-vice">
                            <div class="example-label">Vice</div>
                            <strong>Vanity</strong>
                        </div>
                        <div class="example-benefit">
                            <div class="example-label">Public Benefit</div>
                            Fashion industry employs millions; desire to impress drives consumption that funds jobs
                        </div>
                    </div>
                    <div class="example-item">
                        <div class="example-vice">
                            <div class="example-label">Vice</div>
                            <strong>Envy</strong>
                        </div>
                        <div class="example-benefit">
                            <div class="example-label">Public Benefit</div>
                            "Keeping up with the Joneses" drives consumer spending that supports entire industries
                        </div>
                    </div>
                    <div class="example-item">
                        <div class="example-vice">
                            <div class="example-label">Vice</div>
                            <strong>Gluttony</strong>
                        </div>
                        <div class="example-benefit">
                            <div class="example-label">Public Benefit</div>
                            Restaurant industry, food innovation, agriculture - all fed by appetite beyond necessity
                        </div>
                    </div>
                    <div class="example-item">
                        <div class="example-vice">
                            <div class="example-label">Vice</div>
                            <strong>Pride</strong>
                        </div>
                        <div class="example-benefit">
                            <div class="example-label">Public Benefit</div>
                            Competitive drive leads to excellence; desire for status pushes achievement
                        </div>
                    </div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Adjust the vice sliders to see how greed and vanity affect economic outcomes. Try reducing both to see a "virtuous" society.</p>
            </div>

            <div class="insight">
                Mandeville scandalized 18th century England. Adam Smith later formalized this as the "invisible hand" - self-interest, channeled through markets, produces social good. The paradox: moral vices can be economic virtues.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#greed-slider').addEventListener('input', () => this.updateEconomy());
        this.$('#vanity-slider').addEventListener('input', () => this.updateEconomy());
        this.$('#show-sim').addEventListener('click', () => this.showSimulation());
        this.$('#show-examples').addEventListener('click', () => this.showExamples());
        this.$('#virtuous-society').addEventListener('click', () => this.virtuousSociety());
        this.updateEconomy();
    }

    updateEconomy() {
        const greed = parseInt(this.$('#greed-slider').value);
        const vanity = parseInt(this.$('#vanity-slider').value);

        this.$('#greed-val').textContent = greed + '%';
        this.$('#vanity-val').textContent = vanity + '%';

        const investment = Math.round(greed * 0.5);
        const innovation = Math.round(greed * 0.5);
        const inequality = Math.round(greed * 0.5);

        this.$('#greed-invest').textContent = '+' + investment + '%';
        this.$('#greed-innovate').textContent = '+' + innovation + '%';
        this.$('#greed-inequality').textContent = '+' + inequality + '%';

        const luxury = Math.round(vanity * 0.5);
        const jobs = Math.round(vanity * 0.5);
        const waste = Math.round(vanity * 0.4);

        this.$('#vanity-luxury').textContent = '+' + luxury + '%';
        this.$('#vanity-jobs').textContent = '+' + jobs + '%';
        this.$('#vanity-waste').textContent = '+' + waste + '%';

        const gdp = 50 + Math.round((greed + vanity) * 0.5);
        const employment = 50 + Math.round((greed * 0.3 + vanity * 0.7) * 0.5);
        const innovationIndex = 50 + Math.round(greed * 0.5);
        const inequalityIndex = 20 + Math.round(greed * 0.6);

        this.updateMetric('gdp-metric', gdp);
        this.updateMetric('jobs-metric', employment);
        this.updateMetric('innovation-metric', innovationIndex);
        this.updateMetric('inequality-metric', inequalityIndex, true);

        this.updateExplanation(greed, vanity, gdp);
    }

    updateMetric(id, value, inverse = false) {
        const el = this.$(`#${id}`);
        el.textContent = value;

        let className;
        if (inverse) {
            className = value < 40 ? 'high' : value < 60 ? 'medium' : 'low';
        } else {
            className = value > 70 ? 'high' : value > 40 ? 'medium' : 'low';
        }
        el.className = 'metric-value ' + className;
    }

    updateExplanation(greed, vanity, gdp) {
        let text;
        if (greed < 20 && vanity < 20) {
            text = '<strong style="color: #ef4444;">VIRTUOUS POVERTY:</strong> A society without greed or vanity would be morally pure but economically stagnant. No one invests, no one consumes luxuries, crafts and arts wither.';
        } else if (greed > 80 && vanity > 80) {
            text = '<strong style="color: #22c55e;">PROSPEROUS VICE:</strong> High greed and vanity drive massive economic activity. Inequality rises, but so does innovation and employment. This is Mandeville\'s controversial point.';
        } else {
            text = `Current GDP index: ${gdp}. Greed drives investment and innovation. Vanity drives consumption and employment. Together they fuel the economy.`;
        }
        this.$('#result-text').innerHTML = text;
    }

    showSimulation() {
        this.$('#vices-section').style.display = 'grid';
        this.$('#economy-section').style.display = 'block';
        this.$('#examples-section').style.display = 'none';
    }

    showExamples() {
        this.$('#vices-section').style.display = 'none';
        this.$('#economy-section').style.display = 'none';
        this.$('#examples-section').style.display = 'block';
        this.$('#result-text').textContent = 'Each "vice" generates economic activity that benefits society. The moral question: does the end justify the means?';
    }

    virtuousSociety() {
        this.$('#greed-slider').value = 10;
        this.$('#vanity-slider').value = 10;
        this.updateEconomy();
        this.$('#vices-section').style.display = 'grid';
        this.$('#economy-section').style.display = 'block';
        this.$('#examples-section').style.display = 'none';
    }
}

customElements.define('mandeville-simulator', MandevilleSimulator);

export { MandevilleSimulator };
