import { SimulatorBase } from '../simulator-base.js';

class PlentyParadoxSimulator extends SimulatorBase {
    constructor() {
        super();
        this.state = {
            resources: 50,
            year: 0,
            gdpGrowth: 3,
            institutionQuality: 70,
            diversification: 70,
            corruption: 20,
            dutchDisease: false
        };
    }

    getTemplate() {
        return `
            <style>
                ${this.getCommonStyles()}

                .country-viz {
                    padding: 1.5rem;
                    background: var(--bg, #0f172a);
                    border-radius: 0.5rem;
                    margin-top: 1rem;
                }

                .resource-display {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 1.5rem;
                }

                .resource-icon {
                    font-size: 3rem;
                }

                .resource-meter {
                    flex: 1;
                    max-width: 300px;
                }

                .meter-label {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    margin-bottom: 0.25rem;
                }

                .meter-bar {
                    height: 20px;
                    background: var(--card, #1e293b);
                    border-radius: 10px;
                    overflow: hidden;
                }

                .meter-fill {
                    height: 100%;
                    background: linear-gradient(90deg, #f59e0b, #eab308);
                    transition: width 0.3s;
                }

                .effects-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin: 1.5rem 0;
                }

                .effect-card {
                    background: var(--card, #1e293b);
                    padding: 1rem;
                    border-radius: 0.5rem;
                }

                .effect-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }

                .effect-name {
                    font-size: 0.875rem;
                    font-weight: bold;
                }

                .effect-value {
                    font-size: 1.25rem;
                    font-weight: bold;
                }

                .effect-value.good { color: #22c55e; }
                .effect-value.warning { color: #f59e0b; }
                .effect-value.bad { color: #ef4444; }

                .effect-bar {
                    height: 8px;
                    background: var(--bg, #0f172a);
                    border-radius: 4px;
                    overflow: hidden;
                }

                .effect-fill {
                    height: 100%;
                    transition: width 0.5s, background 0.3s;
                }

                .comparison-box {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1rem;
                    margin-top: 1rem;
                    padding: 1rem;
                    background: var(--card, #1e293b);
                    border-radius: 0.5rem;
                }

                .country-card {
                    text-align: center;
                    padding: 0.75rem;
                    border-radius: 0.25rem;
                }

                .country-card.resource-rich {
                    background: rgba(245, 158, 11, 0.1);
                    border: 1px solid #f59e0b;
                }

                .country-card.resource-poor {
                    background: rgba(34, 197, 94, 0.1);
                    border: 1px solid #22c55e;
                }

                .country-name {
                    font-weight: bold;
                    font-size: 0.875rem;
                }

                .country-gdp {
                    font-size: 1.5rem;
                    font-weight: bold;
                    margin: 0.25rem 0;
                }

                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
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
                    font-size: 1.25rem;
                    font-weight: bold;
                    color: var(--primary, #6366f1);
                }

                .stat-label {
                    font-size: 0.7rem;
                    color: var(--muted, #94a3b8);
                    margin-top: 0.25rem;
                }

                @media (max-width: 600px) {
                    .effects-grid {
                        grid-template-columns: 1fr;
                    }
                    .comparison-box {
                        grid-template-columns: 1fr;
                    }
                }
            </style>

            <h4>Resource Curse Simulator</h4>
            <p style="margin-bottom: 1rem; color: var(--muted);">Discover a resource bonanza and watch how abundance paradoxically harms economic development.</p>

            <div class="controls">
                <div class="control-group">
                    <label>Natural Resources: <span id="resource-val">50</span>%</label>
                    <input type="range" id="resource-slider" min="0" max="100" value="50">
                </div>
                <button id="discover-btn">Discover Resources!</button>
                <button id="advance-btn">Advance 10 Years</button>
                <button id="reset-btn">Reset</button>
            </div>

            <div class="country-viz">
                <div class="resource-display">
                    <div class="resource-icon">🛢️</div>
                    <div class="resource-meter">
                        <div class="meter-label">
                            <span>Resource Poor</span>
                            <span>Resource Rich</span>
                        </div>
                        <div class="meter-bar">
                            <div class="meter-fill" id="resource-fill" style="width: 50%"></div>
                        </div>
                    </div>
                    <div class="resource-icon">💎</div>
                </div>

                <div class="effects-grid">
                    <div class="effect-card">
                        <div class="effect-header">
                            <span class="effect-name">GDP Growth</span>
                            <span class="effect-value good" id="gdp-val">3%</span>
                        </div>
                        <div class="effect-bar">
                            <div class="effect-fill" id="gdp-fill" style="width: 60%; background: #22c55e;"></div>
                        </div>
                    </div>
                    <div class="effect-card">
                        <div class="effect-header">
                            <span class="effect-name">Institutions</span>
                            <span class="effect-value good" id="inst-val">70%</span>
                        </div>
                        <div class="effect-bar">
                            <div class="effect-fill" id="inst-fill" style="width: 70%; background: #22c55e;"></div>
                        </div>
                    </div>
                    <div class="effect-card">
                        <div class="effect-header">
                            <span class="effect-name">Diversification</span>
                            <span class="effect-value good" id="div-val">70%</span>
                        </div>
                        <div class="effect-bar">
                            <div class="effect-fill" id="div-fill" style="width: 70%; background: #22c55e;"></div>
                        </div>
                    </div>
                    <div class="effect-card">
                        <div class="effect-header">
                            <span class="effect-name">Corruption</span>
                            <span class="effect-value good" id="corr-val">20%</span>
                        </div>
                        <div class="effect-bar">
                            <div class="effect-fill" id="corr-fill" style="width: 20%; background: #22c55e;"></div>
                        </div>
                    </div>
                </div>

                <div class="comparison-box">
                    <div class="country-card resource-rich">
                        <div class="country-name">Your Country</div>
                        <div class="country-gdp" id="your-gdp">$10,000</div>
                        <div style="font-size: 0.75rem; color: var(--muted);">GDP per capita</div>
                    </div>
                    <div class="country-card resource-poor">
                        <div class="country-name">Resource-Poor Neighbor</div>
                        <div class="country-gdp" id="neighbor-gdp">$10,000</div>
                        <div style="font-size: 0.75rem; color: var(--muted);">GDP per capita</div>
                    </div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" id="year-num">0</div>
                    <div class="stat-label">Year</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="dutch-status">No</div>
                    <div class="stat-label">Dutch Disease</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" id="curse-status">No</div>
                    <div class="stat-label">Curse Active</div>
                </div>
            </div>

            <div class="result">
                <p id="plenty-result">Adjust natural resource levels and advance time to see the resource curse unfold.</p>
            </div>

            <div class="insight">
                Countries like Norway avoided the curse through strong institutions and sovereign wealth funds. But Nigeria, Venezuela, and others fell victim to the paradox of plenty.
            </div>
        `;
    }

