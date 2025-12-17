import { SimulatorBase } from '../simulator-base.js';

class ProgressParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.currentYear = 1970;
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .timeline-slider {
                    width: 100%;
                    margin: 1rem 0;
                }

                .year-display {
                    text-align: center;
                    font-size: 2rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                    margin-bottom: 1rem;
                }

                .metrics-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin: 1rem 0;
                }

                .metric-card {
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .metric-icon {
                    font-size: 1.5rem;
                    margin-bottom: 0.25rem;
                }

                .metric-label {
                    font-size: 0.75rem;
                    color: var(--muted);
                    margin-bottom: 0.25rem;
                }

                .metric-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                    transition: all 0.3s ease;
                }

                .metric-value.up {
                    color: #22c55e;
                }

                .metric-value.down {
                    color: #dc2626;
                }

                .metric-value.flat {
                    color: var(--accent, #f59e0b);
                }

                .comparison-bar {
                    margin-top: 1.5rem;
                    padding: 1rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                }

                .bar-container {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin: 0.5rem 0;
                }

                .bar-label {
                    width: 100px;
                    font-size: 0.75rem;
                    color: var(--muted);
                }

                .bar-track {
                    flex: 1;
                    height: 20px;
                    background: var(--card);
                    border-radius: 4px;
                    overflow: hidden;
                }

                .bar-fill {
                    height: 100%;
                    transition: width 0.5s ease;
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    padding-right: 5px;
                    font-size: 0.7rem;
                    font-weight: bold;
                }

                .bar-fill.material {
                    background: linear-gradient(90deg, #6366f1, #8b5cf6);
                }

                .bar-fill.happiness {
                    background: linear-gradient(90deg, #f59e0b, #fbbf24);
                }

                .paradox-callout {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: rgba(245, 158, 11, 0.1);
                    border: 1px solid var(--accent);
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .paradox-question {
                    font-size: 1.1rem;
                    font-weight: bold;
                    color: var(--accent);
                }

                .research-box {
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card);
                    border-radius: 0.5rem;
                }

                .research-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .research-item {
                    font-size: 0.875rem;
                    color: var(--muted);
                    padding: 0.25rem 0;
                    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
                }

                @media (max-width: 600px) {
                    .metrics-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Progress Paradox</h4>
            <p style="color: var(--muted); margin-bottom: 1rem;">Material wealth has skyrocketed, but happiness hasn't followed.</p>

            <div class="controls">
                <div class="control-group" style="width: 100%;">
                    <label>Slide through time:</label>
                    <input type="range" id="year-slider" class="timeline-slider" min="1970" max="2024" value="1970">
                </div>
            </div>

            <div class="year-display" id="year-display">1970</div>

            <div class="metrics-grid">
                <div class="metric-card">
                    <div class="metric-icon">&#x1F4B0;</div>
                    <div class="metric-label">GDP per Capita</div>
                    <div class="metric-value up" id="gdp-value">$23,000</div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon">&#x1F60A;</div>
                    <div class="metric-label">Life Satisfaction</div>
                    <div class="metric-value flat" id="happiness-value">7.2/10</div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon">&#x1F4F1;</div>
                    <div class="metric-label">Technology Access</div>
                    <div class="metric-value up" id="tech-value">Limited</div>
                </div>
                <div class="metric-card">
                    <div class="metric-icon">&#x1F48A;</div>
                    <div class="metric-label">Antidepressant Use</div>
                    <div class="metric-value" id="meds-value">Low</div>
                </div>
            </div>

            <div class="comparison-bar">
                <div class="bar-container">
                    <div class="bar-label">Material Progress</div>
                    <div class="bar-track">
                        <div class="bar-fill material" id="material-bar" style="width: 20%;">20%</div>
                    </div>
                </div>
                <div class="bar-container">
                    <div class="bar-label">Happiness Level</div>
                    <div class="bar-track">
                        <div class="bar-fill happiness" id="happiness-bar" style="width: 72%;">72%</div>
                    </div>
                </div>
            </div>

            <div class="paradox-callout" id="paradox-callout">
                <div class="paradox-question">Why doesn't more stuff make us happier?</div>
            </div>

            <div class="result" id="result">
                <p>Move the slider to see how material progress and happiness have changed over time.</p>
            </div>

            <div class="research-box">
                <div class="research-title">Possible Explanations:</div>
                <div class="research-item">&#x2022; Hedonic treadmill - we adapt to improvements</div>
                <div class="research-item">&#x2022; Social comparison - we compare to peers, not past</div>
                <div class="research-item">&#x2022; Rising expectations outpace gains</div>
                <div class="research-item">&#x2022; Lost community and social connection</div>
                <div class="research-item">&#x2022; Increased anxiety from more choices</div>
            </div>

            <div class="insight">
                The Easterlin Paradox: Within a country, rich people are happier. But as countries get richer over time, average happiness doesn't increase. Once basic needs are met, more wealth doesn't buy more happiness.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#year-slider').addEventListener('input', (e) => this.updateYear(parseInt(e.target.value)));
        this.updateYear(1970);
    }

    updateYear(year) {
        this.currentYear = year;
        this.$('#year-display').textContent = year;

        const progress = (year - 1970) / (2024 - 1970);

        const gdp = Math.round(23000 + progress * 52000);
        this.$('#gdp-value').textContent = '$' + gdp.toLocaleString();

        const happinessBase = 7.2;
        const happinessVariation = Math.sin(progress * Math.PI) * 0.3;
        const happiness = (happinessBase + happinessVariation - progress * 0.1).toFixed(1);
        this.$('#happiness-value').textContent = happiness + '/10';

        const techLevels = ['Limited', 'Growing', 'Mainstream', 'Ubiquitous', 'AI Era'];
        const techIndex = Math.min(4, Math.floor(progress * 5));
        this.$('#tech-value').textContent = techLevels[techIndex];

        const medLevels = ['Low', 'Rising', 'Common', 'High', 'Very High'];
        const medIndex = Math.min(4, Math.floor(progress * 5));
        this.$('#meds-value').textContent = medLevels[medIndex];
        this.$('#meds-value').style.color = progress > 0.5 ? '#dc2626' : progress > 0.25 ? '#f59e0b' : '#22c55e';

        const materialProgress = 20 + progress * 80;
        this.$('#material-bar').style.width = materialProgress + '%';
        this.$('#material-bar').textContent = Math.round(materialProgress) + '%';

        const happinessLevel = 72 - progress * 5;
        this.$('#happiness-bar').style.width = happinessLevel + '%';
        this.$('#happiness-bar').textContent = Math.round(happinessLevel) + '%';

        this.updateResult(year, progress);
    }

    updateResult(year, progress) {
        if (progress < 0.25) {
            this.$('#result').innerHTML = `
                <p><strong>${year}:</strong> Lower GDP, but strong community ties and simpler lives.</p>
                <p>People have less stuff but often report meaningful connections.</p>
            `;
        } else if (progress < 0.5) {
            this.$('#result').innerHTML = `
                <p><strong>${year}:</strong> Rising prosperity, new technologies arriving.</p>
                <p>Expectations are rising faster than actual improvements.</p>
            `;
        } else if (progress < 0.75) {
            this.$('#result').innerHTML = `
                <p><strong>${year}:</strong> Digital revolution in full swing.</p>
                <p>More connected than ever, yet loneliness is increasing.</p>
            `;
        } else {
            this.$('#result').innerHTML = `
                <p style="color: var(--accent);"><strong>${year}:</strong> Peak material abundance!</p>
                <p>GDP has nearly tripled, yet happiness is roughly the same or declining.</p>
                <p>Anxiety, depression, and loneliness at record highs despite unprecedented wealth.</p>
            `;
        }
    }
}

customElements.define('progress-paradox-simulator', ProgressParadoxSimulator);

export { ProgressParadoxSimulator };
