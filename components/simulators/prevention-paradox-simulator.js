import { SimulatorBase } from '../simulator-base.js';

class PreventionParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            population: 1000000,
            strategy: 'none'
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .population-viz {
                    background: var(--bg, #0f172a);
                    padding: 1.5rem;
                    border-radius: 0.5rem;
                    margin: 1rem 0;
                }

                .strategy-comparison {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                }

                .strategy-box {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .strategy-box.active {
                    border: 2px solid var(--primary, #6366f1);
                }

                .strategy-box h5 {
                    margin: 0 0 0.5rem 0;
                }

                .big-number {
                    font-size: 2rem;
                    font-weight: bold;
                    color: var(--accent, #f59e0b);
                }

                .small-label {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .person-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 2px;
                    margin: 1rem 0;
                    justify-content: center;
                }

                .person {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }

                .person.healthy { background: #22c55e; }
                .person.at-risk { background: #f59e0b; }
                .person.affected { background: #ef4444; }
                .person.saved { background: var(--primary, #6366f1); }

                .legend {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                    font-size: 0.75rem;
                    margin-top: 0.5rem;
                }

                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }

                .legend-dot {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                }

                @media (max-width: 768px) {
                    .strategy-comparison {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Public Health Prevention Strategies</h4>

            <div class="controls">
                <button id="high-risk-btn">High-Risk Strategy</button>
                <button id="population-btn">Population Strategy</button>
                <button id="compare-btn">Compare Both</button>
            </div>

            <div class="population-viz">
                <strong>Scenario: Reducing Heart Disease Deaths</strong>
                <p style="font-size: 0.875rem; color: var(--muted);">Population: 1,000,000 people. 10,000 at high risk, 990,000 at moderate risk.</p>

                <div class="person-grid" id="population"></div>
                <div class="legend">
                    <div class="legend-item"><div class="legend-dot" style="background: #22c55e;"></div> Healthy</div>
                    <div class="legend-item"><div class="legend-dot" style="background: #f59e0b;"></div> At Risk</div>
                    <div class="legend-item"><div class="legend-dot" style="background: #ef4444;"></div> Would Die</div>
                    <div class="legend-item"><div class="legend-dot" style="background: var(--primary);"></div> Saved</div>
                </div>

                <div class="strategy-comparison">
                    <div class="strategy-box" id="high-risk-box">
                        <h5>High-Risk Strategy</h5>
                        <div class="small-label">Treat 10,000 high-risk individuals</div>
                        <div class="big-number" id="high-risk-saved">-</div>
                        <div class="small-label">Lives Saved</div>
                        <div style="margin-top: 0.5rem; font-size: 0.75rem;">
                            Individual benefit: <strong id="high-risk-individual">-</strong>
                        </div>
                    </div>
                    <div class="strategy-box" id="population-box">
                        <h5>Population Strategy</h5>
                        <div class="small-label">Moderate intervention for all 1M</div>
                        <div class="big-number" id="population-saved">-</div>
                        <div class="small-label">Lives Saved</div>
                        <div style="margin-top: 0.5rem; font-size: 0.75rem;">
                            Individual benefit: <strong id="population-individual">-</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div class="result">
                <p id="result-text">Click a strategy to see the Prevention Paradox in action.</p>
            </div>

            <div class="insight">
                Geoffrey Rose's Prevention Paradox: "A measure that brings large benefits to the community offers little to each participating individual." Population strategies save more lives but each person sees minimal benefit.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#high-risk-btn').addEventListener('click', () => this.showHighRisk());
        this.$('#population-btn').addEventListener('click', () => this.showPopulation());
        this.$('#compare-btn').addEventListener('click', () => this.showComparison());
        this.renderPopulation('none');
    }

    renderPopulation(strategy) {
        const container = this.$('#population');
        container.innerHTML = '';

        for (let i = 0; i < 100; i++) {
            const person = document.createElement('div');
            person.className = 'person';

            if (i < 10) {
                if (strategy === 'high-risk' && i < 5) {
                    person.classList.add('saved');
                } else if (i < 5) {
                    person.classList.add('affected');
                } else {
                    person.classList.add('at-risk');
                }
            } else {
                if (strategy === 'population' && i >= 10 && i < 18) {
                    person.classList.add('saved');
                } else if (i >= 10 && i < 18) {
                    person.classList.add('affected');
                } else {
                    person.classList.add('healthy');
                }
            }
            container.appendChild(person);
        }
    }

    showHighRisk() {
        this.renderPopulation('high-risk');
        this.$('#high-risk-box').classList.add('active');
        this.$('#population-box').classList.remove('active');

        this.$('#high-risk-saved').textContent = '500';
        this.$('#high-risk-individual').textContent = '5% chance of benefit';
        this.$('#population-saved').textContent = '-';
        this.$('#population-individual').textContent = '-';

        this.$('#result-text').innerHTML = `
            <strong>High-Risk Strategy:</strong> Target 10,000 high-risk people.<br>
            <span style="color: #22c55e;">Each person has a 5% chance of being saved</span> (meaningful individual benefit).<br>
            Total lives saved: 500
        `;
    }

    showPopulation() {
        this.renderPopulation('population');
        this.$('#high-risk-box').classList.remove('active');
        this.$('#population-box').classList.add('active');

        this.$('#high-risk-saved').textContent = '-';
        this.$('#high-risk-individual').textContent = '-';
        this.$('#population-saved').textContent = '800';
        this.$('#population-individual').textContent = '0.08% chance of benefit';

        this.$('#result-text').innerHTML = `
            <strong>Population Strategy:</strong> Small intervention for all 1,000,000.<br>
            <span style="color: #f59e0b;">Each person has only 0.08% chance of being saved</span> (imperceptible benefit).<br>
            Total lives saved: 800 - <strong>MORE than high-risk approach!</strong>
        `;
    }

    showComparison() {
        this.renderPopulation('none');
        this.$('#high-risk-box').classList.add('active');
        this.$('#population-box').classList.add('active');

        this.$('#high-risk-saved').textContent = '500';
        this.$('#high-risk-individual').textContent = '5% chance';
        this.$('#population-saved').textContent = '800';
        this.$('#population-individual').textContent = '0.08% chance';

        this.$('#result-text').innerHTML = `
            <span style="color: var(--accent);">THE PARADOX:</span><br>
            Population strategy saves <strong>60% more lives</strong> (800 vs 500).<br>
            But individual benefit is <strong>62x smaller</strong> (0.08% vs 5%).<br>
            This is why people resist population-level interventions - they don't personally feel the benefit!
        `;
    }
}

customElements.define('prevention-paradox-simulator', PreventionParadoxSimulator);

export { PreventionParadoxSimulator };
