import { SimulatorBase } from '../simulator-base.js';

class LeontiefSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            showTheory: true
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .trade-viz {
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

                .trade-comparison {
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    gap: 1rem;
                    align-items: center;
                    margin-bottom: 1.5rem;
                }

                .country-card {
                    background: var(--card, #1e293b);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .country-flag {
                    font-size: 3rem;
                    margin-bottom: 0.5rem;
                }

                .country-name {
                    font-weight: bold;
                    font-size: 1.25rem;
                    margin-bottom: 0.5rem;
                }

                .country-stat {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem 0;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    font-size: 0.875rem;
                }

                .stat-label {
                    color: var(--muted, #94a3b8);
                }

                .trade-arrow {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.5rem;
                }

                .arrow {
                    font-size: 2rem;
                }

                .arrow-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                    text-align: center;
                }

                .prediction-vs-reality {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin-top: 1.5rem;
                }

                .prediction-card {
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .prediction-card.theory {
                    background: rgba(34, 197, 94, 0.1);
                    border: 1px solid #22c55e;
                }

                .prediction-card.reality {
                    background: rgba(239, 68, 68, 0.1);
                    border: 1px solid #ef4444;
                }

                .prediction-title {
                    font-weight: bold;
                    margin-bottom: 1rem;
                }

                .prediction-title.theory {
                    color: #22c55e;
                }

                .prediction-title.reality {
                    color: #ef4444;
                }

                .ratio-display {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .data-table {
                    margin-top: 1.5rem;
                    width: 100%;
                    border-collapse: collapse;
                }

                .data-table th, .data-table td {
                    padding: 0.75rem;
                    text-align: left;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }

                .data-table th {
                    color: var(--muted, #94a3b8);
                    font-weight: normal;
                    font-size: 0.875rem;
                }

                .highlight-row {
                    background: rgba(99, 102, 241, 0.1);
                }

                @media (max-width: 600px) {
                    .trade-comparison {
                        grid-template-columns: 1fr;
                    }
                    .trade-arrow {
                        transform: rotate(90deg);
                        padding: 1rem 0;
                    }
                    .prediction-vs-reality {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>US Trade Pattern Analysis (1950s)</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">Wassily Leontief's surprising discovery about American trade.</p>

            <div class="controls">
                <button id="show-theory">Show Theory</button>
                <button id="show-data">Show Leontief's Data</button>
                <button id="show-explanations">Explanations</button>
            </div>

            <div class="trade-viz">
                <div class="theory-box" id="theory-section">
                    <div class="theory-title">Heckscher-Ohlin Theory (1930s)</div>
                    <p>Countries export goods that use their ABUNDANT factors intensively.</p>
                    <p style="margin-top: 0.5rem; color: var(--muted);">The US has abundant capital and scarce labor. Therefore, the US should export capital-intensive goods and import labor-intensive goods.</p>
                </div>

                <div class="trade-comparison">
                    <div class="country-card">
                        <div class="country-flag">🇺🇸</div>
                        <div class="country-name">United States</div>
                        <div class="country-stat">
                            <span class="stat-label">Capital</span>
                            <span style="color: #22c55e;">Abundant</span>
                        </div>
                        <div class="country-stat">
                            <span class="stat-label">Labor</span>
                            <span style="color: #ef4444;">Scarce</span>
                        </div>
                        <div class="country-stat">
                            <span class="stat-label">Expected Exports</span>
                            <span>Capital-intensive</span>
                        </div>
                    </div>

                    <div class="trade-arrow">
                        <div class="arrow">⇄</div>
                        <div class="arrow-label">Trade Flow</div>
                    </div>

                    <div class="country-card">
                        <div class="country-flag">🌍</div>
                        <div class="country-name">Rest of World</div>
                        <div class="country-stat">
                            <span class="stat-label">Capital</span>
                            <span style="color: #ef4444;">Scarce</span>
                        </div>
                        <div class="country-stat">
                            <span class="stat-label">Labor</span>
                            <span style="color: #22c55e;">Abundant</span>
                        </div>
                        <div class="country-stat">
                            <span class="stat-label">Expected Exports</span>
                            <span>Labor-intensive</span>
                        </div>
                    </div>
                </div>

                <div class="prediction-vs-reality" id="paradox-section">
                    <div class="prediction-card theory">
                        <div class="prediction-title theory">Theory Predicts</div>
                        <div class="ratio-display">K/L Exports > K/L Imports</div>
                        <p style="font-size: 0.875rem; color: var(--muted);">US exports should be more capital-intensive than imports</p>
                    </div>
                    <div class="prediction-card reality">
                        <div class="prediction-title reality">Leontief Found</div>
                        <div class="ratio-display">K/L Exports < K/L Imports</div>
                        <p style="font-size: 0.875rem; color: var(--muted);">US exports were actually MORE labor-intensive!</p>
                    </div>
                </div>

                <div id="data-section" style="display: none;">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Measure</th>
                                <th>US Exports</th>
                                <th>US Imports</th>
                                <th>Ratio (E/I)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Capital per worker</td>
                                <td>$13,991</td>
                                <td>$18,184</td>
                                <td style="color: #ef4444;">0.77</td>
                            </tr>
                            <tr class="highlight-row">
                                <td>Capital/Labor ratio</td>
                                <td>Lower</td>
                                <td>Higher</td>
                                <td style="color: #ef4444;">Paradox!</td>
                            </tr>
                            <tr>
                                <td>Labor years per $1M</td>
                                <td>182</td>
                                <td>170</td>
                                <td style="color: #ef4444;">1.07</td>
                            </tr>
                        </tbody>
                    </table>
                    <p style="margin-top: 1rem; font-size: 0.875rem; color: var(--muted);">
                        Source: Leontief (1953) - Analysis of US trade patterns using input-output tables
                    </p>
                </div>

                <div id="explanation-section" style="display: none;">
                    <div class="theory-box" style="margin-top: 1rem;">
                        <div class="theory-title">Possible Explanations</div>
                        <ul style="margin-top: 0.5rem; padding-left: 1.5rem;">
                            <li style="margin-bottom: 0.5rem;"><strong>Human Capital:</strong> US workers are more skilled/educated, effectively making US "labor-abundant" in skilled labor</li>
                            <li style="margin-bottom: 0.5rem;"><strong>Natural Resources:</strong> US imports resource-intensive goods (oil, minerals) which require capital to extract</li>
                            <li style="margin-bottom: 0.5rem;"><strong>Trade Barriers:</strong> Tariffs protected US capital-intensive industries from import competition</li>
                            <li style="margin-bottom: 0.5rem;"><strong>Technological Differences:</strong> US produces more efficiently with less capital per output</li>
                            <li><strong>Demand Patterns:</strong> US consumers prefer capital-intensive goods, reducing exports</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Leontief won the Nobel Prize in Economics. His paradox remains one of the most debated findings in international trade theory.</p>
            </div>

            <div class="insight">
                The Leontief Paradox showed that elegant economic theories can fail empirical tests. It launched decades of research into what actually determines trade patterns - and forced economists to consider factors beyond simple capital and labor.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#show-theory').addEventListener('click', () => this.showTheory());
        this.$('#show-data').addEventListener('click', () => this.showData());
        this.$('#show-explanations').addEventListener('click', () => this.showExplanations());
    }

    showTheory() {
        this.$('#theory-section').style.display = 'block';
        this.$('#paradox-section').style.display = 'grid';
        this.$('#data-section').style.display = 'none';
        this.$('#explanation-section').style.display = 'none';
        this.$('#result-text').textContent = 'The Heckscher-Ohlin theory seemed rock-solid - until Leontief tested it with real data.';
    }

    showData() {
        this.$('#theory-section').style.display = 'none';
        this.$('#paradox-section').style.display = 'none';
        this.$('#data-section').style.display = 'block';
        this.$('#explanation-section').style.display = 'none';
        this.$('#result-text').innerHTML = '<strong style="color: #ef4444;">The data contradicted theory!</strong> US exports required $13,991 of capital per worker, but imports required $18,184. The capital-abundant US was exporting labor-intensive goods.';
    }

    showExplanations() {
        this.$('#theory-section').style.display = 'none';
        this.$('#paradox-section').style.display = 'none';
        this.$('#data-section').style.display = 'none';
        this.$('#explanation-section').style.display = 'block';
        this.$('#result-text').textContent = 'The paradox was never fully "resolved" - it just expanded our understanding of what makes trade happen.';
    }
}

customElements.define('leontief-simulator', LeontiefSimulator);

export { LeontiefSimulator };