    setupEventListeners() {
        this.$('#resource-slider').addEventListener('input', () => this.updateResources());
        this.$('#discover-btn').addEventListener('click', () => this.discoverResources());
        this.$('#advance-btn').addEventListener('click', () => this.advanceTime());
        this.$('#reset-btn').addEventListener('click', () => this.reset());
        this.updateDisplay();
    }

    updateResources() {
        this.state.resources = parseInt(this.$('#resource-slider').value);
        this.$('#resource-val').textContent = this.state.resources;
        this.$('#resource-fill').style.width = this.state.resources + '%';
    }

    discoverResources() {
        this.state.resources = Math.min(100, this.state.resources + 40);
        this.$('#resource-slider').value = this.state.resources;
        this.$('#resource-val').textContent = this.state.resources;

        this.$('#plenty-result').innerHTML = '<strong style="color: #f59e0b;">RESOURCE BONANZA!</strong> Massive oil/mineral deposits discovered! Initial economic boom expected...';

        this.state.gdpGrowth = Math.min(8, this.state.gdpGrowth + 3);
        this.updateDisplay();

        this.dispatchSimulatorEvent('resources-discovered', {
            resources: this.state.resources
        });
    }

    advanceTime() {
        this.state.year += 10;

        if (this.state.resources > 60) {
            this.state.corruption = Math.min(90, this.state.corruption + 15);
            this.state.institutionQuality = Math.max(10, this.state.institutionQuality - 12);
            this.state.diversification = Math.max(10, this.state.diversification - 15);

            if (this.state.diversification < 40) {
                this.state.dutchDisease = true;
            }

            if (this.state.corruption > 50 && this.state.institutionQuality < 50) {
                this.state.gdpGrowth = Math.max(-2, this.state.gdpGrowth - 2);
            }
        } else if (this.state.resources < 30) {
            this.state.institutionQuality = Math.min(90, this.state.institutionQuality + 5);
            this.state.diversification = Math.min(90, this.state.diversification + 5);
            this.state.gdpGrowth = Math.min(5, this.state.gdpGrowth + 0.5);
        }

        this.updateDisplay();
        this.updateNarrative();

        this.dispatchSimulatorEvent('time-advanced', {
            year: this.state.year,
            gdpGrowth: this.state.gdpGrowth
        });
    }

