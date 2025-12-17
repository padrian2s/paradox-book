import { SimulatorBase } from '../simulator-base.js';

class EuropeanParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            region: 'europe',
            researchOutput: 85,
            patentsFiled: 45,
            startupsFunded: 30,
            commercialization: 35,
            unicorns: 15
        };
        this.regions = {
            europe: {
                name: 'Europe',
                research: 85,
                patents: 45,
                startups: 30,
                commercial: 35,
                unicorns: 15
            },
            usa: {
                name: 'United States',
                research: 75,
                patents: 80,
                startups: 85,
                commercial: 80,
                unicorns: 85
            },
            china: {
                name: 'China',
                research: 70,
                patents: 75,
                startups: 70,
                commercial: 65,
                unicorns: 60
            }
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .euro-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .region-tabs {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 1.5rem;
                }

                .region-tab {
                    flex: 1;
                    padding: 0.75rem;
                    background: var(--card, #1e293b);
                    border: 2px solid transparent;
                    border-radius: 0.5rem;
                    cursor: pointer;
                    text-align: center;
                }

                .region-tab:hover { border-color: var(--primary, #6366f1); }
                .region-tab.active { border-color: #22c55e; background: rgba(34, 197, 94, 0.1); }

                .region-tab.europe { border-color: #3b82f6; }
                .region-tab.usa { border-color: #ef4444; }
                .region-tab.china { border-color: #f59e0b; }

                .pipeline-display {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                    margin-bottom: 1rem;
                    overflow-x: auto;
                }

                .pipeline-stage {
                    text-align: center;
                    min-width: 80px;
                }

                .stage-icon {
                    font-size: 1.5rem;
                    margin-bottom: 0.25rem;
                }

                .stage-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                }

                .stage-label {
                    font-size: 0.65rem;
                    color: var(--muted, #94a3b8);
                }

                .pipeline-arrow {
                    font-size: 1.5rem;
                    color: var(--muted, #94a3b8);
                }

                .pipeline-arrow.weak { color: #ef4444; }
                .pipeline-arrow.strong { color: #22c55e; }

                .metrics-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
                    gap: 1rem;
                    margin: 1rem 0;
                }

                .metric-card {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                }

                .metric-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }

                .metric-name {
                    font-size: 0.75rem;
                    color: var(--muted, #94a3b8);
                }

                .metric-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                }

                .metric-bar {
                    height: 8px;
                    background: var(--bg, #0f172a);
                    border-radius: 4px;
                    overflow: hidden;
                }

                .metric-fill {
                    height: 100%;
                    border-radius: 4px;
                    transition: width 0.5s, background 0.3s;
                }

                .metric-fill.excellent { background: #22c55e; }
                .metric-fill.good { background: #3b82f6; }
                .metric-fill.poor { background: #ef4444; }

                .gap-indicator {
                    margin: 1rem 0;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    text-align: center;
                }

                .gap-indicator.paradox {
                    background: rgba(239, 68, 68, 0.1);
                    border: 2px solid #ef4444;
                }

                .gap-indicator.normal {
                    background: rgba(34, 197, 94, 0.1);
                    border: 2px solid #22c55e;
                }

                .gap-title {
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .gap-value {
                    font-size: 2rem;
                    font-weight: bold;
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
                    .pipeline-display {
                        flex-wrap: wrap;
                        justify-content: center;
                    }
                    .pipeline-arrow {
                        display: none;
                    }
                }
            </style>

            <h4>Innovation Pipeline Comparison</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">Compare how research output flows (or doesn't) to commercial success across regions.</p>

            <div class="euro-viz">
                <div class="region-tabs">
                    <div class="region-tab europe active" data-region="europe">Europe</div>
                    <div class="region-tab usa" data-region="usa">United States</div>
                    <div class="region-tab china" data-region="china">China</div>
                </div>

                <div class="pipeline-display">
                    <div class="pipeline-stage">
                        <div class="stage-icon">🔬</div>
                        <div class="stage-value" id="research-val">85</div>
                        <div class="stage-label">Research<br>Output</div>
                    </div>
                    <div class="pipeline-arrow" id="arrow1">→</div>
                    <div class="pipeline-stage">
                        <div class="stage-icon">📋</div>
                        <div class="stage-value" id="patents-val">45</div>
                        <div class="stage-label">Patents<br>Filed</div>
                    </div>
                    <div class="pipeline-arrow" id="arrow2">→</div>
                    <div class="pipeline-stage">
                        <div class="stage-icon">🚀</div>
                        <div class="stage-value" id="startups-val">30</div>
                        <div class="stage-label">Startups<br>Funded</div>
                    </div>
                    <div class="pipeline-arrow" id="arrow3">→</div>
                    <div class="pipeline-stage">
                        <div class="stage-icon">💰</div>
                        <div class="stage-value" id="commercial-val">35</div>
                        <div class="stage-label">Commercial<br>Success</div>
                    </div>
                    <div class="pipeline-arrow" id="arrow4">→</div>
                    <div class="pipeline-stage">
                        <div class="stage-icon">🦄</div>
                        <div class="stage-value" id="unicorns-val">15</div>
                        <div class="stage-label">Unicorns<br>Created</div>
                    </div>
                </div>

                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-header">
                            <span class="metric-name">Research Excellence</span>
                            <span class="metric-value" id="metric-research">85</span>
                        </div>
                        <div class="metric-bar">
                            <div class="metric-fill excellent" id="fill-research" style="width: 85%"></div>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-header">
                            <span class="metric-name">Patent Activity</span>
                            <span class="metric-value" id="metric-patents">45</span>
                        </div>
                        <div class="metric-bar">
                            <div class="metric-fill good" id="fill-patents" style="width: 45%"></div>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-header">
                            <span class="metric-name">VC Investment</span>
                            <span class="metric-value" id="metric-startups">30</span>
                        </div>
                        <div class="metric-bar">
                            <div class="metric-fill poor" id="fill-startups" style="width: 30%"></div>
                        </div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-header">
                            <span class="metric-name">Market Success</span>
                            <span class="metric-value" id="metric-commercial">35</span>
                        </div>
                        <div class="metric-bar">
                            <div class="metric-fill poor" id="fill-commercial" style="width: 35%"></div>
                        </div>
                    </div>
                </div>

                <div class="gap-indicator paradox" id="gap-box">
                    <div class="gap-title" id="gap-title">Research-to-Market Gap</div>
                    <div class="gap-value" id="gap-value">50 points</div>
                    <div style="font-size: 0.75rem; color: var(--muted);" id="gap-desc">Europe excels at discovery but struggles with commercialization</div>
                </div>
            </div>

            <div class="controls">
                <button id="compare-btn">Side-by-Side Compare</button>
                <button id="analyze-btn">Analyze Bottlenecks</button>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="papers-rank">#1</div>
                    <div class="stat-label">Scientific Papers</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="unicorn-rank">#3</div>
                    <div class="stat-label">Unicorn Count</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="efficiency">41%</div>
                    <div class="stat-label">Pipeline Efficiency</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="paradox-status">Yes!</div>
                    <div class="stat-label">Paradox Active</div>
                </div>
            </div>

            <div class="result">
                <p id="euro-result">Europe produces world-leading research but commercializes far less than the US. The "valley of death" between lab and market is wider in Europe.</p>
            </div>

            <div class="insight">
                Causes: fragmented markets, risk-averse culture, brain drain, less VC funding, regulatory complexity, and weaker university-industry links.
            </div>
        `;
    }

    setupEventListeners() {
        this.$$('.region-tab').forEach(tab => {
            tab.addEventListener('click', () => this.selectRegion(tab.dataset.region));
        });
        this.$('#compare-btn').addEventListener('click', () => this.showComparison());
        this.$('#analyze-btn').addEventListener('click', () => this.analyzeBottlenecks());
        this.updateDisplay();
    }

    selectRegion(region) {
        this.state.region = region;
        this.$$('.region-tab').forEach(tab => tab.classList.remove('active'));
        this.$(`.region-tab[data-region="${region}"]`).classList.add('active');

        const data = this.regions[region];
        this.state.researchOutput = data.research;
        this.state.patentsFiled = data.patents;
        this.state.startupsFunded = data.startups;
        this.state.commercialization = data.commercial;
        this.state.unicorns = data.unicorns;

        this.updateDisplay();
        this.updateNarrative(region);
    }

    updateNarrative(region) {
        const narratives = {
            europe: 'Europe produces world-leading research but commercializes far less than the US. The "valley of death" between lab and market is wider in Europe.',
            usa: 'The US has strong pipeline efficiency: research flows to patents, patents to startups, startups to unicorns. Silicon Valley culture and VC abundance help.',
            china: 'China rapidly increased research output and now converts it to commercial success more effectively than Europe, despite starting later.'
        };

        this.$('#euro-result').textContent = narratives[region];

        const isParadox = region === 'europe';
        this.$('#paradox-status').textContent = isParadox ? 'Yes!' : 'No';
        this.$('#paradox-status').style.color = isParadox ? '#ef4444' : '#22c55e';
        this.$('#gap-box').className = 'gap-indicator ' + (isParadox ? 'paradox' : 'normal');
    }

    showComparison() {
        this.$('#euro-result').innerHTML = `
            <strong>Research → Unicorns Conversion Rate:</strong><br>
            Europe: ${Math.round(this.regions.europe.unicorns / this.regions.europe.research * 100)}%<br>
            USA: ${Math.round(this.regions.usa.unicorns / this.regions.usa.research * 100)}%<br>
            China: ${Math.round(this.regions.china.unicorns / this.regions.china.research * 100)}%<br>
            <em style="color: #ef4444;">Europe has the most research but worst conversion!</em>
        `;
    }

    analyzeBottlenecks() {
        const data = this.regions[this.state.region];
        const bottlenecks = [];

        if (data.patents / data.research < 0.6) bottlenecks.push('Research → Patents (weak IP strategy)');
        if (data.startups / data.patents < 0.7) bottlenecks.push('Patents → Startups (lack of VC/entrepreneurs)');
        if (data.commercial / data.startups < 0.9) bottlenecks.push('Startups → Market (scaling difficulties)');
        if (data.unicorns / data.commercial < 0.5) bottlenecks.push('Market → Unicorns (growth capital gap)');

        if (bottlenecks.length === 0) {
            this.$('#euro-result').innerHTML = '<strong style="color: #22c55e;">No major bottlenecks!</strong> The innovation pipeline flows smoothly in this region.';
        } else {
            this.$('#euro-result').innerHTML = '<strong style="color: #ef4444;">Bottlenecks identified:</strong><br>' + bottlenecks.map(b => '- ' + b).join('<br>');
        }
    }

    updateDisplay() {
        this.$('#research-val').textContent = this.state.researchOutput;
        this.$('#patents-val').textContent = this.state.patentsFiled;
        this.$('#startups-val').textContent = this.state.startupsFunded;
        this.$('#commercial-val').textContent = this.state.commercialization;
        this.$('#unicorns-val').textContent = this.state.unicorns;

        this.$('#metric-research').textContent = this.state.researchOutput;
        this.$('#metric-patents').textContent = this.state.patentsFiled;
        this.$('#metric-startups').textContent = this.state.startupsFunded;
        this.$('#metric-commercial').textContent = this.state.commercialization;

        this.$('#fill-research').style.width = this.state.researchOutput + '%';
        this.$('#fill-patents').style.width = this.state.patentsFiled + '%';
        this.$('#fill-startups').style.width = this.state.startupsFunded + '%';
        this.$('#fill-commercial').style.width = this.state.commercialization + '%';

        this.$('#fill-research').className = 'metric-fill ' + (this.state.researchOutput > 70 ? 'excellent' : this.state.researchOutput > 50 ? 'good' : 'poor');
        this.$('#fill-patents').className = 'metric-fill ' + (this.state.patentsFiled > 70 ? 'excellent' : this.state.patentsFiled > 50 ? 'good' : 'poor');
        this.$('#fill-startups').className = 'metric-fill ' + (this.state.startupsFunded > 70 ? 'excellent' : this.state.startupsFunded > 50 ? 'good' : 'poor');
        this.$('#fill-commercial').className = 'metric-fill ' + (this.state.commercialization > 70 ? 'excellent' : this.state.commercialization > 50 ? 'good' : 'poor');

        const conversionRate = (this.state.patentsFiled / this.state.researchOutput) * 0.5 +
                              (this.state.startupsFunded / this.state.patentsFiled) * 0.3 +
                              (this.state.unicorns / this.state.startupsFunded) * 0.2;

        this.$('#arrow1').className = 'pipeline-arrow ' + (this.state.patentsFiled / this.state.researchOutput > 0.6 ? 'strong' : 'weak');
        this.$('#arrow2').className = 'pipeline-arrow ' + (this.state.startupsFunded / this.state.patentsFiled > 0.6 ? 'strong' : 'weak');
        this.$('#arrow3').className = 'pipeline-arrow ' + (this.state.commercialization / this.state.startupsFunded > 0.8 ? 'strong' : 'weak');
        this.$('#arrow4').className = 'pipeline-arrow ' + (this.state.unicorns / this.state.commercialization > 0.4 ? 'strong' : 'weak');

        const gap = this.state.researchOutput - this.state.unicorns;
        this.$('#gap-value').textContent = gap + ' points';
        this.$('#gap-desc').textContent = gap > 40 ? 'Major gap between research and commercial success' : 'Relatively efficient innovation pipeline';

        this.$('#efficiency').textContent = Math.round(this.state.unicorns / this.state.researchOutput * 100) + '%';

        if (this.state.region === 'europe') {
            this.$('#papers-rank').textContent = '#1';
            this.$('#unicorn-rank').textContent = '#3';
        } else if (this.state.region === 'usa') {
            this.$('#papers-rank').textContent = '#2';
            this.$('#unicorn-rank').textContent = '#1';
        } else {
            this.$('#papers-rank').textContent = '#3';
            this.$('#unicorn-rank').textContent = '#2';
        }
    }
}

customElements.define('european-paradox-simulator', EuropeanParadoxSimulator);

export { EuropeanParadoxSimulator };