    updateNarrative() {
        const curseActive = this.state.resources > 60 && this.state.gdpGrowth < 2;

        if (curseActive) {
            this.$('#plenty-result').innerHTML = '<strong style="color: #ef4444;">RESOURCE CURSE!</strong> Despite natural wealth, your economy is stagnating. Corruption, weak institutions, and lack of diversification have undermined growth.';
            this.$('#curse-status').textContent = 'Yes!';
            this.$('#curse-status').style.color = '#ef4444';
        } else if (this.state.dutchDisease) {
            this.$('#plenty-result').innerHTML = '<strong style="color: #f59e0b;">DUTCH DISEASE!</strong> Resource exports have strengthened your currency, making manufacturing uncompetitive. Economy becoming dangerously dependent on resources.';
        } else if (this.state.resources > 60 && this.state.year > 0) {
            this.$('#plenty-result').textContent = `Year ${this.state.year}: Resource wealth flowing, but institutions weakening and economy becoming less diverse...`;
        } else {
            this.$('#plenty-result').textContent = `Year ${this.state.year}: Economy developing steadily. ${this.state.resources > 40 ? 'Watch for signs of the resource curse.' : 'Diversified economy is a strength.'}`;
        }
    }

    updateDisplay() {
        this.$('#resource-fill').style.width = this.state.resources + '%';

        this.$('#gdp-val').textContent = this.state.gdpGrowth.toFixed(1) + '%';
        this.$('#gdp-val').className = 'effect-value ' + (this.state.gdpGrowth > 2 ? 'good' : this.state.gdpGrowth > 0 ? 'warning' : 'bad');
        this.$('#gdp-fill').style.width = Math.max(0, (this.state.gdpGrowth + 2) * 12) + '%';
        this.$('#gdp-fill').style.background = this.state.gdpGrowth > 2 ? '#22c55e' : this.state.gdpGrowth > 0 ? '#f59e0b' : '#ef4444';

        this.$('#inst-val').textContent = this.state.institutionQuality + '%';
        this.$('#inst-val').className = 'effect-value ' + (this.state.institutionQuality > 60 ? 'good' : this.state.institutionQuality > 40 ? 'warning' : 'bad');
        this.$('#inst-fill').style.width = this.state.institutionQuality + '%';
        this.$('#inst-fill').style.background = this.state.institutionQuality > 60 ? '#22c55e' : this.state.institutionQuality > 40 ? '#f59e0b' : '#ef4444';

        this.$('#div-val').textContent = this.state.diversification + '%';
        this.$('#div-val').className = 'effect-value ' + (this.state.diversification > 60 ? 'good' : this.state.diversification > 40 ? 'warning' : 'bad');
        this.$('#div-fill').style.width = this.state.diversification + '%';
        this.$('#div-fill').style.background = this.state.diversification > 60 ? '#22c55e' : this.state.diversification > 40 ? '#f59e0b' : '#ef4444';

        this.$('#corr-val').textContent = this.state.corruption + '%';
        this.$('#corr-val').className = 'effect-value ' + (this.state.corruption < 30 ? 'good' : this.state.corruption < 50 ? 'warning' : 'bad');
        this.$('#corr-fill').style.width = this.state.corruption + '%';
        this.$('#corr-fill').style.background = this.state.corruption < 30 ? '#22c55e' : this.state.corruption < 50 ? '#f59e0b' : '#ef4444';

        const baseGDP = 10000;
        const yourGDP = baseGDP * Math.pow(1 + this.state.gdpGrowth / 100, this.state.year);
        const neighborGDP = baseGDP * Math.pow(1.03, this.state.year);

        this.$('#your-gdp').textContent = '$' + Math.round(yourGDP).toLocaleString();
        this.$('#neighbor-gdp').textContent = '$' + Math.round(neighborGDP).toLocaleString();

        this.$('#year-num').textContent = this.state.year;
        this.$('#dutch-status').textContent = this.state.dutchDisease ? 'Yes!' : 'No';
        this.$('#dutch-status').style.color = this.state.dutchDisease ? '#f59e0b' : 'var(--primary, #6366f1)';
    }

    reset() {
        this.state = {
            resources: 50,
            year: 0,
            gdpGrowth: 3,
            institutionQuality: 70,
            diversification: 70,
            corruption: 20,
            dutchDisease: false
        };
        this.$('#resource-slider').value = 50;
        this.$('#resource-val').textContent = 50;
        this.$('#curse-status').textContent = 'No';
        this.$('#curse-status').style.color = 'var(--primary, #6366f1)';
        this.$('#plenty-result').textContent = 'Adjust natural resource levels and advance time to see the resource curse unfold.';
        this.updateDisplay();
    }
}

customElements.define('plenty-paradox-simulator', PlentyParadoxSimulator);

export { PlentyParadoxSimulator };
